import CartHelper from './helper/CartHelper.js';
import ProductsHelper from './helper/ProductsHelper.js';
import Product from './Product.js';

let count = 0;
export default class Home {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.products = ProductsHelper.getProducts || [];
    this.loadProducts();
  }

  async loadProducts() {
    if (this.products.length <= 0) {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();

      // console.log(data);
      ProductsHelper.setProducts = data;
      this.products = ProductsHelper.getProducts;
    }
    this.displayProducts();
  }

  displayProducts() {
    let productsHtml = `
    <h3 class="text-center mt-5">Best Products waiting for you</h3>
    <div class="d-flex flex-wrap container justify-content-evenly mt-5 mb-5">`;

    this.products.forEach((product) => {
      productsHtml += new Product(product).createHtml();
    });

    productsHtml += `</div>`;
    this.container.innerHTML += productsHtml;

    if (count === 0) {
      this.applyListeners();
      count = 1;
    }
  }

  applyListeners() {
    document.addEventListener('click', ({ target }) => {
      if (location.pathname === '/') {
        let parent = target.parentNode.nodeName !== '#document' && target.parentNode.attributes['data-product-id'];
        const productAttr = target.attributes['data-product-id'] || parent;

        if (target.matches('.pd-card-btn') || (target.parentNode.matches('.pd-card-btn') && productAttr !== undefined)) {
          const clickedProduct = this.products.find((item) => item.id === Number(productAttr.value));
          CartHelper.addToCart(clickedProduct);
        }
      }
    });
  }
}

// https://www.youtube.com/watch?v=s1DbX-k-oeI
// Parei em 1:30:10
