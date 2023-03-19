document.addEventListener("DOMContentLoaded", function () {
    // Add your JavaScript here
    let drugs = ["Cocaine", "Heroin", "Acid", "Weed", "Speed", "Ludes"];
    let prices = [15000, 10000, 3000, 900, 800, 200];
    let maxDebt = 50000;
    let turns = 30;
    let cash = 2000;
    let debt = 5500;
    let bank = 0;
    let day = 1;
    let inventory = Array(drugs.length).fill(0);

function randomPrice(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateDisplay() {
document.getElementById("cash").innerText = cash;
document.getElementById("debt").innerText = debt;
document.getElementById("bank").innerText = bank;
document.getElementById("day").innerText = day;
for (let i = 0; i < drugs.length; i++) {
  document.getElementById("drug" + i).innerText = drugs[i] + " $" + prices[i];
  document.getElementById("inventory" + i).innerText = inventory[i];
}
}

function buyDrug(index) {
let quantity = parseInt(prompt("How many units of " + drugs[index] + " do you want to buy?"));
if (isNaN(quantity) || quantity <= 0) return;
let cost = quantity * prices[index];
if (cost > cash) {
  alert("You don't have enough cash.");
} else {
  cash -= cost;
  inventory[index] += quantity;
  updateDisplay();
}
}

function sellDrug(index) {
let quantity = parseInt(prompt("How many units of " + drugs[index] + " do you want to sell?"));
if (isNaN(quantity) || quantity <= 0) return;
if (quantity > inventory[index]) {
  alert("You don't have enough of that drug to sell.");
} else {
  cash += quantity * prices[index];
  inventory[index] -= quantity;
  updateDisplay();
}
}

function deposit() {
let amount = parseInt(prompt("How much do you want to deposit?"));
if (isNaN(amount) || amount <= 0) return;
if (amount > cash) {
  alert("You don't have enough cash.");
} else {
  cash -= amount;
  bank += amount;
  updateDisplay();
}
}

function withdraw() {
let amount = parseInt(prompt("How much do you want to withdraw?"));
if (isNaN(amount) || amount <= 0) return;
if (amount > bank) {
  alert("You don't have enough in the bank.");
} else {
  cash += amount;
  bank -= amount;
  updateDisplay();
}
}

function payDebt() {
let amount = parseInt(prompt("How much do you want to pay?"));
if (isNaN(amount) || amount <= 0) return;
if (amount > cash) {
  alert("You don't have enough cash.");
} else if (amount > debt) {
  alert("You don't owe that much.");
} else {
  cash -= amount;
  debt -= amount;
  updateDisplay();
}
}

function nextDay() {
if (day >= turns) {
    alert("Game over! Your final score: $" + cash);
    location.reload();
    return;
}

day++;

for (let i = 0; i < drugs.length; i++) {
  prices[i] = randomPrice(Math.floor(prices[i] * 0.5), Math.floor(prices[i] * 1.5));
}
debt *= 1.1;
if (debt > maxDebt) {
  alert("Your debt is too high. Game over!");
  location.reload();
  return;
}
updateDisplay();
}

updateDisplay();
document.getElementById("deposit").onclick = deposit;
document.getElementById("withdraw").onclick = withdraw;
document.getElementById("payDebt").onclick = payDebt;
document.getElementById("nextDay").onclick = nextDay;

for (let i = 0; i < drugs.length; i++) {
document.getElementById("buy" + i).onclick = () => buyDrug(i);
document.getElementById("sell" + i).onclick = () => sellDrug(i);
}
});  