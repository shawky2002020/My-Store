class Product {
  constructor(productDetails) {
    this.title = productDetails.title;
    this.category = productDetails.category;
    this.description = productDetails.description;
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.price = productDetails.price;
    this.rating = productDetails.rating;
  }
}

let products = [];
let cart = [];

function fetchProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      products = data.map(productDetails => new Product(productDetails));
      displayProducts(products); // Display all products initially
    })
    .catch(error => console.error('Error fetching products:', error));
}

function search(products) {
  const element = document.querySelector('#searchbar');
  const titlesearched = element.value.trim().toLowerCase();
  return products.filter(product => product.title.toLowerCase().includes(titlesearched));
}

function searchCategory(products) {
  const element = document.querySelector('#category-list');
  const category = element.value.trim().toLowerCase();
  if (category === '') return products; // No category filter applied
  return products.filter(product => product.category.toLowerCase() === category);
}

function searchPrice(products) {
  const max = document.querySelector('#maxprice');
  const maxval = parseFloat(max.value) || Infinity;
  const min = document.querySelector('#minprice');
  const minval = parseFloat(min.value) || 0;
  return products.filter(product => product.price >= minval && product.price <= maxval);
}

function sortProducts(products) {
  const element = document.querySelector('#sortproducts');
  const sortval = element.value;
  if (sortval === 'High to low') {
    products.sort((a, b) => b.price - a.price);
  } else if (sortval === 'Low to high') {
    products.sort((a, b) => a.price - b.price);
  }
  return products;
}

function applyFilters() {
  let filteredProducts = products;
  filteredProducts = search(filteredProducts);
  filteredProducts = searchCategory(filteredProducts);
  filteredProducts = searchPrice(filteredProducts);
  filteredProducts = sortProducts(filteredProducts);
  displayProducts(filteredProducts);
}

function displayProducts(filteredProducts) {
  const element = document.querySelector('.products');
  element.innerHTML = ''; // Clear previous products
  filteredProducts.forEach(product => {
    const productHtml = `
      <div class="container">
        <img src="${product.image}" alt="">
        <h4 class="producttitle">${product.title}</h4>
        <p class="price">${product.price}$</p>
        <div class="prod-buttons">
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>`;
    element.innerHTML += productHtml;
  });
}

function addToCart(productId) {
  const product = products.find(product => product.id === productId);
  cart.push(product);
  displayCart();
}

function displayCart() {
  const cartElement = document.querySelector('.cart');
  cartElement.innerHTML = '<h3>Shopping Cart</h3>';
  let totalQuantity = cart.length;
  let totalCost = cart.reduce((acc, product) => acc + product.price, 0);

  cart.forEach((product, index) => {
    const cartItemHtml = `
      <div class="cart-item">
        <p>${product.title} - ${product.price}$</p>
        <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
      </div>`;
    cartElement.innerHTML += cartItemHtml;
  });

  const totalHtml = `
    <div class="cart-total">
      <p>Total Quantity: ${totalQuantity}</p>
      <p>Total Cost: ${totalCost.toFixed(2)}$</p>
    </div>`;
  cartElement.innerHTML += totalHtml;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

document.querySelector('#searchbar').addEventListener('input', applyFilters);
document.querySelector('#category-list').addEventListener('input', applyFilters);
document.querySelector('#minprice').addEventListener('input', applyFilters);
document.querySelector('#maxprice').addEventListener('input', applyFilters);
document.querySelector('#sortproducts').addEventListener('input', applyFilters);
document.querySelector('#filter').addEventListener('click', applyFilters);

fetchProducts(); // Ensure products are fetched before applying any filters
