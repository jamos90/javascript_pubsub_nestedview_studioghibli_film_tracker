const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Ghibli = function () {
  this.films = null;
  this.people = null;
};


Ghibli.prototype.getDataFilm = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films');
    requestHelper.get()
    .then((data) => {
      console.log('all data:', data);
     this.formatFilmData(data);
     PubSub.publish('Ghibli:film-data-ready', this.films);
     console.log(this.films);
    })
    .catch((err) => {
      console.error(err);
    });
 }

  Ghibli.prototype.getFilmPeople = function () {
    const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/people/');
    requestHelper.get((data) => {
      this.formatPeopleData(data);
      PubSub.publish('Ghibli:people-data-ready', this.people)
      console.log('people:', this.people);
    });

  };

Ghibli.prototype.formatFilmData = function (filmData) {
  this.films = filmData.map((film) => {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rtScore: film.rt_score,
      people: film.people
    }
  });
  console.log(this.films);
};


Ghibli.prototype.formatFilmData = function (filmData) {
  this.films = filmData.map((film) => {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rtScore: film.rt_score,
      people: film.people
    }
  });
  console.log(this.films);
};

module.exports = Ghibli;
