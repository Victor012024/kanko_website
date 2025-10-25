const header = document.querySelector(".header");
const mobileHam = document.querySelector(".mobile-hamburger");
const ham = document.querySelectorAll(".ham");
const navLink = document.querySelector("ul");
const occasion = document.getElementById("occasion");
const occasion_details = document.querySelector(".occasion-details");
const reservationForm = document.querySelector(".reservation-form");
const menuItem = document.querySelectorAll(".menu-item");
const orderSection = document.querySelector(".order-section");
const orderList = document.getElementById("order-list");
const total = document.getElementById("total");
const placeOrder = document.getElementById("place-order");
const scrollUp = document.querySelector(".back-to-top");

let menuInfo = [];

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    ham.forEach((ham) => (ham.style.backgroundColor = "black"));
  } else {
    header.classList.remove("scrolled");
    ham.forEach((ham) => (ham.style.backgroundColor = "white"));
  }

  if (window.scrollY > 400) {
    scrollUp.style.display = "flex";
  } else {
    scrollUp.style.display = "none";
  }
});

mobileHam.addEventListener("click", () => {
  mobileHam.classList.toggle("active")
    ? (navLink.style.display = "grid")
    : (navLink.style.display = "none");
});

reservationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let saveDetail = JSON.parse(localStorage.getItem("reservation")) || [];

  const getDetails = {
    id: Date.now(),
    name: document.getElementById("name").value,
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value,
    date: document.getElementById("time").value,
    guests: document.getElementById("guests").value,
    addMessage: document.getElementById("add-ons").value,
  };

  saveDetail.push(getDetails);

  try {
    if (!getDetails) return;
    localStorage.setItem("reservation", JSON.stringify(saveDetail));
    Swal.fire({
      title: "Confirmed",
      text: "Your Reservation has been saved",
      icon: "success",
      confirmButtonColor: "green",
    });

    e.target.reset();
  } catch (err) {
    console.error(err);
  }
});

occasion.addEventListener("change", () => {
  occasion_details.classList.toggle("hidden", occasion.value !== "yes");
  let detailOccasion = occasion_details.value;
  saveDetail.push(detailOccasion);
});

scrollUp.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
