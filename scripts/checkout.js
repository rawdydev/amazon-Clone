import { renderCheckoutHeader } from './checkout/checkOutHeader.js'
import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { loadProducts, loadProductsFetch } from '../data/products.js'
import { loadCart, loadCartFetch } from '../data/cart.js'
// import '../data/car.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js'

async function loadPage() {

  try {
    /*
   // throw 'tests error.'  
    // const value = 
    await new Promise((resolve, reject) => {
      // throw 'if we use await the error it will throw the error to the chatch down here';
     loadCart()
     // reject('error 3')
      resolve("test resolve in await.")
    });
  
   // console.log(value) 
   */

   await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
   ])
  
  } catch (error) {
   console.log('Unexpected error. Please try again later.')
  }


  renderOrderSummary()
  renderPaymentSummary()
  renderCheckoutHeader() 

 // return 'test value!';
}

loadPage()

/*
loadPage().then((value) => {
  console.log('next  steep.')
  console.log(value)
})
*/

/*
Promise.all([
    loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve()
    })  
  })

]).then((values) => {
 // console.log(values)
  renderOrderSummary()
  renderPaymentSummary()
  renderCheckoutHeader() 
})
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('Test value')
  })

}).then((value) => {
  console.log(value)
  return new Promise((resolve) => {
    loadCart(() => {
      resolve()
    })  
  })

}).then(() => {
  renderOrderSummary()
  renderPaymentSummary()
  renderCheckoutHeader()
})
*/


 /*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary()
    renderPaymentSummary()
    renderCheckoutHeader()
  })
}) */
