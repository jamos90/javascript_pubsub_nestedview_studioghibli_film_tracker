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

Ghibli.prototype.formatFilmData = function (filmData) {
  this.films = filmData.map((film) => {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rtScore: film.rt_score,
      characters: film.people
    }
  });
  // console.log(this.films);
};

// Ghibli.prototype.getCharacters = function (filmData) {
//   const listOfCharacters = []
//   const filmsCharacters = filmData.people.forEach((character) =>{
//      listOfCharacters.push(character);
//   });
//   return listOfCharacters;
//
// };

// Ghibli.prototype.peopleDetailFromFilm = function (filmdata) {
//   const peopleFromFilm = filmData.people.forEach((person) =>{
//      const character = new RequestHelper(person);
//      character.get((data) =>{
//        return character;
//        console.log(character);
//      })
//
//   });
//
// };


Ghibli.prototype.formatPeopleData = function (peopleData) {
  this.people = peopleData.map((person) => {
    return {
      id: person.id,
      name: person.name,
      films: person.films,
    }
  });
  console.log('people', this.people);
};


// Ghibli.prototype.getCharacters = function (filmData) {
//   const listOfCharacters = []
//   const filmsCharacters = filmData.people.forEach((character) =>{
//      listOfCharacters.push(character);
//   });
//   return listOfCharacters;
//
// };

// Ghibli.prototype.peopleDetailFromFilm = function (filmdata) {
//   const peopleFromFilm = filmData.people.forEach((person) =>{
//      const character = new RequestHelper(person);
//      character.get((data) =>{
//        return character;
//        console.log(character);
//      })
//
//   });
//
// };

module.exports = Ghibli;
