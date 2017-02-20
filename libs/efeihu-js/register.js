$(function(){
	 $("#regi").validate({
	    rules: {
	      username: {
	        required: true,
	        minlength: 4,
	        maxlength: 10
	      },
	      password: {
	        required: true,
	        minlength: 6,
	         maxlength: 14
	      },
	      confirm_password: {
	        required: true,
	        equalTo: "#password"
	      },
	      email: {
	        required: true,
	        email: true
	      },
	      test:{
	      	 required: true,
	      }
	      },
	    messages: {
	      username: {
	        required: "请输入用户名",
	        minlength: "用户名必长度不能小于4"
	      },
	      password: {
	        required: "请输入密码",
	        minlength: "密码长度不能小于 6 "
	      },
	      confirm_password: {
	        required: "请输入密码",
	        equalTo: "两次密码输入不一致"
	      },
	      email: "请输入一个正确的邮箱",
		test:{
	      	equalTo: '验证码输入错误'
	      }
	    }
    
    })
    $('#regi').find(':submit').click(function(){
    	
    	if($('input[name="test"]').val()!=$('.test .num').html()){
    		alert('验证码错误');
    		$('.test .num').html(num());
    		return;
    	}
    	if ($('#checked').is(':checked') && $('#regi').valid()) {
    		var username = $("input[name='username']").val();
			var pwd = $("input[name='password']").val();
			var d = new Date();
			d.setDate(d.getDate()+10); 
			setCookie("username", username, d);
            setCookie("password", pwd, d);  
          	window.location.href="login.html";
    	} else{
    		alert("信息未填写完")
    	}
    	return false;
    })
    
    
    function num(){
    		var st = "";
			for(var i=0;i<5;i++){
				var n = parseInt(Math.random()*10);
				st = st.concat(n);	
			}
			return st;
    }
    $('.test .num').html(num());
    $('.testbtn').click(function(){
			$('.test .num').html(num());
    })
      
})

