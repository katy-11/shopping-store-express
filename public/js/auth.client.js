async function checkAuth1() {
	email = document.getElementById("signinEmail").value;
    password = document.getElementById("signinPassword").value;
    error_message = document.getElementById("error-message");

    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

    if (!emailRegex.test(email)) {
	    text = "Please enter valid email";
	    error_message.innerHTML = text;
	    error_message.classList.add("input-block", "input-block-wrong");
	    return false;
	}

	if (password.length >15) {
	    text = "Wrong password";
	    error_message.innerHTML = text;
	    error_message.classList.add("input-block", "input-block-wrong");
	    return false;
	}

	var auth = await axios({
	  method: 'post',
	  url: "/api/sign/in",
	  data: {"signinEmail": email, "signinPassword": password}
	});
	
	if (auth == false) {
		text = "Either email or password is wrong";
	    error_message.innerHTML = text;
	    error_message.classList.add("input-block", "input-block-wrong");
	    return false;
	} else {
		return true;
	}
 }

function checkAuth2() {
	email = document.getElementById("signupEmail").value;
    password = document.getElementById("signupPassword").value;
    name = document.getElementById("signupName").value;
    phone = document.getElementById("signupPhone").value;
    error_message = document.getElementById("error-message");

    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

    if (!emailRegex.test(email)) {
	    text = "Please enter valid email";
	    error_message.innerHTML = text;
	    error_message.classList.add("input-block", "input-block-wrong");
	    return false;
	}

	if (password.length < 6) {
	    text = "Password must be longer than 6 character";
	    error_message.innerHTML = text;
	    error_message.classList.add("input-block", "input-block-wrong");
	    return false;
	}

	if (name==null || name==""){  
	  alert("Please enter your name");  
	  return false;  
	}

	if(isNaN(phone) || phone.length != 10){
	    text = "Please Enter valid Phone Number";
	    error_message.innerHTML = text;
	    return false;
	  }
    return true;	
}

