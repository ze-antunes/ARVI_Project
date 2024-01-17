let speech = new SpeechSynthesisUtterance();
let speechStatus = false;
let voices = [];
let voiceSelect = document.getElementById("voiceSelect");

// Function to filter voices by language
function filterVoicesByLanguage(languages) {
    return voices.filter(voice => languages.includes(voice.lang));
}

// Function to set the selected index of the voice dropdown
function setSelectedVoiceIndex() {
    const selectedVoiceIndex = voices.indexOf(speech.voice);
    voiceSelect.selectedIndex = selectedVoiceIndex !== -1 ? selectedVoiceIndex : 0;
}

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();

    // Filter voices by desired languages (English and Portuguese)
    const filteredVoices = filterVoicesByLanguage(['en-US', 'en-GB', 'pt-PT']);

    // Set the first voice from the filtered list (English as default)
    const defaultVoice = filteredVoices.find(voice => voice.lang.startsWith('en')) || filteredVoices[0];
    speech.voice = defaultVoice;

    // Populate the dropdown with filtered voices
    filteredVoices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });

    // Set the selected index of the voice dropdown
    setSelectedVoiceIndex();
};

speech.onend = function (event) {
    console.log('Speech ended after ' + event.elapsedTime + ' milliseconds.');
    // Update the selected index of the voice dropdown
    setSelectedVoiceIndex();
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.getElementById("listenBttn").addEventListener('click', () => {
    speech.text = text;
    typeText(text)
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});

window.speechSynthesis.onerror = function (event) {
    console.error('Speech synthesis error:', event.error);
};
