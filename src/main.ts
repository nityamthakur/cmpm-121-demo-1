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
counterDisplay.innerHTML = `${counter} ${unitLabel}`;
app.append(counterDisplay);

// Add event listener to the button for click events
button.addEventListener('click', () => {
    counter += 1; // Increment the counter manually
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`; 
    console.log(`Counter increased to ${counter} ${unitLabel}`);
    updateUpgradeButton(); // Check if upgrade is available
});

// Step 4: Implement continuous growth using requestAnimationFrame
let lastTime = performance.now();
let growthRate = 0; // Default growth rate to zero

function updateCounter(currentTime: number) {
    const deltaTime = (currentTime - lastTime) / 1000;
    counter += growthRate * deltaTime; // Increment based on growthRate
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;

    lastTime = currentTime;

    updateUpgradeButton(); // Ensure button enables/disables correctly

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);

// Step 5: Adding purchasable upgrade
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = 'Buy Upgrade 🚀';
upgradeButton.style.fontSize = '2rem';
upgradeButton.style.padding = '10px 20px';
upgradeButton.disabled = true; // Initially disabled

upgradeButton.addEventListener('click', () => {
    if (counter >= 10) { // Requires at least 10 units
        counter -= 10; // Deducts 10 units
        growthRate += 1; // Increments growth rate
        console.log(`Purchased upgrade! New growth rate: ${growthRate} per sec.`);
    }
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${unitLabel}`;
    updateUpgradeButton(); // Update button state
});

app.append(upgradeButton);

// Helper function to update upgrade button state
function updateUpgradeButton() {
    upgradeButton.disabled = counter < 10;
}

// Initial log to confirm complete setup
console.log("Counter with upgrade purchasing is ready!");