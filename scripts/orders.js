import { cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "./amazon/amazon-header.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

 async function loadOrdersPage() {
  try {
  await loadProductsFetch()
} catch (error) {
  console.log('Error loading orders:', error)
}

  let ordersHTML = '';

  orders.forEach(order => {

    let orderTimeString = dayjs(order.orderTime).format('MMMM D');
      
      ordersHTML +=`
      <div class="order-container">
              
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTimeString}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
      ${orderItems(order)}
      </div>
    </div>
      `;
  });


  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again-btn').forEach(btn => {
    btn.addEventListener('click', () => { 
      cart.addToCart(btn.dataset.productId)
      btn.innerHTML = 'Added';

      setTimeout(() => {
        btn.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000)
      renderAmazonHeader()
    })
  })

}

function orderItems(order) {
  let productsHTML = '';

  if (!order.errorMessage) {
    order.products.forEach(product => {

      const {productId, quantity, estimatedDeliveryTime} = product;
      const matchingProduct =  getProduct(productId);
  
    productsHTML +=`
    <div class="product-image-container">
      <img src="${matchingProduct.image}">
    </div>
  
    <div class="product-details">
      <div class="product-name">
      ${matchingProduct.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dayjs(estimatedDeliveryTime).format('MMMM D')}
      </div>
      <div class="product-quantity">
        Quantity: ${quantity}
      </div>
      <button class="buy-again-button button-primary js-buy-again-btn"
        data-product-id="${matchingProduct.id}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>
  
    <div class="product-actions">
      <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
      `;
      })
  } else if (order.errorMessage) {
    console.log('order is empty add some product to the cart.')
  }

  return productsHTML;  
}

renderAmazonHeader()
loadOrdersPage()
