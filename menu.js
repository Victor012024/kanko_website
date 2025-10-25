const tabButtons = document.querySelectorAll(".tab-btn");
const categories = document.querySelectorAll(".menu-category");
const scrollUp = document.querySelector(".back-to-top");
let saveOrders = JSON.parse(localStorage.getItem("orders")) || [];

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
    const price = parseInt(priceText.replace(/\D/g, ""));

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
    saveOrders.push(orders);
    localStorage.setItem("orders", JSON.stringify(saveOrders));
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

const checkoutBtn = document.getElementById("checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutSummary = document.getElementById("checkout-summary");
const checkoutTotal = document.getElementById("checkout-total");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");
const closeBtn = document.getElementById("close-btn");

checkoutBtn.addEventListener("click", () => {
  if (Object.keys(orders).length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Select any food to continue",
    });
    return;
  }

  checkoutSummary.innerHTML = "";
  Object.entries(orders).forEach(([name, details]) => {
    const p = document.createElement("p");
    p.innerHTML = `<span>${name} (x${details.quantity})</span><span>₦${details.totalPrice}</span>`;
    checkoutSummary.appendChild(p);
  });

  checkoutTotal.textContent = total;
  checkoutModal.classList.add("show");
});

function closeModal() {
  checkoutModal.classList.remove("show");
}

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

confirmBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Order Saved",
    text: "Your Order has been confirmed! Thank you for choosing kanko",
    icon: "success",
  });
  Object.keys(orders).forEach((key) => delete orders[key]);
  renderOrders();
  closeModal();
});

checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) closeModal();
});

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
