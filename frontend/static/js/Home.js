import ProductsHelper from './helper/ProductsHelper.js';
import Product from './Product.js';

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
  }
}
