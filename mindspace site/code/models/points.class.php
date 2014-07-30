<?php
    class points {
        
        private $pointVals;
        private $pointBalance;
		private $unlockedPages;
        
        public function __construct (){
			$this->pointVals = array();
            $this->pointVals["services"] = 25;
            $this->pointVals["webservices"] = 50;
            $this->pointVals["otherservices"] = 75;
            $this->pointVals["neverservices"] = 25;
            $this->pointVals["gamification"] = 25;
            $this->pointVals["gamificationoptions"] = 50;
            $this->pointVals["process"] = 75;
            $this->pointVals["ourbook"] = 25;
            $this->pointVals["about"] = 25;
            $this->pointVals["playing"] = 50;
            $this->pointVals["people"] = 75;
            $this->pointVals["gallery"] = 25;
            
            $this->pointBalance = 100;
			
			// needs to be stored in a cookie
			$this->unlockedPages = array();
        }
        
        public function test()
        {
            return $this->pointVals["services"];
        }

		public function getPoints($page)
		{
			return $this->pointVals[$page];
		}
		
		public function getPointBalance()
		{
			return $this->pointBalance;
		}
		
		public function deductPoints($pts)
		{
			$this->pointsBalance -= $pts;
		}
		
		public function addPoints()
        {
	
		}
		
		public function isPageUnlocked($page)
		{
			// see if user has a cookie set for page...
			if($_COOKIE[$page])
			{
				return true;
			} else {
				return false;
			}
		}
		
		public function unlockPage($page)
		{
			// set a cookie to indicate page is unlocked...
			$expire=time()+60*60*24*30;
			setcookie($page, "unlocked", $expire);
		}
    }