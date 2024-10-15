import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// Set the game name and title
const gameName = "My NEW amazing game";
document.title = gameName;

// Create and append a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1: Create a fun button element
const button = document.createElement("button");
button.innerHTML = '🌟'; 
button.className = 'fun-button';
button.style.fontSize = '2rem';
button.style.padding = '10px 20px';

// Append the button to the app div
app.append(button);

// Step 2 & 3: Initialize the counter
let counter: number = 0;

// Create a div to display the counter
const counterDisplay = document.createElement("div");
const unitLabel = "stars";
counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
app.append(counterDisplay);

// Add event listener to the button for click events
button.addEventListener('click', () => {
    counter += 1; // Increment the counter manually
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`; 
    console.log(`Counter increased to ${counter} ${unitLabel}`);
    updateButtonEnableState(); // Check if upgrade is available
});

// Create a div to display the current growth rate
let growthRate: number = 0;
const growthRateDisplay = document.createElement("div");
app.append(growthRateDisplay);

// Update the growth rate view
function updateGrowthRateDisplay() {
    growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
}

// Map to store the upgrades with initial zero purchases
const purchases = {
    A: { cost: 10, rate: 0.1, count: 0 },
    B: { cost: 100, rate: 2.0, count: 0 },
    C: { cost: 1000, rate: 50.0, count: 0 }
};

// Create a div to represent purchases
const purchaseDisplay = document.createElement("div");
const updatePurchaseDisplay = () => {
    purchaseDisplay.innerHTML = `
        <div>Item A: ${purchases.A.count} purchased</div>
        <div>Item B: ${purchases.B.count} purchased</div>
        <div>Item C: ${purchases.C.count} purchased</div>
    `;
};
updatePurchaseDisplay();
app.append(purchaseDisplay);

// Function to create an upgrade button
function createUpgradeButton(itemKey: keyof typeof purchases, label: string) {
    const button = document.createElement("button");
    const item = purchases[itemKey];
    button.innerHTML = `${label} (Cost: ${item.cost})`;
    button.style.fontSize = '1.2rem';
    button.style.margin = '5px';
    button.disabled = true; // Initially disabled

    button.addEventListener('click', () => {
        if (counter >= item.cost) {
            counter -= item.cost;
            growthRate += item.rate;
            item.count += 1;
            counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
            console.log(`Purchased ${label}. New growth rate: ${growthRate.toFixed(1)} per sec.`);
            updateGrowthRateDisplay();
            updatePurchaseDisplay();
        }
    });

    app.append(button);
    
    return button;
}

// Create upgrade buttons for items A, B, and C
const upgradeButtons = {
    A: createUpgradeButton('A', 'Upgrade A 🚀'),
    B: createUpgradeButton('B', 'Upgrade B 🚀'),
    C: createUpgradeButton('C', 'Upgrade C 🚀')
};

// Function to update enable/disable state of upgrade buttons
function updateButtonEnableState() {
    for (const key in upgradeButtons) {
        const button = upgradeButtons[key as keyof typeof upgradeButtons];
        const item = purchases[key as keyof typeof purchases];
        button.disabled = counter < item.cost;
    }
}

// Step 4: Implement continuous growth using requestAnimationFrame
let lastTime = performance.now();

function updateCounter(currentTime: number) {
    const deltaTime = (currentTime - lastTime) / 1000;
    counter += growthRate * deltaTime;
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;

    lastTime = currentTime;

    updateButtonEnableState(); 

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

// Start with the growth rate display
updateGrowthRateDisplay();

// Initial log to confirm setup
console.log("Counter with multiple upgrades and status display is ready!");