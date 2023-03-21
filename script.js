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
  
  function updateUI() {
    document.getElementById("day").textContent = day;
    document.getElementById("cash").textContent = Math.round(cash);
    document.getElementById("debt").textContent = Math.round(debt);
    document.getElementById("bank").textContent = Math.round(bank);
  
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
  }
  
  function nextDay() {
    day++;
    debt *= 1.01; // Increase debt by 10% daily
    drugs.forEach(item => {
      const u1 = Math.random();
      const u2 = Math.random();
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const smallChange = item.basePrice * (0.05 + 0.1 * z1); // bias toward small changes
      item.price = item.basePrice + smallChange;
    });
    updateUI();
  }
  
  drugs.forEach((drug, index) => {
    document.getElementById(`buy${index}`).addEventListener("click", () => buyDrug(index));
    document.getElementById(`sell${index}`).addEventListener("click", () => sellDrug(index));
  });
  
  document.getElementById("deposit").addEventListener("click", deposit);
  document.getElementById("withdraw").addEventListener("click", withdraw);
  document.getElementById("payDebt").addEventListener("click", payDebt);
  document.getElementById("nextDay").addEventListener("click", nextDay);
  
  updateUI();
  