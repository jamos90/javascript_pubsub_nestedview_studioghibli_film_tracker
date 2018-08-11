const GhibliView = require('./ghibli_view.js');
const PubSub = require('../helpers/pub_sub.js');


const GhibliListView = function (container) {
  this.container = container;
};

GhibliListView.prototype.bindEvents = function () {
  PubSub.subscribe('Ghibli:film-data-ready', (evt) =>{
    const filmsData = evt.detail;
    console.log('list view', filmsData);
    this.render(filmsData);
  });
  PubSub.subscribe('Ghibli:slected-film-sent-to-view', (evt)=>{
    const selectedFilm = evt.detail;
    this.renderFilm(selectedFilm);
  });
};

GhibliListView.prototype.renderFilm = function (selectedFilm) {
  this.innerHTML = '';
  selectedFilm = new GhibliView(this.container, selectedFilm);
  selectedFilm.render();
};

GhibliListView.prototype.render = function (filmData) {
  this.innerHTML = '';
  filmData.forEach((film) =>{
    const filmView = new GhibliView(this.container, film);
    filmView.render();
  });
};


module.exports = GhibliListView;
