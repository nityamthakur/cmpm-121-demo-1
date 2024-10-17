import "./style.css";

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

// Map to store the games with their properties
const games = {
    Slots: { baseCost: 10, cost: 10, rate: 0.1, count: 0 },
    Poker: { baseCost: 100, cost: 100, rate: 2.0, count: 0 },
    Roulette: { baseCost: 1000, cost: 1000, rate: 50.0, count: 0 }
};

// Create a display to show games played
const gameDisplay = document.createElement("div");
const updateGameDisplay = () => {
    gameDisplay.innerHTML = `
        <div>Slots played: ${games.Slots.count}</div>
        <div>Poker played: ${games.Poker.count}</div>
        <div>Roulette played: ${games.Roulette.count}</div>
    `;
};
updateGameDisplay();
app.append(gameDisplay);

// Function to create a game button
function createGameButton(gameKey: keyof typeof games, label: string) {
    const button = document.createElement("button");
    const game = games[gameKey];
    button.innerHTML = `${label} (Play Cost: ${game.cost.toFixed(2)})`;
    button.style.fontSize = '1.2rem';
    button.style.margin = '5px';
    button.disabled = true; // Initially disabled

    button.addEventListener('click', () => {
        if (chipCounter >= game.cost) {
            chipCounter -= game.cost;
            game.cost *= 1.15; // Increase the play cost by 15%
            growthRate += game.rate;
            game.count += 1;
            counterDisplay.innerHTML = `${chipCounter.toFixed(2)} ${unitLabel}`;
            button.innerHTML = `${label} (Play Cost: ${game.cost.toFixed(2)})`; // Update button cost
            console.log(`Played ${label}. New earnings rate: ${growthRate.toFixed(1)} ${unitLabel}/sec.`);
            updateGrowthRateDisplay();
            updateGameDisplay();
            updateButtonEnableState(); // Refresh button state
        }
    });

    app.append(button);
    
    return button;
}

// Create game buttons for Slots, Poker, and Roulette
const gameButtons = {
    Slots: createGameButton('Slots', 'Play Slots 🎰'),
    Poker: createGameButton('Poker', 'Play Poker ♠️'),
    Roulette: createGameButton('Roulette', 'Play Roulette 🎡')
};

// Function to update enable/disable state of game buttons
function updateButtonEnableState() {
    for (const key in gameButtons) {
        const button = gameButtons[key as keyof typeof gameButtons];
        const game = games[key as keyof typeof games];
        button.disabled = chipCounter < game.cost;
    }
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
updateGrowthRateDisplay();

// Log to confirm setup
console.log("Casino Clicker with consistent theme is ready!");