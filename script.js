// 1 cart setup

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("shopeaseCart")) || [];

const cartIcon = document.querySelector(".fa-shopping-cart");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const closeCart = document.getElementById("closeCart");

// 2 cart badge

let badge = null;

if (cartIcon) {
  badge = document.createElement("span");

  badge.className = "cart-count";
  badge.innerText = "0";

  cartIcon.parentElement.style.position = "relative";
  cartIcon.parentElement.appendChild(badge);
}

// 3 add to cart

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");

    if (!card) return;

    const name = card.querySelector("h3")?.innerText || "Product";

    const priceText = card.querySelector("p")?.innerText || "$0";

    const price = parseFloat(priceText.replace("$", "")) || 0;

    // Check existing product

    const existingProduct = cart.find((item) => item.name === name);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1,
      });
    }

    updateCart();

    // Button animation

    button.innerHTML = "✓ Added";
    button.style.background = "green";

    setTimeout(() => {
      button.innerHTML = "Add to Cart";
      button.style.background = "#111";
    }, 1000);
  });
});

// 4 update cart

function updateCart() {
  if (!cartItems) {
    localStorage.setItem("shopeaseCart", JSON.stringify(cart));

    return;
  }

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    count += item.quantity;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

      <div>

        <strong>
          ${item.name}
        </strong>

        <p>
          $${item.price.toFixed(2)}
        </p>

      </div>


      <div>

        <button
          onclick="decreaseQuantity(${index})">
          −
        </button>


        <span>
          ${item.quantity}
        </span>


        <button
          onclick="increaseQuantity(${index})">
          +
        </button>


        <button
          onclick="removeFromCart(${index})">
          ×
        </button>

      </div>

    `;

    cartItems.appendChild(cartItem);
  });

  // Total price

  if (totalPrice) {
    totalPrice.innerText = total.toFixed(2);
  }

  // Cart badge

  if (badge) {
    badge.innerText = count;
  }

  // Save cart

  localStorage.setItem("shopeaseCart", JSON.stringify(cart));
}

// 5 increase quantity

function increaseQuantity(index) {
  cart[index].quantity++;

  updateCart();
}

// 6 decrease quantity

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

// 7 remove product

function removeFromCart(index) {
  cart.splice(index, 1);

  updateCart();
}

// 8 open cart
if (cartIcon && cartPanel) {
  cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("active");

    updateCart();
  });
}

// 9 close cart

if (closeCart && cartPanel) {
  closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
  });
}

// 10 wish list

const heartIcon = document.querySelector(".fa-heart");

if (heartIcon) {
  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("wishlist-active");

    if (heartIcon.classList.contains("wishlist-active")) {
      heartIcon.style.color = "red";

      alert("Added to Wishlist ❤️");
    } else {
      heartIcon.style.color = "";

      alert("Removed from Wishlist");
    }
  });
}

// 11 search

const searchIcon = document.querySelector(".fa-search");

if (searchIcon) {
  searchIcon.addEventListener("click", () => {
    const keyword = prompt("Search Product");

    if (!keyword) return;

    const products = document.querySelectorAll(".card");

    let found = false;

    products.forEach((product) => {
      const productName = product.querySelector("h3")?.innerText.toLowerCase();

      if (productName && productName.includes(keyword.toLowerCase())) {
        product.style.display = "block";

        found = true;
      } else {
        product.style.display = "none";
      }
    });

    if (!found) {
      alert("No product found for: " + keyword);
    }
  });
}

// 12 product filler

function filterProducts(category) {
  const products = document.querySelectorAll(".product-item");

  products.forEach((product) => {
    if (category === "all") {
      product.style.display = "block";
    } else if (product.classList.contains(category)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// 13 contact form

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();

    const email = document.getElementById("email")?.value.trim();

    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");

      return;
    }

    alert("Thank you, " + name + "! Your message has been sent.");

    contactForm.reset();
  });
}

// 14 hero button

const heroButton = document.querySelector(".hero button");

if (heroButton) {
  heroButton.addEventListener("click", () => {
    const productsSection = document.querySelector(".products");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}

// 15 navigation

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function () {
    console.log("Opening:", this.innerText);
  });
});

// 16 page load

window.addEventListener("load", () => {
  console.log("Welcome to ShopEase!");

  // Get latest cart

  cart = JSON.parse(localStorage.getItem("shopeaseCart")) || [];

  // Display cart

  updateCart();
});
