let playerCamera = document.getElementById("camera");
let playerLeftHand = document.getElementById("left-hand");
let playerRightHand = document.getElementById("right-hand");

let avatar = document.getElementById("avatarModel");
let speechBubble = document.getElementById("speechBubble");
speechBubble.setAttribute("visible", false)

function calculateDistance(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance;
}

setInterval(() => {
    const distance = calculateDistance(playerCamera.getAttribute("position").x, playerCamera.getAttribute("position").z, avatar.getAttribute("position").x, avatar.getAttribute("position").z);
    if (distance < 5.5) {
        speechBubble.setAttribute("visible", true)
    } else if (distance > 4.1) {
        speechBubble.setAttribute("visible", false)
    }
}, 100)

function typeText(text) {
    let element = document.getElementById("output");
    element.value = "";
    let textToType = text;
    let index = 0;

    function typeNextCharacter() {
        if (element.value == undefined)
            element.value = "";
        element.setAttribute("value", element.value += textToType.charAt(index));
        index++;
        setTimeout(typeNextCharacter, 23); // Adjust the delay (in milliseconds) between characters
    }

    typeNextCharacter();
}

function startColorTransition() {
    const microphone = document.getElementById("microphonePlane");
    const sound = document.getElementById("soundPlane");
    const duration = 2000; // Transition duration in milliseconds
    const steps = 50; // Number of steps for the transition
    const startColor = [46, 195, 232]; // Blue (RGB)
    const endColor = [0, 0, 0]; // Black (RGB)

    const colorStep = [
        (endColor[0] - startColor[0]) / steps,
        (endColor[1] - startColor[1]) / steps,
        (endColor[2] - startColor[2]) / steps
    ];

    let step = 0;
    const interval = duration / steps;

    const transitionInterval = setInterval(function () {
        if (step >= steps) {
            clearInterval(transitionInterval);
        } else {
            const r = Math.round(startColor[0] + step * colorStep[0]);
            const g = Math.round(startColor[1] + step * colorStep[1]);
            const b = Math.round(startColor[2] + step * colorStep[2]);

            microphone.setAttribute("color", `rgb(${r}, ${g}, ${b})`);
            sound.setAttribute("color", `rgb(${r}, ${g}, ${b})`);

            step++;
        }
    }, interval);
}