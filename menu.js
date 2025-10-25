const tabButtons = document.querySelectorAll(".tab-btn");
const categories = document.querySelectorAll(".menu-category");
const scrollUp = document.querySelector(".back-to-top");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    categories.forEach((cat) => {
      cat.classList.toggle("hidden", cat.dataset.category !== category);
    });
  });
});

const addBtns = document.querySelectorAll(".add-btn");
const orderList = document.getElementById("order-list");
const orderTotal = document.getElementById("order-total");

let total = 0;
const orders = {};

addBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const name = item.querySelector("h3").innerText;
    const priceText = item.querySelector(".price").innerText;
    const price = parseInt(priceText.replace(/\D/g, "")); // Extract number

    if (orders[name]) {
      orders[name].quantity++;
      orders[name].totalPrice = orders[name].quantity * price;
    } else {
      orders[name] = {
        price: price,
        quantity: 1,
        totalPrice: price,
      };
    }

    renderOrders();
  });
});

function renderOrders() {
  orderList.innerHTML = "";
  total = 0;

  Object.entries(orders).forEach(([name, details]) => {
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-item");
    orderItem.innerHTML = `
      <span>${name} (x${details.quantity})</span>
      <span>₦${details.totalPrice}</span>
    `;
    orderList.appendChild(orderItem);

    total += details.totalPrice;
  });

  orderTotal.textContent = total;
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollUp.style.display = "flex";
  } else {
    scrollUp.style.display = "none";
  }
});

scrollUp.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
