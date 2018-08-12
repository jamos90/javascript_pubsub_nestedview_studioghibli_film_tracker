/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ghibli = __webpack_require__(/*! ./models/ghibli */ \"./src/models/ghibli.js\");\nconst GhibliListView = __webpack_require__(/*! ./views/ghibli_list_view.js */ \"./src/views/ghibli_list_view.js\");\nconst SelectView = __webpack_require__(/*! ./views/select_view.js */ \"./src/views/select_view.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('js.loaded');\n\n  const container = document.querySelector('#film-list')\n  const ghibliListView = new GhibliListView(container);\n  ghibliListView.bindEvents();\n\n  const selector = document.querySelector('#film-selector');\n  const directorSlector = document.querySelector('#director-selector');\n  const selectView = new SelectView(selector, directorSlector);\n  selectView.bindEvents();\n\n  const ghibli = new Ghibli();\n  ghibli.getDataFilm();\n  ghibli.bindEvents();\n\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url\n}\n\n// Get request using Promises:\nRequestHelper.prototype.get = function () {\n  return fetch(this.url)\n  .then (response => response.json());\n};\n\n\n// // Get request using Promises:\n// RequestHelper.prototype.get = function () {\n//   return new Promise((resolve, reject) =>{\n//     const xhr = new XMLHttpRequest();\n//     xhr.open('GET', this.url);\n//     xhr.setRequestHeader('Accept', 'application/json');\n//     xhr.send();\n//     xhr.addEventListener('load', function() {\n//       if(this.status !== 200){\n//         reject(`Oh no! The status is ${xhr.status}`);\n//       }\n//       const data = JSON.parse(this.responseText);\n//       resolve(data);\n//     });\n//   });\n//\n// };\n\n\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/ghibli.js":
/*!******************************!*\
  !*** ./src/models/ghibli.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\n\nconst Ghibli = function () {\n  this.films = null;\n  this.people = {};\n  this.charactersFilms = {};\n};\n\n\n\nGhibli.prototype.getDataFilm = function () {\n  const requestHelperFilms = new RequestHelper('https://ghibliapi.herokuapp.com/films');\n  const requestHelperPeople = new RequestHelper('https://ghibliapi.herokuapp.com/people/');\n\n    requestHelperFilms.get()\n    .then((data) => {\n      // console.log('all data:', data);\n     this.formatFilmData(data);\n     console.log('film data', data);\n     PubSub.publish('Ghibli:film-data-ready', this.films);\n     // console.log(this.films);\n    })\n    .catch((err) => {\n      console.error(err);\n    });\n\n    requestHelperPeople.get()\n    .then((data) => {\n      // console.log('all data people', data);\n      this.formatPeopleData(data);\n      this.getFilmsFromPeople(data);\n      PubSub.publish('Ghibli:people-data-ready', this.people);\n      console.log('people data', this.people);\n    });\n }\n\n Ghibli.prototype.bindEvents = function(){\n   PubSub.subscribe('SelectView:select-film-ready', (evt) =>{\n     const selectedIndex = evt.detail;\n     const selectedFilm = this.films[selectedIndex];\n     PubSub.publish('Ghibli:slected-film-sent-to-view', selectedFilm);\n\n     PubSub.subscribe('SelectView:selected-director-ready', (evt) =>{\n       const director = evt.detail;\n       console.log(director);\n       const  filteredFilms = this.filterByDirector(director);\n       console.log('filteredFilms', filteredFilms);\n       PubSub.publish('Ghibli:director-filtered-list-ready', filteredFilms);\n      });\n\n   });\n }\n\nGhibli.prototype.formatFilmData = function (filmData) {\n  this.films = filmData.map((film) => {\n    return {\n      id: film.id,\n      title: film.title,\n      description: film.description,\n      rtScore: film.rt_score,\n      director: film.director\n\n    }\n  });\n};\n\nGhibli.prototype.filterByDirector = function (director){\n  return this.films.filter(film => film.director === director);\n}\n\n// Ghibli.prototype.getDirectorNames = function (films) {\n//   return films\n//     .map(film => film.director)\n//     .filter((director, index, directors) => regions.indexOf(region) === index);\n// };\n\nGhibli.prototype.formatPeopleData = function (peopleData) {\n  this.people = peopleData.map((person) => {\n\n    return {\n      id: person.id,\n      name: person.name,\n      gender: person.gender,\n      film: {}\n    }\n  });\n}\n\nGhibli.prototype.getFilmsFromPeople = function(peopleData){\n  const filmList = peopleData.forEach((person) => {\n    const charactersFilms = person.films\n    const filmToRequest = charactersFilms[0];\n    const newFilm = new RequestHelper(filmToRequest);\n      newFilm.get()\n      .then((data) => {\n        const filmData = data;\n        this.formatPeopleFilmData(filmData);\n      });\n  });\n};\n\nGhibli.prototype.formatPeopleFilmData = function (data) {\n    return Object.defineProperty(this.people, 'film', {\n      value: data,\n      writable: true,\n      configurable: true\n    });\n    console.log('object added?',this.people);\n};\n\n\n\n\nmodule.exports = Ghibli;\n\n\n//# sourceURL=webpack:///./src/models/ghibli.js?");

/***/ }),

