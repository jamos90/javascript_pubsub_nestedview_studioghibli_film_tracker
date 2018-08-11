const PubSub = require('../helpers/pub_sub.js');
const GhibliListView = require('./ghibli_list_view.js');


const GhibliView = function (container, film) {
  this.film = film;
  this.container = container;
}

GhibliView.prototype.render = function () {
  const filmContainer = document.createElement('div');
  this.container.appendChild(filmContainer);

  const title = this.createFilmHeader();
  filmContainer.appendChild(title);

};

GhibliView.prototype.createFilmHeader = function () {
  const filmHeader = document.createElement('h1');
  filmHeader.textContent = this.film.title;
  return filmHeader
};

module.exports = GhibliView;
