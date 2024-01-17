let scene = document.querySelector("a-scene");
let assets = document.querySelector("a-assets");
let playerRightHand = document.getElementById("right-hand");
let entityId = '';

let letterModelsID = [];

// Function to get the x-position of an A-Frame entity by its ID
function getXPosition(entityId) {
    let entity = document.getElementById(entityId);

    // Check if the entity and necessary properties exist
    if (entity && entity.object3D && entity.object3D.position) {
        return entity.object3D.position.x;
    } else {
        console.error(`Entity with ID "${entityId}" not found or missing position information.`);
        return null;
    }
}

// Function to shuffle a string randomly
function shuffleString(inputString) {
    let characters = inputString.split('');

    for (let i = characters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    let shuffledString = characters.join('');
    return shuffledString;
}

// Function to create individual A-Frame entities for each letter in a string
function getIndividualLetters(str) {
    let shuffledString = shuffleString(str);
    let lettersArray = shuffledString.split('');

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
                class="draggable"
                gltf-model="#${lettersArray[i]}"
                rotation="90 0 0"
                position="${i * .4 - 1} ${yPos} -2"
                animation="property: scale; dur: 1; easing: easeInOutQuad; from: 1 1 1; to: 1.1 1.1 1.1; startEvents: mouseenter"
                animation__scale="property: scale; dur: 1; easing: easeInOutQuad; from: 1.1 1.1 1.1; to: 1 1 1; startEvents: mouseleave"
            ></a-entity>
            `;
            entityId = `id_${lettersArray[i]}_${i}`;

            // Example usage
            let xPosition;
            setTimeout(() => {
                xPosition = getXPosition(entityId);
                console.log("inside");

                if (xPosition !== null) {
                    console.log(`X position of entity "${entityId}": ${xPosition}`);
                }
            }, 5000);
        } else if (lettersArray[i] === lettersArray[i].toLowerCase()) {
            assetSrc.setAttribute("id", `${lettersArray[i]}_`);
            assetSrc.setAttribute("src", `https://raw.githubusercontent.com/ze-antunes/ARVI_Project/main/assets/3D_models/letters/${lettersArray[i]}_.glb`);

            htmlString = `
            <a-entity
                id="id_${lettersArray[i]}_${i}"
                color="white"
                class="draggable"
                gltf-model="#${lettersArray[i]}_"
                rotation="90 0 0"
                position="${i * .4 - 1} ${yPos} -2"
                animation="property: scale; dur: 1; easing: easeInOutQuad; from: 1 1 1; to: 1.1 1.1 1.1; startEvents: mouseenter"
                animation__scale="property: scale; dur: 1; easing: easeInOutQuad; from: 1.1 1.1 1.1; to: 1 1 1; startEvents: mouseleave"
                ></a-entity>
            `;
        }

        letterModelsID.push(`id_${lettersArray[i]}_${i}`);

        letterModel.innerHTML = htmlString;
        assets.append(assetSrc);
        scene.append(letterModel);
    }
}

// Dictionary API key and endpoint
let DicionaryApiKey = "001071f4-41e2-48c6-97cc-04f425b282d1";
let DicionaryApiEndpoint = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";

// Function to fetch and display the definition of a word from the dictionary API
function getDictionaryDefinition() {
    let word = document.getElementById("word-input").value.trim();

    if (!word) {
        alert("Please enter a word.");
        return;
    }

    fetch(`${DicionaryApiEndpoint}${word}?key=${DicionaryApiKey}`)
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                let definition = data[0].shortdef.join(", ");
                displayDefinition(definition);
            } else {
                displayDefinition("No definition found.");
            }
        })
        .catch((error) => {
            console.log("Error fetching word:", error);
            displayDefinition("No definition found.");
        });
}

// Function to display the definition in the HTML
function displayDefinition(definition) {
    document.getElementById("definition-container").innerText = definition;
}

// Function to fetch a random word
function getRandomWord() {
    fetch("https://random-word-api.herokuapp.com/word")
        .then((response) => response.json())
        .then((data) => {
            let word = data[0];
            displayWord(word);
        })
        .catch((error) => {
            console.error("Error fetching word:", error);
            displayWord(error);
        });
}

// Function to display the word in the HTML
function displayWord(word) {
    document.getElementById("word-container").innerText = word;
}

// Function to calculate the distance between two points
function calculateDistance(x1, y1, x2, y2) {
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;

    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance;
}

// Initial input string
let inputString = "Banana";
getIndividualLetters(inputString);

// Event listeners for drag controls
let sceneEl = document.querySelector('a-scene');
{
    let el = sceneEl.querySelector('[camera]');
    el.addEventListener('drag-controls:changed', (event) => {
        event.target.setAttribute('orbit-controls', 'enabled', !event.detail.active);
    });
}
{
    let onDragStart = (event) => {
        // event.target.setAttribute('color', 'DeepSkyBlue');
        console.log("onDragStart");
    };
    let onDragEnd = (event) => {
        // event.target.removeAttribute('color');
        console.log("onDragEnd");
    };
    let els = sceneEl.querySelectorAll('a-box.draggable');
    for (let i = 0; i < letterModelsID.length; i++) {
        let element = document.getElementById(letterModelsID[i]);
        element.addEventListener('dragstart', onDragStart);
        element.addEventListener('dragend', onDragEnd);
    }
}
