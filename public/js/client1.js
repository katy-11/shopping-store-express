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
    cartItem.setAttribute("data-uuid-item", productDetail.id);
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <a href="/tops/${productDetail.id}">
          <img src="${productDetail.imageUrl}" />
        </a>
      </div>
      <div class="cart-item-body">
        <div class="cart-item-name">
          <a href="/product/${productDetail.id}">${productDetail.name}
          </a>
        </div>
        <div class="cart-item-quantity" data-uuid=${productDetail.id}>
          Quantity: ${productDetail.quantity}
        </div>
      </div>
      <div class="cart-item-currency">$</div>
      <div id="cartItemPrice" class="cart-item-price">${productDetail.price}</div>
      <div class="mini-delete-btn" 
          data-uuid=${productDetail.id} 
          onClick="miniDelete(event)">
        <i class="fas fa-times mini-delete-icon" data-uuid=${productDetail.id}></i>
      </div>
    `;
    cart.appendChild(cartItem);
  }
}
function miniDelete(event) {
  let id = event.target.dataset.uuid;
  document.querySelector(`div[data-uuid-item='${id}']`).style.display = "none";
  CART.remove(id);
  if (CART.count() < 1) {
    cart.innerHTML = `
      <div class="cart-item total-price">Nothing on the cart yet</div>
    `;
    document.querySelector(".cartCount").textContent = CART.count();
    databaseUpdate();
    return;
  }
  document.querySelector(".cart-price").textContent = CART.price();
  document.querySelector(".cart-total-quantity").textContent =
    "You have " + CART.count() + " items";
  document.querySelector(".cartCount").textContent = CART.count();
  databaseUpdate();
}

async function cartPageReady() {
  //check whether the user is loggin in
  if (getCookie("user_id")) {
    const response = await axios.get("/api/user/" + getCookie("user_id"));

    localStorage.setItem(CART.KEY, JSON.stringify(response.data["cart"]));
    
    //update CART.contents
    CART.init();
    if (response.data["cart"].length > 0) {
      document.querySelector(".cartCount").textContent = CART.count();
    }
    try {
      document.querySelector(".price-price").textContent = "$" + CART.price();
    } catch (error) {
      console.log(error)
    }
  } else {
    CART.init();
    if (CART.count() > 0) {
      document.querySelector(".cartCount").textContent = CART.count();
    }
  }
}

function showCart() {
  //if other toggle are open, then close that first
  if (b === true) {
    const userOption = document.getElementById('user-option');
    userOption.classList.remove("user-option-clicked");
    userOption.textContent = "";
    b = false;
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
    a = true;
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
}

function outsideClick1(event) {
  event.stopPropagation();  
    if (!cart.contains(event.target)) {
      cart.classList.remove("show-cart");
      cart.textContent = "";
      a = false;
    }
    if (pBox && !document.querySelector('.refinement-bar').contains(event.target)) {
      document.querySelector('.refinement-1').style.display = "none";
      document.querySelector('.refinement-2').style.display = "none";
      document.querySelector('.refinement-3').style.display = "none";
      pBox = false;
    }
}

function addToCart(event) {
  let productDetail = JSON.parse(
    event.target.parentElement.parentElement.dataset.productDetails
  );
  CART.add(productDetail.id);
  document.querySelector(".cartCount").textContent = CART.count();
  databaseUpdate();
}

function databaseUpdate() {
  if (getCookie("user_id")) {
  axios({
    method: "put",
    url: "/api/user/" + getCookie("user_id"),
    data: { cart: JSON.parse(localStorage.getItem("data"))},
  })
    .then(function (response) {
      console.log(response.data, "huyen");
    })
    .catch(function (error) {
      console.log(error, "client fail");
    });
}}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.match(/"(.*?)"/)[1];
    }
  }
  return "";
}

// show cart and place item on cart
let a = false;
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const addToCartBtn = document.querySelectorAll(".add-to-cart");
const productBagBtn = document.querySelector(".product-bag");
const checkHamburger = document.querySelector(".check-hamburger");

// when the page is ready
document.addEventListener("DOMContentLoaded", () => cartPageReady());

// show cart
cartIcon.addEventListener("click", (event) => showCart());

//if click outside the box
window.addEventListener("click", (event) => outsideClick1(event));

// when adding item to cart
addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => addToCart(event));
});

// addingg item on product detail page
try {
  productBagBtn.addEventListener("click", (event) => addToCart(event));
} catch (error) {
  console.log(error)
}