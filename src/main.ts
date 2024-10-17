import "./style.css";

interface GameItem {
  name: string;
  emoji: string;
  playCost: number;
  earningsRate: number;
  count?: number;
}

const availableItems: GameItem[] = [
  { name: "Slots", emoji: "🎰", playCost: 10, earningsRate: 0.1 },
  { name: "Poker", emoji: "♠️", playCost: 100, earningsRate: 2 },
  { name: "Roulette", emoji: "🎡", playCost: 1000, earningsRate: 50 }
];

const app: HTMLDivElement = document.querySelector("#app")!;

// Set the game name and title
const gameName = "Casino Clicker";
document.title = gameName;

// Create and append a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the main button as Casino Chip
const button = document.createElement("button");
button.innerHTML = '🎲 Click for Chips'; 
button.className = 'chip-button';
button.style.fontSize = '2rem';
button.style.padding = '20px 40px';

// Append the casino chip button to the app div
app.append(button);

// Initialize the counter for chips
let chipCounter: number = 0;

// Create a div to display the chip counter
const counterDisplay = document.createElement("div");
const unitLabel = "chips";
counterDisplay.innerHTML = `${chipCounter.toFixed(2)} ${unitLabel}`;
app.append(counterDisplay);

// Add event listener to the button for click events
button.addEventListener('click', () => {
    chipCounter += 1; // Increment the chip counter manually
    counterDisplay.innerHTML = `${chipCounter.toFixed(2)} ${unitLabel}`;
    console.log(`Chips increased to ${chipCounter} ${unitLabel}`);
    updateButtonEnableState(); // Check if games are available
});

// Create a div to display the current chip growth rate
let growthRate: number = 0;
const growthRateDisplay = document.createElement("div");
app.append(growthRateDisplay);

// Update the growth rate display
function updateGrowthRateDisplay() {
    growthRateDisplay.innerHTML = `Earnings Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
}

// Initialize the game display
const gameDisplay = document.createElement("div");
app.append(gameDisplay);

// Function to update all games display and button states
function updateAllDisplays() {
    updateGrowthRateDisplay();
    gameDisplay.innerHTML = '';
    availableItems.forEach((item) => {
        const itemDisplay = document.createElement('div');
        itemDisplay.innerText = `${item.emoji} ${item.name} played: ${item.count || 0}`;
        gameDisplay.append(itemDisplay);
    });
}

// Initialize item properties and create buttons dynamically
availableItems.forEach(item => {
    item.count = 0; // Initialize count to zero

    const button = document.createElement("button");
    button.innerHTML = `Play ${item.name} ${item.emoji} (Cost: ${item.playCost.toFixed(2)})`;
    button.style.fontSize = '1.2rem';
    button.style.margin = '5px';
    button.disabled = true; // Initially disabled

    button.addEventListener('click', () => {
        if (chipCounter >= item.playCost) {
            chipCounter -= item.playCost;
            item.playCost *= 1.15; // Increase the play cost by 15%
            growthRate += item.earningsRate;
            item.count! += 1;
            counterDisplay.innerHTML = `${chipCounter.toFixed(2)} ${unitLabel}`;
            button.innerHTML = `Play ${item.name} ${item.emoji} (Cost: ${item.playCost.toFixed(2)})`; // Update button cost
            console.log(`Played ${item.name}. New earnings rate: ${growthRate.toFixed(1)} ${unitLabel}/sec.`);
            updateAllDisplays();
            updateButtonEnableState(); // Refresh button state
        }
    });

    app.append(button);
});

// Function to update enable/disable state of game buttons
function updateButtonEnableState() {
    const buttons = document.querySelectorAll(`button`);
    availableItems.forEach((item, index) => {
        buttons[index + 1].disabled = chipCounter < item.playCost;
    });
}

// Step 4: Implement continuous growth using requestAnimationFrame
let lastTime = performance.now();

function updateCounter(currentTime: number) {
    const deltaTime = (currentTime - lastTime) / 1000;
    chipCounter += growthRate * deltaTime;
    counterDisplay.innerHTML = `${chipCounter.toFixed(2)} ${unitLabel}`;

    lastTime = currentTime;

    updateButtonEnableState(); 

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

// Start with the growth rate display
updateAllDisplays();

// Log to confirm setup
console.log("Casino Clicker with data-driven design and emojis is ready!");