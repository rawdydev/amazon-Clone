  import {getProduct} from '../../data/products.js'
  import {cart} from '../../data/cart-class.js'
  
  import {formatCurrency} from '../utils/money.js'
  import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'
  import { renderPaymentSummary } from './paymentSummary.js'
  import { renderCheckoutHeader } from './checkOutHeader.js'
  
  
 export function renderOrderSummary() {
    let cartSummaryHTML = '';
    
  
    cart.cartItems.forEach((cartItem) => {
      const {productId} = cartItem;
      
      const matchingProduct = getProduct(productId);
      
      const {deliveryOptionId} = cartItem;
  
      const deliveryOption = getDeliveryOption(deliveryOptionId);
  
        const dataString = calculateDeliveryDate(deliveryOption)

          cartSummaryHTML += `
            <div class="cart-item-container
                js-cart-item-container
                js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                  Delivery date: ${dataString}
                </div>
  
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProduct.image}">
  
                  <div class="cart-item-details">
                    <div class="product-name
                    js-product-name-${matchingProduct.id}
                    ">
                      ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${matchingProduct.id}">
                      ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity
                    js-product-quantity-${matchingProduct.id}">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary
    js-update-link" data-product-id="${matchingProduct.id}" >
                        Update
                      </span>
                    <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link
                    js-save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                      <span class="delete-quantity-link link-primary
                        js-delete-link js-delete-link-${matchingProduct.id}"
                        data-product-id="${matchingProduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>
  
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                  </div>
                </div>
              </div>
      `;
    })
  
    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = '';
  
      deliveryOptions.forEach((deliveryOption) => {

       const dataString = calculateDeliveryDate(deliveryOption);

        const priceString = deliveryOption.priceCents 
        === 0 
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
  
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        
        html += `
          <div class="delivery-option js-delivery-option
          js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
              class="delivery-option-input 
              js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dataString}
              </div>
              <div class="delivery-option-price">
                ${priceString} shipping
              </div>
            </div>
          </div>
        `;
      })
  
      return html;
    }
    
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;

        
        cart.removeFromCart(productId)
        
      renderCheckoutHeader()
      renderOrderSummary()
      renderPaymentSummary()
      })
    })
    
    document.querySelectorAll('.js-update-link').forEach((link) => {
      link.addEventListener('click', () => {
        const {productId} = link.dataset;
        
        const container = 
    document.querySelector(`.js-cart-item-container-${productId}`)
  
    container.classList.add('is-editing-quantity')
  
      })
    })
    
    document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
      link.addEventListener('click', () => { 
        const {productId} = link.dataset;
        const container = 
    document.querySelector(`.js-cart-item-container-${productId}`);
  
    container.classList.remove('is-editing-quantity') 
        
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
      
      
      const newQuantity = Number(quantityInput.value);
      
      
      if (newQuantity < 1 || newQuantity >= 1000) {
        alert('Quantity must be at least 1 and less than 1000')
        return;
      }
        
        cart.updateQuantity(productId, newQuantity)

        renderCheckoutHeader()
        renderOrderSummary()
        renderPaymentSummary()
      })
    })
    
    document.querySelectorAll('.js-delivery-option').forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        
        cart.updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary()
        renderPaymentSummary()
      })
    })
  }