function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

/* =========================
   ELEMENTS
========================= */



const locationSelect = document.getElementById("location");
const startTimeSelect = document.getElementById("startTime");
const endTimeSelect = document.getElementById("endTime");
const searchBtn = document.getElementById("searchBtn");

let startDate = null;
let endDate = null;

/* =========================
   DATE–TIME VALIDATION
========================= */

function validateDateTime() {
  if (!startDate || !endDate) return;
  if (!startTimeSelect.value || !endTimeSelect.value) return;

  const startMinutes = timeToMinutes(startTimeSelect.value);
  const endMinutes = timeToMinutes(endTimeSelect.value);

  const sameDay =
    startDate.toDateString() === endDate.toDateString();

  if (sameDay && endMinutes <= startMinutes) {
  alert("End time must be after start time");
  endTimeSelect.value = "";
}
}
/* =========================
   SEARCH ENABLE LOGIC
========================= */

function checkSearchReady() {
  const locationFilled = locationSelect.value !== "";
  const startDateFilled = !!startDate;
  const endDateFilled = !!endDate;
  const startTimeFilled = startTime.value !== "";
  const endTimeFilled = endTime.value !== "";

  if (
    locationFilled &&
    startDateFilled &&
    startTimeFilled &&
    endTimeFilled &&
    endDateFilled
  ) {
    searchBtn.disabled = false;
    searchBtn.classList.add("enabled");
  } else {
    searchBtn.disabled = true;
    searchBtn.classList.remove("enabled");
  }
}


/* =========================
   FLATPICKR
========================= */

const startPicker = flatpickr("#startDate", {
  minDate: "today",
  position: "below",

  onChange(selectedDates) {
    if (!selectedDates.length) return;

    startDate = selectedDates[0];
    document.getElementById("startDate").value = formatDate(startDate);

    endPicker.set("minDate", startDate);

    if (endDate && endDate < startDate) {
      endDate = null;
      document.getElementById("endDate").value = formatDate(endDate);
      endPicker.clear();
    }

    endPicker.redraw();
    validateDateTime();
    checkSearchReady();
  }
});

const endPicker = flatpickr("#endDate", {
  minDate: "today",
  position: "below",

  onChange(selectedDates) {
    if (!selectedDates.length) return;

    endDate = selectedDates[0];
    document.getElementById("endDate").value = formatDate(endDate);

    endPicker.redraw();
    validateDateTime();
    checkSearchReady();
  },

  onDayCreate(_, __, fp, dayElem) {
    if (!startDate || !endDate) return;

    const day = dayElem.dateObj;

    if (day > startDate && day < endDate) {
      dayElem.classList.add("inRange");
    }
    if (day.getTime() === startDate.getTime()) {
      dayElem.classList.add("startRange");
    }
    if (day.getTime() === endDate.getTime()) {
      dayElem.classList.add("endRange");
    }
  }
});

/* =========================
   EVENT LISTENERS
========================= */

locationSelect.addEventListener("change", checkSearchReady);
startTimeSelect.addEventListener("change", () => {
  validateDateTime();
  checkSearchReady();
});
endTimeSelect.addEventListener("change", () => {
  validateDateTime();
  checkSearchReady();
});

/* =========================
   SLIDER
========================= */

lucide.createIcons();

const slides = document.querySelectorAll(".slide");

const images = [
  "Slider images/roamers-hub-kandoli.jpg",
  "Slider images/rental-roadies.jpg",
  "Slider images/rent-and-ride.jpg"
];

slides.forEach((slide, i) => {
  slide.style.backgroundImage = `url('${images[i]}')`;
});

let currentSlide = 0;

setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 5000);

/* =========================
   SEARCH → CONFIRM → WHATSAPP
========================= */

const overlay = document.getElementById("confirmOverlay");
const confirmDetails = document.getElementById("confirmDetails");
const cancelBtn = document.getElementById("cancelConfirm");
const confirmBtn = document.getElementById("confirmWhatsapp");

searchBtn.addEventListener("click", () => {
  if (searchBtn.disabled) return;

  const location = locationSelect.value;
  const startDateText = formatDate(startDate);
  const endDateText = formatDate(endDate);
  const startTime = startTimeSelect.value;
  const endTime = endTimeSelect.value;

  confirmDetails.innerHTML = `
    📍 <b>Location:</b> ${location}<br>
    📅 <b>Start:</b> ${startDateText} at ${startTime}<br>
    📅 <b>End:</b> ${endDateText} at ${endTime}
  `;

  overlay.classList.add("show");
});

// Cancel
cancelBtn.addEventListener("click", () => {
  overlay.classList.remove("show");
});

// Confirm → WhatsApp
confirmBtn.addEventListener("click", () => {
  const phoneNumber = "919229744535";

  const message = `Hi Non Challan,

I want to book a vehicle:

Location: ${locationSelect.value}
Start: ${formatDate(startDate)} at ${startTimeSelect.value}
End: ${formatDate(endDate)} at ${endTimeSelect.value}

Please confirm availability.`;

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
  overlay.classList.remove("show");
});
// =========================
// FAQ TOGGLE (SAFE)
// =========================

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;

    // Close others (optional, keeps UI clean)
    document.querySelectorAll(".faq-item").forEach(item => {
      if (item !== faqItem) {
        item.classList.remove("active");
        item.querySelector(".faq-icon").textContent = "+";
      }
    });

    // Toggle current
    const icon = button.querySelector(".faq-icon");
    const isOpen = faqItem.classList.contains("active");

    faqItem.classList.toggle("active");
    icon.textContent = isOpen ? "+" : "−";
  });
});

function generateTimeOptions(selectId, startHour = 9, endHour = 21) {
  const select = document.getElementById(selectId);

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let min of ["00"]) {
      const h = String(hour).padStart(2, "0");
      const time = `${h}:${min}`;

      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;

      select.appendChild(option);
    }
  }
}

// call function
generateTimeOptions("startTime");
generateTimeOptions("endTime");
document.getElementById("startTime").selectedIndex = 0;
document.getElementById("endTime").selectedIndex = 0;

confirmBtn.addEventListener("click", () => {
  confirmBtn.textContent = "Opening WhatsApp...";
  confirmBtn.disabled = true;

  setTimeout(() => {
    window.open(whatsappURL, "_blank");
    overlay.classList.remove("show");
    confirmBtn.textContent = "Continue to WhatsApp";
    confirmBtn.disabled = false;
  }, 500);
});