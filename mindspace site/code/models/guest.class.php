<?php

    class guest extends db_pdo {

        public function __construct () {
            $this->index = 'guest_id';
            $this->table = 'guests';
            parent::__construct();
            $this->load_schema();
        }

        public function tally () {
            $arr = array($this->points, $this->tasks);
            return $arr;
        }

        public function login ($username, $password) {
            $username = stripslashes($username);
            $password = stripslashes($password);
            $sql = "SELECT * FROM guests
                    WHERE username = :username
                    AND password = :password";
            $this->sth = $this->dbh->prepare($sql);
            $this->sth->bindValue(":username", $username);
            $this->sth->bindValue(":password", $password);
            $this->sth->execute();
            if ($this->sth->rowCount() > 0) {
                $this->data = $this->sth->fetch(PDO::FETCH_ASSOC);
                $_SESSION['guest']['guest_id'] = $this->guest_id;
                $_SESSION['guest']['username'] = $this->username;
                return true;
            } else {
                unset($_SESSION['guest']);
                return false;
            }
        }

        public function username_exists ($username) {
            $username = stripslashes($username);
            $sql = "SELECT * FROM guests
                    WHERE username = :username";
            $this->sth = $this->dbh->prepare($sql);
            $this->sth->bindValue(":username", $username);
            $this->sth->execute();
            if ($this->sth->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        }

    }
