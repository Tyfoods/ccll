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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/frontEndLoggedOutUser.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/cllGlobals.js":
/*!*********************************!*\
  !*** ./assets/js/cllGlobals.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = cllGlobals = {\n  isAddToListBtnClicked: false,\n  isSubmitBtnClicked: false,\n  isEditCategoryFormCreated: false,\n  isCategoryInputCreated: false,\n  isUpVoteBtnClicked: false,\n  isNeutralVoteBtnClicked: false,\n  isDownVoteBtnClicked: false,\n  isBackBtnClicked: false,\n  add_to_list_btn: document.getElementById(\"add_to_list_btn\"),\n  currentProtocalDomain: document.location.origin,\n  searchEngineRequestSent: false,\n  //searchEngineLooping: false,\n  currentSearchResultsCollection: document.createElement(\"div\").getElementsByClassName('noClassHere')\n};\n\n//# sourceURL=webpack:///./assets/js/cllGlobals.js?");

/***/ }),

/***/ "./assets/js/functions/createAddToListBtn.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/createAddToListBtn.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createAddToListBtn() {\n  var allListsArray = document.querySelectorAll('.cll-link-list__link-list--style-' + list_style);\n  allListsArray.forEach(function (list) {\n    //append Add To List! button\n    var addToListBtn = document.createElement('button');\n    addToListBtn.setAttribute('class', \"cll-link-list__add-to-list-btn\");\n    addToListBtn.innerHTML = \"Add To List +\";\n    list.parentNode.insertBefore(addToListBtn, list.nextSibling);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createAddToListBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createDownVoteBtn.js":
/*!**************************************************!*\
  !*** ./assets/js/functions/createDownVoteBtn.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createDownVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list--style-' + list_style + '__link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var downVoteBtn = document.createElement(\"button\");\n    downVoteBtn.setAttribute('class', 'link-list-item__down-vote-button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    downVoteBtn.setAttributeNode(cllId);\n    downVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(downVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createDownVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createNeutralVoteBtn.js":
/*!*****************************************************!*\
  !*** ./assets/js/functions/createNeutralVoteBtn.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createNeutralVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list--style-' + list_style + '__link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var neutralVoteBtn = document.createElement(\"button\");\n    neutralVoteBtn.setAttribute('class', 'link-list-item__neutral-vote-button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    neutralVoteBtn.setAttributeNode(cllId);\n    neutralVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(neutralVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createNeutralVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createUpVoteBtn.js":
/*!************************************************!*\
  !*** ./assets/js/functions/createUpVoteBtn.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createUpVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list--style-' + list_style + '__link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var upVoteBtn = document.createElement(\"button\");\n    upVoteBtn.setAttribute('class', 'link-list-item__up-vote-button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    upVoteBtn.setAttributeNode(cllId);\n    upVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(upVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createUpVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/displayDataPerItem.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/displayDataPerItem.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest, slugify) {\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/', 'GET').then(function (request) {\n    var cllLinkArray = JSON.parse(request.responseText);\n    var linkListItemArray = document.querySelectorAll('.link-list--style-' + list_style + '__link-list-item');\n    var incrementer = 0; //console.log(cllLinkArray);\n\n    cllLinkArray.forEach(function (cllLink) {\n      linkListItemArray.forEach(function (linkListItem) {\n        var postSlug = slugify(linkListItem.textContent.trim()); //replace(/\\s/g, '-').replace(/[.]/g,'-').toLowerCase();\n\n        if (cllLink.slug === postSlug) {\n          //if(cllLink.meta.link_type !== \"internal link\"){\n          //console.log(\"external link\");\n          //console.log(linkListItem);\n          var upVotesCounter = document.createElement('p');\n          upVotesCounter.setAttribute('class', 'link-list-item__up-votes-counter');\n          upVotesCounter.innerHTML = cllLinkArray[incrementer].meta.up_votes;\n          var downVotesCounter = document.createElement('p');\n          downVotesCounter.setAttribute('class', 'link-list-item__down-votes-counter');\n          downVotesCounter.innerHTML = cllLinkArray[incrementer].meta.down_votes;\n          var currentLinkItemId = linkListItem.getAttribute('cllId');\n          var downVoteButton = document.querySelector('.link-list-item__down-vote-button[cllId=\"' + currentLinkItemId + '\"]');\n          var upVoteButton = document.querySelector('.link-list-item__up-vote-button[cllId=\"' + currentLinkItemId + '\"]');\n          downVoteButton.appendChild(downVotesCounter);\n          upVoteButton.appendChild(upVotesCounter); //display \"submittedByElement\";\n\n          var submittedByElement = document.createElement('p');\n          submittedByElement.setAttribute('class', 'link-list-item__submitted-by'); //console.log(cllLinkArray[incrementer].meta);\n\n          submittedByElement.innerHTML = \"Submitted by: \" + cllLinkArray[incrementer].meta.submitted_by; //console.log(currentLinkItemId);\n          //var linkListItem = document.querySelector('.link-list-item[cllId=\"'+currentLinkItemId+'\"]')\n\n          try {\n            linkListItem.appendChild(submittedByElement);\n          } catch (error) {\n            console.log(error);\n          } //}\n\n\n          if (cllLink.meta.link_type === \"internal link\") {\n            var neutralVoteButton = document.querySelector('.link-list-item__neutral-vote-button[cllId=\"' + currentLinkItemId + '\"]');\n            submittedByElement.style.display = 'none';\n            neutralVoteButton.style.display = 'none';\n            downVoteButton.style.display = 'none';\n            upVoteButton.style.display = 'none';\n            downVotesCounter.style.display = 'none';\n            upVotesCounter.style.display = 'none';\n          }\n        }\n      });\n      incrementer += 1;\n    });\n    var downVoteCounterArray = document.querySelectorAll('.link-list-item__down-votes-counter');\n    setAttributeOfElementsInArrayIncrementally(downVoteCounterArray, 'cllId');\n    var upVoteCounterArray = document.querySelectorAll('.link-list-item__up-votes-counter');\n    setAttributeOfElementsInArrayIncrementally(upVoteCounterArray, 'cllId');\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/displayDataPerItem.js?");

/***/ }),

