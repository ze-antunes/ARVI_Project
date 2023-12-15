let playerCamera = document.getElementById("camera");
let playerLeftHand = document.getElementById("left-hand");
let playerRightHand = document.getElementById("right-hand");
let scene = document.querySelector("a-scene");
let assets = document.querySelector("a-assets");

let getModelDimensions = (letterModelID) => {
    return new Promise((resolve, reject) => {
        document.addEventListener('DOMContentLoaded', function () {
            const modelEntity = document.getElementById(`${letterModelID}`);
            modelEntity.addEventListener('model-loaded', function () {
                // Access the mesh
                const mesh = modelEntity.getObject3D('mesh');
                console.log(modelEntity)
                console.log(mesh)

                // Check if the mesh exists and has geometry
                if (mesh && mesh.children) {
                    // Compute the bounding box
                    // mesh.geometry.computeBoundingBox();

                    // Get the bounding box
                    const boundingBox = mesh.children[0].geometry.boundingBox;
                    // console.log(boundingBox);

                    // Calculate dimensions
                    const width = boundingBox.max.x - boundingBox.min.x;
                    const height = boundingBox.max.y - boundingBox.min.y;
                    const depth = boundingBox.max.z - boundingBox.min.z;

                    resolve({ width, height, depth });
                } else {
                    reject("Mesh or geometry not found.");
                }
            });
        });
    });
};

function getIndividualLetters(str) {
    // Split the string into an array of individual letters
    const lettersArray = str.split('');

    // Add each letter separately
    for (let i = 0; i < lettersArray.length; i++) {
        let assetSrc = document.createElement("a-asset-item");
        let letterModel = document.createElement("a-entity");
        let htmlString;
        if (lettersArray[i] === lettersArray[i].toUpperCase()) {
            assetSrc.setAttribute("id", `${lettersArray[i]}`);
            // assetSrc.setAttribute("src", `../assets/3D_models/letters/${lettersArray[i]}.glb`);
            assetSrc.setAttribute("src", `https://raw.githubusercontent.com/ze-antunes/ARVI_Project/main/assets/3D_models/letters/${lettersArray[i]}.glb`);

            htmlString = `
                            <a-entity
                                id="id_${lettersArray[i]}_${i}"
                                color="white"
                                gltf-model="#${lettersArray[i]}"
                                rotation="0 90 0"
                            ></a-entity>
                            `;
        } else if (lettersArray[i] === lettersArray[i].toLowerCase()) {
            assetSrc.setAttribute("id", `${lettersArray[i]}_`);
            // assetSrc.setAttribute("src", `../assets/3D_models/letters/${lettersArray[i]}_.glb`);
            assetSrc.setAttribute("src", `https://raw.githubusercontent.com/ze-antunes/ARVI_Project/main/assets/3D_models/letters/${lettersArray[i]}_.glb`);

            htmlString = `
                            <a-entity
                                id="id_${lettersArray[i]}_${i}"
                                color="white"
                                gltf-model="#${lettersArray[i]}_"
                                rotation="0 90 0"
                            ></a-entity>
                            `;
        }

        letterModel.innerHTML = htmlString;
        assets.append(assetSrc);
        scene.append(letterModel);
        // playerRightHand.append(letterModel);
    }
    ajustKerning(str);
}

function ajustKerning(str) {
    // Split the string into an array of individual letters
    const lettersArray = str.split('');
    let halfPreviousLetterWidth = 0;

    // Add each letter separately
    let cumulativeWidth = 0;  // Variable to store cumulative width

    for (let i = 0; i < lettersArray.length; i++) {
        let letterModelElement;

        if (lettersArray[i] === lettersArray[i].toUpperCase()) {
            letterModelElement = document.getElementById(`id_${lettersArray[i]}_${i}`);
        } else if (lettersArray[i] === lettersArray[i].toLowerCase()) {
            letterModelElement = document.getElementById(`id_${lettersArray[i]}_${i}`);
        }

        if (letterModelElement) {
            getModelDimensions(letterModelElement.id)
                .then(dimensions => {
                    // console.log("halfPreviousLetterWidth: ", halfPreviousLetterWidth);
                    // Set the position attribute with the cumulative width
                    cumulativeWidth += dimensions.width / 2 + 0.04 + halfPreviousLetterWidth;  // Accumulate the width
                    letterModelElement.setAttribute("position", `0 1.4 -${cumulativeWidth}`);
                    // console.log(letterModelElement.getAttribute("position"))
                    halfPreviousLetterWidth = dimensions.width / 2;
                    // console.log("width ", dimensions.width);
                    // console.log(cumulativeWidth);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}



let inputString = "Hello";
getIndividualLetters(inputString);