/***/ "./src/views/ghibli_list_view.js":
/*!***************************************!*\
  !*** ./src/views/ghibli_list_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GhibliView = __webpack_require__(/*! ./ghibli_view.js */ \"./src/views/ghibli_view.js\");\nconst GhibliViewMultiple = __webpack_require__(/*! ./ghibli_view_multiple.js */ \"./src/views/ghibli_view_multiple.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\n\nconst GhibliListView = function (container) {\n  this.container = container;\n};\n\nGhibliListView.prototype.bindEvents = function () {\n  PubSub.subscribe('Ghibli:slected-film-sent-to-view', (evt)=>{\n    const selectedFilm = evt.detail;\n    this.renderFilm(selectedFilm);\n  });\n  PubSub.subscribe('Ghibli:film-data-ready', (evt) =>{\n    const filmsData = evt.detail;\n    console.log('list view', filmsData);\n    this.render(filmsData);\n  });\n  PubSub.subscribe('Ghibli:director-filtered-list-ready', (evt) =>{\n    const directorData = evt.detail;\n    console.log('correct director data passed',directorData);\n    this.renderDirectorsFilms(directorData);\n  });\n};\n\nGhibliListView.prototype.renderDirectorsFilms = function (selectedData) {\n  this.container.innerHTML = \"\";\n   const selectedFilms = new GhibliViewMultiple(this.container, selectedData);\n  selectedFilms.render();\n};\n\nGhibliListView.prototype.renderFilm = function (selectedData) {\n  this.container.innerHTML = \"\";\n  selectedFilm = new GhibliView(this.container, selectedData);\n  selectedFilm.render();\n};\n\nGhibliListView.prototype.render = function (filmData) {\n  this.container.innerHTML = \"\";\n  filmData.forEach((film) =>{\n    const filmView = new GhibliView(this.container, film);\n    filmView.render();\n  });\n};\n\n\nmodule.exports = GhibliListView;\n\n\n//# sourceURL=webpack:///./src/views/ghibli_list_view.js?");

/***/ }),

