const recognition = new webkitSpeechRecognition(); // For Chrome
let transcript = '';

recognition.onresult = function (event) {
    const currentTranscript = event.results[0][0].transcript;

    // // Check if there's a pause in speech
    // if (currentTranscript.endsWith(' ')) {
    //     transcript += currentTranscript.trim() + '. '; // Add a period and restart the sentence
    // } else {
    //     transcript += currentTranscript + ' '; // Continue the sentence
    // }
    console.log(currentTranscript);
};

recognition.onend = function () {
    // Restart the recognition after it ends
    recognition.start();
};

recognition.start();