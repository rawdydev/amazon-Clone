import { cart } from "./cart.js";
import { getDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d0os9b678c6',
        quantity: 1,
        deliveryOptionId: '2'
    
      }]
  
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
    },
  
    addToCart(productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
    
      this.saveToStorage();
    },
  
    removeFromCart(productId) {
      const newCart = []
      
      this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
          newCart.push(cartItem)
        }
        
      })
      this.cartItems = newCart;
      this.saveToStorage()
    },
  
    calculateCartQuantity() {
      let cartQuantity = 0;
       
       this.cartItems.forEach((cartItem) => {
         cartQuantity += cartItem.quantity
       })
       return cartQuantity;
    },
  
    updateQuantity(productId, newQuantity) {
   
      let matchingItem;
      
      this.cartItems.forEach((cartItem) => {
         if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
        matchingItem.quantity = newQuantity;
      })
        
        this.saveToStorage()
    },
  
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
  
  };

  return cart;
}

 const cart1 = Cart('cart-oop');
 const businessCart = Cart('business-cart');


  cart1.loadFromStorage()
  businessCart.loadFromStorage()


    console.log(cart1)
    console.log(businessCart)






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

 // at last take back the original add to cart 
