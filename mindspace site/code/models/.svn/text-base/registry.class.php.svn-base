<?php

    final class registry {
        protected static $_instance;

        private function __construct () {

        }

        private function __clone () {

        }

        public static function getInstance () {
            if (self::$_instance === NULL) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function __set ($tag, $value) {
            self::$_instance->$tag = $value;
        }

        public function __get ($tag) {
            return self::$_instance->$tag;
        }

        public static function add_viewlet ($viewlet) {
            if (!isset(self::$_instance->viewlets)) {
                self::$_instance->viewlets = array();
            }
            array_push(self::$_instance->viewlets, $viewlet);
        }

    }
