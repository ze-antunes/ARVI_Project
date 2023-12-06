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
    if (distance < 4) {
        speechBubble.setAttribute("visible", true)
    } else if (distance > 4.1) {
        speechBubble.setAttribute("visible", false)
    }
}, 100)

console.log(speechBubble)

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
        setTimeout(typeNextCharacter, 50); // Adjust the delay (in milliseconds) between characters
    }

    typeNextCharacter();
}