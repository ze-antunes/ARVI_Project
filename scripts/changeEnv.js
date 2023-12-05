let environment = document.getElementById("env");
const backgrounds = [
    "none", "default", "contact", "egypt", "checkerboard",
    "forest", "goaland", "yavapai", "goldmine", "threetowers",
    "poison", "arches", "tron", "japan", "dream", "volcano",
    "starry", "osiris", "moon"
];

let currentBackgroundIndex;

function updateBackground(index) {
    currentBackgroundIndex = index;
    const selectedBackground = backgrounds[currentBackgroundIndex];
    environment.setAttribute("environment", `preset: ${selectedBackground}`);
    localStorage.setItem("backgroundIndex", currentBackgroundIndex);
    // console.log("Current background:", selectedBackground);
}

// Event listener for keydown event
document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "j":
            // Move to the previous background
            currentBackgroundIndex = (currentBackgroundIndex - 1 + backgrounds.length) % backgrounds.length;
            updateBackground(currentBackgroundIndex);
            break;
        case "k":
            // Move to the next background
            currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
            updateBackground(currentBackgroundIndex);
            break;
        default:
            // Handle other key presses if needed
            break;
    }
});

// Retrieve from local storage
const storedBackgroundIndex = parseInt(localStorage.getItem("backgroundIndex"));

// Use the stored value or default to 1 if not present
currentBackgroundIndex = !isNaN(storedBackgroundIndex) ? storedBackgroundIndex : 1;

// Update the background based on the stored value
updateBackground(currentBackgroundIndex);

// Save to local storage
localStorage.setItem("backgroundIndex", currentBackgroundIndex);

// Set the environment on window load
window.onload = function () {
    // Retrieve from local storage
    const storedBackgroundIndex = parseInt(localStorage.getItem("backgroundIndex"));
    
    // Update the background based on the stored value
    setTimeout(() => {
        updateBackground(storedBackgroundIndex);        
    }, 100)
    // console.log("window.onload", storedBackgroundIndex);
};
