<?php

    class db_pdo {
        protected $dbh;
        protected $sth;
        protected $table;
        protected $index;
        protected $key;
        protected $schema = array();
        protected $data = array();
        protected $errors = array();
        protected $meta = array();
        static $id_offset = 0;
        protected $id_index = 0;

        public function __construct () {
            $this->dbh = db_mysql::getInstance();
            /*
                $id_index is created to provide each instance of an object
                type has it's own reference.
            */
            self::$id_offset++;
            $this->id_index = self::$id_offset;
        }

        public function __get ($name) {
            return $this->data[$name];
        }

        public function __set ($name, $value) {
            $this->data[$name] = $value;
        }

        protected function load_schema () {
            $sql = "DESC {$this->table}";
            try {
                $sth = $this->dbh->query($sql);
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
            $specs = $sth->fetchAll();
            foreach ($specs as $row) {
                $this->data[$row['Field']] = $row['Default'];
                $this->meta[$row['Field']] = '';
                $this->schema[$row['Field']] = $row;
            }
        }

        public function show_schema () {
            foreach ($this->schema as $row) {
                echo $row['Field'] . ' ' . $row['Type'] . ' ' . $row['Default'] . "<br>\n";
            }
        }

        public function load ($id) {
            $id = (int) $id;
            $sql = "SELECT * FROM {$this->table}
                    WHERE {$this->index} = {$id}";
            try {
                $this->sth = $this->dbh->query($sql);
                $this->data = $this->sth->fetch(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }

        public function perform ($sql) {
            try {
                $this->sth = $this->dbh->query($sql);
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        } 

        public function html ($field) {
            if (isset($this->data[$field])) {
                return htmlspecialchars(stripslashes(trim($this->data[$field])), ENT_QUOTES);
            }
        }

        public function update () {
            foreach ($this->schema as $row) {
                $field = $row['Field'];
                if (isset($_POST[$field])) {
                    $this->data[$field] = stripslashes($_POST[$field]);
                }
            } 
            if (count($this->errors) > 0) {
                return false;
            } else {
                return true;
            }
        }

        public function store () {
            if ($this->data[$this->index] > 0) {
                // update
                $sql = "UPDATE {$this->table} SET ";
                $values = array();
                foreach ($this->schema as $row) {
                    $field = $row['Field'];
                    if ($field != $this->index) {
                        $values[] = "{$field} = :{$field} ";
                    }
                }
                $sql .= implode(',', $values);
                $sql .= " WHERE {$this->index} = {$this->data[$this->index]}";
                $existing = true;
            } else {
                // insert
                $sql = "INSERT INTO {$this->table} (";
                $field_list = array();
                foreach ($this->schema as $row) {
                    if ($row['Field'] != $this->index) {
                        $field_list[] = $row['Field'];
                    }
                }
                $sql .= implode(',', $field_list);
                $sql .= ") VALUES (";
                $field_list = array();
                foreach ($this->schema as $row) {
                    if ($row['Field'] != $this->index) {
                        $field_list[] = ":{$row['Field']}";
                    }
                }
                $sql .= implode(',', $field_list);
                $sql .= ")";
                $existing = false;
            }
            try {
                $this->sth = $this->dbh->prepare($sql);
                foreach ($this->schema as $row) {
                    $field = $row['Field'];
                    if ($field != $this->index) {
                        $this->sth->bindValue(":{$field}", $this->$field); 
                    }
                }
                $this->sth->execute();
            } catch (PDOException $e) {
                return false;
                // echo $e->getMessage();
            }
            if (!$existing) {
                $this->data[$this->index] = $this->dbh->lastInsertId();
            }
            return true;
        }

        public function error_count () {
            return count($this->errors);
        }

        public function display_errors () {
            if (count($this->errors) > 0) {
                echo "<ul class='errors'>\n";
                foreach ($this->errors as $error) {
                    echo "<li>{$error}</li>\n";
                }
                echo "</ul>\n";
            }
        }

        public function get_errors () {
            return $this->errors;
        }

    }
