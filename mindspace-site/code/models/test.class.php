<?php

    class test {
        public function __construct () {
            echo "success!";
        }

        public function test () {
            $registry = registry::getInstance();
            echo $registry->uri;
        }
    }
