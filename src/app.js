const Ghibli = require('./models/ghibli');
const GhibliListView = require('./views/ghibli_list_view.js');
const SelectView = require('./views/select_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('js.loaded');

  const container = document.querySelector('#film-list')
  const ghibliListView = new GhibliListView(container);
  ghibliListView.bindEvents();

  const selector = document.querySelector('#film-selector');
  const directorSlector = document.querySelector('#director-selector');
  const characterSelector = document.querySelector('#character-selector');
  const selectView = new SelectView(selector, directorSlector, characterSelector);
  selectView.bindEvents();

  const ghibli = new Ghibli();
  ghibli.getDataFilm();
  ghibli.bindEvents();


});
