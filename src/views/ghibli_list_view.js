const GhibliView = require('./ghibli_view.js');
const GhibliViewMultiple = require('./ghibli_view_multiple.js');
const PubSub = require('../helpers/pub_sub.js');


const GhibliListView = function (container) {
  this.container = container;
};

GhibliListView.prototype.bindEvents = function () {
  PubSub.subscribe('Ghibli:slected-film-sent-to-view', (evt)=>{
    const selectedFilm = evt.detail;
    this.renderFilm(selectedFilm);
  });
  PubSub.subscribe('Ghibli:director-filtered-list-ready', (evt) =>{
    const directorData = evt.detail;
    console.log('correct director data passed',directorData);
    this.renderDirectorsFilms(directorData);
  });

//   PubSub.subscribe('Ghibli:characters-film-info', (evt) =>{
//     const charactersFilms = evt.detail;
//     this.renderFilm(charactersFilms);
//   });
  };

GhibliListView.prototype.renderDirectorsFilms = function (selectedData) {
  this.container.innerHTML = "";
   const selectedFilms = new GhibliViewMultiple(this.container, selectedData);
  selectedFilms.render();
};

GhibliListView.prototype.renderFilm = function (selectedData) {
  this.container.innerHTML = "";
  selectedFilm = new GhibliView(this.container, selectedData);
  selectedFilm.render();
};

GhibliListView.prototype.render = function (filmData) {
  this.container.innerHTML = "";
  filmData.forEach((film) =>{
    const filmView = new GhibliView(this.container, film);
    filmView.render();
  });
};


module.exports = GhibliListView;
