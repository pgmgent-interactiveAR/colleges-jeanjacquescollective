const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = SpeechGrammarList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const subtitlesElement = document.querySelector(".subs");
const startButton = document.querySelector(".button--start");
const stopButton = document.querySelector(".button--stop");

startButton.onclick = () => {
  startButton.classList.add("disabled");
  stopButton.classList.remove("disabled");
  recognition.start();
};

stopButton.onclick = () => {
  stopButton.classList.add("disabled");
  startButton.classList.remove("disabled");
  recognition.stop();
};

recognition.onresult = (event) => {
  const guess = event.results[event.results.length-1];
  const sentence = guess[0].transcript;
  // if(guess.isFinal){
    subtitlesElement.textContent += `${sentence}`;
    subtitlesElement.scrollTop = subtitlesElement.scrollHeight - subtitlesElement.clientHeight;
    display3DWord(sentence)
//  }
};

display3DWord = (word) => {
  
}
