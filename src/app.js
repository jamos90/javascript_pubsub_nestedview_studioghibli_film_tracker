const Ghibli = require('./models/ghibli');
const GhibliListView = require('./views/ghibli_list_view.js');
const SelectView = require('./vies/select_view.js');


document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('#film-list')
  const ghibli_list_view = new GhibliListView(container);
  ghibli_list_view.bindEvents();

  const ghibli = new Ghibli;
  ghibli.getData();
  ghibli.bindEvents();
});
