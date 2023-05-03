class Drug {
  constructor(name, basePrice) {
    this.name = name;
    this.basePrice = basePrice;
    this.price = basePrice;
  }
}

const drugs = [
  new Drug("Weed", 300),
  new Drug("Cocaine", 1000),
  new Drug("Heroin", 2000),
  new Drug("Meth", 2500),
  new Drug("LSD", 1500),
  new Drug("Shrooms", 600),
];

let day = 1;
let cash = 2000;
let debt = 5500.0;
let bank = 0;
let inventory = [0, 0, 0, 0, 0, 0];

const locations = ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"];
let currentLocation = 0;

function updateUI() {
  document.getElementById("day").textContent = day;
  document.getElementById("cash").textContent = Math.round(cash);
  document.getElementById("debt").textContent = Math.round(debt);
  document.getElementById("bank").textContent = Math.round(bank);
  document.getElementById("location").textContent = locations[currentLocation];

  drugs.forEach((drug, index) => {
    document.getElementById(`drug${index}`).textContent = drug.name;
    document.getElementById(`price${index}`).textContent = Math.round(drug.price);
    document.getElementById(`inventory${index}`).textContent = inventory[index];
  });
}

function buyDrug(index) {
  const drug = drugs[index];
  if (cash >= drug.price) {
    cash -= drug.price;
    inventory[index]++;
    updateUI();
  }
}

function sellDrug(index) {
  if (inventory[index] > 0) {
    cash += drugs[index].price;
    inventory[index]--;
    updateUI();
  }
}

function deposit() {
  if (cash > 0) {
    bank += cash;
    cash = 0;
    updateUI();
  }
}

function withdraw() {
  if (bank > 0) {
    cash += bank;
    bank = 0;
    updateUI();
  }
}

function payDebt() {
  const payment = Math.min(cash, debt);
  cash -= payment;
  debt -= payment;
  updateUI();
  if (debt > 5000) {
    endGame(); // Assumes you have an endGame function
  }
}

function nextDay() {
  day++;
  debt += debt * 0.1;
  drugs.forEach(drug => {
    drug.price = drug.basePrice * (0.5 + Math.random());
  });
  randomEvent();
  policeEncounter();
  updateUI();
}

function randomEvent() {
  const eventChance = Math.random();
  if (eventChance < 0.1) {
    const eventType = Math.floor(Math.random() * 3);
    switch(eventType) {
      case 0: // Drug bust
        const bustDrugIndex = Math.floor(Math.random() * drugs.length);
        inventory[bustDrugIndex] = 0;
        break;
      case 1: // Find drugs
        const findDrugIndex = Math.floor(Math.random() * drugs.length);
        inventory[findDrugIndex] += Math.floor(Math.random() * 10) + 1;
        break;
      case 2: // Price surge or crash
        const priceChangeDrugIndex = Math.floor(Math.random() * drugs.length);
        drugs[priceChangeDrugIndex].price *= (Math.random() < 0.5) ? 0.5 : 2;
        break;
    }
  }
}

function travelTo(index) {
  currentLocation = index;
  updateUI();
}

function policeEncounter() {
  const encounterChance = Math.random();
  if (encounterChance < 0.1) {
    const encounterType = Math.floor(Math.random() * 2);
    switch(encounterType) {
      case 0: // Drugs confiscated
        inventory = inventory.map(() => 0);
        break;
      case 1: // Pay fine
        const fine = Math.min(cash, 1000);
        cash -= fine;
        break;
    }
    updateUI();
  }
}

drugs.forEach((drug, index) => {
  document.getElementById(`buy${index}`).addEventListener("click", () => buyDrug(index));
  document.getElementById(`sell${index}`).addEventListener("click", () => sellDrug(index));
});

locations.forEach((_, index) => {
  document.getElementById(`location${index}`).addEventListener("click", () => travelTo(index));
});

document.getElementById("deposit").addEventListener("click", deposit);
document.getElementById("withdraw").addEventListener("click", withdraw);
document.getElementById("payDebt").addEventListener("click", payDebt);
document.getElementById("nextDay").addEventListener("click", nextDay);

updateUI();
