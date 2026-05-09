const MILE_RATE = 2;
const BOOKING_FEE = 25;

const bookingForm = document.querySelector("#bookingForm");
const milesInput = document.querySelector("#miles");
const distanceCharge = document.querySelector("#distanceCharge");
const totalPrice = document.querySelector("#totalPrice");
const formMessage = document.querySelector("#formMessage");
const cardFields = document.querySelector("#cardFields");
const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');

const pounds = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function calculateFare(miles) {
  const safeMiles = Number.isFinite(miles) && miles > 0 ? miles : 0;
  const distanceTotal = safeMiles * MILE_RATE;

  return {
    distanceTotal,
    total: distanceTotal + BOOKING_FEE,
  };
}

function updateQuote() {
  const miles = Number.parseFloat(milesInput.value);
  const fare = calculateFare(miles);

  distanceCharge.textContent = pounds.format(fare.distanceTotal);
  totalPrice.textContent = pounds.format(fare.total);
}

function toggleCardFields() {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  const showCardFields = selectedMethod === "Card";

  cardFields.classList.toggle("is-hidden", !showCardFields);
  cardFields.querySelectorAll("input").forEach((input) => {
    input.required = showCardFields;
  });
}

milesInput.addEventListener("input", updateQuote);
paymentMethods.forEach((method) => method.addEventListener("change", toggleCardFields));

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get("fullName");
  const pickup = formData.get("pickup");
  const destination = formData.get("destination");

  formMessage.classList.add("is-success");
  formMessage.textContent = `Thank you, ${name}. Your chauffeur request from ${pickup} to ${destination} has been received. We will email your confirmation shortly.`;
  bookingForm.reset();
  updateQuote();
  toggleCardFields();
});

updateQuote();
toggleCardFields();
