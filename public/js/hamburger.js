// miniMenu
function openMiniMenu() {
  phoneMenuModal.style.visibility = "visible";
  phoneMenuModal.style.transform = "translateX(100%)";
}

function closeMiniMenu(event) {
  if (event.target == phoneMenuModal) {
    phoneMenuModal.style.visibility = "hidden";
    phoneMenuModal.style.transform = "translateX(0)";
  }
}
const phoneMenuModal = document.querySelector(".phone-menu-bar-modal");

checkHamburger.addEventListener("click", openMiniMenu);
document.addEventListener("click", (event) => closeMiniMenu(event));