/***/ "./assets/js/functions/handleSearchInput.js":
/*!**************************************************!*\
  !*** ./assets/js/functions/handleSearchInput.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleSearchInput(makeRequest) {\n  var cllSearchFormInput = document.querySelector('.cll_search_form_input');\n  var cllSuggestions = document.querySelector('.cll-suggestions');\n\n  if (cllSearchFormInput !== undefined) {\n    var searchEngineTimeout;\n\n    cllSearchFormInput.onkeydown = function () {\n      if (event.keyCode == 13) {\n        event.preventDefault();\n      }\n    };\n\n    cllSearchFormInput.onkeyup = function () {\n      //clear search results\n      cllSuggestions.innerHTML = ''; //clear search results array with IIFE\n\n      (function () {\n        //var cllSuggestions = document.querySelector('.cll-suggestions');\n        var loadingElementCollection = document.querySelectorAll('#cll-loading');\n        var loadingElement = document.createElement(\"div\");\n        loadingElement.setAttribute('id', 'cll-loading');\n        loadingElement.innerHTML = 'LOADING';\n\n        if (loadingElementCollection.length === 0) {\n          //console.log(\"Adding Loading Element\");\n          cllSuggestions.appendChild(loadingElement);\n        }\n      })(); //Process searchEngine Input after one second\n\n\n      searchEngineTimeout = setTimeout(function () {\n        clearTimeout(searchEngineTimeout); //If the input is nothing then clear search results\n\n        if (cllSearchFormInput.value === ' ' || cllSearchFormInput.value === '') {\n          //console.log(\"No value was entered\");\n          cllSuggestions.innerHTML = '';\n        } else {\n          makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?search=' + cllSearchFormInput.value, 'GET', false).then(function (request) {\n            cllSuggestions.innerHTML = '';\n            var searchResultsObj = JSON.parse(request.responseText);\n            searchResultsObj.forEach(function (searchResult) {\n              if (cllSuggestions.childElementCount < 5) {\n                //console.log(\"Search result below!\");\n                //console.log(searchResult);\n                var searchResultElement = document.createElement(\"div\");\n                searchResultElement.setAttribute('class', 'search-result-element');\n                searchResultElement.innerHTML = searchResult.title.rendered; //set innerHTML to title\n\n                if (searchResult.meta.link_type.toLowerCase() === \"external link\") {\n                  cllSuggestions.appendChild(searchResultElement);\n                } //make searchResult Clickable\n\n\n                searchResultElement.addEventListener('click', function () {\n                  event.preventDefault();\n                  window.open(searchResult.meta.URL); //Open in link new window\n                });\n              }\n            });\n          })[\"catch\"](function (error) {\n            console.log(error);\n          });\n        }\n      }, 1000);\n    };\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleSearchInput.js?");

/***/ }),

