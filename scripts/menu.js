let playerCameraMenu = document.getElementById("camera");
let menuScreen = document.getElementById("wii_screen");
let microphoneStatusBtn = document.getElementById("microphone_status_btn");
let microStatusText = document.getElementById("micro_status_title");
let microIcon = document.getElementById("plane_mic_icon");
let openCloseBtn = document.getElementById("open_close_btn");
let openCloseIcon = document.getElementById("open_close_icon");

// Get the current URL
const currentURL = window.location.href;

// Check if the URL contains a specific substring
if (currentURL.includes("index.html")) {
    menuScreen.open = true;
    console.log("menuScreen.open = true")
} else {
    menuScreen.open = false;
    console.log("menuScreen.open = false")
    menuScreen.setAttribute("scale", "0 0 0")
    $(openCloseIcon).attr('src', '#open_icon');
}


let updateMenuPosition = () => {
    setInterval(() => {
        $(menuScreen).attr('position', `${playerCameraMenu.object3D.position.x} 1.6 ${playerCameraMenu.object3D.position.z - 2.5}`);
        $(openCloseBtn).attr('position', `${playerCameraMenu.object3D.position.x - 1.25} 2.3 ${playerCameraMenu.object3D.position.z - 2.45}`);
    }, 1)
};

updateMenuPosition();

let openSettings = () => {
    const settingsMenu = document.getElementById('settingsMenu');

    // Toggle the open state
    settingsMenu.open = !settingsMenu.open;

    if (settingsMenu.open) {
        settingsMenu.setAttribute("scale", "1 1 1")
    } else {
        settingsMenu.setAttribute("scale", "0 0 0")
    }
}

let openOptionMenu = () => {
    const settingsOptionMenu = document.getElementById('openOptionMenu');
    const testeEnvOption = document.getElementById('env_option');
    testeEnvOption.setAttribute("value", backgrounds[currentBackgroundIndex])

    // Toggle the open state
    settingsOptionMenu.open = !settingsOptionMenu.open;

    if (settingsOptionMenu.open) {
        settingsOptionMenu.setAttribute("scale", "1 1 1")
    } else {
        settingsOptionMenu.setAttribute("scale", "0 0 0")
    }
}

let openMenu = () => {
    // Toggle the open state
    menuScreen.open = !menuScreen.open;

    if (menuScreen.open) {
        menuScreen.setAttribute("scale", "0 0 0")
        $(openCloseIcon).attr('src', '#open_icon');
    } else {
        menuScreen.setAttribute("scale", "0.5 0.5 0.5")
        $(openCloseIcon).attr('src', '#close_icon');
    }
}

microphoneStatusBtn.addEventListener("click", () => {
    // Toggle the open state
    microphoneStatusBtn.open = !microphoneStatusBtn.open;

    if (microphoneStatusBtn.open) {
        microStatusText.setAttribute("value", "Unmute")
        microIcon.setAttribute("src", "#mute_mic_icon")
        clearInterval(recording);
    } else {
        microStatusText.setAttribute("value", "Mute")
        microIcon.setAttribute("src", "#mic_icon")
        recording = setInterval(function () {
            startColorTransition();
        }, 3000);
    }
})

function startColorTransition() {
    const microphone = document.getElementById("plane_mic_icon");
    const duration = 3000; // Transition duration in milliseconds
    const steps = 50; // Number of steps for the transition
    const startColor = [255, 0, 0]; // Red (RGB)
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

            step++;
        }
    }, interval);
}

let recording = setInterval(function () {
    startColorTransition();
}, 3000);