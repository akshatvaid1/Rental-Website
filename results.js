const params = new URLSearchParams(window.location.search);

document.getElementById("resLocation").textContent =
  params.get("location");

document.getElementById("resDates").textContent =
  `${params.get("startDate")} → ${params.get("endDate")}`;

const vehicles = [
  {
    name: "Roamers Hub",
    model: "Scooty",
    price: 400,
    image: "Slider images/roamers-hub-kandoli.jpg"
  },
  {
    name: "Rental Roadies",
    model: "Bike",
    price: 500,
    image: "Slider images/rental-roadies.jpg"
  },
  {
    name: "Rent and Ride",
    model: "Scooty",
    price: 350,
    image: "Slider images/rent-and-ride.jpg"
  }
];

const grid = document.getElementById("resultsGrid");

vehicles.forEach(v => {
  const card = document.createElement("div");
  card.className = "vehicle-card";

  card.innerHTML = `
    <img src="${v.image}">
    <h3>${v.name}</h3>
    <p>${v.model}</p>
    <div class="price">₹${v.price}/day</div>
    <button>Book Vehicle</button>
  `;

  grid.appendChild(card);
});
