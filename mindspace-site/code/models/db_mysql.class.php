<?php

    final class db_mysql {
        protected static $dbh;

        private function __construct () {

        }

        private function __clone () {

        }

        public static function getInstance () {
            if (self::$dbh === NULL) {
                try {
                    self::$dbh = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS);
                } catch (PDOException $e) {
                    echo $e->getMessage();
                }
            }
            return self::$dbh;
        }
    }

