$(function(){
	var oldUsername = getCookie("username");
    var oldPassword = getCookie("password");
     if (oldUsername) {
              $("input:text").val(oldUsername) ;
               $("input:password").val(oldPassword);
       }
	$('input:button').click(function(){
		if ($("input:text").val()==""||$("input:password").val()=="") {
			alert("用户名和密码不能为空")
		} else{
			var username = $("input:text").val();
			var pwd = $("input:password").val();
			var d = new Date();
			d.setDate(d.getDate()+10); 
			setCookie("username", username, d);
            setCookie("password", pwd, d);  
            window.location.href = "homepage.html"
		}
	})
return false;
})

