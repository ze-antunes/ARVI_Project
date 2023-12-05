let intervalId;
let minutes = 1;
let seconds = 0;

let displayText = document.getElementById("displayText");
let startButton = document.getElementById('startButton');
let scene = document.querySelector('a-scene');

const recognition = new webkitSpeechRecognition(); // For Chrome
let speechRecognitionStatus = false;
let transcript = '';

let lastRandomKey = null;
let randomText = getRandomText();
console.log(randomText.body);

let randomText1 = getRandomText();
console.log(randomText1.body);

let randomText2 = getRandomText();
console.log(randomText2.body);

let anotherString = "It matters not what someone is born, but what they grow to be.";
compareStrings(randomText.body, anotherString);

console.log(texts);

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    // Compare the two strings
    // compareStrings(randomText.body, anotherString);
    compareStrings(randomText.body, transcript);
};

recognition.onend = function () {
    if (speechRecognitionStatus) {
        // Restart the recognition after it ends
        recognition.start();
        console.log("recognition.start() ", speechRecognitionStatus);
    } else {
        recognition.stop(); // Stop speech recognition
        console.log("recognition.stop() ", speechRecognitionStatus);
    }
};

// ---------- 

function updateTimerDisplay() {
    document.getElementById("timer").setAttribute("value", `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
}

function startTimer() {
    intervalId = setInterval(function () {
        if (minutes === 0 && seconds === 0) {
            stopTest();
        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateTimerDisplay();
        }
    }, 1000);
}

function stopTest() {
    console.log("stopTest")
    clearInterval(intervalId);
    recognition.stop(); // Stop speech recognition
    minutes = 1;
    seconds = 0;
    updateTimerDisplay();
    startButton.setAttribute("onclick", "startTest()");
    speechRecognitionStatus = false;
}

// ----------------------------

function getRandomText() {
    const textKeys = Object.keys(texts);
    
    // Ensure the new random key is different from the last one
    let randomKey;
    do {
        randomKey = textKeys[Math.floor(Math.random() * textKeys.length)];
    } while (randomKey === lastRandomKey);
    
    lastRandomKey = randomKey; // Update the last chosen key
    console.log(randomKey);
    
    return texts[randomKey] || "Text or body not found.";
}

function removePunctuation(text) {
    // Remove punctuation using a regular expression
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function compareStrings(str1, str2) {
    // Remove punctuation and convert to lowercase for case-insensitive comparison
    const cleanStr1 = removePunctuation(str1).toLowerCase();
    const cleanStr2 = removePunctuation(str2).toLowerCase();
    
    if (cleanStr1 === cleanStr2) {
        console.log("2 equal strings");
    } else {
        console.log("The 2 strings are not equal");
    }
}


document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "e":
            stopTest();
            break;
        default:
            // Handle other key presses if needed
            break;
    }
});


// Initial display
updateTimerDisplay();


let startTest = () => {
    speechRecognitionStatus = true;
    recognition.start();
    startTimer();
    startButton.setAttribute("onclick", "");
}