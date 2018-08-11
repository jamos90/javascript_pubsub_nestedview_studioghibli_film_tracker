const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');


const Ghibli = function () {
  this.films = null;
};


Ghibli.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films');
  requestHelper.get((data) => {

     this.formatFilmData(data);
     PubSub.publish('Ghibli:film-data-ready', this.films);
  });

};

Ghibli.prototype.formatFilmData = function (filmData) {
  this.films = filmData.map((film) => {
    return {
      id: film.id,
      title: film.title,
      description: film.description,
      rtScore: film.rt_score
    }
  });
  console.log(this.films);

};

module.exports = Ghibli;
