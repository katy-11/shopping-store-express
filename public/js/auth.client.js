function checkAuth1(event) {
  // if  (errors === true) {
    // event.preventDefault();
  // }
  email = document.getElementById("signinEmail").value;
  password = document.getElementById("signinPassword").value;
  error_message = document.getElementById("error-message");

  var errors = false;
  const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

  if (!emailRegex.test(email)) {
    text = "Please enter  email";
    error_message.innerHTML = text;
    error_message.classList.add("input-block", "input-block-wrong");
    return false;
    // errors = true;
  }

  if (password.length > 20) {
    text = "Wrong password";
    error_message.innerHTML = text;
    error_message.classList.add("input-block", "input-block-wrong");
    // errors = true;

    return false;
  }
 return true;
  // try {
  //   const response = await axios.post('/api/sign/in', {
  //     signinEmail: email, signinPassword: password 
  //   });
  //   console.log(response.data);
  //   return false;
  // } catch (error) {
  //   console.error(error);
  //   return false;
  // }
  // return true;
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

  if (name == null || name == "") {
    alert("Please enter your name");
    return false;
  }

  if (isNaN(phone) || phone.length != 10) {
    text = "Please Enter valid phone number";
    error_message.innerHTML = text;
    return false;
  }
  return true;
}
