<?php

    // so we don't have to explicitly 'include' all the class (models/) files
    function __autoload($class_name) {
		//echo "Loading " . $class_name . "<br/>";
		require_once(BASE_PATH . "models/{$class_name}.class.php");
    }

    function html_select ($name, $options, $default, $class = '') {
        echo "<select name='{$name}' class='{$class}'>\n";
        foreach ($options as $key => $value) {
            echo "<option value='{$key}' ";
            if ($key == $default) {
                echo 'selected';
            }
            echo ">{$value}</option>\n";
        }
        echo "</select>\n";
    }