/***/ "./assets/js/functions/makeRequest.js":
/*!********************************************!*\
  !*** ./assets/js/functions/makeRequest.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function makeRequest(url, method, sendData, refresh) {\n  var refreshInput = refresh || ''; //console.log(\"request made\");\n  // Create the XHR request\n\n  var request = new XMLHttpRequest(); // Return it as a Promise\n\n  return new Promise(function (resolve, reject) {\n    // Setup our listener to process compeleted requests\n    request.onreadystatechange = function () {\n      // Only run if the request is complete\n      if (request.readyState !== 4) return; // Process the response\n\n      if (request.status >= 200 && request.status < 300) {\n        // If successful\n        resolve(request);\n\n        if (typeof sendData !== 'undefined') {//document.location.reload(true);\n          //console.log('sendData was present!');\n        }\n\n        if (refreshInput === false) {} else if (refreshInput === true) {\n          document.location.reload(true);\n        }\n      } else {\n        // If failed\n        reject({\n          status: request.status,\n          statusText: request.statusText\n        });\n      }\n    }; // Setup our HTTP request\n\n\n    request.open(method || 'GET', url, true);\n    request.setRequestHeader(\"X-WP-Nonce\", magicalData.nonce);\n    request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\"); // Send the request\n\n    if (typeof sendData === 'undefined') {\n      request.send(); //console.log(\"Data is undefined! No data was sent\");\n    } else {\n      //console.log(sendData);\n      request.send(sendData);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/makeRequest.js?");

/***/ }),

/***/ "./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js":
/*!***************************************************************************!*\
  !*** ./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function setAttributeOfElementsInArrayIncrementally(array, attribute_name) {\n  var incrementer = 0;\n  array.forEach(function (item) {\n    var attribute = document.createAttribute(attribute_name);\n    item.setAttributeNode(attribute);\n    item.setAttribute(attribute_name, incrementer);\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js?");

/***/ }),

/***/ "./assets/js/functions/slugify.js":
/*!****************************************!*\
  !*** ./assets/js/functions/slugify.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nmodule.exports = function slugify(string) {\n  var stringArray = [];\n\n  for (var i = 0; i < string.length; i++) {\n    stringArray[i] = string.charAt(i);\n  }\n\n  var i = 0;\n  stringArray.forEach(function (character) {\n    if (character === '.' || character === ' ') {\n      if ((typeof prevCharacter === \"undefined\" ? \"undefined\" : _typeof(prevCharacter)) != undefined) {\n        if (stringArray[i - 1] === '-') {\n          stringArray[i] = '';\n        } else {\n          stringArray[i] = '-';\n        }\n      }\n    }\n\n    i += 1;\n  });\n  var slugString = stringArray.toString().replace(/[,]/g, '').toLowerCase();\n  return slugString;\n};\n\n//# sourceURL=webpack:///./assets/js/functions/slugify.js?");

/***/ }),

