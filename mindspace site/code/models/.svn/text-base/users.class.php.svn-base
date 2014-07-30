<?php

    class users extends mysql_db {
        private $users;
        
        public function __construct () {
            $this->conn = mysql_resource::get_conn();
            $sql = "SELECT * FROM users";
            $result = $this->perform_sql($sql);
            while ($this->users[] = mysql_fetch_assoc($result)) { }  
        }

        public function display () {
            if (count($this->users) == 0) {
                echo "No users in table."; 
            } else {
				echo "<h1>Current Users</h1>\n";
				echo "<ol class='numbered'>\n";
                foreach ($this->users as $user) {
                    echo "<li><a href='/user/edit/{$user['user_id']}/'>" . $user['username'] . "</a></li>\n";
                }
				echo "</ol>\n";
            }
        }

		public function load_for_flash () {
			//this is just a test method for the exchange class, to make sure all is well
            $user_list = '';
			$this->conn = mysql_resource::get_conn();
            $sql = "SELECT * FROM users";
            $result = $this->perform_sql($sql);
            while ($user_list[] = mysql_fetch_assoc($result)) { }
			return $user_list;
        }
    }
