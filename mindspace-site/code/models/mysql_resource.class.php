<?php

    final class mysql_resource {
        protected static $conn;

        private function __construct () {
            self::$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("Cannot access database.");
            mysql_select_db(DB_NAME, self::$conn) or die ("Could not access " . DB_NAME);
        }

        private function __clone () {

        }

        public static function get_conn () {
            if (self::$conn === NULL) {
                self::$conn = new self();
            }
            return self::$conn;
        }

    }
