let intervalId;
let minutes = 1;
let seconds = 0;
let isTestRunning = true;
let score = 0;

let displayText = document.getElementById("displayText");
let displayUserInput = document.getElementById("displayUserInput");
let displayScore = document.getElementById("score");
let displayError = document.getElementById("error");
let startButton = document.getElementById('startButton');
let scene = document.querySelector('a-scene');

let transcript = '';

let lastRandomKey = null;
let randomText;

document.addEventListener('DOMContentLoaded', function () {
    // Check if the browser supports the Web Audio API
    if (!('webkitSpeechRecognition' in window)) {
        alert('Web Speech API is not supported in this browser. Please use a different browser.');
        return;
    }

    // Initialize annyang
    if (annyang) {
        // Add a command for speech recognition
        annyang.addCallback('result', function (phrases) {
            transcript = phrases[0];
            displayUserInput.setAttribute("value", transcript)

            // Compare the two strings
            compareStrings(randomText.body, transcript);
        });

        // Start listening to the microphone
        annyang.start();
    }
});

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
    displayText.setAttribute("value", "");
    annyang.abort()
    minutes = 1;
    seconds = 0;
    updateTimerDisplay();
    isTestRunning = true;
    startButton.setAttribute("src", "#play_texture");
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

function findDifference(str1, str2) {
    // Split the strings into arrays of words
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);

    // Find the first differing word
    for (let i = 0; i < Math.min(words1.length, words2.length); i++) {
        if (words1[i] !== words2[i]) {
            return {
                index: i,
                word: words1[i] || words2[i] // Return the differing word
            };
        }
    }

    // If one string is a prefix of the other, return the extra word
    if (words1.length !== words2.length) {
        const extraWord = words1.length > words2.length ? words1[words2.length] : words2[words1.length];
        return {
            index: Math.min(words1.length, words2.length),
            word: extraWord
        };
    }

    // If no difference is found, return null
    return null;
}

function compareStrings(str1, str2) {
    // Remove punctuation and convert to lowercase for case-insensitive comparison
    let cleanStr1 = removePunctuation(str1).toLowerCase();
    let cleanStr2 = removePunctuation(str2).toLowerCase();

    if (cleanStr2.charAt(0) === ' ') {
        // Remove the leading space
        cleanStr2 = cleanStr2.slice(1);
    }

    console.log(cleanStr1)
    console.log(cleanStr2)

    if (cleanStr1 === cleanStr2) {
        console.log("2 equal strings");
        score += 100;
        displayScore.setAttribute("value", score);
        displayError.setAttribute("value", ``)
        setTimeout(() => stopTest(), 5000)
    } else {
        console.log("The 2 strings are not equal");
        let difference = findDifference(cleanStr1, cleanStr2);
        displayError.setAttribute("value", `Found error at word: "${difference.word}"`)
        console.log(`Difference found at word ${difference.index + 1}: "${difference.word}"`);
    }
}

// Initial display
updateTimerDisplay();


let startTest = () => {
    startButton.setAttribute("src", "#pause_texture");
    annyang.start();
    startTimer();
    randomText = getRandomText()
    displayText.setAttribute("value", randomText.body);
    isTestRunning = false;
}

let toggleTest = () => {
    if (isTestRunning) {
        startTest();
    } else {
        stopTest();
    }
}