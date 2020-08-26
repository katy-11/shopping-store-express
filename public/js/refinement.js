// refinement
let categoryFil;
let filter = {};
let apiUrl = '/api/refinement';

try {
  categoryFil = document.querySelector(".refinement-header").textContent; 
  if (categoryFil ===  "Sale") {
    filter.sale = true;
  } else if (categoryFil === "New Arrivals") {
    // change to sorted products
    apiUrl = '/api/refinement/sort';
  } else {
    filter.category = categoryFil;
  }
} catch (error) {
  console.log(error)
}

async function checkFilter(sorted) {
  try {
    const response = await axios.post(apiUrl, filter);
    console.log(response.data, "data");
    renderFilter(response.data);
  } catch (error) {
    console.error(error);
  }
}

function createProductItem(item) {
  var productItem = document.createElement("div");
  productItem.classList.add("col-4");
  productItem.setAttribute("data-page-number", "0");
  productItem.setAttribute("data-product-details", 
    {
      "id": item._id, 
      "name": item.name, 
      "price": item.price, 
      "imageUrl": item.imageUrl
  });

  productItem.innerHTML = `
    <div class="product-carousel">
      <a href="/tops/${item.id}">
        <img src=${item.imageUrl}>
      </a>
    </div>
    <div class="product-title-body">
      <a class="product-title-name" href="/tops/${item.id}">${item.name}</a>
         <a href="/tops/${item.id}"></a>
      <div class="product-title-price">AU$${item.price}.00</div>
    </div>
    <div class="product-title-footer">
      <div class="product-title-color"></div>
      <div class="add-to-cart">Add to bag</div>
    </div>
  `
  return productItem;
}

function renderFilter(filterProduct) {
  const row = document.getElementById("row");
  row.textContent = "";
  for (var i = 0; i < filterProduct.length; i++) {
    var yyy = createProductItem(filterProduct[i]);
    row.appendChild(yyy)
  }
}

function filter1() {
  let typeGroup = [];
  let type = document.querySelectorAll(
    'input[data-ref="typeGroup"]:checked'
  );
  
  for (i = 0; i < type.length; i++) {
    typeGroup.push(type[i].getAttribute("data-refType"));
  }

  if (typeGroup.length > 0) {
    filter.type = {$in: typeGroup};
  } else {
    delete filter.type;
  }
}

function filter2() {
  let colorGroup = [];
  let color = document.querySelectorAll(
    'input[data-ref="colorGroup"]:checked'
  );

  for (i = 0; i < color.length; i++) {
    colorGroup.push(color[i].getAttribute("data-refColor"));
  }

  if (colorGroup.length > 0) {
    filter.color = {$in: colorGroup}
  } else {
    delete filter.color;
  }
}

function filter3() {
  let priceGroup = document.querySelectorAll(
      'input[data-ref="priceGroup"]:checked'
    );
  let price1 = priceGroup[0].getAttribute("data-refPrice1")
  let price2 = priceGroup[0].getAttribute("data-refPrice2")
  filter.price = {$gte: price1, $lte: price2};
}

function categoryFilter() {
  let categoryGroup = [];
  let category = document.querySelectorAll(
    'input[data-ref="categoryGroup"]:checked'
  );

  for (i = 0; i < category.length; i++) {
    categoryGroup.push(category[i].getAttribute("data-refCategory"));
  } 

  if (categoryGroup.length > 0) {
    filter.category = {$in: categoryGroup}
  } else {
    delete filter.category;
  }
}

function clearFilter() {
  let dataType = event.target.parentElement.dataset.ref;
  let type = event.target.parentElement.dataset.group;

  delete filter[type] ;
  document.querySelectorAll(`input[data-ref=${dataType}]`)
  .forEach(cb => {
    cb.checked = false
  });
}
// eventListener
const input1 = document.querySelectorAll('input[data-ref="typeGroup"]');
const input2 = document.querySelectorAll('input[data-ref="colorGroup"]');
const input3 = document.querySelectorAll('input[data-ref="priceGroup"]');
const categoryG = document.querySelectorAll('input[data-ref="categoryGroup"]');
const clearInput = document.querySelectorAll('.refinement-clear');

input1.forEach((cb) => {
  cb.addEventListener("change", () => {
    filter1();
    checkFilter();
  });
});

input2.forEach((cb) => {
  cb.addEventListener("input", async () => {
    filter2();
    checkFilter();  
  });
});

input3.forEach((cb) => {
  cb.addEventListener("change", async () => {
    filter3();      
    checkFilter();  
  });
});

categoryG.forEach((cb) => {
  cb.addEventListener("change", async () => {
    categoryFilter();      
    checkFilter();  
  });
});

clearInput.forEach((cb) => {
  cb.addEventListener("click", (event) => {
    clearFilter();
    checkFilter();
  });
});
