import "./style.css";

interface GameItem {
    name: string;
    emoji: string;
    playCost: number;
    earningsRate: number;
    description: string;
    count?: number;
    growthMultiplier: number; // New property
}

// Update your existing `availableItems` array with growthMultiplier values:
const availableItems: GameItem[] = [
    { name: "Slots", emoji: "🎰", playCost: 10, earningsRate: 0.1, description: "Spin to win small and often with the Slots.", growthMultiplier: 1.1 },
    { name: "Poker", emoji: "♠️", playCost: 100, earningsRate: 2, description: "Play your hands smartly in Poker for steady returns.", growthMultiplier: 1.15 },
    { name: "Roulette", emoji: "🎡", playCost: 1000, earningsRate: 50, description: "Risk it all on Roulette for a big spin-up.", growthMultiplier: 1.2 },
    { name: "Blackjack", emoji: "🃏", playCost: 5000, earningsRate: 120, description: "Beat the dealer in Blackjack for impressive winnings.", growthMultiplier: 1.25 },
    { name: "Baccarat", emoji: "🎴", playCost: 20000, earningsRate: 500, description: "A luxurious gamble, Baccarat offers the highest stakes and returns.", growthMultiplier: 1.3 }
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
    if (chipCounter >= item.playCost) {
        chipCounter -= item.playCost;
        item.playCost *= item.growthMultiplier; // Now using the custom multiplier
        growthRate += item.earningsRate;
        item.count! += 1;

        counterDisplay.innerHTML = `${chipCounter.toFixed(2)} ${unitLabel}`;
        button.innerHTML = `Play ${item.name} ${item.emoji} (Cost: ${item.playCost.toFixed(2)})`;
        console.log(`Played ${item.name}. New earnings rate: ${growthRate.toFixed(1)} ${unitLabel}/sec.`);
        updateAllDisplays();
        updateButtonEnableState(); // Refresh the state of buttons
    }
});
// Create a div to display the current chip growth rate
let growthRate: number = 0;
const growthRateDisplay = document.createElement("div");
app.append(growthRateDisplay);

// Update the growth rate display
function updateGrowthRateDisplay() {
    growthRateDisplay.innerHTML = `Earnings Rate: ${growthRate.toFixed(1)} ${unitLabel}/sec`;
}

// Track elements in a map to avoid redundant re-renders
const itemElementsMap = new Map<string, HTMLElement>();
// Initialize the game display
const gameDisplay = document.createElement("div");
app.append(gameDisplay);

// Function to update all games display and button states
function updateAllDisplays() {
    updateGrowthRateDisplay();

    availableItems.forEach(item => {
        let itemElement = itemElementsMap.get(item.name);

        if (!itemElement) {
            // Create the element if it doesn't already exist
            itemElement = document.createElement("div");
            itemElementsMap.set(item.name, itemElement);
            gameDisplay.append(itemElement);
        }

        // Update the content of the existing element
        itemElement.innerText = `${item.emoji} ${item.name}: ${item.count || 0} played - ${item.description}`;
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
    availableItems.forEach(item => {
        const button = document.querySelector<HTMLButtonElement>(
            `[data-item="${item.name}"]`
        );
        if (button) {
            button.disabled = chipCounter < item.playCost;
        }
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
console.log("Casino Clicker fully expanded with additional games and descriptions!");
