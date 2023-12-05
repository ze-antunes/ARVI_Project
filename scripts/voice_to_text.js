let click_to_record = document.getElementById("click_to_record")
let request = document.getElementById("request")
let test;


let voiceText = "Who was the F1 Champion in the year 2000?"

click_to_record.addEventListener('click', function () {
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        let transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("convert_text").innerText = transcript;
        console.log(transcript);
        voiceText = transcript;
    });

    if (speech == true) {
        recognition.start();
    }
})

request.addEventListener('click', function () {
    postRequestTest(voiceText);
})

let postRequestTest = (body) => {
    fetch('http://127.0.0.1:5000/find-complexity', {
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

