function msScore(guest_id) {
    if (typeof guest_id == 'undefined') {
        this.guest_id = 0;
    } else {
        this.guest_id = guest_id;
    }
    this.total = 0;
    this.key = 245;

	this.costs = {
	    t1:3,
	    t2:1,
	    t3:3,
	    t4:5,
	    t5:4,
	    t6:5,
	    t7:2,
	    t8:3,
	    t9:3,
	    t10:1,
	    t11:5,
	    t12:5
	},
	
	this.earns = {
		t1:5,
		t2:2,
		t3:4,
		t4:1,
		t5:6,
		t6:2,
		t7:4,
		t8:1,
		t9:5,
		t10:3,
		t11:5,
		t12:7
	},
	
    this.tasks = Array();

    this.MSwc = function (name,value,days) {
	    
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        
        value = this.MScrypt(value); 
     
        document.cookie = name+"="+value+expires+"; path=/";
    };

    this.MSrc = function (name) {
        var nameEQ = name + "=";
        var ca = unescape(document.cookie).split(';');
		for(var i=0;i < ca.length;i++) {
            var c = ca[i];
			
            while (c.charAt(0)==' ') { 
				c = c.substring(1,c.length);
			}
	
			
            if (c.indexOf(nameEQ) == 0) {
                var val = c.substring(nameEQ.length,c.length);
				//console.log(val);
                val = this.MScrypt(val);
                return val;
                //console.log(val);
            }
        }
        return null;
    };

    this.MSdc = function (name) {
        this.MSwc(name,"",-1);
    };

    this.MScrypt = function (str) {
    	//console.log(str);
        var res = '';
        if (str == null) {
            return res;
        }
        for (i = 0; i < str.length; i++) {
            //console.log(str.charCodeAt(i));
            //res += str.charCodeAt(i);
            res += String.fromCharCode(this.key ^ str.charCodeAt(i));
        }
        res = escape(res);
        //console.log(escape(res));
        return res;
    };

    this.MSloadTasks = function () {
        this.tasks = Array();
        var raw = this.MSrc('msa');
        if (raw == null) {
            var parts = new Array();
        } else {
            var parts = raw.split(':');
        }
        for (var i in parts) {
            this.tasks.push(parseInt(parts[i]));
        } 
		
    };

    this.MSsetTask = function (task) {
        this.MSloadTasks();
        var index = Math.floor((task - 1) / 16);
        var remainder = ((task - 1) % 16);
        var position = Math.pow(2,remainder);
        for (var i = 0; i <= index; i++) {
            if (index == i) {
                this.tasks[i] = (position | this.tasks[i]);
            } else {
                this.tasks[i] = (this.tasks[i] | 0);
            }
        }
        this.MSstoreTasks();
    };

    this.MScheckTask = function (task) {
		
        this.MSloadTasks();
		
        var index = Math.floor((task - 1) / 16);
        var remainder = ((task - 1) % 16);
        var position = Math.pow(2,remainder);
		
		//console.log("index: "+this.tasks[6]); // = 6
		//console.log(this.tasks[index]+" :: "+position); 
        if ((this.tasks[index] & position) > 0) {
			//console.log(this.tasks[index]);
			//console.log(index+" "+remainder+" "+position);
            return true;
        } else {
			//console.log(index+" "+remainder+" "+position);
            return false;
        }
    };

	this.MScheckProgress = function () {
		var numComplete = 0;
		for(var i = 0; i < 12; i++)
		{
			var t = i+1;
			var complete = this.MScheckTask(t);
			trace("Task " + t + ": " + complete);
			if(complete)
			{
				numComplete++;
			}
		}
		
		return numComplete;
	};

    this.MSgetPoints = function () {
        var pts = this.MSrc('msp');
		if (pts == null) {
            return 0;
        } else {
            return pts;
        }
    };

    this.MSstoreTasks = function () {
        var raw = this.tasks.join(':');
        this.MSwc('msa', raw, 30);
    };

    this.MSevent = function (points, task) {
		//console.log(this.MScheckTask(task));
		//console.log(JSON.stringify(this.tasks, null, 4));
		//console.log(JSON.stringify(new msScore(), null, 4));
		
        if (!this.MScheckTask(task)) {
            this.MSpointPost(points);
            this.MSsetTask(task);
            this.MSsyncToDB();
		//console.log("Log MScheckTask"); //safari
        }else{
		//console.log("error MSevent"); //all other browsers
		}
    };

    this.MSpointPost = function (points) {
        this.total = parseInt(this.MSrc('msp'));
        if (isNaN(this.total)) {
            this.total = 0;
        }
        this.total += points;
        this.MSwc('msp', this.total.toString(), 30);
    };

    this.MSsyncToDB = function () {
        var msp = this.MSrc('msp');
        var msa = this.MSrc('msa');
        if (msp == null) {
            msp = '';
        }
        if (msa == null) {
            msa = '';
        }
        if (this.guest_id > 0) {
            $.ajax({
                type : 'POST',
                url : '/points.php',
                data : {
                    'option' : 'save_points',
                    'guest_id' : this.guest_id,
                    'points' : msp,
                    'tasks' : msa
                }
            });
        }
    };

    this.MSsyncFromDB = function () {
        if (this.guest_id == 0) {
            return;
        }
        $.ajax({
            type : 'POST',
            url : '/points.php',
            data : {
                'option' : 'get_points',
                'guest_id' : this.guest_id
            },
            cache : true,
            async : false,
            success : function(data) {
                var result = eval('(' + data + ')');             
                var msp = result[0];
                var msa = result[1];
                m = new msScore(0);
                m.MSwc('msp', msp, 30);
                m.MSwc('msa', msa, 30);
            }
        });
    };

    this.MSsyncFromDB();
};
