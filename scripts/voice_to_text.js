let click_to_record = document.getElementById("click_to_record")
let request = document.getElementById("request")
let test;


let voiceText = "Who was the F1 Champion in the year 2000?"

document.addEventListener('DOMContentLoaded', function () {
    console.log("teste annyang")
    // Check if the browser supports the Web Audio API
    if (!('webkitSpeechRecognition' in window)) {
        alert('Web Speech API is not supported in this browser. Please use a different browser.');
        return;
    }

    // Initialize annyang
    if (annyang) {
        // Add a command for speech recognition
        annyang.addCallback('result', function (phrases) {
            // Display the recognized text
            document.getElementById("player_voice_input").setAttribute("value", phrases[0]);
            voiceText = phrases[0];
        });

        // Start listening to the microphone
        annyang.start();
    }
});

document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "o":
            annyang.addCommands({
                'hello': function () {
                    console.log('Hello!');
                },
            });

            annyang.start();
            break;
        case "p":
            annyang.removeCommands();
            annyang.abort();
            break;
        default:
            // Handle other key presses if needed
            break;
    }
});

request.addEventListener('click', function () {
    fetchData(voiceText);
})

let fetchData = (body) => {
    // Show loader
    document.getElementById('loader').setAttribute("visible", true)

    // Record the start time
    const startTime = new Date().getTime();
    
    fetch('https://arviproject--jprantunes2000.repl.co/find-complexity', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({ prompt: `${body}` })
    })
        .then((response) => {
            console.log(body);
            return response.json();
        })
        .then((responseData) => {
            // Hide loader
            document.getElementById('loader').setAttribute("visible", false)

            // Record the end time
            const endTime = new Date().getTime();

            // Calculate the time taken
            const timeTaken = endTime - startTime;

            // Do something with the data
            console.log('Time taken:', timeTaken + 'ms');

            //--------------
            console.log(responseData)
            speech.text = responseData.data;
            test = responseData.data;
            typeText(test)
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(speech);
            window.speechSynthesis.onerror = function (event) {
                console.error('Speech synthesis error:', event.error);
            };
        })
        .catch((error) => {
            throw error;
        });
}

