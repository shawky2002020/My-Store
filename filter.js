function search(products) {
  const element = document.querySelector('#searchbar');
  const titlesearched = element.value.trim().toLowerCase();

  return products.filter(product => {
    return product.title.toLowerCase().includes(titlesearched);
  });
}
function searchcategory(products){
  const element = document.querySelector('#category-list');
  const category = element.value;
  const categ_products=products.filter(product=>{
    return product.category===category;
  }
)
return categ_products;
}
function searchprice (products){
  const max = document.querySelector('#maxprice');
  const maxval=max.value;
  const min = document.querySelector('#minprice');
  const minval=min.value;
  return products.filter(product => {
    return product.price >= minval && product.price <= maxval;
  });
}
function sortproducts(products){
  const element = document.querySelector('#sortproducts');
  const sortval = element.value;
  if(sortval==='High to low')
    products.sort(function(a,b){return b.price-a.price})
  if(sortval==='Low to high')
    products.sort(function(a,b){return a.price-b.price})
  return products;
}
function applyFilters() {
  let filteredProducts = products;

  filteredProducts = search(filteredProducts);
  filteredProducts = searchcategory(filteredProducts);
  filteredProducts = searchprice(filteredProducts);
  filteredProducts = sortproducts(filteredProducts);


return filteredProducts
}
function addToCart(productId) {
  const product = products.find(product => product.id === productId);
  cart.push(product);
  displayCart();
}

function displayCart() {
  const cartElement = document.querySelector('.cart');
  cartElement.innerHTML = '<h3>Shopping Cart</h3>';
  cart.forEach((product, index) => {
    const cartItemHtml = `
      <div class="cart-item">
        <p>${product.title} - ${product.price}$</p>
        <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
      </div>`;
    cartElement.innerHTML += cartItemHtml;
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

document.querySelector('#searchbar').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
  htmldisplay(search(products));
  }
  });
document.querySelector('#category-list').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    htmldisplay(searchcategory(products));
    }
    });
document.querySelector('#minprice').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
  htmldisplay(searchprice(products));
  }
  }); 
document.querySelector('#maxprice').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
  htmldisplay(searchprice(products));
  }
  }); 
document.querySelector('#sortproducts').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    htmldisplay(sortproducts(products));
    }
    });
  
document.querySelector('#filter').addEventListener('click',function(event){
  htmldisplay(applyFilters());
})
document.querySelector('.cart').addEventListener('click',function(event){
  htmldisplay(applyFilters());
})
