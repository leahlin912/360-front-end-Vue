
/*建 cookie*/
export function setCookie(cookieName, value, expire) {
    var date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    document.cookie = cookieName + "=" + escape(value) + "; expires=" + date.toGMTString();
    console.log(document.cookie);
}

/*取 cookie*/
export function getCookie(cookieName){
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1){ 
            c_start = c_start + cookieName.length + 1; 
            let c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) { 
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
            } 
        }
    return "";
}

/*刪 cookie*/
export function delCookie(cookieName){
    setCookie(cookieName, "", -1);
}