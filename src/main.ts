import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My NEW amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1: Create a new button element
const button = document.createElement("button");

// Set an emoji as its content
button.innerHTML = "🍪"; // Feel free to change it!

// Apply styles
button.className = "fun-button";
button.style.fontSize = "2rem";
button.style.padding = "10px 20px";

// Append the button to the app div
app.append(button);

// Log to show the button has been added
console.log("Button added to the page!");

let counter: number = 0;

// Create a div to display the counter
const counterDisplay = document.createElement("div");
const unitLabel = "cookies";
counterDisplay.innerHTML = `${counter} ${unitLabel}`;
app.append(counterDisplay);

// Add event listener to the button for click events
button.addEventListener("click", () => {
  counter += 1; // Increment the counter
  counterDisplay.innerHTML = `${counter} ${unitLabel}`; // Update the display
  console.log(`Counter increased to ${counter} ${unitLabel}`);
});

console.log("Counter and button are ready!");
