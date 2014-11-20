<?php

    class menu {
		private $registry;
        private $items = array();

        public function menu() {
			$this->registry = registry::getInstance();
		}
		
		public function add_item ($title, $link) {
            $current = ($this->menu_is_current($link)) ? ' current' : '';
			$this->items[] = array($title, $link,$current);
        }
		
		private function menu_is_current($link){
			if ($this->registry->uri==$link){
				return true;
			} else {
				return false;
			}
		}

        public function render () {
            include(WWW_VIEW_PATH . 'menu.php');
        }
    }
