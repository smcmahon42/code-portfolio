function MSwc (name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    value = MScrypt(value);
    document.cookie = name+"="+value+expires+"; path=/";
}

function MSrc (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
            var val = c.substring(nameEQ.length,c.length);
            val = MScrypt(val);
            return val;
        }
    }
    return null;
}

function MSdc (name) {
    createCookie(name,"",-1);
}

var key = 245;

function MScrypt (str) {
    var res = '';
    for (i = 0; i < str.length; i++) {
        res += String.fromCharCode(key ^ str.charCodeAt(i));
    }
    return res;
}

