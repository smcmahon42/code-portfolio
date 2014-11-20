<?php

class zendtest {
		
	public function is_working () {
		return "Working!";
	}
	
	public function arg_check ($first_arg = true, $second_arg = "grass", $color = "green") {
		if($first_arg){
			return "The " . $second_arg . " is " . $color;
		} else {
			return "The first arg should have defaulted to true, but didn't. Also passed: " . $second_arg . "," . $color;
		}
	}
}