// registering compontents
const App = {

  init() {
    this.cacheComponents();
    this.registerEventListeners();
  },
  cacheComponents(){
    this.$moveButton = document.querySelector('#btn-move');
    this.$attackButton = document.querySelector('#btn-attack');
    this.$eagle = document.querySelector('#eagle-model');
    console.log(this.$eagle);
  } , 
  registerEventListeners(){
    this.$moveButton.addEventListener('click', this.startFlying);
    this.$attackButton.addEventListener('click', this.startAttack);
  },

  startFlying () {
    if(document.querySelector('#eagle-model').getAttribute('animation')){
      document.querySelector('#eagle-model').removeAttribute('animation');
      // TODO: add code so eagle resets position
      return;
    }
    document.querySelector('#eagle-model').setAttribute('animation', 'property: position; dur: 3000; to: 0 0 10; loop: true');
  },
  startAttack () {
    document.querySelector('#eagle-model').setAttribute('animation-mixer','clip:attack; loop:once; timeScale: .3; crossFadeDuration: 2;');
    const animationStopped = document.body.addEventListener('animation-finished', () => {
      document.querySelector('#eagle-model').setAttribute('animation-mixer','clip:fly; loop:infinite; timeScale: .3; crossFadeDuration: 2;');
      document.body.removeEventListener('animation-finished', animationStopped);
    })
    
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let scene = document.querySelector('a-scene');
  let splash = document.querySelector('#splash');
  scene.addEventListener('loaded', function (e) {
      splash.style.display = 'none';
      App.init();
  });
});

