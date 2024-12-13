import { cart} from "../../data/cart-class.js";

describe('test suite: addToCart', testAddToCart)
describe('test suite: removeFromCart', testRemoveFromCart)
describe('test suite: updateDeliveryOption', testUpdateDeliveryOption)

function testRemoveFromCart() {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')


    cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];
    

  })
  
  it('remove a productId that is in the cart', () => {

    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')

    expect(cart.cartItems.length).toEqual(0)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]))
  })

  it("does nothing if product is not in the cart", () => {

    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d0os9b678c6')

    expect(cart.cartItems.length).toEqual(1)
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]))

  }) 

}

function testAddToCart() {

  beforeEach(() => {
    spyOn(localStorage, 'setItem')
  })


  it('adds an existing product to the cart', () => {

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(2)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]))

  })

  it('adds a new product to the cart', () => {
    
    cart.cartItems = [];
    

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]))
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(1)

  })
}

function testUpdateDeliveryOption() {
  beforeEach(() => {
    spyOn(localStorage, 'setItem')

    cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];
  })  

  it('updates the delivery optionid', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3')

    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3')
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems.length).toEqual(1)

    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '3'
    }]))

  })

  it('does nothing if the product is not in the cart', () => {
    cart.updateDeliveryOption('does-note-exist', '3')

    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    expect(cart.cartItems.length).toEqual(1)

   expect(localStorage.setItem).toHaveBeenCalledTimes(0)

  })

  it('does nothing if the delivery Option doesnt exist', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist')

    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.cartItems[0].quantity).toEqual(1)
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1')
    expect(cart.cartItems.length).toEqual(1)

    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
  })

}