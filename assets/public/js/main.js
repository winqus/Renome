const cartBtn = document.getElementById('cartBtn');
const cartDropdown = document.getElementById("cartDropdown");

function toggleCartDropdown() {
  cartDropdown.classList.toggle("nav-menu__cart-dropdown-content--show");
}

cartBtn.onclick = toggleCartDropdown;
