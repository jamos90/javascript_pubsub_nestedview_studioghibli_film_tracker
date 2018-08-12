const PubSub = require('../helpers/pub_sub.js');


const SelectView = function(container, select, selector) {
  this.container = container;
  this.secondSelect = select;
  this.thirdSelect = selector;
  this.films = null;
}

SelectView.prototype.bindEvents = function (){
  PubSub.subscribe('Ghibli:film-data-ready', (evt)=>{
    const allFilms = evt.detail;
    this.populateDropDown(allFilms);
    this.populateDirectorDropDown(allFilms);
  });

  PubSub.subscribe('Ghibli:people-data-ready', (evt) =>{
    const allCharacters = evt.detail;
    this.populateCharacterDropDown(allCharacters);
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

  this.thirdSelect.addEventListener('change',(evt) => {
    const selectedCharacter = evt.target.value;
    PubSub.publish('SelectView:selected-character-ready', selectedCharacter)
    console.log(selectedCharacter);
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

  SelectView.prototype.populateCharacterDropDown = function (characterData) {
    const characters = characterData.forEach((character) => {
      const listOption = document.createElement('option');
      listOption.textContent = character.name;
      this.thirdSelect.appendChild(listOption);
    });
  };

  module.exports = SelectView;
