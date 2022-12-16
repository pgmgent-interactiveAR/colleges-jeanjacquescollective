const speechRecognitionApp = (() => {
  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
  const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
  const recognition = new SpeechRecognition();
  // speechRecognitionList.addFromString(grammar, 1);
  // recognition.grammars = SpeechGrammarList;
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const speechRecognitionList = new SpeechGrammarList();
  const subtitlesElement = document.querySelector(".subs");
  const subtitlesContainerElement = document.querySelector(
    ".app__subs__container"
  );

  const model = document.getElementById("model");
  const startButton = document.querySelector(".button--start");
  const stopButton = document.querySelector(".button--stop");
  const hideSubs = document.querySelector(".button--subs");
  const hideSubsCross = document.querySelector(".button--cross");

  const animationListObj = [
    {
      animationName: "hello",
    },
    {
      animationName: "goodbye",
    },
    {
      animationName: "sorry",
      target: 152,
      position: "0 -3 0",
    },
  ];

  const renderQue = [];

  const addEventListeners = () => {
    startButton.addEventListener("click", () => {
      startButton.classList.add("disabled");
      stopButton.classList.remove("disabled");
      recognition.start();
    });

    stopButton.addEventListener("click", () => {
      stopButton.classList.add("disabled");
      startButton.classList.remove("disabled");
      recognition.stop();
    });

    hideSubs.addEventListener("click", () => {
      subtitlesContainerElement.classList.toggle("hidden");
      hideSubsCross.classList.toggle("hidden");
    });

    recognition.addEventListener("result", (event) => {
      const guess = event.results[event.results.length - 1];
      const sentence = guess[0].transcript;
      // if(guess.isFinal){
      subtitlesElement.textContent += `${sentence}`;
      subtitlesElement.scrollTop =
        subtitlesElement.scrollHeight - subtitlesElement.clientHeight;
      display3DWord(sentence);
      //  }
    });
  };

  const display3DWord = (sentence) => {
    sentence.split(" ").forEach((word) => {
      const element = get3DElement(word);
      if (element !== undefined) {
        if (model.getAttribute("animation-mixer")) {
          renderQue.push(element);
          return;
        }
        nextAnimation(element);
      }
    });
  };

  const nextAnimation = ({
    animationName,
    target = 356,
    position = ".5 0 0",
  }) => {
    model.parentElement.setAttribute(
      "mindar-face-target",
      `anchorIndex: ${target}`
    );
    model.setAttribute("animation-mixer", {
      clip: `${animationName}`,
      loop: "once",
      crossFadeDuration: 0, // leave zero otherwise queue is directly finished
    });
    model.setAttribute("visible", true);
    model.setAttribute("position", position);
  };
  // nextButton.onclick = nextAnimation  // Switch to the next animation when the button is pressed.
  const animationStopped = document.body.addEventListener(
    "animation-finished",
    () => {
      // model.removeAttribute('animation-mixer');
      if (renderQue.length > 0) {
        nextAnimation(renderQue.shift());
        return;
      }
      model.removeAttribute("animation-mixer");
      model.setAttribute("visible", false);
    }
    
  );

  const get3DElement = (word) => {
    return animationListObj.find((element) => {
      return word === element.animationName;
    });
  };
  const init = () => {
    addEventListeners();
  } 
  init();
});

try {
  speechRecognitionApp();
} catch (e) {
  alert("webkitSpeechRecognition not available or other error.");
}
