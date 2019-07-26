const btn = document.querySelector('.talk');
const content = document.querySelector('.content');



// greetings when received speech
const greetings = [
    'I am good you little piece of shit',
    'Doing good nibba',
    'Hey you, yes you. Leave me alone',
    'Why do you need?',
    'When did you start caring about me?'
];

const weather = [
    'Weather is better than you',
    'Weather is better than your heart',
    'Weather is warmer than your ex\'s heart',
    'You probably need a tan, go outside',
    'Why do you care? You never leave the house anyway.'
];

const caring = [
    'I hate you',
    'Don\'t talk to me again',
    'Oh wow, do you even care about me?',
    'When did you start caring about me? I hate you. Go away.',
    'No way. Buzz off'
];

const time = [
    'Why do you need? Just go to sleep.',
    'Why do you need? You only like to sleep',
    'It\'s sleep o\'clock.'
];




const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    console.log('Voice activated!!');
};

recognition.onresult = function(e){
    console.log(e);
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    content.textContent = transcript;

    readOutLoud(transcript);
};


// add the listener
btn.addEventListener('click', () => {
    recognition.start();
});


function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = 'I didn\'t understand what you said';

    if (message.includes('how are you')) {
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    } else if (message.includes('weather')) {
        const finalText = weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalText;
    } else if (message.includes('love') || message.includes('care')) {
        const finalText = caring[Math.floor(Math.random() * caring.length)];
        speech.text = finalText;
    } else if (message.includes('time')) {
        const finalText = time[Math.floor(Math.random() * time.length)];
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    // speech.voice = voices[48];

    window.speechSynthesis.speak(speech);
}