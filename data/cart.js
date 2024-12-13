import { getDeliveryOption } from "./deliveryOptions.js";

export let cart;

  loadFromStorage()

 export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d0os9b678c6',
      quantity: 1,
      deliveryOptionId: '2'
  
    }]

  }
  
 export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  export function addToCart(productId) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    saveToStorage();
  }


 /* 
 export function addToCart(productId) {
     let matchingItem;
    
    cart.forEach((cartItem) => {
     if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })
      
    const quantitySelector =  document.querySelector(`.js-quantity-selector-${productId}`)
    
    const quantity = Number(quantitySelector.value)
    
    if (matchingItem) {
      matchingItem.quantity += quantity
    } else {
      cart.push({
      productId,
      quantity, 
      deliveryOptionId: '1'
        })
    }  
    saveToStorage()
   } 
*/

export function removeFromCart(productId) {
   const newCart = []
   
   cart.forEach((cartItem) => {
   if (cartItem.productId !== productId) {
       newCart.push(cartItem)
     }
     
   })
   cart = newCart;
   saveToStorage()
 }

 export function calculateCartQuantity() {
   let cartQuantity = 0;
    
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    })
    return cartQuantity;
 }

 export function updateQuantity(productId, newQuantity) {
 
 let matchingItem;
 
 cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
     matchingItem = cartItem;
   }
   matchingItem.quantity = newQuantity;
 })
   
   saveToStorage()
 }

 export function updateDeliveryOption(productId, deliveryOptionId) {

  let matchingItem;
    
    cart.forEach((cartItem) => {
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

    saveToStorage();
 }

 export function loadCart() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
  })

  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send()
} 

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart')

  const text = await response.text()
  console.log(text)
}

 // at last take back the original add to cart 
