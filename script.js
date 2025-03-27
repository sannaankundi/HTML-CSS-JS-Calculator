// Select the calculator screen and buttons
const screen = document.getElementById("calculator-screen");
const buttons = document.querySelectorAll(".btn");

// Variables to store the current input and the previous value
let currentInput = "";
let previousValue = "";
let operator = null;

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    // Handle operator buttons
    if (button.classList.contains("operator")) {
      if (currentInput === "" && previousValue === "") return; // Prevent operator without input
      if (currentInput !== "" && previousValue !== "") {
        // Perform calculation if operator is pressed consecutively
        const result = calculateResult();
        previousValue = result.toString();
        currentInput = "";
        screen.value = `${previousValue} ${button.textContent}`;
      } else {
        previousValue = currentInput || previousValue; // Use current input or retain previous value
        currentInput = "";
        screen.value = `${previousValue} ${button.textContent}`;
      }
      operator = value; // Store the operator
    }
    // Handle equals button
    else if (button.id === "equals") {
      if (operator && previousValue !== "" && currentInput !== "") {
        const result = calculateResult();
        screen.value = result; // Display the result
        currentInput = result.toString(); // Update current input
        previousValue = ""; // Reset previous value
        operator = null; // Reset operator
      }
    }
    // Handle clear button
    else if (button.id === "clear") {
      currentInput = "";
      previousValue = "";
      operator = null;
      screen.value = ""; // Clear the screen
    }
    // Handle number and decimal buttons
    else {
      currentInput += value; // Append the value to the current input
      screen.value = operator
        ? `${previousValue} ${getOperatorSymbol(operator)} ${currentInput}`
        : currentInput; // Update the screen
    }
  });
});

// Helper function to calculate the result
function calculateResult() {
  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentInput);
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error"; // Handle division by zero
    default:
      return 0;
  }
}

// Helper function to get operator symbol for display
function getOperatorSymbol(op) {
  switch (op) {
    case "+":
      return "+";
    case "-":
      return "−";
    case "*":
      return "×";
    case "/":
      return "÷";
    default:
      return "";
  }
}
