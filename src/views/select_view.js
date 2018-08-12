const PubSub = require('../helpers/pub_sub.js');


const SelectView = function(container, select) {
  this.container = container;
  this.secondSelect = select;
  this.films = null;
}

SelectView.prototype.bindEvents = function (){
  PubSub.subscribe('Ghibli:film-data-ready', (evt)=>{
    const allFilms = evt.detail;
    this.populateDropDown(allFilms);
    this.populateDirectorDropDown(allFilms);
  });

  this.container.addEventListener('change', (evt) =>{
    const selectedFilm = evt.target.value;
    console.log(selectedFilm)
    PubSub.publish('SelectView:select-film-ready', selectedFilm);
  });

  this.secondSelect.addEventListener('change',(evt) =>{
    const selectedDirector = evt.target.value;
    PubSub.publish('SelectView:selected-director-ready', selectedDirector);
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

  SelectView.prototype.populateDirectorDropDown = function (filmData) {
    const directors = filmData.forEach((film) => {
     const listOption = document.createElement('option');
     listOption.textContent = film.director;
     this.secondSelect.appendChild(listOption);
    });
  };

  module.exports = SelectView;
