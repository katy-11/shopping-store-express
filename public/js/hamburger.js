// miniMenu
function openMiniMenu() {
	phoneMenuModal.classList.toggle("phone-menu-bar-open");
}

function closeMiniMenu(event) {
  if (event.target == phoneMenuModal) {
	phoneMenuModal.classList.toggle("phone-menu-bar-open");
  }
}
const phoneMenuModal = document.querySelector(".phone-menu-bar-modal");

checkHamburger.addEventListener("click", openMiniMenu);
document.addEventListener("click", (event) => closeMiniMenu(event));