/***/ "./assets/src/frontEndLoggedOutUser.js":
/*!*********************************************!*\
  !*** ./assets/src/frontEndLoggedOutUser.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/cllGlobals */ \"./assets/js/cllGlobals.js\");\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/functions/makeRequest */ \"./assets/js/functions/makeRequest.js\");\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/functions/setAttributeOfElementsInArrayIncrementally */ \"./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js\");\n/* harmony import */ var _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_functions_slugify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/functions/slugify */ \"./assets/js/functions/slugify.js\");\n/* harmony import */ var _js_functions_slugify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_functions_slugify__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/functions/displayDataPerItem */ \"./assets/js/functions/displayDataPerItem.js\");\n/* harmony import */ var _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/functions/handleSearchInput */ \"./assets/js/functions/handleSearchInput.js\");\n/* harmony import */ var _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/functions/createAddToListBtn */ \"./assets/js/functions/createAddToListBtn.js\");\n/* harmony import */ var _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/functions/createDownVoteBtn */ \"./assets/js/functions/createDownVoteBtn.js\");\n/* harmony import */ var _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../js/functions/createNeutralVoteBtn */ \"./assets/js/functions/createNeutralVoteBtn.js\");\n/* harmony import */ var _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../js/functions/createUpVoteBtn */ \"./assets/js/functions/createUpVoteBtn.js\");\n/* harmony import */ var _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_9__);\n\n\n\n\n\n\n\n\n\n\n\nwindow.onload = function () {\n  function createNewListRequestBtn() {\n    var newListRequestBtn = document.createElement('button');\n    newListRequestBtn.setAttribute(\"class\", \"new-list-btn\");\n    newListRequestBtn.innerHTML = \"Request New Category +\";\n    var cll_link_list = document.querySelector('.cll-link-list');\n    cll_link_list.parentElement.insertBefore(newListRequestBtn, cll_link_list.parentElement.firstChild);\n    newListRequestBtn.addEventListener(\"click\", function () {\n      alert(\"You must be logged in to request a new category!\");\n    });\n  }\n\n  ;\n\n  function addClickToAddToListBtn() {\n    var i = 0;\n    var add_to_list_btn_array = document.querySelectorAll(\".cll-link-list__add-to-list-btn\");\n    add_to_list_btn_array.forEach(function (add_to_list_btn) {\n      var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n      add_to_list_btn.setAttributeNode(cllId);\n      add_to_list_btn.setAttribute('cllid', i);\n      i += 1; //when button is clicked check what class the add_to_list_btn is and use this to add form to specific\n      //var add_to_list_btn = document.getElementById(\"add_to_list_btn\");\n\n      add_to_list_btn.addEventListener(\"click\", function () {\n        alert(\"You must be logged in to add a link!\");\n      });\n    });\n  }\n\n  if (document.querySelector(\".cll_search_form_input\")) {\n    //console.log(\"Search bar exists\");\n    _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_5___default()(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1___default.a);\n  } else {//console.log(\"Search bar doesn't exist\");\n  }\n\n  var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');\n  _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_2___default()(allListItemsArray, 'cllId');\n  var dependencies = {\n    \"makeRequest\": _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1___default.a,\n    \"setAttributeOfElementsInArrayIncrementally\": _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_2___default.a\n  };\n  _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_6___default()();\n  addClickToAddToListBtn();\n  _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_7___default()();\n  _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_9___default()();\n  _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_8___default()();\n  _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_4___default()(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_2___default.a, _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1___default.a, _js_functions_slugify__WEBPACK_IMPORTED_MODULE_3___default.a);\n  createNewListRequestBtn();\n  var upVoteBtnArray = document.querySelectorAll('.link-list-item__up-vote-button');\n  upVoteBtnArray.forEach(function (upVoteBtn) {\n    upVoteBtn.addEventListener('click', function () {\n      alert(\"You must be logged in to upvote!\");\n    });\n  });\n  var neutralVoteBtnArray = document.querySelectorAll('.link-list-item__neutral-vote-button');\n  neutralVoteBtnArray.forEach(function (neutralVoteBtn) {\n    neutralVoteBtn.addEventListener('click', function () {\n      alert(\"You must be logged in to neutral vote\");\n    });\n  });\n  var downVoteBtnArray = document.querySelectorAll('.link-list-item__down-vote-button');\n  downVoteBtnArray.forEach(function (downVoteBtn) {\n    downVoteBtn.addEventListener('click', function () {\n      alert(\"You must be logged in to down vote!\");\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/src/frontEndLoggedOutUser.js?");

/***/ })

/******/ });