<?php

    class www {
        private $registry;
        private $controller;

        public function __construct () {
			$this->load_registry();
            $this->load_controller();
            $this->load_view();
        }

        private function load_registry () {
			$this->registry = registry::getInstance();
            $this->registry->uri = $_SERVER['REQUEST_URI'];
            $this->registry->request = (isset($_SERVER['REQUEST'])) ? $_SERVER['REQUEST'] : 'undefined';
            $this->registry->post = (isset($_SERVER['POST'])) ? $_SERVER['POST'] : 'undefined';
            $this->registry->get = (isset($_SERVER['GET'])) ? $_SERVER['GET'] : 'undefined';
            $this->registry->new_registrant = 0;
            $parts = explode('/', $this->registry->uri);
            $this->registry->args = $parts;
			$page = trim($parts[count($parts) - 1]);

			ChromePhp::log("Parts = " . $this->registry->uri);
			ChromePhp::log("Page = " . $page);

            if (strlen($page) > 0) {
                $this->registry->page = $page.'.php';
				$this->registry->page_id = $page;
            } else {
                $this->registry->page = 'home.php';
				$this->registry->page_id = 'home';
            }
        }

        private function load_controller () {
            error_log("load_controller called");
            if ($_GET['logout'] > 0) {
                unset($_SESSION['guest']);
            }
            switch ($_POST['option']) {
                case 'check-username' :
                    error_log("check-username");
                    $username = $_POST['username'];
                    $guest = new guest();
                    echo ($guest->username_exists($username)) ? 1 : 0;
                    exit;
                    break;
                case 'register' :
                    error_log("RESGIER(loadcontroller)");
                    $username = $_POST['username'];
                    $password = $_POST['password'];
                    $guest = new guest();
                    $guest->username = $username;
                    $guest->password = $password;
                    $guest->store();
                    $guest->login($username, $password);
                    $this->registry->new_registrant = 1;
                    break;
                case 'login-ajax' :
                    error_log("LOGIN-AJAX");
                    $username = $_POST['username'];
                    $password = $_POST['password'];
                    $guest = new guest;
                    echo ($guest->login($username, $password)) ? 1 : 0;
                    exit;
                    break;
                case 'login' :
                    error_log("LOGIN(loadcontroller)");
                    $username = $_POST['username'];
                    $password = $_POST['password'];
                    $guest = new guest;
                    $guest->login($username, $password);
                    break;
                default :
            }
        }

        private function load_view () {
			$this->loadPageInfo(); //this is called if the views/www/metadata.xml file is holding the metadata; otherwise, comment out
			if (file_exists(WWW_VIEW_PATH . $this->registry->page)) {
				$this->registry->add_viewlet(new viewlet('path', '', WWW_VIEW_PATH . $this->registry->page));
			} else {
				$this->registry->add_viewlet(new viewlet('path', '', WWW_VIEW_PATH . "not_found.php"));
			}

			include(WWW_VIEW_PATH . "index.php");
        }

        private function parse_viewlets ($group = '') {
            // echo $this->registry->uri;
            if (is_array($this->registry->viewlets)) {
                foreach ($this->registry->viewlets as $viewlet) {
                    if ($viewlet->get_group() == $group) {
                        $viewlet->render();
                    }
                }
            }
        }

        private function loadXML() {
            $doc = new DOMDocument();
            //$doc->load( BASE_PATH . '/common/js/site.xml' );
            $doc->load( WWW_VIEW_PATH . 'metadata.xml' );
            return $doc;
        }

        private function loadPageInfo() {
            $xml = $this->loadXML();
            $pages = $xml->getElementsByTagName( "page" );
            foreach( $pages as $page ) {
                if ($page->getAttribute('name') == $this->registry->page || $page->getAttribute('name') == 'default') {
                    $this->registry->page_title = (strlen($this->registry->page_title) == 0) ? $page->getElementsByTagName('title')->item(0)->nodeValue : $this->registry->page_title;
                    $this->registry->keywords = (strlen($this->registry->keywords) == 0) ? $page->getElementsByTagName('keywords')->item(0)->nodeValue : $this->registry->keywords;
                    $this->registry->description = (strlen($this->registry->description) == 0) ? $page->getElementsByTagName('description')->item(0)->nodeValue : $this->registry->description;
                }
            }
        }

    }
