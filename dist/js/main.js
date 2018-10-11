// Init Speech Synthesis API
const synth = window.speechSynthesis;

// DOM Elemets
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    // Loop through voices and create an option for each one
    voices.forEach(voice => {
        // Creat an option element
        const option = document.createElement('option');
        // Fill option with voic and language
        option.textContent = voice.name + '(' + voice.lang + ')';
        
        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak 
const speak =  () => {
    
    // Check if sepaking
    if (synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if (textInput.value !== '') {
        // Add body background
        body.style.background = '#333';
        // Get speakText
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        console.log(speakText);
        // Speak end
        speakText.onend = e => {
            console.log('Done Speaking...');
            body.style.background = '#141414';
        }

        // Speak error
        speakText.onerror = e => {
            console.log('Something went wrong');
        }

        // Select Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice => {
            if (selectedVoice === voice.name) {
                speakText.voice = voice;
            }
        });

        // Set Pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
};

// Event Listener

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();

    textInput.blur();
});

// Rate Value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
// Pitch Value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice Select Change
voiceSelect.addEventListener('change', e => speak());
