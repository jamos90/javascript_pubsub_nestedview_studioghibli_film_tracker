const PubSub = require('../helpers/pub_sub.js');
const GhibliListView = require('./ghibli_list_view.js');

const GhibliViewMultiple = function (container, films) {
  this.films = films;
  this.container = container;
}

GhibliViewMultiple.prototype.render = function () {
  this.container.innerHTML = "";
  const filmContainer = document.createElement('div');
  this.container.appendChild(filmContainer);
  console.log(this.films);
  this.films.forEach((film) => {
    const listContainer = document.createElement('ul');
     const title = document.createElement('h1');
     const description = document.createElement('p');
     const rating = document.createElement('li');
     title.textContent =`Title: ${film.title}`;
     description.textContent = `Description ${film.description}`;
     rating.textContent = `Rating ${film.rtScore}`;
     console.log(title);
     this.container.appendChild(title);
     this.container.appendChild(description);
     this.container.appendChild(listContainer);
     listContainer.appendChild(rating);
  });
};

module.exports = GhibliViewMultiple;
