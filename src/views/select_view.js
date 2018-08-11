const PubSub = require('../helpers/pub_sub.js');


const SelectView = function(container) {
  this.container = container;
  this.films = null;
}

SelectView.prototype.bindEvents = function (){
  PubSub.subscribe('Ghibli:film-data-ready', (evt)=>{
    const allFilms = evt.detail;
    this.populateDropDown(allFilms);
  });
  this.container.addEventListener('change', (evt) =>{
    const selectedFilm = evt.target.value;
    console.log(selectedFilm)
    PubSub.publish('SelectView:select-film-ready', selectedFilm);
  });
}


  SelectView.prototype.populateDropDown = function (filmData) {
    const filmTitle = filmData.forEach((film, index) =>{
      const listOption = document.createElement('option');
      listOption.textContent = film.title
      listOption.value = index;
      this.container.appendChild(listOption);
    });

  };

  module.exports = SelectView;
