// refinement

let filter = {};
const input1 = document.querySelectorAll('input[data-ref="typeGroup"]');
input1.forEach((cb) => {
  cb.addEventListener("change", () => {
    var typeGroup = [];
    var type = document.querySelectorAll(
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
    checkFilter();
  });
});

const input2 = document.querySelectorAll('input[data-ref="colorGroup"]');
  input2.forEach((cb) => {
    cb.addEventListener("change", async () => {
      var colorGroup = [];
      var color = document.querySelectorAll(
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

      checkFilter();  
    });
  });

const input3 = document.querySelectorAll('input[data-ref="priceGroup"]');
  input3.forEach((cb) => {
    cb.addEventListener("change", async () => {
      
      var priceGroup = document.querySelectorAll(
        'input[data-ref="priceGroup"]:checked'
      );
      var price1 = priceGroup[0].getAttribute("data-refPrice1")
      var price2 = priceGroup[0].getAttribute("data-refPrice2")

      filter.price = {$gte: price1, $lte: price2};

      console.log(filter, "input3");
      checkFilter();  
    });
  });

async function checkFilter() {
  try {
    const response = await axios.post('/api/refinement', filter);
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