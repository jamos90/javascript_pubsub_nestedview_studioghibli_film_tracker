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

eval("const Ghibli = __webpack_require__(/*! ./models/ghibli */ \"./src/models/ghibli.js\");\nconst GhibliListView = __webpack_require__(/*! ./views/ghibli_list_view.js */ \"./src/views/ghibli_list_view.js\");\n// const SelectView = require('./vies/select_view.js');\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('js.loaded');\n\n  const container = document.querySelector('#film-list')\n  const ghibliListView = new GhibliListView(container);\n  ghibliListView.bindEvents();\n\n  const ghibli = new Ghibli();\n  ghibli.getData();\n  // ghibli.bindEvents();\n\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

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

eval("const RequestHelper = function (url) {\n  this.url = url\n}\n// Get request using Promises:\nRequestHelper.prototype.get = function (onComplete) {\n  const xhr = new XMLHttpRequest();\n  xhr.open('GET', this.url);\n  xhr.setRequestHeader('Accept', 'application/json');\n  xhr.addEventListener('load', function() {\n    if(this.status !== 200){\n      return;\n    }\n    const data = JSON.parse(this.responseText);\n    onComplete(data);\n  });\n  xhr.send();\n};\n\nmodule.exports = RequestHelper;\n\n//Get request using Feth:\n// RequestHelper.prototype.get = function (onComplete) {\n//   return fech(this.url)\n//   .then(response => response.json);\n// }\n\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/ghibli.js":
/*!******************************!*\
  !*** ./src/models/ghibli.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\n\nconst Ghibli = function () {\n  this.films = null;\n};\n\n\nGhibli.prototype.getData = function () {\n  const requestHelper = new RequestHelper('https://ghibliapi.herokuapp.com/films');\n    requestHelper.get((data) => {\n\n     this.formatFilmData(data);\n     PubSub.publish('Ghibli:film-data-ready', this.films);\n     console.log(this.films);\n\n    });\n  };\n\nGhibli.prototype.formatFilmData = function (filmData) {\n  this.films = filmData.map((film) => {\n    return {\n      id: film.id,\n      title: film.title,\n      description: film.description,\n      rtScore: film.rt_score\n    }\n  });\n  console.log(this.films);\n};\n\nmodule.exports = Ghibli;\n\n\n//# sourceURL=webpack:///./src/models/ghibli.js?");

/***/ }),

/***/ "./src/views/ghibli_list_view.js":
/*!***************************************!*\
  !*** ./src/views/ghibli_list_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GhibliView = __webpack_require__(/*! ./ghibli_view.js */ \"./src/views/ghibli_view.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\n\nconst GhibliListView = function (container) {\n  this.container = container;\n};\n\nGhibliListView.prototype.bindEvents = function () {\n  PubSub.subscribe('Ghibli:film-data-ready', (evt) =>{\n    const filmsData = evt.detail;\n    this.render(filmsData);\n  });\n};\n\nGhibliListView.prototype.render = function (filmData) {\n  this.innerHTML = '';\n  filmData.forEach((film) =>{\n    const filmView = new GhibliView(this.container, film);\n    filmView.render();\n  });\n};\n\n\nmodule.exports = GhibliListView;\n\n\n//# sourceURL=webpack:///./src/views/ghibli_list_view.js?");

/***/ }),

/***/ "./src/views/ghibli_view.js":
/*!**********************************!*\
  !*** ./src/views/ghibli_view.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\n\nconst GhibliView = function (container, film) {\n  this.film = film;\n  this.container = container;\n}\n\n\n//# sourceURL=webpack:///./src/views/ghibli_view.js?");

/***/ })

/******/ });