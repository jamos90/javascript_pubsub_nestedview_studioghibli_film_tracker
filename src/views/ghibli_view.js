const PubSub = require('../helpers/pub_sub.js');


const GhibliView = function (container, film) {
  this.film = film;
  this.container = container;
}
