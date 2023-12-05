let playerCamera = document.getElementById("camera");
let playerLeftHand = document.getElementById("left-hand");
let playerRightHand = document.getElementById("right-hand");
let menuScreen = document.getElementById("screen");
let test_right_hand_coord = document.getElementById("test_right_hand_coord");

console.log(playerRightHand);

let updateMenuPosition = () => {
    setInterval(() => {
        // console.log(playerCamera.object3D.position.x);
        // console.log(playerRightHand);
        $(menuScreen).attr('position', `${playerCamera.object3D.position.x} 1.6 ${playerCamera.object3D.position.z - 3}`);
        $(test_right_hand_coord).attr('value', `${playerRightHand.object3D.position.x.toFixed(2)} \n${playerRightHand.object3D.position.y.toFixed(2)} \n${playerRightHand.object3D.position.z.toFixed(2)}`);
    }, 1000)
};

// window.addEventListener("mousemove", function (event) {
//     var mouseX = event.clientX;
//     var mouseY = event.clientY;
//     console.log("Mouse X position: " + mouseX + ", Mouse Y position: " + mouseY);
// });

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