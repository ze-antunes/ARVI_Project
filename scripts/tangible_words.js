let scene = document.querySelector("a-scene");
let assets = document.querySelector("a-assets");
let playerRightHand = document.getElementById("right-hand");

let lettersElementIdArray = [];

function shuffleString(inputString) {
    const characters = inputString.split('');

    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

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
                animation="property: scale; dur: 1; easing: easeInOutQuad; from: 1 1 1; to: 1.1 1.1 1.1; startEvents: mouseenter"
                animation__scale="property: scale; dur: 1; easing: easeInOutQuad; from: 1.1 1.1 1.1; to: 1 1 1; startEvents: mouseleave"
            ></a-entity>
            `;

            lettersElementIdArray.push(`id_${lettersArray[i]}_${i}`)
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
                animation="property: scale; dur: 1; easing: easeInOutQuad; from: 1 1 1; to: 1.1 1.1 1.1; startEvents: mouseenter"
                animation__scale="property: scale; dur: 1; easing: easeInOutQuad; from: 1.1 1.1 1.1; to: 1 1 1; startEvents: mouseleave"
                ></a-entity>
            `;

            lettersElementIdArray.push(`id_${lettersArray[i]}_${i}`)
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

let currentIndex = 0;
let dragObject = (object) => {
    object.addEventListener("mousedown", () => {
        let posX = object.object3D.position.x + playerRightHand.object3D.position.x
        let posY = object.object3D.position.y + playerRightHand.object3D.position.y
        let posZ = object.object3D.position.z
        console.log(object.object3D.position);
        object.setAttribute('position', { x: posX, y: posY, z: posZ });
    })
}

function updatePosition() {
    // Update position for the current element
    if (currentIndex < lettersElementIdArray.length) {
        const element = lettersElementIdArray[currentIndex];
        let tagElement = document.getElementById(element)
        dragObject(tagElement);
        // let posX = tagElement.object3D.position.x + playerRightHand.object3D.position.x
        // let posY = tagElement.object3D.position.y + playerRightHand.object3D.position.y
        // let posZ = tagElement.object3D.position.z
        // tagElement.setAttribute('position', { x: , y: , z:  });
        // console.log(tagElement.object3D.position.x)
        currentIndex++;
    } else {
        currentIndex = 0; // Reset to the beginning when reaching the end
    }

    // Request the next animation frame
    requestAnimationFrame(updatePosition);
}

// Start the animation loop
updatePosition();