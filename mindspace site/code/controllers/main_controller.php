<?php

    class main_controller {

        public function index () {
            $registry = registry::getInstance();
            $uri_path = WWW_VIEW_PATH . substr($registry->uri, 1);
            if (file_exists($uri_path)) {
                $registry->add_viewlet(new viewlet('path', '', $uri_path));
            }
        }

        public function login () {
        	error_log("LOGIN");
            if (strlen($_REQUEST['username']) > 0) {
                $_SESSION['user']['username'] = $_REQUEST['username'];
            } else {
                unset($_SESSION['user']);
            }
        }

        public function logout () {
            unset($_SESSION['user']);
        }

		public function admin_login () {
			$user = new user;
            if ($user->login($_POST['username'], $_POST['password'])) {
                $_SESSION['admin']['user_id'] = $user->user_id;
                $_SESSION['admin']['username'] = $user->username;
                $_SESSION['admin']['rank'] = $user->rank;
            } else {
                unset($_SESSION['admin']);
            }
        }

        public function admin_logout () {
            unset($_SESSION['admin']);
        }

		public function checkuser () {
			$user = new user;
			$isUser = $user->exists($_REQUEST['email']);

			$return;
			if($isUser)
			{
				$return['msg'] = true;
			} else {
				$return['msg'] = false;
			}
			echo json_encode($return);
			exit;
		}

		public function loginuser () {
			error_log("LOGINUSER");
			$email = $_REQUEST['email'];
			$pass = $_REQUEST['pass'];
			$user = new user;
			$attempt = $user->login($email, $pass);
			$return;
			if($attempt)
			{
				$sid = md5(uniqid(microtime()) . $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
				$return['msg'] = $sid;
				$user->setSID($sid, $email);
			} else {
				$return['msg'] = 'invalid';
			}
			echo json_encode($return);
			exit;
		}

		public function registerUser()
		{
			error_log("REGISTERUSER");
			ChromePhp::log("Attempting to register user");
			$user = new user;
			$attempt = $user->create($_REQUEST['email'], $_REQUEST['pass']);
			$return;
			if($attempt)
			{
				$return['msg'] = 'good';
			} else {
				$return['msg'] = 'fail';
			}
			ChromePhp::log("Registered... got " . $attempt);
			echo json_encode($return);
			exit;
		}

		public function contactMail() {
			log_error("FUADFUOFDFKLU");
			ChromePhp::log("Attempting to mail contact details");
			$return;

			$name = $_POST['name'];
			$phone = $_POST['phone'];
			$email = $_POST['email'];
			$comments = $_POST['comments'];
			$return['value'] = 1234;

			header("Content-type: application/json");
			echo json_encode($return);
			break;
		}

    }
