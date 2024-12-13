import { cart } from "../data/cart-class.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "./amazon/amazon-header.js";

renderAmazonHeader()
await loadProductsFetch()

const url = new URL(window.location.href)
const productId = url.searchParams.get('productId')
const product = getProduct(productId)

let detailHTML = `
  <div class="container">
    <div class="image-container">
      <img src="${product.image}">
    </div>
    <div class="product-info-grid">
      <div class="product-name limit-text-to-2-lines">
      ${product.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="${product.getStarsUrl()}">
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
      <button class="add-to-cart-button button-primary js-add-to-cart">
        Add to Cart
      </button>
    </div>
  </div>
`;

document.querySelector('.js-main').innerHTML = detailHTML;


document.querySelector('.js-add-to-cart')
  .addEventListener('click', () => {
    cart.addToCart(productId)
    renderAmazonHeader()
  })