import CartItem from './CartItem.js';
import CartHelper from './helper/CartHelper.js';

export default class Cart {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.cart = CartHelper.getCart;
    this.cartHtml = '';
    this.loadCart();
  }

  loadCart() {
    this.cartHtml = `
    <div id="sp-cart" class="shopping-cart container">
      <!-- Title -->
      <div class="title mt-5">
        <h1>Total Price : <span id="cart-total-price">$2040 Total price here<span></h1>
      </div>
      <div class="mb-5">
        <button class="btn btn-primary" id="clear-all">CLEAR ALL <i class="fa-sharp fa-solid fa-trash"></i></button>
      </div>
      <div class="cart-wrapper shadow-sm">`;

    if (this.cart.length <= 0) {
      this.cartHtml = `
      <div>
        <h2 class="text-center mt-5">You don't have any item in the cart :(</h2>
        <div class="d-flex justify-content-center">
          <a href="/" data-link class="btn btn-primary">BACK TO HOME</a>
        </div>
      </div>`;
    } else {
      this.cart.forEach((item) => {
        this.cartHtml += new CartItem(item).createHtml();
      });
    }

    this.cartHtml += `</div></div>`;
    this.container.innerHTML += this.cartHtml;
  }
}
