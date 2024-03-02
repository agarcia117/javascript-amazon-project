import { getDeliveryOption } from "./deliveryOptions.js";

export let cart;
let timeout;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

export function getCartTotalQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return totalQuantity;
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId){
  clearTimeout(timeout);
  let matchingItem;
  let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
  addedElement.classList.add('is-visible');

  timeout = setTimeout(() => {
    addedElement.classList.remove('is-visible');
  }, 2000);

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if (matchingItem){
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId){
      console.log(newQuantity);
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  if (!getDeliveryOption(deliveryOptionId)){
    return;
  }
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(!matchingItem){
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}