<?php

    class user extends mysql_db {

        public function __construct () {
            $this->conn = mysql_resource::get_conn();
            $this->table = 'users';
            $this->primary_key = 'id';
            $this->load_schema();
            $this->initialize_data();
        }

        public function edit () {
            include(ADMIN_VIEW_PATH . 'user_edit.php');
        }

		public function login ($email, $password) {
			$email = str_replace("'", '', $email);
            //$password = md5($password);
            $sql = "SELECT * FROM users
                    WHERE email = '{$email}'
                    AND password = '{$password}'";
            $result = $this->perform_sql($sql);
            if (mysql_num_rows($result) == 1) {
                $rec = mysql_fetch_assoc($result);
                $this->airlock($rec); 
                return true;
            } else {
                return false; 
            }
        }

		public function setSID($sid, $email)
		{
			$sql = "UPDATE users
					SET sid = '{$sid}'
					WHERE email = '{$email}'";
			$result = $this->perform_sql($sql);
		}

		public function exists($email)
		{
			$sql = "SELECT * FROM users
					WHERE email = '{$email}'";
			$result = $this->perform_sql($sql);
			if(mysql_num_rows($result) == 1) {
				return true;
			} else {
				return false;
			}
		}

		public function create($email, $pass) {
			//$email = $_POST['email'];
			//$password = $_POST['password'];
			ChromePhp::log("Creating User...");
			$sql = "INSERT INTO users
					(email, password, pagesunlocked, pointbalance)
					VALUES('{$email}', '{$pass}', 0, 0)";
			ChromePhp::log($sql);
			$result = $this->perform_sql($sql);
			
			if($result)
			{
				return true;
			} else {
				return false;
			}
		}
		
		public function validate () {
            if ($this->user_id == 0) {
                // check for available username
                if (strlen($this->username) == 0) {
                    $this->errors[] = "Username is required";
                } else {
                    if (!$this->username_available($this->username)) {
                        $this->errors[] = "Username is already taken";
                    }
                }
                // ensure password has been entered
                if (strlen($_POST['password']) == 0) {
                    $this->errors[] = "Please provide a password";
                } else {
                    if ($_POST['password'] != $_POST['password_again']) {
                        $this->errors[] = "Passwords do not match"; 
                    }
                }
            } else {
                // if password is entered, check against password_again
                if (strlen($_POST['password']) > 0) {
                    if ($_POST['password'] != $_POST['password_again']) {
                        $this->errors[] = "Passwords do not match";
                    }
                }
            }
            if (count($this->errors) > 0) {
                return false;
            } else {
                return true;
            }
        }

        public function username_available ($username) {
            $username = str_replace("'", '', $username);
            $sql = "SELECT user_id FROM users
                    WHERE username = '{$username}'";
            $result = $this->perform_sql($sql);
            if (mysql_num_rows($result) > 0) {
                return false;
            } else {
                return true;
            }
        }

        public function list_errors () {
            if (count($this->errors) > 0) {
                echo "<ul class='errors'>\n";
                foreach ($this->errors as $error) {
                    echo "<li>{$error}</li>";
                } 
                echo "</ul>\n";
            }
        }

        public function set_password ($password) {
            $this->password = md5($password);
            $this->store();
        }
    }
