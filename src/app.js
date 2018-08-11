const Ghibli = require('./models/ghibli');
const GhibliListView = require('./views/ghibli_list_view.js');
// const SelectView = require('./vies/select_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('js.loaded');

  const container = document.querySelector('#film-list')
  const ghibliListView = new GhibliListView(container);
  ghibliListView.bindEvents();

  const ghibli = new Ghibli();
  ghibli.getData();
  // ghibli.bindEvents();


});
