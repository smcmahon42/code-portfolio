<?php

    class admin {
        private $registry;
        private $controller;
        private $template = 'index.php';
		// private $version = 'admin';//thinking this is one way to flag the admin version for paths, etc. Thoughts? -ATF 

        public function __construct () {
            $this->load_registry();
            $this->load_controller();
            $this->load_credentials();
            $this->load_view();
        }

        private function load_registry () {
            $this->registry = registry::getInstance();
            $this->registry->uri = $_SERVER['REQUEST_URI'];
            $this->registry->request = $_SERVER['REQUEST'];
            $this->registry->post = $_SERVER['POST'];
            $this->registry->get = $_SERVER['GET'];
            $parts = explode('/', $this->registry->uri);
            $this->registry->args = $parts;
            $page = trim($parts[count($parts) - 1]);
            if (strlen($page) > 0) {
                $this->registry->page = $page;
            } else {
                $this->registry->page = 'index.php';
            }
        }

        private function load_controller () {
            $parts = explode('/', $this->registry->uri);
            $controller_name = trim($parts[1]);
            if (strlen($controller_name) > 0) {
                $controller_name = $controller_name . '_controller';
            } else {
                $controller_name = 'main_controller';
            }
            $method = trim($parts[2]);
			
            $controller_file = CONTROLLER_PATH . $controller_name . '.php';
            if (file_exists($controller_file)) {
                include_once($controller_file);
            } else {
                $controller_name = 'main_controller';
                include_once(CONTROLLER_PATH . 'main_controller.php');
            }
            $this->controller = new $controller_name;
            if (method_exists($this->controller, $method)) {
                $this->controller->$method();
            } else {
                $this->controller->index();
            }
        }

        private function load_credentials () {
			if (isset($_SESSION['admin'])) {
                $this->registry->add_viewlet(new viewlet('path', 'gate', ADMIN_VIEW_PATH . 'admin_logout.php'));
                $menu = new menu(ADMIN_VIEW_PATH);
                $menu->add_item('Campaigns', '/campaign/');
                if ($_SESSION['admin']['rank'] == 1) {
                    $menu->add_item('Clients', '/client/');
                    $menu->add_item('Users', '/user/');
                    $menu->add_item('Questions', '/question/');
                }
                $this->registry->add_viewlet(new viewlet('object', 'menu', $menu, 'render'));
            } else {
                $this->registry->add_viewlet(new viewlet('path', 'gate', ADMIN_VIEW_PATH . 'admin_login.php'));
            }
        }

        private function load_view () {
            include(ADMIN_VIEW_PATH . $this->template);
        }

        private function parse_viewlets ($group = '') {
            if (is_array($this->registry->viewlets)) {
                foreach ($this->registry->viewlets as $viewlet) {
                    if ($viewlet->get_group() == $group) {
                        $viewlet->render();
                    }
                }
            }
        }

    }



