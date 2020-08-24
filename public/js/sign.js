function signOut() {
  localStorage.removeItem('data');
} 
// sign in effect
try {
  const signinButton = document.querySelector(".sign-in-button");
  const signinModal = document.querySelector(".signin-modal");
  const modalContainer = document.querySelector(".modal-container");
  const closeButton = document.querySelector(".close-button");

  const openModal = () => {
    signinModal.style.display = "block";
  };

  const closeModal = () => {
    signinModal.style.display = "none";
  };

  document.addEventListener("click", (event) => {
    if (event.target == signinModal) {
      signinModal.style.display = "none";
    }
  });

  signinButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
} catch (error) {
  console.log(error)
}

// User-option-clicked 
var b = false;
try {
  const userAccount = document.getElementById('user-account');
  const userAvatar = document.getElementById('user-avatar');
  const userOption = document.getElementById('user-option');

  userAccount.addEventListener('click', (event) => {
    event.stopPropagation();

    //if other toggle are open, then close that first
    if (a === true) {
      cart.classList.remove("show-cart");
      cart.textContent = "";
      a = false;
      return;
    }

    let userToggle = userOption.classList.toggle("user-option-clicked");

    // create element inside userOption or clear them
    if (userToggle) {
      b = true;
      userOption.innerHTML =
        `<ul class="user-option-wrapper" id="user-option-wrapper">
            <a href="/user/profile">
                <li>My details</li>
            </a>
            <a href="/user/cart">
                <li>My cart</li>
            </a>
            <a href="/user/order">
                <li>My order</li>
            </a>
            <a href="/sign/out" onclick="signOut(event)" id="sign-out">
                <li>Log out</li>
            </a>
        </ul>`
    } else {
      userOption.textContent = "";
      b = false;
    }
  });

  // if clicked outside this toggle
  window.addEventListener("click", (event) => {
    event.stopPropagation();  
      if (!userOption.contains(event.target)) {
        userOption.classList.remove("user-option-clicked");
        userOption.textContent = "";
        b = false;
      }
  });
} catch (error) {
  console.log(error)
}
