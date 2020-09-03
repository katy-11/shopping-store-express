// product detail slideshow
function update(imgSize) {
  sliderImg.style.transform = `translateX(${(-imgSize - 20)*indexImg}px)`;
}

function slideMove() {
  let imgSize = phoneImage.clientWidth;
  if (this.id === "prev" && indexImg !== 0) {
    indexImg--;
    update(imgSize);
  }
  if (this.id === "next" && indexImg !== sliderImg.childElementCount -1) {
    indexImg++;
    update(imgSize);
  }
}

const sliderImg = document.querySelector(".slider-image");
const slideBtn = document.querySelectorAll(".slide-btn");
const phoneImage = document.querySelector(".phone-image-item");
let indexImg = 0;

slideBtn.forEach(btn => btn.addEventListener('click', slideMove))