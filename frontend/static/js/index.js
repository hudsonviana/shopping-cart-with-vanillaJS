import Home from './Home.js';

const container = document.querySelector('#container');

const navigateTo = (ulr) => {
  history.pushState({}, '', ulr);
  loadPage();
};

const route = (event) => {
  event = event || window.event;

  event.preventDefault();

  if (event.target.parentNode.id === 'cart') {
    navigateTo(event.target.parentNode.parentNode.href);
  } else if (event.target.parentNode.id === 'cart-route') {
    navigateTo(event.target.parentNode.href);
  }

  navigateTo(event.target.href);
};

const generateNavbarHtml = () => {
  return `
  <nav class="navbar shadow-sm sticky-top">
   <div class="container">
      <a class="navbar-brand" data-link href="/">Shopping Cart</a>
      <a href="/cart" data-link id="cart-route" onclick="route()">
         <div class="ms-auto" id="cart" style="text-decoration: none; color: black">
            <i style="font-size: 20px" class="fa-solid fa-cart-shopping"></i>
            <span class="cartItem"id="nav-cart-item">0</span>
         </div>
      </a>
   </div>
</nav>`;
};

window.route = route;

const loadNavbar = () => {
  container.innerHTML = generateNavbarHtml();
};

const loadPage = () => {
  loadNavbar();
  if (location.pathname === '/') {
    new Home('container');
  }
};

window.addEventListener('popstate', () => loadPage());

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  loadPage();
});
