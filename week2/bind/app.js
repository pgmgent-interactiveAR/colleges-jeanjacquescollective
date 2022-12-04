// in principe is een IIFE hier niet nodig
const app = {

  init() {
    this.cacheElements();
    this.addEventListeners();
  },

  cacheElements () {
    this.$click = document.querySelector('.click');
  },

  addEventListeners () {
    // bij deze aanroeping gaat this slaan op het element waarop geklikt is
    document.querySelector('.click').addEventListener('click', this.displayThis);
    // hier gaat this slaan op de volledige const, het 2e en de 3e argument van bind kan als parameter gebruikt worden.
    document.querySelector('.click-w-bind').addEventListener('click', (this.displayThisBind.bind(this, 5, 6)));
    // document.querySelector('.click-w-bind').addEventListener('click', () => {this.displayThisBind(5,6)});
  },

  displayThis () {
    // this.$click.classList.add('test');
    console.log(this);
  },

  displayThisBind (value1, value2) {
    this.$click.classList.add('test');
    console.log(value1, value2);
  }
};

app.init()