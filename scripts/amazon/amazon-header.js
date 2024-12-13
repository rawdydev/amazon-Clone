import { cart } from "../../data/cart-class.js";


export function renderAmazonHeader() {

  const amazonHeaderHTML = `
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo"
          src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo"
          src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="amazon-header-middle-section">
      <input class="search-bar js-search-bar" type="text" placeholder="Search">
    
      <button class="search-button js-search-btn">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity">${cart.calculateCartQuantity()}</div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `;

  document.querySelector('.js-amazon-header').innerHTML = amazonHeaderHTML;

  document.querySelector('.js-search-btn')
  .addEventListener('click', () => {
    const searchValue = document.querySelector('.js-search-bar').value;

    window.location = `amazon.html?search=${searchValue}`
  }) 
  
  document.querySelector('.js-search-bar')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
  document.querySelector('.js-search-btn').click()
    }
  })
}
