async function checkAuth1(event) {
  event.preventDefault();
 
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

  if (password.length > 20) {
    text = "Password must be shorter than 20 scharacter";
    error_message.innerHTML = text;
    error_message.classList.add("input-block", "input-block-wrong");
    return false;
  }
  try {
    const response = await axios.post('/api/sign/in', {
      signinEmail: email, signinPassword: password 
    });
    if (!response.data) {//response.data === false (login fail)
      text = "Either email or password is wrong";
      error_message.innerHTML = text;
      error_message.classList.add("input-block", "input-block-wrong");
    } else {
      //login successfully
      console.log("response", response);
      document.getElementById('sign-in-form').submit();
    }
  } catch (error) {
    console.error(error);
  }
  
}

function checkAuth2() {

  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  name = document.getElementById("name").value;
  phone = document.getElementById("phone").value;
  error_message = document.getElementById("error-message");

  const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

  if (!emailRegex.test(email)) {
    text = "Please enter valid email";
    error_message.innerHTML = text;
    error_message.classList.add("input-block", "input-block-wrong");
    return false;
  }

  if (password.length > 20) {
    text = "Password must be shorter than 20 character";
    error_message.innerHTML = text;
    error_message.classList.add("input-block", "input-block-wrong");
    return false;
  }

  if (name == null || name == "") {
    text = "Please enter your name";
    error_message.innerHTML = text;
    error_message.classList.add("input-block", "input-block-wrong");
    return false;
  }

  if (isNaN(phone) || phone.length != 10) {
    text = "Phone number have 10 digits";
    error_message.innerHTML = text;
    error_message.classList.add("input-block", "input-block-wrong");
    return false;
  }
  return true;
}
