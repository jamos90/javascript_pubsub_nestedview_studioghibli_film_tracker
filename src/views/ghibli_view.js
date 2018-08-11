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

  const filmDetails = this.createList()
  filmContainer.appendChild(filmDetails);


};

GhibliView.prototype.createFilmHeader = function () {
  const filmHeader = document.createElement('h1');
  filmHeader.textContent = this.film.title;
  return filmHeader
};

GhibliView.prototype.createList = function () {
  const filmInfoList = document.createElement('ul');
  this.populateList(filmInfoList);
  return filmInfoList;

};

GhibliView.prototype.populateList= function (filmInfo) {
    const filmDescription = document.createElement('li');
    const filmRating = document.createElement('li');
    const pageBreak = document.createElement('br');
    filmDescription.textContent =`Film description:  ${this.film.description}`;
    filmRating.textContent = `Rotten Tomatoes rating:  ${this.film.rtScore}`;
    filmInfo.appendChild(filmDescription);
    filmInfo.appendChild(pageBreak);
    filmInfo.appendChild(filmRating);

};




module.exports = GhibliView;
