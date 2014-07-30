<?php

    // database abstraction layer for MySQL

    class mysql_db {
        protected $conn;
        protected $schema = array();
        protected $data = array();
        protected $err = array();
        protected $table = '';

        public function __get ($name) {
            return $this->data[$name];
        }

        public function __set($name, $value) {
            $this->data[$name] = $value;
        }

        protected function load_schema () {
            $sql = 'DESC ' . $this->table;
            $result = $this->perform_sql($sql);

            while ($rec = mysql_fetch_assoc($result)) {
                $key = $rec['Field'];
                $x = preg_match('/^(.*)\((.*)\)/', $rec['Type'], $match);
                $this->schema[$key]['Type'] = $match[1];
                $this->schema[$key]['Size'] = $match[2];
                $this->schema[$key]['Null'] = $rec['Null'];
                $this->schema[$key]['Key'] = $rec['Key'];
                $this->schema[$key]['Default'] = $rec['Default'];
                $this->schema[$key]['Extra'] = $rec['Extra'];
            }
        }

        public function show_schema () {
            foreach ($this->schema as $key => $item) {
                echo "<br>\n";
                foreach ($item as $element => $value) {
                    echo "$element: $value <br>\n";
                }
            }
        }

        protected function initialize_data () {
            foreach ($this->schema as $key => $value) {
                switch (strtoupper($this->schema[$key]['Type'])) {
                    case 'TINYINT' :
                    case 'SMALLINT' :
                    case 'MEDIUMINT' :
                    case 'INT' :
                    case 'BIGINT' :
                    case 'FLOAT' :
                    case 'DOUBLE' :
                    case 'DECIMAL' :
                    case 'BIT' :
                        $init_value = 0;
                        break;
                    case 'CHAR' :
                    case 'VARCHAR' :
                    case 'TINYTEXT' :
                    case 'TEXT' :
                    case 'MEDIUMTEXT' :
                    case 'LONGTEXT' :
                    case 'BINARY' :
                    case 'VARBINARY' :
                    case 'TINYBLOB' :
                    case 'BLOB' :
                    case 'MEDIUMBLOB' :
                    case 'LONGBLOB' :
                    case 'ENUM' :
                    case 'SET' :
                    case 'DATE' :
                    case 'DATETIME' :
                    case 'TIME' :
                    case 'TIMESTAMP' :
                    case 'YEAR' :
                        $init_value = '';
                        break;
                    default :
                        $init_value = null;
                }
                $this->data[$key] = $init_value;
            }
        }

        protected function sql_build_insert ($omit) {
            $field_names = '';
            $field_values = '';
            foreach ($this->schema as $key => $value) {
                if (!in_array($key, $omit)) {
                    // build field name string
                    if (!empty($field_names)) { $field_names .= ','; }
                    $field_names .= $key;

                    // build field content string
                    if (strlen($field_values) > 0) { $field_values .= ','; }
                    $field_values .= $this->format_field_data($key);
                }
            }
            $sql = "INSERT INTO {$this->table} ({$field_names}) VALUES ({$field_values})";
            return $sql;
        }

        protected function sql_build_update ($omit) {
            $updates = '';
            foreach ($this->schema as $key => $value) {
                if (!in_array($key, $omit)) {
                    if (strlen($updates) > 0) { $updates .= ', '; }
                    $updates .= "{$key} = " . $this->format_field_data($key);
                }
            }
            $sql = "UPDATE {$this->table} SET {$updates} ";
            return $sql;
        }

        private function format_field_data ($field) {
            switch (strtoupper($this->schema[$field]['Type'])) {
                case 'TINYINT' :
                case 'SMALLINT' :
                case 'MEDIUMINT' :
                case 'INT' :
                case 'BIGINT' :
                case 'FLOAT' :
                case 'DOUBLE' :
                case 'DECIMAL' :
                case 'BIT' :
                    $field_item = $this->data[$field];
                    if (empty($field_item)) {
                        $field_item = 0;
                    }
                    break;
                case 'CHAR' :
                case 'VARCHAR' :
                case 'TINYTEXT' :
                case 'TEXT' :
                case 'MEDIUMTEXT' :
                case 'LONGTEXT' :
                case 'BINARY' :
                case 'VARBINARY' :
                case 'TINYBLOB' :
                case 'BLOB' :
                case 'MEDIUMBLOB' :
                case 'LONGBLOB' :
                case 'ENUM' :
                case 'SET' :
                case 'DATE' :
                case 'DATETIME' :
                    $field_item = "'" . mysql_real_escape_string($this->data[$field]) . "'";
                    break;
                case 'TIME' :
                case 'TIMESTAMP' :
                case 'YEAR' :
                    if (empty($this->data[$field])) {
                        $this->data[$field] = CURRENT_TIME;
                    }
                    $field_item = "'" . date('Y-m-d H:i:s', $this->data[$field]) . "'";
                    break;
                default :
                    $field_item = "'" . mysql_real_escape_string($this->data[$field]) . "'";
            }
            return $field_item;
        }

        // for form values, double quotes are escaped
        public function get_qdata ($field_name) {
            return str_replace('"', '\"', stripslashes($this->data[$field_name]));
        }

        public function get_field_size ($field_name) {
            return $this->schema[$field_name]['Size'];
        }

        public function get_field_type ($field_name) {
            return $this->schema[$field_name]['Type'];
        }

        // $validate (if provided) is a method to call that receives a key and value to be evaluated
        public function update_from_post ($validate = false, $omit = array()) {
            foreach ($this->schema as $key => $value) {
                if (in_array($key, $omit)) {   // skip if in omit array
                    continue;
                }
                if ($validate) {
                    // perform field validation
                    $this->$validate($key, $_POST[$key]);
                }
                if (isset($_POST[$key])) {
                    switch (strtoupper($this->schema[$key]['Type'])) {
                        case 'TINYINT' :
                            if ($_POST[$key] == 'on') {
                                $this->data[$key] = 1;
                            } else {
                                $this->data[$key] = 0;
                            }
                            break;
                        case 'SMALLINT' :
                        case 'MEDIUMINT' :
                        case 'INT' :
                        case 'BIGINT' :
                        case 'FLOAT' :
                        case 'DOUBLE' :
                        case 'DECIMAL' :
                        case 'BIT' :
                            $this->data[$key] = (int) str_replace(',', '', $_POST[$key]);
                            if (empty($this->data[$key])) {
                                $this->data[$key] = 0;
                            }
                            break;
                        case 'CHAR' :
                        case 'VARCHAR' :
                        case 'TINYTEXT' :
                        case 'TEXT' :
                        case 'MEDIUMTEXT' :
                        case 'LONGTEXT' :
                        case 'BINARY' :
                        case 'VARBINARY' :
                        case 'TINYBLOB' :
                        case 'BLOB' :
                        case 'MEDIUMBLOB' :
                        case 'LONGBLOB' :
                        case 'ENUM' :
                        case 'SET' :
                        case 'DATE' :
                        case 'DATETIME' :
                        case 'TIME' :
                        case 'TIMESTAMP' :
                        case 'YEAR' :
                            $this->data[$key] = $_POST[$key];
                            break;
                        default :
                            $this->data[$key] = $_POST[$key];
                            break;
                    }
                }
            }
        }

        protected function perform_sql ($sql) {
            $result = mysql_query($sql);
            if (!$result) {
                die("Database error! $sql<br />".mysql_error());
            } else {
                return $result;
            }
        }

        public function show_data () {
            foreach ($this->data as $key => $value) {
                $type = gettype($value);
                echo "type=> $type , $key => $value <br>\n";
            }
        }

        protected function airlock ($incoming) {
            foreach ($incoming as $key => $value) {
                switch (strtoupper($this->schema[$key]['Type'])) {
                    case 'TINYINT' :
                    case 'TINYINT' : 
                    case 'SMALLINT' :
                    case 'MEDIUMINT' :
                    case 'INT' :
                    case 'BIGINT' :
                    case 'BIT' :
                        $this->data[$key] = (int) $value;
                        break;
                    case 'FLOAT' :
                    case 'DOUBLE' :
                    case 'DECIMAL' :
                        $this->data[$key] = (float) $value;
                        break;
                    case 'CHAR' :
                    case 'VARCHAR' :
                    case 'TINYTEXT' :
                    case 'TEXT' :
                    case 'MEDIUMTEXT' :
                    case 'LONGTEXT' :
                    case 'BINARY' :
                    case 'VARBINARY' :
                    case 'TINYBLOB' :
                    case 'BLOB' :
                    case 'MEDIUMBLOB' :
                    case 'LONGBLOB' :
                    case 'ENUM' :
                    case 'SET' :
                        $this->data[$key] = stripslashes($value);
                        break;
                    case 'DATE' :
                    case 'DATETIME' :
                    case 'TIME' :
                    case 'TIMESTAMP' :
                    case 'YEAR' :
                        $this->data[$key] = strtotime($value);
                        break;
                    default :
                        $this->data[$key] = $value;
                        break;
                }
            }
        }

        public function load ($id) {
            $sql = "SELECT * FROM {$this->table} WHERE {$this->primary_key} = {$id}";
            $result = $this->perform_sql($sql);
            if ($result) {
                $rec = mysql_fetch_assoc($result);
                $this->airlock($rec);
            }
        }

        public function store ($omit = array()) {
            $pk = $this->primary_key;
            if ($this->$pk == 0) {
                $sql = $this->sql_build_insert($omit);
            } else {
                $sql = $this->sql_build_update($omit);
                $sql .= " WHERE {$this->primary_key} = {$this->$pk}";
            }
            $this->perform_sql($sql);
            if ($this->$pk == 0) {
                $this->$pk = mysql_insert_id();
            }
        }

        public function get_html ($field) {
            switch (strtoupper($this->schema[$field]['Type'])) {
                case 'TINYINT' :
                    return $this->data[$field] == 1 ? 'checked' : '';   // for checkboxes
                    break;
                case 'INT' :
                case 'SMALLINT' :
                case 'MEDIUMINT' :
                case 'BIGINT' :
                case 'FLOAT' :
                case 'DOUBLE' :
                case 'DECIMAL' :
                    return number_format($this->data[$field], 0);   // format integer with commas
                    break;
                default :
                    return stripslashes($this->data[$field]);
            }
        }

        public function list_errors () {
            if (count($this->errors) > 0) {
                echo "<ul>\n";
                foreach ($this->errors as $error) {
                    echo "<li style='color: red;'>$error</li>\n";
                }   
                echo "</ul>\n";
            }
        }
    }
?>
