let speech = new SpeechSynthesisUtterance();
let speechStatus = false;
let voices = [];
let voiceSelect = document.getElementById("voiceSelect");

function filterVoicesByLanguage(languages) {
    return voices.filter(voice => languages.includes(voice.lang));
}

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();

    // Filter voices by desired languages (e.g., Portuguese and English)
    const filteredVoices = filterVoicesByLanguage(['en-US', 'en-GB', 'pt-PT']);

    // Set the first voice from the filtered list
    if (filteredVoices.length > 0) {
        speech.voice = filteredVoices[0];
    }

    // Populate the dropdown with filtered voices
    filteredVoices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

speech.onend = function (event) {
    console.log('Speech ended after ' + event.elapsedTime + ' milliseconds.');
    // Your custom logic after speech ends
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.getElementById("listenBttn").addEventListener('click', () => {
    speech.text = test;
    typeText(test)
    // console.log(document.getElementById("speechText").value);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});

window.speechSynthesis.onerror = function (event) {
    console.error('Speech synthesis error:', event.error);
};