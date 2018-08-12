const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Ghibli = function () {
  this.films = null;
  this.people = {};
  this.charactersFilms = {};
};



Ghibli.prototype.getDataFilm = function () {
  const requestHelperFilms = new RequestHelper('https://ghibliapi.herokuapp.com/films');
  const requestHelperPeople = new RequestHelper('https://ghibliapi.herokuapp.com/people/');

    requestHelperFilms.get()
    .then((data) => {
      // console.log('all data:', data);
     this.formatFilmData(data);
     console.log('film data', data);
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
      this.getFilmsFromPeople(data);
      PubSub.publish('Ghibli:people-data-ready', this.people);
      console.log('people data', this.people);
    });
 }

 Ghibli.prototype.bindEvents = function(){
   PubSub.subscribe('SelectView:select-film-ready', (evt) =>{
     const selectedIndex = evt.detail;
     const selectedFilm = this.films[selectedIndex];
     PubSub.publish('Ghibli:slected-film-sent-to-view', selectedFilm);

     PubSub.subscribe('SelectView:selected-director-ready', (evt) =>{
       const director = evt.detail;
       console.log(director);
       const  filteredFilms = this.filterByDirector(director);
       console.log('filteredFilms', filteredFilms);
       PubSub.publish('Ghibli:director-filtered-list-ready', filteredFilms);
      });

   });
 }

Ghibli.prototype.formatFilmData = function (filmData) {
  this.films = filmData.map((film) => {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rtScore: film.rt_score,
      director: film.director

    }
  });
};

Ghibli.prototype.filterByDirector = function (director){
  return this.films.filter(film => film.director === director);
}

// Ghibli.prototype.getDirectorNames = function (films) {
//   return films
//     .map(film => film.director)
//     .filter((director, index, directors) => regions.indexOf(region) === index);
// };

Ghibli.prototype.formatPeopleData = function (peopleData) {
  this.people = peopleData.map((person) => {

    return {
      id: person.id,
      name: person.name,
      gender: person.gender,
      film: {}
    }
  });
}

Ghibli.prototype.getFilmsFromPeople = function(peopleData){
  const filmList = peopleData.forEach((person) => {
    const charactersFilms = person.films
    const filmToRequest = charactersFilms[0];
    const newFilm = new RequestHelper(filmToRequest);
      newFilm.get()
      .then((data) => {
        const filmData = data;
        this.formatPeopleFilmData(filmData);
      });
  });
};

Ghibli.prototype.formatPeopleFilmData = function (data) {
    return Object.defineProperty(this.people, 'film', {
      value: data,
      writable: true,
      configurable: true
    });
    console.log('object added?',this.people);
};




module.exports = Ghibli;
