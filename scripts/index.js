let playerCamera = document.getElementById("camera");
let playerLeftHand = document.getElementById("left-hand");
let playerRightHand = document.getElementById("right-hand");
let menuScreen = document.getElementById("screen");

console.log(playerRightHand);

let updateMenuPosition = () => {
    setInterval(() => {
        $(menuScreen).attr('position', `${playerCamera.object3D.position.x} 1.6 ${playerCamera.object3D.position.z - 3}`);
    }, 1)
};

updateMenuPosition();

let openSettings = () => {
    console.log("openSettings");
    const settingsMenu = document.getElementById('settingsMenu');

    // Toggle the open state
    settingsMenu.open = !settingsMenu.open;
    console.log(settingsMenu.open);

    if (settingsMenu.open) {
        settingsMenu.setAttribute("scale", "1 1 1")
    } else {
        settingsMenu.setAttribute("scale", "0 0 0")
    }
}

let openOptionMenu = () => {
    console.log("openOptionMenu");
    const settingsOptionMenu = document.getElementById('openOptionMenu');
    const testeEnvOption = document.getElementById('env_option');
    testeEnvOption.setAttribute("value",backgrounds[currentBackgroundIndex])


    // Toggle the open state
    settingsOptionMenu.open = !settingsOptionMenu.open;
    console.log(settingsOptionMenu.open);

    if (settingsOptionMenu.open) {
        settingsOptionMenu.setAttribute("scale", "1 1 1")
    } else {
        settingsOptionMenu.setAttribute("scale", "0 0 0")
    }
}