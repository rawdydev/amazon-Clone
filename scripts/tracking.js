import { getProduct, loadProductsFetch } from "../data/products.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { getOrder } from "../data/orders.js"
import { renderAmazonHeader } from "./amazon/amazon-header.js"

async function loadTrackingPage() {

  try {
  await loadProductsFetch()
  } catch(error) {
    console.log('Unexpected error:', error)
  }

  const url = new URL(window.location.href)
  const orderId = url.searchParams.get('orderId')
  const ProductId = url.searchParams.get('productId')

  const product = getProduct(ProductId)
  const order = getOrder(orderId)

  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const currentTime = dayjs()
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime)

  let progressPercent = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;
  if (progressPercent > 100) progressPercent = 100;

  const deliveredMasage = currentTime < deliveryTime ? 'Arriving on' : 'Delivered on';

  const trackingHTML = `
  <div class="order-tracking">
  <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
  </a>

  <div class="delivery-date">
    ${deliveredMasage} ${
      dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
    }
  </div>

  <div class="product-info">
    ${product.name}
  </div>

  <div class="product-info">
    Quantity: ${productDetails.quantity}
  </div>

  <img class="product-image" src="${product.image}">

  <div class="progress-labels-container">
    <div class="progress-label ${progressPercent < 50 ? 'current-status' : ''}">
      Preparing
    </div>
    <div class="progress-label ${
      progressPercent >= 50 && progressPercent < 100 ?  'current-status' : ''
    }">
      Shipped
    </div>
    <div class="progress-label ${progressPercent >= 100 ? 'current-status' : ''}">
      Delivered
    </div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" style="width: ${progressPercent}%;"></div>
  </div>
  </div>
  `;

  document.querySelector('.js-main').innerHTML = trackingHTML;
}

renderAmazonHeader()
loadTrackingPage()