const CART = {
	KEY: "data",
	contents: [],
    init: function() {
    	//check localStorage and initialize the contents of CART.contents
    	let _contents = localStorage.getItem(CART.KEY);
    	if (_contents) {
    		CART.contents = JSON.parse(_contents);
    	} else {
    		CART.contents = [];
    	}
    },
    count: function() {
    	let counted = CART.contents.reduce((item1, item2) => {
    		return item1 += item2.quantity;
    	}, 0);
    	return counted;
    },
    update: async function() {
    	let _cart = JSON.stringify(CART.contents);
    	await localStorage.setItem(CART.KEY, _cart);
    },
    find: function (id) {
    	//find an item in the cart by it's id
    	let match = CART.contents.find(item => {
    		return item.id === id;
    	});
    	// console.log(match);
    	return match;
    },
    add: async function(id) {
    	//check if it is already in the cart
    	if (CART.find(id)) {
    		CART.inscrease(id);
    	} else {
	    	try {
	        	const response = await axios.get(`/api/top/${id}`);
		        let addedObj = {
    				id: response.data._id,
			        name: response.data.name,
			        price: response.data.price,
			        imageUrl: response.data.imageUrl,
			        color: response.data.color,
			        quantity: 1 
    			};
    			CART.contents.push(addedObj);
    			//update localStorage
    			CART.update();
        		document.querySelector(".cartCount").textContent = CART.count();
      			databaseUpdate();
		    } catch (error) {
		        console.log(error, 'Invalid product')
		    }
    	}
    },
    log: function(a) {
    	console.log(a, CART.contents)
    },
	inscrease: function(id, qty=1) {
		//inscrease quantity of the cart
		CART.contents = CART.contents.map(item => {
			if (id === item.id) {
				item.quantity += qty;
			}
			return item;
		});
		//update localStorage
		CART.update();
	},
	descrease: function(id, qty=1) {
		//descrease quantity of the cart
		CART.contents = CART.contents.filter(item => {
			if (id === item.id) {
				if (item.quantity === 1) {
					return false;
				} else {
					item.quantity -= qty;
				}
			}
			return true;
		});
		
		//update localStorage
		CART.update();
	},
	remove: function(id) {
		//remove an item entirely from CART.contents based on its id
		CART.contents = CART.contents.filter(item=>{
            if (item.id !== id) {
                return true;
            }
        });
        //update localStorage
		CART.update();
	},
	empty: function (){
        //empty whole cart
        CART.contents = [];
        //update localStorage
        CART.update();
    },
    sort: function (field="name"){
        //return a sorted shallow copy of the CART.contents array
        let sortedArr = CART.contents.sort((a, b) => {
        	if(a[field] > b[field]){
                return 1;
            } else if(a[field] < a[field]){
                return -1;
            } else{
                return 0;
            } 
        });
        return sorted;
        //NO impact on localStorage
    },
    price: function () {
    	let totalPrice = CART.contents.reduce((item1, item2) => {
    		return item1 += item2.quantity*item2.price;
    	}, 0);
    	return totalPrice;
    }
};


let PRODUCTS = [];

async function getProducts(success, failure) {
	try {
        const response = await axios.get("/api/top/database")
        return response.data;
      } catch (error) {
        console.log(error)
      }
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

// inscrease/descrease quantity on my cart page
const plusBtn = document.querySelectorAll(".plus-btn");
const minusBtn = document.querySelectorAll(".minus-btn");
const deleteBtn = document.querySelectorAll(".delete-button");
const clearIcon = document.querySelectorAll(".cart-clear-icon");


plusBtn.forEach(btn => {
	btn.addEventListener("click", (event) => {
		let id = event.target.dataset.id;
		let plusNum = parseInt(event.target.nextSibling.textContent) + 1; 

		event.target.nextSibling.textContent = plusNum;
		CART.inscrease(id);
		document.querySelector(".cartCount").textContent = CART.count();
		document.querySelector(".des-total").textContent = CART.count() + " items";
		document.querySelector(".price-price").textContent = CART.price();
		databaseUpdate();
	});
});

minusBtn.forEach(btn => {
	btn.addEventListener("click", (event) => {
		let id = event.target.dataset.id;
		let minusNum = parseInt(event.target.previousSibling.textContent) - 1; 
		
		//if quantity down to 0, delete
		if (minusNum === 0) {
			removeItem(id);
			return;
		} else {
			event.target.previousSibling.textContent = minusNum;
		}
		CART.descrease(id);
		document.querySelector(".cartCount").textContent = CART.count();
		document.querySelector(".des-total").textContent = CART.count() + " items";
		document.querySelector(".price-price").textContent = CART.price();
		databaseUpdate();
	});
})

deleteBtn.forEach(btn => {
	btn.addEventListener('click', (event) => {
		event.stopPropagation();
		let id = event.target.parentElement.dataset.id;
		removeItem(id);
	})
});

clearIcon.forEach(btn => {
	btn.addEventListener('click', (event) => {
		event.stopPropagation();
		let id = event.target.parentElement.parentElement.dataset.id;
		removeItem(id);
	});
});
function removeItem(id) {
	document.querySelector('div[data-cartitem-id="' + id +'"]').style.display = "none"
	CART.remove(id);
	if (CART.count() < 1) {
		document.querySelector(".shopping-cart").innerHTML = 
		`
		<div class="item-nothing"> Nothing on the cart yet </div>
		`;
		document.querySelector(".cartCount").textContent = CART.count();
		databaseUpdate();
		return;
	}
	document.querySelector(".cartCount").textContent = CART.count();
	document.querySelector(".des-total").textContent = CART.count() + " items";
	document.querySelector(".price-price").textContent = CART.price();
	databaseUpdate();
}