/***/ "./src/views/ghibli_view.js":
/*!**********************************!*\
  !*** ./src/views/ghibli_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst GhibliListView = __webpack_require__(/*! ./ghibli_list_view.js */ \"./src/views/ghibli_list_view.js\");\n\n\nconst GhibliView = function (container, film) {\n  this.film = film;\n  this.container = container;\n}\n\nGhibliView.prototype.render = function () {\n  this.container.innerHTML = \"\";\n  const filmContainer = document.createElement('div');\n  this.container.appendChild(filmContainer);\n\n  const title = this.createFilmHeader();\n  filmContainer.appendChild(title);\n\n  const filmDetails = this.createList()\n  filmContainer.appendChild(filmDetails);\n\n\n};\n\n\nGhibliView.prototype.createFilmHeader = function () {\n  const filmHeader = document.createElement('h1');\n  filmHeader.textContent = this.film.title;\n  return filmHeader\n};\n\n\n// GhibliView.prototype.createFilmHeaders = function () {\n//   this.films.forEach((film) => {\n//   const filmHeader = document.createElement('h1');\n//   filmHeader.textContent = film.title;\n//   return filmHeader\n//   });\n// };\n\nGhibliView.prototype.createList = function () {\n  const filmInfoList = document.createElement('ul');\n  this.populateList(filmInfoList);\n  return filmInfoList;\n\n};\n\nGhibliView.prototype.populateList= function (filmInfo) {\n    const filmDescription = document.createElement('li');\n    const filmRating = document.createElement('li');\n    const filmDirector = document.createElement('li');\n    const pageBreak = document.createElement('br');\n    filmDescription.textContent =`Film description:  ${this.film.description}`;\n    filmRating.textContent = `Rotten Tomatoes rating:  ${this.film.rtScore}`;\n    filmDirector.textContent = `Film's director: ${this.film.director}`;\n    filmInfo.appendChild(filmDescription);\n    filmInfo.appendChild(pageBreak);\n    filmInfo.appendChild(filmRating);\n    filmInfo.appendChild(pageBreak);\n    filmInfo.appendChild(filmDirector);\n\n};\n\n\n\n\nmodule.exports = GhibliView;\n\n\n//# sourceURL=webpack:///./src/views/ghibli_view.js?");

/***/ }),

/***/ "./src/views/ghibli_view_multiple.js":
/*!*******************************************!*\
  !*** ./src/views/ghibli_view_multiple.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst GhibliListView = __webpack_require__(/*! ./ghibli_list_view.js */ \"./src/views/ghibli_list_view.js\");\n\nconst GhibliViewMultiple = function (container, films) {\n  this.films = films;\n  this.container = container;\n}\n\nGhibliViewMultiple.prototype.render = function () {\n  this.container.innerHTML = \"\";\n  const filmContainer = document.createElement('div');\n  this.container.appendChild(filmContainer);\n  console.log(this.films);\n  this.films.forEach((film) => {\n    const listContainer = document.createElement('ul');\n     const title = document.createElement('h1');\n     const description = document.createElement('p');\n     const rating = document.createElement('li');\n     title.textContent =`Title: ${film.title}`;\n     description.textContent = `Description ${film.description}`;\n     rating.textContent = `Rating ${film.rtScore}`;\n     console.log(title);\n     this.container.appendChild(title);\n     this.container.appendChild(description);\n     this.container.appendChild(listContainer);\n     listContainer.appendChild(rating);\n  });\n};\n\nmodule.exports = GhibliViewMultiple;\n\n\n//# sourceURL=webpack:///./src/views/ghibli_view_multiple.js?");

/***/ }),

/***/ "./src/views/select_view.js":
/*!**********************************!*\
  !*** ./src/views/select_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\n\nconst SelectView = function(container, select) {\n  this.container = container;\n  this.secondSelect = select;\n  this.films = null;\n}\n\nSelectView.prototype.bindEvents = function (){\n  PubSub.subscribe('Ghibli:film-data-ready', (evt)=>{\n    const allFilms = evt.detail;\n    this.populateDropDown(allFilms);\n    this.populateDirectorDropDown(allFilms);\n  });\n\n  this.container.addEventListener('change', (evt) =>{\n    const selectedFilm = evt.target.value;\n    console.log(selectedFilm)\n    PubSub.publish('SelectView:select-film-ready', selectedFilm);\n  });\n\n  this.secondSelect.addEventListener('change',(evt) =>{\n    const selectedDirector = evt.target.value;\n    PubSub.publish('SelectView:selected-director-ready', selectedDirector);\n  });\n\n}\n  SelectView.prototype.populateDropDown = function (filmData) {\n    const filmTitle = filmData.forEach((film, index) =>{\n      const listOption = document.createElement('option');\n      listOption.textContent = film.title\n      listOption.value = index;\n      this.container.appendChild(listOption);\n    });\n  };\n\n  SelectView.prototype.populateDirectorDropDown = function (filmData) {\n    const directors = filmData.forEach((film) => {\n     const listOption = document.createElement('option');\n     listOption.textContent = film.director;\n     this.secondSelect.appendChild(listOption);\n    });\n  };\n\n  module.exports = SelectView;\n\n\n//# sourceURL=webpack:///./src/views/select_view.js?");

/***/ })

/******/ });