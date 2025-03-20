document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("quiz-form");
  const colorOptions = document.querySelectorAll("[name='color']");
  
  // Add an event listener to the submit button
  form.querySelector("button").addEventListener("click", function(event) {
    event.preventDefault();
    
    // Get the selected color option value
    let selectedColorValue = Array.from(colorOptions).find(option => option.checked).value;
    
    // Perform actions based on the selected color
    if (selectedColorValue === "red") {
      alert("You chose red!");
      console.log("Red was chosen");
    } else if (selectedColorValue === "blue") {
      alert("You chose blue!");
      console.log("Blue was chosen");
    }
  });
});