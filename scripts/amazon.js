import {products, loadProducts} from '../data/products.js'
import {cart} from '../data/cart-class.js'
import { renderAmazonHeader } from './amazon/amazon-header.js';

renderAmazonHeader()
loadProducts(renderProductsGrid)

function renderProductsGrid() {
  let productsHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search')
 
  let filteredProducts = products;
  
  if (search) {
    filteredProducts = products.filter(product => {
     return product.name.toLowerCase().includes(search.toLowerCase()) 
     || product.keywords.some(keyword => keyword.toLowerCase().includes(search.toLowerCase()))
    })
  }

  // <a href="detail.html?productId=${product.id}">


  filteredProducts.forEach(product => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container js-product-image-container"
      data-product-id="${product.id}">
        <img class="product-image"
          src="${product.image}">
      
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button  button-primary js-add-to-cart" 
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `;
    
  })
    
  document.querySelector('.js-product-grid').innerHTML = productsHTML;
  

     const addedMessageTimeouts = {}
      
     function updateAndIntractiveCart(productId) {
      renderAmazonHeader()
    
    const addedMessage =  document.querySelector(`.js-added-to-cart-${productId}`)
    
   
    
    addedMessage.classList.add('added')
    
   const previousTimeoutId =  addedMessageTimeouts[productId]
    
    if (previousTimeoutId) {   
     clearTimeout(previousTimeoutId); 
    }
    
   const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added')
   }, 2000)      
      
  addedMessageTimeouts[productId] =
   timeoutId;
     }
     
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const {productId} = button.dataset;
    cart.addToCart(productId)
    updateAndIntractiveCart(productId)
  })
})

document.querySelectorAll('.js-product-image-container').forEach((link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;
    window.location.href = `detail.html?productId=${productId}`;
  })
})
 renderAmazonHeader()
  }