// sign in effect
(function () {
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
})();

// User-option-clicked 
var b = false;
(function() {
  try {
    const userAccount = document.getElementById('user-account');
    const userAvatar = document.getElementById('user-avatar');

    const userOption = document.getElementById('user-option');
    var userAccountClicked = userAccount.addEventListener('click', (event) => {
      userOption.classList.toggle("user-option-clicked");
      b = true;
      event.stopPropagation();
    });

    window.addEventListener("click", (event) => {
      event.stopPropagation();  
      while (b === true) {
        if (event.target !== userOption ) {
          userOption.classList.toggle("user-option-clicked");
          b = false;
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}) ();

try {
  var signout = document.getElementById('sign-out');
  signout.addEventListener('click', () => {
    localStorage.removeItem('data');
  })  
} catch (error) {
  console.log(error)
}