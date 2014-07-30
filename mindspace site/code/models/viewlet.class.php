<?php

    class viewlet {
        private $type;
        private $group;
        private $content;
        private $method;  // if content is an object

        // type can be: 
        //   path = path to include file
        //   content = stored string
        //   object = object
        public function __construct ($type = 'path', $group = '', $content = '', $method = '') {
            $this->type = $type;
            $this->group = $group;
            $this->content = $content;
            $this->method = $method;
        }

        public function get_group () {
            return $this->group;
        }

        public function render () {
            switch ($this->type) {
                case 'path' :
                    @include_once($this->content);
                    break;
                case 'object' :
                    $method = $this->method;
                    $this->content->$method();
                    break;
                case 'content' :
                default :
                    echo $this->content;
            }
        }

    }

?>
