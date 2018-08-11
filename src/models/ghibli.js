const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Ghibli = function () {
  this.films = null;
  this.people = null;
};



Ghibli.prototype.getDataFilm = function () {
  const requestHelperFilms = new RequestHelper('https://ghibliapi.herokuapp.com/films');
  const requestHelperPeople = new RequestHelper('https://ghibliapi.herokuapp.com/people/');

    requestHelperFilms.get()
    .then((data) => {
      // console.log('all data:', data);
     this.formatFilmData(data);
     PubSub.publish('Ghibli:film-data-ready', this.films);
     // console.log(this.films);
    })
    .catch((err) => {
      console.error(err);
    });

    requestHelperPeople.get()
    .then((data) => {
      // console.log('all data people', data);
      this.formatPeopleData(data);
      PubSub.publish('Ghibli:people-data-ready', this.people);
    });
 }

 Ghibli.prototype.bindEvents = function(){
   PubSub.subscribe('SelectView:select-film-ready', (evt) =>{
     const selectedIndex = evt.detail;
     const selectedFilm = this.films[selectedIndex];
     PubSub.publish('Ghibli:slected-film-sent-to-view', selectedFilm);
   });

 }

Ghibli.prototype.formatFilmData = function (filmData) {
  this.films = filmData.map((film) => {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rtScore: film.rt_score,
      characters: this.people
    }
  });
  // console.log(this.films);
};

Ghibli.prototype.filmCharacterInformation = function (filmData) {
  const film = filmData.forEach((film) => {
   const filmCharacters = film.people.forEach((character) => {
    const characterRequest = new RequestHelper(filmCharacters);
      characterRequest.get()
      .then((data) => {
       this.people = data;
     });
     console.log(this.people);
    });
  });
};


Ghibli.prototype.formatPeopleData = function (peopleData) {
  this.people = peopleData.map((person) => {
    return {
      id: person.id,
      name: person.name,
      films: person.films
      }
    });
  console.log('people', this.people);
};

Ghibli.prototype.getFilmForCharacter = function (peopleData) {
  peopleData.films.forEach((film) => {
    const charactersFilm = new RequestHelper(peopleData.films)
    charactersFilm.get()
    .then(data);
    return data;
  });
  return charactersFilm;
};



module.exports = Ghibli;
