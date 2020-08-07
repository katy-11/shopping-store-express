// show cart and place item on cart
(function() {
	const cartIcon = document.getElementById('cart-icon');
	const cart = document.getElementById('cart');

	// place item on cart
	document.addEventListener('DOMContentLoaded', () => {
		// get product
		var dataParse = JSON.parse(localStorage.getItem('data'));
		if (dataParse) {
			// update total of added items (price)
			countAddedItem();
		} else {
			const cart = document.getElementById('cart');
			// show added item
			const totalPrice = document.createElement('div');
			totalPrice.classList.add('cart-item', 'total-price');
			cart.appendChild(totalPrice);
			// show nothing on cart
			document.querySelector('.total-price').textContent = "Nothing on the cart yet";
		}		
	});

	// show cart
	cartIcon.addEventListener('click', (event) => {
		console.log(event.target);
		cart.classList.toggle('show-cart');
		// load item from Storage and display
		var dataParse = JSON.parse(localStorage.getItem('data'));
		if (dataParse) {
			// remove child
			const cart = document.getElementById('cart');
			cart.textContent = '';
			// show added item
			const totalPrice = document.createElement('div');
			totalPrice.classList.add('cart-item', 'total-price');
			totalPrice.innerHTML = `
				<div class="cart-item-body cart-total-name">
			        <div class="cart-item-name">Total price:</div>
			        <div class="cart-item-quantity cart-total-quantity"></div>
			    </div>
			    <div class="cart-item-currency">$</div>
			    <div class="cart-price"></div>
			`
			cart.appendChild(totalPrice);
			for (var productDetail of dataParse) {
				const cartItem = document.createElement('div');
				cartItem.classList.add('cart-item');
				cartItem.setAttribute('data-uuid', productDetail.id);
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
				cart.insertBefore(cartItem, totalPrice);
			}

			countAddedItem();
			updatePrice();
		}
	});

 	// can not set up "click outside the cart effect"

}) ();
// when adding item to cart
(function() {
	const addToCart = document.querySelectorAll('.add-to-cart');
	addToCart.forEach(btn => {
		var dataString = localStorage.getItem('data');
		if (dataString) {
			cartData = JSON.parse(dataString);
		} else {
			cartData = [];
		}
		btn.addEventListener('click', (event) => {
			var productDetail = JSON.parse(event.target.parentElement.parentElement.dataset.productDetails);
			productDetail.quantity = 1;
			var  duplicate = 0;	

			for ( var i = 0; i < cartData.length; i++) {
				if (cartData[i].id === productDetail.id) {
					// update item quantity
					cartData[i].quantity = cartData[i].quantity + 1;
					cartData.unshift(cartData.splice(i, 1)[0]);
					duplicate = 1;
				}

			}

			if (duplicate === 0) {
				// add item to local Storage
				cartData.unshift(productDetail);
				localStorage.setItem("data", JSON.stringify(cartData));
			} else {
				// only update number of added item
				localStorage.setItem("data", JSON.stringify(cartData));
			}

			// update total price
			countAddedItem();
			
		});
	});
}) ();

function countAddedItem() {
	let totalItem = 0;
	var dataParse = JSON.parse(localStorage.getItem('data'));
	for (item of dataParse) {
		totalItem += item.quantity;
	}
	document.querySelector('.cartCount').textContent = totalItem;
}
function updatePrice() {
	let totalPrice = 0;
	let totalItem = 0;

	// make added item price array
	var dataParse = JSON.parse(localStorage.getItem('data'));
	for (item of dataParse) {
		totalPrice += item.price*item.quantity;
		totalItem += item.quantity;
	}
	
	document.querySelector('.cart-price').textContent = totalPrice;
	document.querySelector('.cart-total-quantity').textContent = "You have " + totalItem + " items";

}

// sign in effect
(function() {
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
}) ();


function authenication() {
	// const user = req.signedCookies.user_id;
	axios({
	  method: 'put',
	  url: "/api/user/" + user_id,
	  data: {"cart": JSON.parse(localStorage.getItem('data'))}
	})
	.then(function (response) {
	    console.log(response.data, "huyen") ;
	  })
	.catch(function (error) {
	    console.log(error, "client fail");
	  });
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.match(/"(.*?)"/)[1];
    }
  }
  return "";
}

const user_id = getCookie("user_id");
