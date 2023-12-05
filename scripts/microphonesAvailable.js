// Check if the browser supports the MediaDevices API
if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    // Enumerate audio devices
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const microphones = devices.filter(device => device.kind === 'audioinput');

            if (microphones.length > 0) {
                // Display a list of available microphones
                const microphoneSelect = document.getElementById('microphoneSelect');

                microphones.forEach(microphone => {
                    const option = document.createElement('option');
                    option.value = microphone.deviceId;
                    option.text = microphone.label || `Microphone ${microphoneSelect.length + 1}`;
                    microphoneSelect.appendChild(option);
                });

                // Add event listener to update the selected microphone
                microphoneSelect.addEventListener('change', () => {
                    const selectedMicrophoneId = microphoneSelect.value;
                    console.log('Selected Microphone ID:', selectedMicrophoneId);

                    // Use the selected microphone with getUserMedia
                    const constraints = {
                        audio: { deviceId: selectedMicrophoneId }
                    };

                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(stream => {
                            console.log('Successfully accessed microphone:', stream);
                            // You can use the 'stream' object for further processing
                        })
                        .catch(error => {
                            console.error('Error accessing microphone:', error);
                        });
                });
            } else {
                console.log('No microphones found.');
            }
        })
        .catch(error => {
            console.error('Error enumerating devices:', error);
        });
} else {
    console.error('MediaDevices API not supported.');
}
