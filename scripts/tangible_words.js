let scene = document.querySelector("a-scene");
let assets = document.querySelector("a-assets");
let playerRightHand = document.getElementById("right-hand");

function shuffleString(inputString) {
    // Convert the string to an array of characters
    const characters = inputString.split('');

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    // Convert the shuffled array back to a string
    const shuffledString = characters.join('');
    return shuffledString;
}

function getIndividualLetters(str) {
    // Split the string into an array of letters
    const shuffledString = shuffleString(str);
    const lettersArray = shuffledString.split('');

    // Add each letter separately
    for (let i = 0; i < lettersArray.length; i++) {
        let assetSrc = document.createElement("a-asset-item");
        let letterModel = document.createElement("a-entity");
        let htmlString;
        let min = 0.7, max = 1.3;
        let yPos = (Math.random() * (max - min + 1) + min).toFixed(2);

        if (lettersArray[i] === lettersArray[i].toUpperCase()) {
            assetSrc.setAttribute("id", `${lettersArray[i]}`);
            assetSrc.setAttribute("src", `https://raw.githubusercontent.com/ze-antunes/ARVI_Project/main/assets/3D_models/letters/${lettersArray[i]}.glb`);

            htmlString = `
            <a-entity
                id="id_${lettersArray[i]}_${i}"
                color="white"
                gltf-model="#${lettersArray[i]}"
                rotation="90 0 0"
                position="${i * .4 - 1} ${yPos} -2"
                onclick="grabLetter(id_${lettersArray[i]}_${i})"
                animation="property: scale; dur: 1; easing: easeInOutQuad; from: 1 1 1; to: 1.1 1.1 1.1; startEvents: mouseenter"
                animation__scale="property: scale; dur: 1; easing: easeInOutQuad; from: 1.1 1.1 1.1; to: 1 1 1; startEvents: mouseleave"
            ></a-entity>
            `;
        } else if (lettersArray[i] === lettersArray[i].toLowerCase()) {
            assetSrc.setAttribute("id", `${lettersArray[i]}_`);
            assetSrc.setAttribute("src", `https://raw.githubusercontent.com/ze-antunes/ARVI_Project/main/assets/3D_models/letters/${lettersArray[i]}_.glb`);

            htmlString = `
            <a-entity
                id="id_${lettersArray[i]}_${i}"
                color="white"
                gltf-model="#${lettersArray[i]}_"
                rotation="90 0 0"
                position="${i * .4 - 1} ${yPos} -2"
                onclick="grabLetter(id_${lettersArray[i]}_${i})"
                animation="property: scale; dur: 1; easing: easeInOutQuad; from: 1 1 1; to: 1.1 1.1 1.1; startEvents: mouseenter"
                animation__scale="property: scale; dur: 1; easing: easeInOutQuad; from: 1.1 1.1 1.1; to: 1 1 1; startEvents: mouseleave"
                ></a-entity>
            `;
        }

        letterModel.innerHTML = htmlString;
        assets.append(assetSrc);
        scene.append(letterModel);
    }
}



let DicionaryApiKey = "001071f4-41e2-48c6-97cc-04f425b282d1";
let DicionaryApiEndpoint = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

function getDictionaryDefinition() {
    const word = document.getElementById("word-input").value.trim();

    if (!word) {
        alert("Please enter a word.");
        return;
    }
    
    fetch(`${DicionaryApiEndpoint}${word}?key=${DicionaryApiKey}`)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                const definition = data[0].shortdef.join(", ");
                displayDefinition(definition);
            } else {
                displayDefinition("No definition found.");
            }
        })
        .catch((error) => {
            console.log("Error fetching word:", error)
            displayDefinition("No definition found.");
        });
    }
    
    function displayDefinition(definition) {
        document.getElementById("definition-container").innerText = definition;
    }

    
function getRandomWord2() {
    fetch("https://random-word-api.herokuapp.com/word")
    .then((response) => response.json())
    .then((data) => {
            const word = data[0];
            displayWord2(word);
        })
        .catch((error) => {
            console.error("Error fetching word:", error)
            displayWord2(error);
        });
    }
    
    function displayWord(word) {
        document.getElementById("word-container").innerText = word;
}

let inputString = "Banana";
getIndividualLetters(inputString);

let grabLetter = (id) => {
    console.log(id);
    // console.log(id.object3D.position);
    // console.log(playerRightHand.object3D.position);
    id.addEventListener("mousemove", () => {
        console.log("teste")
    })
    setInterval(() => {
        id.object3D.position.x += playerRightHand.object3D.position.x;
    }, 1)
}

AFRAME.registerComponent('grabbable', {
    init: function () {
        this.el.addEventListener('mousedown', this.grabObject.bind(this));
        this.el.addEventListener('mouseup', this.releaseObject.bind(this));
    },
    grabObject: function () {
        this.el.setAttribute('kinematic-body', 'enabled', false);
        this.el.setAttribute('dynamic-body', 'enabled', true);
    },
    releaseObject: function () {
        this.el.setAttribute('kinematic-body', 'enabled', true);
        this.el.setAttribute('dynamic-body', 'enabled', false);
    },
});

AFRAME.registerComponent('stretchable', {
    init: function () {
        this.originalScale = this.el.getAttribute('scale');
        this.el.addEventListener('stretchstart', this.stretchStart.bind(this));
        this.el.addEventListener('stretchend', this.stretchEnd.bind(this));
    },
    stretchStart: function (event) {
        this.stretched = true;
    },
    stretchEnd: function (event) {
        this.stretched = false;
    },
    tick: function () {
        if (this.stretched) {
            const scale = this.el.getAttribute('scale');
            scale.x = this.originalScale.x * event.detail.stretch;
            scale.y = this.originalScale.y * event.detail.stretch;
            scale.z = this.originalScale.z * event.detail.stretch;
            this.el.setAttribute('scale', scale);
        }
    },
});

document.addEventListener('DOMContentLoaded', function () {
    const movableObject = document.getElementById('movableObject');
    let isDragging = false;

    movableObject.addEventListener('mousedown', function () {
        isDragging = true;
    });

    movableObject.addEventListener('mouseup', function () {
        isDragging = false;
    });

    document.addEventListener('controllerconnected', function (event) {
        const controller = event.detail;
        const hand = controller.getAttribute('hand');
        const handEntity = document.getElementById(hand);

        handEntity.addEventListener('axismove', function (event) {
            if (isDragging) {
                const position = movableObject.getAttribute('position');
                position.x += event.detail.axis[0] * 0.1; // Adjust the speed as needed
                position.y += event.detail.axis[1] * 0.1;
                movableObject.setAttribute('position', position);
            }
        });
    });
});