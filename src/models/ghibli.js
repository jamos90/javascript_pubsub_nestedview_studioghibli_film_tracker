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
      this.getFilmsFromPeople(data);
      this.formatPeopleData(data);
      PubSub.publish('Ghibli:people-data-ready', this.people);
      console.log('people data', this.people);
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

    }
  });
  // console.log(this.films);
};

Ghibli.prototype.formatPeopleData = function (peopleData) {
  this.people = peopleData.map((person) => {

    return {
      id: person.id,
      name: person.name,
      gender: person.gender,
      film: person.films
      }
    });
  };

    Ghibli.prototype.getFilmsFromPeople = function(peopleData){
      const filmList = peopleData.forEach((person) => {
        const charactersFilms = person.films
        const filmToRequest = charactersFilms[0];
        const newFilm = new RequestHelper(filmToRequest);
        newFilm.get()
        .then((data) => {
          const filmOfCharacter = data;
          person.films = data
          console.log(`person films`,person.films);
        });
      });
    };

module.exports = Ghibli;
