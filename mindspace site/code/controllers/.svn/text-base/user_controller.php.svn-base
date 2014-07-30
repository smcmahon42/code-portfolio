<?php

    class user_controller {

        public function index () {
			$this->listing();
        }

        public function listing () {
            registry::add_viewlet(new viewlet('object', '', new users, 'display'));
        }

        public function add () {
            registry::add_viewlet(new viewlet('object', '', new user, 'edit'));
        }

        public function edit () {
            $user = new user;
            $registry = registry::getInstance();
            $user->load($registry->args[3]);
            registry::add_viewlet(new viewlet('object', '', $user, 'edit'));
        }

        public function update () {
            $user = new user;
            $registry = registry::getInstance();
            if ($registry->args[3] > 0) {
                $user->load($registry->args[3]);
            }
            $user->update_from_post();
            $user->store();
        }

    }
