function totalPriceDiv() {
  const totalPrice = document.createElement("div");
  totalPrice.classList.add("cart-item", "total-price");
  totalPrice.innerHTML = `
    <div class="cart-item-body cart-total-name">
          <div class="cart-item-name">Total price:</div>
          <div class="cart-item-quantity cart-total-quantity"></div>
      </div>
      <div class="cart-item-currency">$</div>
      <div class="cart-price"></div>
    `;
  return totalPrice;
}

function cartItemDiv() {
  for (var productDetail of CART.contents) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.setAttribute("data-uuid", productDetail.id);
        cartItem.innerHTML = `
          <div class="cart-item-image">
            <a href="/tops/${productDetail.id}">
              <img src="${productDetail.imageUrl}" />
            </a>
          </div>
          <div class="cart-item-body">
            <div class="cart-item-name">
              <a href="/tops/${productDetail.id}">${productDetail.name}
              </a>
            </div>
            <div class="cart-item-quantity" data-uuid=${productDetail.id}>Quantity: ${productDetail.quantity}</div>
          </div>
          <div class="cart-item-currency">$</div>
          <div id="cartItemPrice" class="cart-item-price">${productDetail.price}</div>
        `;
        cart.appendChild(cartItem);
     }
}
function countItem(x) {
  document.querySelector(".cartCount").textContent = x;
}

// show cart and place item on cart
let a = false;
(function () {
  const cartIcon = document.getElementById("cart-icon");
  const cart = document.getElementById("cart");

  // when the page is ready
  document.addEventListener("DOMContentLoaded", async () => {
    //check whether the user is loggin in
    if (getCookie("user_id")) {
      const response = await axios.get("/api/user/" + getCookie("user_id"));

      localStorage.setItem(CART.KEY, JSON.stringify(response.data["cart"]));
      
      //update CART.contents
      CART.init();
      if (response.data["cart"].length > 0) {
        document.querySelector(".cartCount").textContent = CART.count();
      }
    } else {
      CART.init();
      if (CART.count() > 0) {
        document.querySelector(".cartCount").textContent = CART.count();
      }
    }
  });

  // show cart
  cartIcon.addEventListener("click", (event) => {
    //if other toggle are open, then close that first
    if (b === true) {
      const userOption = document.getElementById('user-option');
      userOption.classList.remove("user-option-clicked");
      userOption.textContent = "";
      b = false;
      return;
    }

    let toggleResult = cart.classList.toggle("show-cart");
    event.stopPropagation();

    // if nothing on cart
    if (CART.count() == 0 && toggleResult) {
      const totalPrice = document.createElement("div");
      totalPrice.classList.add("cart-item", "total-price");
      cart.appendChild(totalPrice);
      document.querySelector(".total-price").textContent =
        "Nothing on the cart yet";
      return;
    }

    //if item on cart
    if (toggleResult) {
      const cart = document.getElementById("cart");
      cart.textContent = "";
      cartItemDiv();
      cart.appendChild(totalPriceDiv());
      document.querySelector(".cart-price").textContent = CART.price();
      document.querySelector(".cart-total-quantity").textContent =
        "You have " + CART.count() + " items";
      a = true;
    } else {
      cart.textContent = "";
      a = false;
    }
  });

  //if click outside the box
  window.addEventListener("click", (event) => {
    event.stopPropagation();  
    if (!cart.contains(event.target)) {
      cart.classList.remove("show-cart");
      cart.textContent = "";
      a = false;
    }
  });
})();

// when adding item to cart
(function () {
  const addToCart = document.querySelectorAll(".add-to-cart");
  addToCart.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      var productDetail = JSON.parse(
        event.target.parentElement.parentElement.dataset.productDetails
      );
      CART.add(productDetail.id);
      document.querySelector(".cartCount").textContent = CART.count();
      databaseUpdate();
    });
  });
})();
  





