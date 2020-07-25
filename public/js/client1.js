// show cart
(function() {
	const cartIcon = document.getElementById('cart-icon');
	const cart = document.getElementById('cart');
	cartIcon.addEventListener('click', (event) => {
		cart.classList.toggle('show-cart');
		// target.addEventListener('click', () => {
		// 	cart.classList.toggle('show-cart');
		// 	console.log('clicked 2');
		// });
		if (document.querySelectorAll('.cart-item').length === 1) {
			document.querySelector('.cart-total-name').textContent = "Nothing on the cart yet";
		}
	});
}) ();

// add item to cart
(function() {
	const addToCart = document.querySelectorAll('.add-to-cart');
	addToCart.forEach(btn => {
		btn.addEventListener('click', (event) => {
			var productDetail = JSON.parse(event.target.parentElement.parentElement.dataset.productDetails);
			const cartItem = document.createElement('div');
			cartItem.classList.add('cart-item');
			cartItem.innerHTML = `
				<div class="cart-item-image">
					<img src="${productDetail.imageUrl}" />
				</div>
				<div class="cart-item-name">${productDetail.name}</div>
				<div class="cart-item-currency">$</div>
				<div class="cart-item-price">${productDetail.price}</div>
			`;
			console.log("added")

			const cart = document.getElementById('cart');
			const totalPrice = document.querySelector('.total-price');

			document.querySelector('.cart-total-name').textContent = "Total price:";
			document.querySelector('.cart-item-currency').textContent = "$";
			cart.insertBefore(cartItem, totalPrice);

			// update total price
			updatePrice();
			
		});
	});
	function updatePrice() {
		let total = [];
		let cartItem = document.querySelectorAll('.cart-item');
		let cartItemPrice = document.querySelectorAll('.cart-item-price');

		cartItemPrice.forEach(item => total.push(parseInt(item.textContent)));
		var totalPrice = total.reduce((totalPrice, itemPrice) => {
			totalPrice += itemPrice;
			return totalPrice;
		});
		console.log(totalPrice);
		document.querySelector('.cart-price').textContent = totalPrice;
		document.querySelector('.cartCount').textContent = cartItem.length - 1;
	}
}) ();