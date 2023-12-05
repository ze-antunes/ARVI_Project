let playerCamera = document.getElementById("camera");
let playerLeftHand = document.getElementById("left-hand");
let playerRightHand = document.getElementById("right-hand");
let menuScreen = document.getElementById("screen");

console.log(playerRightHand);

let updateMenuPosition = () => {
    setInterval(() => {
        // console.log(playerCamera.object3D.position.x);
        $(menuScreen).attr('position', `${playerCamera.object3D.position.x} 1.6 ${playerCamera.object3D.position.z - 3}`);
    }, 1)
};

// window.addEventListener("mousemove", function (event) {
//     var mouseX = event.clientX;
//     var mouseY = event.clientY;
//     console.log("Mouse X position: " + mouseX + ", Mouse Y position: " + mouseY);
// });

updateMenuPosition();

let openSettings = () => {
console.log("openSettings");
}