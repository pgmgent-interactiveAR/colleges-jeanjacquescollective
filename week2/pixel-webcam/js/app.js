import webcam from "./webcam-const.js";
import processor from "./processor.js"


const initApp = () => {
  webcam.init();
  processor.init();
}


document.addEventListener('DOMContentLoaded', initApp);
