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
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector(".output");
const bg = document.querySelector("html");
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
  console.log(event.results);
  const guess = event.results[event.results.length-1];
  const word = guess[0].transcript;
  if(guess.isFinal){
    console.log(word);
  }
  // diagnostic.textContent = `${guess.transcript}`;
};
