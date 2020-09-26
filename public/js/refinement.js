// refinement
let categoryFil;
let filter = {};
let apiUrl = '/api/refinement';
let pBox = false;

try {
  categoryFil = document.querySelector(".refinement-header").textContent; 
  //consider what category to filter
  switch (categoryFil) {
    case "Sale":
      filter.sale = true;
      break;
    case "New Arrivals":
      apiUrl = '/api/refinement/sort';
      break;
    case "Search":
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('q');
      filter = {
        $text: { $search: myParam }
      }
      apiUrl = '/api/refinement/search';
      break;
    default:
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
  productItem.classList.add("col-6", "col-md-4", "product-item");
  productItem.setAttribute("data-page-number", "0");
  productItem.setAttribute("data-product-details", 
    JSON.stringify({
      "id": item._id, 
      "name": item.name, 
      "price": item.price, 
      "imageUrl": item.imageUrl
  }));

  productItem.innerHTML = `
    <div class="product-carousel">
      <a href="/product/${item._id}">
        <img src=${item.imageUrl}>
      </a>
      <div class="add-to-cart">Add to bag</div>
    </div>
    <div class="product-title-body">
      <a class="product-title-name" href="/product/${item._id}">${item.name}</a>
         <a href="/product/${item._id}"></a>
      <div class="product-title-price">AU$${item.price}.00</div>
    </div>
  `
  return productItem;
}

function renderFilter(filterProduct) {
  const row = document.getElementById("row");
  if (filterProduct.length < 1) {
    row.innerHTML = `
      <div class="no-product col-11">No matched product</div>
      `;
    return;
  }
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

// phone refinement
function openRefinement(className) {
  event.stopPropagation();
  if (document.querySelector(className).style.display === "block") {
    document.querySelector(className).style.display = "none";
    pBox = false;
    return;
  }
  if (pBox) {
    document.querySelector('.refinement-1').style.display = "none";
    document.querySelector('.refinement-2').style.display = "none";
    document.querySelector('.refinement-3').style.display = "none";
  }
  document.querySelector(className).style.display = "block";
  pBox = true;
}
// eventListener
const input1 = document.querySelectorAll('input[data-ref="typeGroup"]');
const input2 = document.querySelectorAll('input[data-ref="colorGroup"]');
const input3 = document.querySelectorAll('input[data-ref="priceGroup"]');
const categoryG = document.querySelectorAll('input[data-ref="categoryGroup"]');
const clearInput = document.querySelectorAll('.refinement-clear');
const pType = document.querySelector('.phone-type');
const pColor = document.querySelector('.phone-color');
const pPrice = document.querySelector('.phone-price');

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
try {
  pType.addEventListener('click', () => {
    openRefinement('.refinement-1')
  })

  pColor.addEventListener('click', () => {
    openRefinement('.refinement-2')
  })

  pPrice.addEventListener('click', () => {
    openRefinement('.refinement-3')
  })
} catch (error) {
  console.log(error)
}