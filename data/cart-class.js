import { getDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;   
    this.#loadFromStorage()
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || []

  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  }

  addToCart(productId) {
    let matchingItem;
   
   this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
       matchingItem = cartItem;
     }
   })
     
   const quantitySelector =  document.querySelector(`.js-quantity-selector-${productId}`)
   let quantity = 1;

   if (quantitySelector) {
    quantity = Number(quantitySelector.value)
   }

   if (matchingItem) {
     matchingItem.quantity += quantity
   } else {
     this.cartItems.push({
     productId,
     quantity, 
     deliveryOptionId: '1'
     })
   }  
   this.saveToStorage()
  } 

  removeFromCart(productId) {
    const newCart = []
    
    this.cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
      
    })
    this.cartItems = newCart;
    this.saveToStorage()
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
     
     this.cartItems.forEach((cartItem) => {
       cartQuantity += cartItem.quantity
     })
     return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
   
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
       if (productId === cartItem.productId) {
        matchingItem = cartItem;
        matchingItem.quantity = newQuantity;
      }
    })
      
      this.saveToStorage()
  }

  resetCart() {
    this.cartItems = [];
    this.saveToStorage()
  }

  updateDeliveryOption(productId, deliveryOptionId) {
  
    let matchingItem;
      
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })

    if(!matchingItem) {
      return;
    }

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    if(!deliveryOption) {
      return;
    }
    
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }


}


 export const cart = new Cart('cart-oop');
 const businessCart = new Cart('business-cart');

   // console.log(cart)
   // console.log(businessCart)
   // console.log(businessCart instanceof Cart)