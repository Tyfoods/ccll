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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/mainjs.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/cllGlobals.js":
/*!*********************************!*\
  !*** ./assets/js/cllGlobals.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = cllGlobals = {\n  isAddToListBtnClicked: false,\n  isSubmitBtnClicked: false,\n  isEditCategoryFormCreated: false,\n  isCategoryInputCreated: false,\n  isUpVoteBtnClicked: false,\n  isNeutralVoteBtnClicked: false,\n  isDownVoteBtnClicked: false,\n  add_to_list_btn: document.getElementById(\"add_to_list_btn\"),\n  currentProtocalDomain: document.location.origin,\n  searchEngineRequestSent: false,\n  //searchEngineLooping: false,\n  currentSearchResultsCollection: document.createElement(\"div\").getElementsByClassName('noClassHere')\n};\n\n//# sourceURL=webpack:///./assets/js/cllGlobals.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToAddToListBtn.js":
/*!*******************************************************!*\
  !*** ./assets/js/functions/addClickToAddToListBtn.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToAddToListBtn(deps) {\n  var add_to_list_btn_array = document.querySelectorAll(\".add_to_list_btn\");\n  deps.setAttributeOfElementsInArrayIncrementally(add_to_list_btn_array, 'cllId');\n  add_to_list_btn_array.forEach(function (currentAddToListBtn) {\n    currentAddToListBtn.addEventListener(\"click\", function () {\n      deps.createAddToListBtnForm(currentAddToListBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToAddToListBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js":
/*!********************************************************************!*\
  !*** ./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToAddToListBtnFormSubmitBtn(currentAddToListBtn, deps) {\n  var submitBtn = document.querySelector('button.submitBtn');\n\n  if (typeof submitBtn !== 'undefined') {\n    //console.log(\"Submit Button Existance Verified\");\n    submitBtn.addEventListener(\"click\", function () {\n      var x = document.getElementById(\"linkTypeSelecter\").selectedIndex;\n      var linkType = document.getElementsByTagName(\"option\")[x].value; //console.log(document.querySelector('[name=\"newListItemUrl\"].add_to_list_input'));\n\n      if (document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value === '') {\n        alert(\"You must submit a title!\");\n      } else if (linkType.toLowerCase() === 'external link') {\n        if (document.querySelector('[name=\"newListItemUrl\"].add_to_list_input').value === '') {\n          alert(\"You must submit a URL!\");\n        } else if (!deps.isUrl(document.querySelector('[name=\"newListItemUrl\"].add_to_list_input').value)) {\n          alert(\"Please enter a valid URL!\");\n        } else {\n          deps.endLinkRequest(currentAddToListBtn, deps);\n        }\n      } else if (linkType.toLowerCase() === 'internal link') {\n        deps.throughLinkRequest(currentAddToListBtn, deps);\n      } else if (linkType.toLowerCase() !== 'internal link' && linkType.toLowerCase() !== 'external link') {\n        alert(\"You must select a Link Type!\");\n      }\n    });\n    return;\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToAddToListFormCancelBtn.js":
/*!*****************************************************************!*\
  !*** ./assets/js/functions/addClickToAddToListFormCancelBtn.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToAddToListBtnFormCancelBtn() {\n  var cancelBtnArray = document.querySelectorAll(\".cancelBtn\");\n  cancelBtnArray.forEach(function (cancelBtn) {\n    if (typeof cancelBtn !== 'undefined') {\n      cancelBtn.addEventListener(\"click\", function () {\n        var addToListForm = document.getElementById(\"addToListForm\");\n        addToListForm.parentNode.removeChild(addToListForm);\n        event.stopPropagation(); //prevent parent element from being clicked\n\n        cllGlobals.isAddToListBtnClicked = false;\n      });\n    } else {//console.log('cancelBtn is not defined');\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToAddToListFormCancelBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToDownVoteBtn.js":
/*!******************************************************!*\
  !*** ./assets/js/functions/addClickToDownVoteBtn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToDownVoteBtn(deps) {\n  var downVoteBtnArray = document.querySelectorAll('.down_vote_button');\n  downVoteBtnArray.forEach(function (downVoteBtn) {\n    downVoteBtn.addEventListener('click', function () {\n      deps.handleDownVoteBtnClick(downVoteBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToDownVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToEditCategoryBtn.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/addClickToEditCategoryBtn.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToEditCategoryBtn(deps) {\n  var editCategoryBtnArray = document.querySelectorAll(\".cll_edit_category_btn\");\n  editCategoryBtnArray.forEach(function (editCategoryBtn) {\n    editCategoryBtn.addEventListener(\"click\", function () {\n      deps.createEditCategoryBtnForm(editCategoryBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToEditCategoryBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToEditCategoryFormCancelBtn.js":
/*!********************************************************************!*\
  !*** ./assets/js/functions/addClickToEditCategoryFormCancelBtn.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToEditCategoryFormCancelBtn(deps) {\n  var cancelBtnArray = document.querySelectorAll(\".cancelBtn\");\n  cancelBtnArray.forEach(function (cancelBtn) {\n    if (typeof cancelBtn !== 'undefined') {\n      cancelBtn.addEventListener(\"click\", function () {\n        var editCategoryBtn = cancelBtn.parentNode;\n        deps.removeAllChildFromNodeExceptText(editCategoryBtn);\n        event.stopPropagation(); //prevent parent element from being clicked\n\n        cllGlobals.isEditCategoryFormCreated = false; //return false;\n      });\n    } else {//console.log('settings cancelBtn is not defined');\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToEditCategoryFormCancelBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToEditCategoryFormSubmitBtn.js":
/*!********************************************************************!*\
  !*** ./assets/js/functions/addClickToEditCategoryFormSubmitBtn.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = //Function for creating on-click functionality and information to UPDATE page\nfunction addClickToEditCategoryFormSubmitBtn(editCategoryBtn, deps) {\n  var editCategoryFormSubmitBtnArray = document.querySelectorAll('.settingsSubmitBtn');\n  editCategoryFormSubmitBtnArray.forEach(function (editCategoryFormSubmitBtn) {\n    if (typeof editCategoryFormSubmitBtn !== 'undefined') {\n      editCategoryFormSubmitBtn.addEventListener(\"click\", function () {\n        event.preventDefault();\n        var x = document.querySelector(\".listCategorySelector\").selectedIndex;\n        var selectedCategory = document.getElementsByTagName(\"option\")[x].value;\n        deps.handleCategoryEdit(editCategoryBtn, selectedCategory, deps);\n      });\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToEditCategoryFormSubmitBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToNeutralVoteBtn.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/addClickToNeutralVoteBtn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToNeutralVoteBtn(deps) {\n  var neutralVoteBtnArray = document.querySelectorAll('.neutral_vote_button');\n  neutralVoteBtnArray.forEach(function (neutralVoteBtn) {\n    neutralVoteBtn.addEventListener('click', function () {\n      deps.handleNeutralVoteBtnClick(neutralVoteBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToNeutralVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToUpVoteBtn.js":
/*!****************************************************!*\
  !*** ./assets/js/functions/addClickToUpVoteBtn.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToUpVoteBtn(deps) {\n  var upVoteBtnArray = document.querySelectorAll('.up_vote_button');\n  upVoteBtnArray.forEach(function (upVoteBtn) {\n    upVoteBtn.addEventListener('click', function () {\n      deps.handleUpVoteBtnClick(upVoteBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToUpVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createAddToListBtn.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/createAddToListBtn.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createAddToListBtn() {\n  var allListsArray = document.querySelectorAll('.link-list-style-1');\n  allListsArray.forEach(function (list) {\n    //append Add To List! button\n    var addToListBtn = document.createElement('button');\n    addToListBtn.setAttribute('class', \"add_to_list_btn\");\n    addToListBtn.innerHTML = \"Add To List +\";\n    list.parentNode.insertBefore(addToListBtn, list.nextSibling);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createAddToListBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createAddToListBtnForm.js":
/*!*******************************************************!*\
  !*** ./assets/js/functions/createAddToListBtnForm.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createAddToListBtnForm(currentAddToListBtn, deps) {\n  //if button has not been clicked, create form\n  if (cllGlobals.isAddToListBtnClicked === false) {\n    var f = document.createElement(\"form\");\n    f.setAttribute('id', 'addToListForm');\n    var linktitle = document.createElement(\"input\");\n    linktitle.setAttribute('type', \"text\");\n    linktitle.setAttribute('name', \"newListItemTitle\");\n    linktitle.setAttribute('placeholder', \"Link title here\");\n    linktitle.setAttribute(\"class\", \"add_to_list_input\");\n    var link = document.createElement(\"input\");\n    link.setAttribute('type', \"text\");\n    link.setAttribute('name', \"newListItemUrl\");\n    link.setAttribute('placeholder', \"URL here\");\n    link.setAttribute(\"class\", \"add_to_list_input\");\n    var dropDownBox = document.createElement(\"select\");\n    dropDownBox.setAttribute('id', 'linkTypeSelecter');\n    var dropDownBoxPlaceHolder = document.createElement(\"option\");\n    dropDownBoxPlaceHolder.innerHTML = \"Link Type\";\n    dropDownBoxPlaceHolder.value = '';\n    dropDownBoxPlaceHolder.disabled = true;\n    dropDownBoxPlaceHolder.selected = true;\n    dropDownBoxPlaceHolder.hidden = true; //dropDownBoxPlaceHolder.required = true;\n\n    var endLinkOption = document.createElement(\"option\");\n    endLinkOption.innerHTML = \"External Link\"; //endLinkOption.setAttribute('name',\"Link Type\");\n\n    var throughLinkOption = document.createElement(\"option\");\n    throughLinkOption.innerHTML = \"Internal Link\"; //throughLinkOption.setAttribute('name',\"Link Type\");\n\n    dropDownBox.appendChild(endLinkOption);\n    dropDownBox.appendChild(throughLinkOption);\n    dropDownBox.appendChild(dropDownBoxPlaceHolder);\n    var b = document.createElement(\"button\");\n    b.setAttribute('name', \"submitBtn\");\n    b.setAttribute('type', 'button');\n    b.setAttribute('class', 'submitBtn');\n    b.innerHTML = 'Submit';\n    var cancelBtn = document.createElement(\"button\");\n    cancelBtn.setAttribute('name', \"cancelBtn\");\n    cancelBtn.setAttribute('type', 'button');\n    cancelBtn.setAttribute('class', 'cancelBtn');\n    f.appendChild(linktitle);\n    f.appendChild(link);\n    f.appendChild(dropDownBox);\n    f.appendChild(b);\n    f.appendChild(cancelBtn);\n    currentAddToListBtn.appendChild(f);\n    cllGlobals.isAddToListBtnClicked = true;\n    deps.addClickToAddToListBtnFormSubmitBtn(currentAddToListBtn, deps);\n    deps.addClickToAddToListFormCancelBtn(); //change form depending on link type selected\n    //var box = document.getElementById(\"linkTypeSelecter\");\n\n    dropDownBox.addEventListener('change', function () {\n      var x = document.getElementById(\"linkTypeSelecter\").selectedIndex;\n      var linkType = document.getElementsByTagName(\"option\")[x].value;\n\n      if (linkType.toLowerCase() === 'internal link') {\n        link.parentNode.removeChild(link);\n      } else if (linkType.toLowerCase() === 'external link') {\n        linktitle.parentNode.insertBefore(link, linktitle.nextSibling); //f.appendChild(link);\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createAddToListBtnForm.js?");

/***/ }),

/***/ "./assets/js/functions/createAdminRemoveBtn.js":
/*!*****************************************************!*\
  !*** ./assets/js/functions/createAdminRemoveBtn.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createAdminRemoveBtn(makeRequest, isObjEmpty) {\n  var allListItemsArray = document.querySelectorAll('.link-list-item');\n  var allListItemsAnchorArray = document.querySelectorAll('.link-list-title');\n  var deleteBtnIncrementer = 0; //append delete buttons to list items\n\n  allListItemsArray.forEach(function (listItem) {\n    var adminDeleteBtn = document.createElement(\"button\");\n    adminDeleteBtn.setAttribute('class', 'adminDeleteBtn');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    adminDeleteBtn.setAttributeNode(cllId);\n    adminDeleteBtn.setAttribute('cllid', deleteBtnIncrementer);\n    listItem.appendChild(adminDeleteBtn); //append to inner html\n\n    deleteBtnIncrementer += 1;\n  });\n  var adminDeleteBtnArray = document.querySelectorAll('.adminDeleteBtn');\n  adminDeleteBtnArray.forEach(function (adminDeleteBtn) {\n    adminDeleteBtn.addEventListener(\"click\", function () {\n      allListItemsAnchorArray.forEach(function (listItem) {\n        if (listItem.getAttribute('cllid') === adminDeleteBtn.getAttribute('cllid')) {\n          //console.log(listItem.textContent.trim().replace(/ /g, '-').toLowerCase());\n          var listItemSlug = listItem.textContent.trim().replace(/\\s/g, '-').toLowerCase(); //console.log(listItemSlug);\n          //console.log(listItem.innerHTML);\n          //deletePage if it exists\n\n          makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages?slug=' + listItemSlug, \"GET\").then(function (request) {\n            var objResponse = JSON.parse(request.responseText); //console.log(objResponse);\n            //console.log(objResponse[0].id);\n            //get ID\n\n            if (isObjEmpty(objResponse) === true) {//console.log(\"A page with a slug of that type was unable to be found. (Response was empty)\");\n            } else {\n              //console.log(objResponse[0].id);\n              //console.log(\"Response was not empty\");\n              //console.log(\"deleting the associated page\");\n              makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + objResponse[0].id, \"DELETE\").then(function () {//console.log(\"Successfully deleted page!\");\n              })[\"catch\"](function (error) {\n                //console.log(\"Failed to delete page\");\n                console.log(error);\n              });\n            }\n          })[\"catch\"](function (error) {\n            //console.log(\"Unable to get page information about list item\");\n            console.log(error);\n          }); //Delete post if it exists\n\n          makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?slug=' + listItemSlug, 'GET').then(function (request) {\n            var objResponse = JSON.parse(request.responseText); //console.log(objResponse);\n\n            if (isObjEmpty(objResponse) === true) {//console.log(\"A post with a slug of that type was unable to be found. (Response was empty)\");\n            } else {\n              //console.log(objResponse[0].id);\n              //console.log(\"Response was not empty\");\n              //console.log(\"deleting the associated post\");\n              makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + objResponse[0].id, 'DELETE').then(function () {//console.log(\"Successfully deleted post!\");\n              })[\"catch\"](function (error) {\n                //console.log(\"Failed to delete post\");\n                console.log(error);\n              });\n            }\n          })[\"catch\"](function (error) {\n            //console.log(\"unable to get post information about list item\");\n            console.log(error);\n          });\n          allListItemsArray.forEach(function (listItemToRemove) {\n            if (listItemToRemove.getAttribute('cllId') === adminDeleteBtn.getAttribute('cllId')) {\n              listItemToRemove.parentNode.removeChild(listItemToRemove);\n\n              while (listItemToRemove.firstChild) {\n                listItemToRemove.removeChild(listItemToRemove.firstChild);\n              }\n            }\n          });\n        } else {//console.log(\"No match was found!\");\n        }\n      });\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createAdminRemoveBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createDeleteListBtn.js":
/*!****************************************************!*\
  !*** ./assets/js/functions/createDeleteListBtn.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createDeleteListBtn(setAttributeOfElementsInArrayIncrementally, makeRequest) {\n  var cllLinkListArray = document.querySelectorAll('.cll_link_list'); //console.log(cllLinkListArray);\n\n  cllLinkListArray.forEach(function (cllLinkList) {\n    var deleteListBtn = document.createElement(\"button\");\n    deleteListBtn.setAttribute('class', 'delete_list_btn');\n    deleteListBtn.innerHTML = \"Delete List\";\n    cllLinkList.insertBefore(deleteListBtn, cllLinkList.firstChild);\n  });\n  var listArray = document.querySelectorAll('.cll_link_list');\n  var deleteListBtnCollection = document.querySelectorAll(\".delete_list_btn\");\n  setAttributeOfElementsInArrayIncrementally(deleteListBtnCollection, 'cllId');\n  setAttributeOfElementsInArrayIncrementally(listArray, 'cllId');\n  deleteListBtnCollection.forEach(function (deleteListBtn) {\n    deleteListBtn.addEventListener(\"click\", function () {\n      makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + current_page_id, \"POST\").then(function (request) {\n        var response = request.responseText;\n        var rawResponse = response.split('{\"id\":' + current_page_id).pop();\n        var jsonResponse = '{\"id\":' + current_page_id + rawResponse;\n        var objResponse = JSON.parse(jsonResponse);\n        var cllListRegex = /\\[cll_list\\s?(.*?)\\]/g;\n        var cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);\n        var newPageContent = objResponse.content.raw.replace(cllListShortCodeArray[deleteListBtn.getAttribute('cllId')], '');\n        var newPageData = {\n          \"content\": newPageContent //Delete the appropriate list from the front end.\n\n        };\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + current_page_id, \"POST\", JSON.stringify(newPageData), true); //Delete list from front end visually\n\n        listArray.forEach(function (listToRemove) {\n          if (listToRemove.getAttribute('cllId') === deleteListBtn.getAttribute('cllId')) {\n            listToRemove.parentNode.removeChild(listToRemove);\n\n            while (listToRemove.firstChild) {\n              listToRemove.removeChild(listToRemove.firstChild);\n            }\n          }\n        });\n        return;\n      });\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createDeleteListBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createDownVoteBtn.js":
/*!**************************************************!*\
  !*** ./assets/js/functions/createDownVoteBtn.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createDownVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var downVoteBtn = document.createElement(\"button\");\n    downVoteBtn.setAttribute('class', 'down_vote_button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    downVoteBtn.setAttributeNode(cllId);\n    downVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(downVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createDownVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createEditCategoryBtn.js":
/*!******************************************************!*\
  !*** ./assets/js/functions/createEditCategoryBtn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createEditCategoryBtn(setAttributeOfElementsInArrayIncrementally) {\n  //createElementandAppendIt\n  var cllLinkListArray = document.querySelectorAll('.cll_link_list');\n  cllLinkListArray.forEach(function (cllLinkList) {\n    var cllSettingsBtn = document.createElement(\"button\");\n    cllSettingsBtn.setAttribute('class', 'cll_edit_category_btn');\n    cllSettingsBtn.innerHTML = \"Edit Category\";\n    cllLinkList.insertBefore(cllSettingsBtn, cllLinkList.firstChild);\n  });\n  var editCategoryBtnArray = document.querySelectorAll(\".cll_edit_category_btn\");\n  setAttributeOfElementsInArrayIncrementally(editCategoryBtnArray, \"cllId\");\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createEditCategoryBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createEditCategoryBtnForm.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/createEditCategoryBtnForm.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleEditCategoryBtnClick(editCategoryBtn, deps) {\n  if (cllGlobals.isEditCategoryFormCreated === false) {\n    var dropDownBox = document.createElement(\"select\"); //input element, text\n\n    dropDownBox.setAttribute('class', 'listCategorySelector');\n    var dropDownBoxPlaceHolder = document.createElement(\"option\"); //input element, text\n\n    dropDownBoxPlaceHolder.innerHTML = \"List Category\";\n    dropDownBoxPlaceHolder.value = '';\n    dropDownBoxPlaceHolder.disabled = true;\n    dropDownBoxPlaceHolder.selected = true;\n    dropDownBoxPlaceHolder.hidden = true;\n    var addNewCategory = document.createElement(\"option\"); //input element, text\n\n    addNewCategory.innerHTML = \"New Category + \";\n    addNewCategory.value = 'new category';\n    dropDownBox.appendChild(addNewCategory);\n    var b = document.createElement(\"button\"); //button element, b button\n\n    b.setAttribute('name', \"settingsSubmitBtn\");\n    b.setAttribute('type', 'button');\n    b.setAttribute('class', 'settingsSubmitBtn');\n    b.innerHTML = 'Submit';\n    var cancelBtn = document.createElement(\"button\");\n    cancelBtn.setAttribute('name', \"cancelBtn\");\n    cancelBtn.setAttribute('type', 'button');\n    cancelBtn.setAttribute('class', 'cancelBtn');\n    existing_category_names_array.forEach(function (existing_category_name) {\n      var existing_category_option = document.createElement(\"option\");\n      existing_category_option.innerHTML = existing_category_name;\n      dropDownBox.appendChild(existing_category_option);\n    });\n    editCategoryBtn.appendChild(dropDownBox);\n    editCategoryBtn.appendChild(b);\n    editCategoryBtn.appendChild(cancelBtn); //console.log(\"Create Settings Form has Run\");\n\n    cllGlobals.isEditCategoryFormCreated = true;\n    deps.addClickToEditCategoryFormSubmitBtn(editCategoryBtn, deps);\n    deps.addClickToEditCategoryFormCancelBtn(deps);\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createEditCategoryBtnForm.js?");

/***/ }),

/***/ "./assets/js/functions/createNeutralVoteBtn.js":
/*!*****************************************************!*\
  !*** ./assets/js/functions/createNeutralVoteBtn.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createNeutralVoteBtn() {\n  var allListItemsCollection = document.getElementsByClassName('link-list-item');\n  var allListItemsArray = Array.prototype.slice.call(allListItemsCollection, 0);\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var neutralVoteBtn = document.createElement(\"button\");\n    neutralVoteBtn.setAttribute('class', 'neutral_vote_button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    neutralVoteBtn.setAttributeNode(cllId);\n    neutralVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(neutralVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createNeutralVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createNewCategoryRequest.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/createNewCategoryRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createNewCategoryRequest(newCategoryValue, deps) {\n  var NewCategoryData = {\n    \"name\": newCategoryValue,\n    \"slug\": newCategoryValue.replace(\" \", \"-\") //console.log(\"Submit Button was clicked, now I'll post\");\n\n  };\n  deps.makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-link-category/v1/cll-link/' + NewCategoryData.name, 'POST').then(function (request) {\n    //console.log(\"Request for new category has been made successfully\");\n    console.log(request.responseText);\n  })[\"catch\"](function (error) {\n    //console.log(\"Failed to make the new category request\");\n    console.log(error);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createNewCategoryRequest.js?");

/***/ }),

/***/ "./assets/js/functions/createNewListBtn.js":
/*!*************************************************!*\
  !*** ./assets/js/functions/createNewListBtn.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createNewListBtn(makeRequest) {\n  var newListBtn = document.createElement('button');\n  newListBtn.setAttribute(\"class\", \"newListBtn\");\n  newListBtn.innerHTML = \"Add New List +\";\n  var cll_link_list = document.querySelector('.cll_link_list');\n  cll_link_list.parentElement.insertBefore(newListBtn, cll_link_list.parentElement.firstChild);\n  newListBtn.addEventListener(\"click\", function () {\n    if (confirm(\"Are you sure you would like to add a new list?\")) {\n      //console.log(\"You pressed YES!\");\n      makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + current_page_id, \"POST\").then(function (request) {\n        var rawResponse = request.responseText.split('{\"id\":' + current_page_id).pop();\n        var jsonResponse = '{\"id\":' + current_page_id + rawResponse;\n        var objResponse = JSON.parse(jsonResponse);\n        var NewShortCodeData = {\n          \"content\": objResponse.content.raw + ' [cll_list]'\n        };\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + current_page_id, \"POST\", JSON.stringify(NewShortCodeData), true).then(function () {//console.log(\"Successfully updated page!\");\n        })[\"catch\"](function () {//console.log(\"Unsuccesful page update!\");\n        });\n      })[\"catch\"](function (error) {\n        console.log(error); //console.log(\"Unable to get page with given ID\");\n      });\n    } else {//console.log(\"You pressed NO\");\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createNewListBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createUpVoteBtn.js":
/*!************************************************!*\
  !*** ./assets/js/functions/createUpVoteBtn.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createUpVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var upVoteBtn = document.createElement(\"button\");\n    upVoteBtn.setAttribute('class', 'up_vote_button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    upVoteBtn.setAttributeNode(cllId);\n    upVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(upVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createUpVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/displayDataPerItem.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/displayDataPerItem.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest) {\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/', 'GET').then(function (request) {\n    var cllLinkArray = JSON.parse(request.responseText);\n    var linkListTitleArray = document.querySelectorAll('.link-list-title');\n    var incrementer = 0; //console.log(cllLinkArray);\n\n    cllLinkArray.forEach(function (cllLink) {\n      linkListTitleArray.forEach(function (linkListTitle) {\n        var post_slug = linkListTitle.textContent.trim().replace(/\\s/g, '-').toLowerCase();\n\n        if (cllLink.slug === post_slug) {\n          var upVotesCounter = document.createElement('p');\n          upVotesCounter.setAttribute('class', 'up_votes_counter');\n          upVotesCounter.innerHTML = cllLinkArray[incrementer].meta.up_votes;\n          var downVotesCounter = document.createElement('p');\n          downVotesCounter.setAttribute('class', 'down_votes_counter');\n          downVotesCounter.innerHTML = cllLinkArray[incrementer].meta.down_votes;\n          var currentLinkItemId = linkListTitle.getAttribute('cllId');\n          var downVoteButton = document.querySelector('.down_vote_button[cllId=\"' + currentLinkItemId + '\"]');\n          var upVoteButton = document.querySelector('.up_vote_button[cllId=\"' + currentLinkItemId + '\"]');\n          downVoteButton.appendChild(downVotesCounter);\n          upVoteButton.appendChild(upVotesCounter); //display \"submittedByElement\";\n\n          var submittedByElement = document.createElement('p');\n          submittedByElement.setAttribute('class', 'submitted_by'); //console.log(cllLinkArray[incrementer].meta);\n\n          submittedByElement.innerHTML = \"Submitted by: \" + cllLinkArray[incrementer].meta.submitted_by; //console.log(currentLinkItemId);\n\n          var linkListItem = document.querySelector('.link-list-item[cllId=\"' + currentLinkItemId + '\"]');\n\n          try {\n            linkListItem.appendChild(submittedByElement);\n          } catch (error) {\n            console.log(error);\n          }\n        }\n      });\n      incrementer += 1;\n    });\n    var downVoteCounterArray = document.querySelectorAll('.down_votes_counter');\n    setAttributeOfElementsInArrayIncrementally(downVoteCounterArray, 'cllId');\n    var upVoteCounterArray = document.querySelectorAll('.up_votes_counter');\n    setAttributeOfElementsInArrayIncrementally(upVoteCounterArray, 'cllId');\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/displayDataPerItem.js?");

/***/ }),

/***/ "./assets/js/functions/endLinkRequest.js":
/*!***********************************************!*\
  !*** ./assets/js/functions/endLinkRequest.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function endLinkRequest(currentAddToListBtn, deps) {\n  var multiListPageCategoryIds = \"cll_category_ids\" + \"_\" + currentAddToListBtn.getAttribute('cllid');\n  var makeRequest = deps.makeRequest; //console.log(window[multiListPageCategoryIds]);\n\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/users/' + cllUserId, 'GET').then(function (request) {\n    var objResponse = JSON.parse(request.responseText); //console.log(objResponse.name);\n\n    return objResponse.name;\n  }).then(function (username) {\n    var NewLinkItemData = {\n      \"title\": document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value,\n      \"slug\": \"/\" + document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value.replace(/ /g, '-').toLowerCase(),\n      \"meta\": {\n        \"URL\": document.querySelector('[name=\"newListItemUrl\"].add_to_list_input').value.replace(/ /g, '-').replace(/%20/g, '-'),\n        \"link_type\": \"external link\",\n        \"submitted_by\": username\n      },\n      \"status\": \"publish\",\n      \"link_category\": [window[multiListPageCategoryIds]] //console.log(NewLinkItemData);\n      //create new link post type\n\n    };\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(NewLinkItemData), true).then(function (request) {//console.log(request.responseText);\n      //console.log(\"Success, new post created\");\n      //document.location.reload(true);\n    });\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n  alert(\"Thank you for submitting!\");\n  var newListItemTitle = document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value; //event.stopPropagation();\n\n  var jsDataArray = {\n    \"newListItemTitle\": newListItemTitle,\n    \"currentAddToListBtn\": currentAddToListBtn //addNewListItemJS(jsDataArray);\n\n  };\n};\n\n//# sourceURL=webpack:///./assets/js/functions/endLinkRequest.js?");

/***/ }),

/***/ "./assets/js/functions/handleCategoryEdit.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/handleCategoryEdit.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError(\"Cannot destructure undefined\"); }\n\n//DEPENDENCIES MUST BE ACCOUNTED FOR!\nmodule.exports = function handleCategoryEdit(editCategoryForm, selectedCategory, deps) {\n  if (selectedCategory === 'new category') {\n    if (cllGlobals.isCategoryInputCreated === false) {\n      alert('You are making a New Category Request!');\n      var newCategoryRequestElement = document.createElement(\"input\"); //input element, text\n\n      newCategoryRequestElement.setAttribute('type', \"text\");\n      newCategoryRequestElement.setAttribute('name', \"newCategoryRequestElement\");\n      newCategoryRequestElement.setAttribute('placeholder', \"New category here\");\n      editCategoryForm.appendChild(newCategoryRequestElement);\n      cllGlobals.isCategoryInputCreated = true;\n    } else if (cllGlobals.isCategoryInputCreated === true) {\n      var newCategoryValue = document.querySelector('[name=\"newCategoryRequestElement\"]').value; //console.log(newCategoryValue);\n\n      deps.createNewCategoryRequest(newCategoryValue.toLowerCase(), deps); //create new category with this value and change page to this category\n\n      var cllRequestData = {\n        \"selectedCategory\": newCategoryValue.toLowerCase(),\n        \"currentCllId\": editCategoryForm.getAttribute('cllid')\n      };\n      deps.updateCllListRequest(cllRequestData, deps);\n    }\n  } else {\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = existing_category_names_array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        _objectDestructuringEmpty(_step.value);\n\n        if (selectedCategory === '') {\n          alert(\"You must select a link category!\");\n          break;\n        } else if (selectedCategory !== '') {\n          //console.log(\"Successfully adding \"+selectedCategory);\n          //HTTP Request to update page FUNCTION\n          var cllRequestData = {\n            \"selectedCategory\": selectedCategory,\n            \"currentCllId\": editCategoryForm.getAttribute('cllid')\n          };\n          deps.updateCllListRequest(cllRequestData, deps);\n          break;\n        }\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n          _iterator[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleCategoryEdit.js?");

/***/ }),

/***/ "./assets/js/functions/handleDownVoteBtnClick.js":
/*!*******************************************************!*\
  !*** ./assets/js/functions/handleDownVoteBtnClick.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleDownVoteBtnClick(downVoteBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;\n  var setVoterStatusToDownAndUpdatePostMeta = deps.setVoterStatusToDownAndUpdatePostMeta;\n  var linkListTitleArray = document.querySelectorAll('.link-list-title');\n\n  if (cllGlobals.isDownVoteBtnClicked === false) {\n    linkListTitleArray.forEach(function (linkListTitle) {\n      var post_slug = linkListTitle.textContent.trim().replace(/\\s/g, '-').toLowerCase();\n\n      if (linkListTitle.getAttribute('cllId') === downVoteBtn.getAttribute('cllId')) {\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?slug=' + post_slug, 'GET').then(function (request) {\n          var objResponse = JSON.parse(request.responseText);\n          var metaObj = objResponse[0].meta;\n          var currentLinkItemPostId = objResponse[0].id;\n          var currentLinkItemId = downVoteBtn.getAttribute('cllId');\n          var downVoteCounter = document.querySelector('.down_votes_counter[cllId=\"' + currentLinkItemId + '\"]');\n          var upVoteCounter = document.querySelector('.up_votes_counter[cllId=\"' + currentLinkItemId + '\"]');\n\n          try {\n            var voteRecordObj = JSON.parse(metaObj.voteRecord); //console.log(voteRecordObj[cllUserId]);\n\n            if (typeof voteRecordObj[cllUserId[0]] === \"undefined\") {\n              //if current user has never voted then...\n              if (cllGlobals.isDownVoteBtnClicked === false) {\n                cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isUpVoteBtnClicked = true; //console.log(\"There is no information on record for this user\");\n                //visually add 1 down vote\n\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n                setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"downVote\", makeRequest);\n                return;\n              }\n            } //console.log(\"There is information on record for this user\");\n            //Get user vote status\n\n\n            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId]);\n\n            if (currentUserVoteStatus === 0) {\n              alert(\"You've already down voted this post!\");\n              return;\n            } else if (currentUserVoteStatus === 1) {\n              if (cllGlobals.isDownVoteBtnClicked === false) {\n                cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isUpVoteBtnClicked = true;\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", upVoteCounter); //User \"Up Voted\" last.\n                //Set user vote status to 0\n\n                setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"switch\", makeRequest);\n                return;\n              }\n            } else if (currentUserVoteStatus === 3) {\n              if (cllGlobals.isDownVoteBtnClicked === false) {\n                cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isUpVoteBtnClicked = true; //visually add 1 down vote\n\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n                setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"downVote\", makeRequest);\n                return;\n              }\n            }\n          } catch (error) {\n            if (cllGlobals.isDownVoteBtnClicked === false) {\n              cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n              cllGlobals.isNeutralVoteBtnClicked = true;\n              cllGlobals.isUpVoteBtnClicked = true;\n              console.log(error); //console.log(\"Could not parse voteRecord\");\n              //console.log(\"There is no information on record AT ALL\");\n              //console.log(\"Change voter status to 0\");\n\n              metaObj.voteRecord = '{\"' + cllUserId + '\":' + '\"0\"}'; ////console.log(\"add downvote to post\");\n\n              metaObj.down_votes += 1;\n              var newPostMetaData = JSON.stringify({\n                \"meta\": metaObj\n              }); //visually add 1 to down vote\n\n              downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n              makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + objResponse[0].id, 'POST', newPostMetaData).then(function (request) {\n                //do something after request complete\n                cllGlobals.isUpVoteBtnClicked = false;\n                cllGlobals.isNeutralVoteBtnClicked = false;\n                cllGlobals.isDownVoteBtnClicked = false;\n              })[\"catch\"](function (error) {\n                console.log(error);\n              });\n              return;\n            }\n          }\n        })[\"catch\"](function (error) {\n          console.log(error);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleDownVoteBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/handleNeutralVoteBtnClick.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/handleNeutralVoteBtnClick.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleNeutralVoteBtnClick(neutralVoteBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;\n  var setVoterStatusToNeutralAndUpdatePostMeta = deps.setVoterStatusToNeutralAndUpdatePostMeta;\n  var linkListTitleArray = document.querySelectorAll('.link-list-title');\n\n  if (cllGlobals.isNeutralVoteBtnClicked === false) {\n    linkListTitleArray.forEach(function (linkListTitle) {\n      var post_slug = linkListTitle.textContent.trim().replace(/\\s/g, '-').toLowerCase();\n\n      if (linkListTitle.getAttribute('cllId') === neutralVoteBtn.getAttribute('cllId')) {\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?slug=' + post_slug, 'GET').then(function (request) {\n          var objResponse = JSON.parse(request.responseText);\n          var currentLinkItemPostId = objResponse[0].id;\n          var currentLinkItemCllId = neutralVoteBtn.getAttribute('cllId'); //console.log(objResponse);\n\n          var metaObj = objResponse[0].meta;\n\n          try {\n            var voteRecordObj = JSON.parse(metaObj.voteRecord); //console.log(voteRecordObj[cllUserId]);\n\n            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);\n\n            if (typeof voteRecordObj[cllUserId[0]] === \"undefined\") {\n              //if current user has never voted then...\n              if (cllGlobals.isNeutralVoteBtnClicked === false) {\n                cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n                cllGlobals.isUpVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true;\n                console.log(\"There is no information for this user on record\");\n                console.log(\"Voter status unavailable, updating status\");\n                setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"none\", makeRequest);\n                return;\n              }\n            } else if (currentUserVoteStatus === 3) {\n              alert(\"You're already neutral!\");\n              return;\n            } else if (currentUserVoteStatus === 1) {\n              if (cllGlobals.isNeutralVoteBtnClicked === false) {\n                cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n                cllGlobals.isUpVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true;\n                console.log(\"Voter status 1, updating status, removing up vote updating voter status\"); //visually remove users up vote\n\n                var upVoteCounter = document.querySelector('.up_votes_counter[cllId=\"' + currentLinkItemCllId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", upVoteCounter);\n                setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"upVote\", makeRequest);\n                return;\n              }\n            } else if (currentUserVoteStatus === 0) {\n              if (cllGlobals.isNeutralVoteBtnClicked === false) {\n                cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n                cllGlobals.isUpVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true;\n                console.log(\"Voter status 0, updating status, removing down vote updating voter status\"); //visually remove users down vote\n\n                var downVoteCounter = document.querySelector('.down_votes_counter[cllId=\"' + currentLinkItemCllId + '\"]');\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", downVoteCounter);\n                setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"downVote\", makeRequest);\n                return;\n              }\n            }\n          } catch (error) {\n            if (cllGlobals.isNeutralVoteBtnClicked === false) {\n              cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n              cllGlobals.isUpVoteBtnClicked = true;\n              cllGlobals.isDownVoteBtnClicked = true;\n              console.log(error);\n              console.log(\"Could not parse voteRecord\"); //console.log(\"There is no information on record *assertion\");\n              //console.log(metaObj.voteRecord);\n\n              console.log(\"Change voter status to 3\");\n              metaObj.voteRecord = '{\"' + cllUserId + '\":' + '\"3\"}';\n              var newPostMetaData = JSON.stringify({\n                \"meta\": metaObj\n              });\n              makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + objResponse[0].id, 'POST', newPostMetaData).then(function (request) {\n                //Make other buttons clickable,\n                cllGlobals.isUpVoteBtnClicked = false;\n                cllGlobals.isNeutralVoteBtnClicked = false;\n                cllGlobals.isDownVoteBtnClicked = false;\n              })[\"catch\"](function (error) {\n                console.log(error);\n              });\n              return;\n            }\n          }\n        })[\"catch\"](function (error) {\n          console.log(error);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleNeutralVoteBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/handleSearchInput.js":
/*!**************************************************!*\
  !*** ./assets/js/functions/handleSearchInput.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleSearchInput(makeRequest) {\n  var cllSearchFormInput = document.querySelector('.cll_search_form_input');\n  var cllSuggestions = document.querySelector('.cll-suggestions');\n\n  if (cllSearchFormInput !== undefined) {\n    var searchEngineTimeout;\n\n    cllSearchFormInput.onkeydown = function () {\n      if (event.keyCode == 13) {\n        event.preventDefault();\n      }\n    };\n\n    cllSearchFormInput.onkeyup = function () {\n      //clear search results\n      cllSuggestions.innerHTML = ''; //clear search results array with IIFE\n\n      (function () {\n        //var cllSuggestions = document.querySelector('.cll-suggestions');\n        var loadingElementCollection = document.querySelectorAll('#cll-loading');\n        var loadingElement = document.createElement(\"div\");\n        loadingElement.setAttribute('id', 'cll-loading');\n        loadingElement.innerHTML = 'LOADING';\n\n        if (loadingElementCollection.length === 0) {\n          //console.log(\"Adding Loading Element\");\n          cllSuggestions.appendChild(loadingElement);\n        }\n      })(); //Process searchEngine Input after one second\n\n\n      searchEngineTimeout = setTimeout(function () {\n        clearTimeout(searchEngineTimeout); //If the input is nothing then clear search results\n\n        if (cllSearchFormInput.value === ' ' || cllSearchFormInput.value === '') {\n          //console.log(\"No value was entered\");\n          cllSuggestions.innerHTML = '';\n        } else {\n          makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?search=' + cllSearchFormInput.value, 'GET', false).then(function (request) {\n            cllSuggestions.innerHTML = '';\n            var searchResultsObj = JSON.parse(request.responseText);\n            searchResultsObj.forEach(function (searchResult) {\n              if (cllSuggestions.childElementCount < 5) {\n                //console.log(\"Search result below!\");\n                //console.log(searchResult);\n                var searchResultElement = document.createElement(\"div\");\n                searchResultElement.setAttribute('class', 'search-result-element');\n                searchResultElement.innerHTML = searchResult.title.rendered; //set innerHTML to title\n\n                if (searchResult.meta.link_type.toLowerCase() === \"external link\") {\n                  cllSuggestions.appendChild(searchResultElement);\n                } //make searchResult Clickable\n\n\n                searchResultElement.addEventListener('click', function () {\n                  event.preventDefault();\n                  window.open(searchResult.meta.URL); //Open in link new window\n                });\n              }\n            });\n          })[\"catch\"](function (error) {\n            console.log(error);\n          });\n        }\n      }, 1000);\n    };\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleSearchInput.js?");

/***/ }),

/***/ "./assets/js/functions/handleUpVoteBtnClick.js":
/*!*****************************************************!*\
  !*** ./assets/js/functions/handleUpVoteBtnClick.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleUpVoteBtnClick(upVoteBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;\n  var setVoterStatusToUpAndUpdatePostMeta = deps.setVoterStatusToUpAndUpdatePostMeta;\n  var linkListTitleArray = document.querySelectorAll('.link-list-title');\n\n  if (cllGlobals.isUpVoteBtnClicked === false) {\n    linkListTitleArray.forEach(function (linkListTitle) {\n      var post_slug = linkListTitle.textContent.trim().replace(/\\s/g, '-').toLowerCase(); //console.log(post_slug);\n\n      if (linkListTitle.getAttribute('cllId') === upVoteBtn.getAttribute('cllId')) {\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?slug=' + post_slug, 'GET').then(function (request) {\n          var objResponse = JSON.parse(request.responseText);\n          var currentLinkItemPostId = objResponse[0].id;\n          var currentLinkItemId = upVoteBtn.getAttribute('cllId');\n          var metaObj = objResponse[0].meta;\n\n          try {\n            var voteRecordObj = JSON.parse(metaObj.voteRecord);\n            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);\n\n            if (cllGlobals.isUpVoteBtnClicked === false) {\n              if (typeof voteRecordObj[cllUserId[0]] === \"undefined\") {\n                //if current user has never voted then...\n                cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true; //console.log(\"There is no information for this user on record\");\n\n                var upVoteCounter = document.querySelector('.up_votes_counter[cllId=\"' + currentLinkItemId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter); //increments upvote\n\n                setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"upVote\", makeRequest);\n                return;\n              } else if (currentUserVoteStatus === 1) {\n                alert(\"You've already up voted this post!\");\n                return;\n              } else if (currentUserVoteStatus === 0) {\n                cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true; //console.log(\"Voter status was 0, incrementing up vote /removing downvote (visually too), changing status to 1\");\n                //visually remove down vote\n\n                var downVoteCounter = document.querySelector('.down_votes_counter[cllId=\"' + currentLinkItemId + '\"]');\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", downVoteCounter); //visually add up vote\n\n                var upVoteCounter = document.querySelector('.up_votes_counter[cllId=\"' + currentLinkItemId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter);\n                setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"switch\", makeRequest);\n                return;\n              } else if (currentUserVoteStatus === 3) {\n                cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true; //console.log(\"Voter status was 3, incrementing up vote (visually too), changing status to 1\");\n                //visually add up vote\n\n                var upVoteCounter = document.querySelector('.up_votes_counter[cllId=\"' + currentLinkItemId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter); //Increment up_votes in metaObj\n\n                setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"upVote\", makeRequest);\n                return;\n              }\n            }\n          } catch (error) {\n            if (cllGlobals.isUpVoteBtnClicked === false) {\n              cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n              cllGlobals.isNeutralVoteBtnClicked = true;\n              cllGlobals.isDownVoteBtnClicked = true;\n              console.log(error);\n              console.log(\"Could not parse voteRecord\"); //console.log(\"There is no information on record *assertion\");\n\n              metaObj.voteRecord = '{\"' + cllUserId[0] + '\":' + '\"1\"}'; //console.log(\"add UpVote to post\");\n\n              metaObj.up_votes += 1;\n              var newPostMetaData = JSON.stringify({\n                \"meta\": metaObj\n              });\n              var upVoteCounter = document.querySelector('.up_votes_counter[cllId=\"' + currentLinkItemId + '\"]');\n              upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter);\n              makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + objResponse[0].id, 'POST', newPostMetaData).then(function (request) {\n                cllGlobals.isUpVoteBtnClicked = false;\n                cllGlobals.isNeutralVoteBtnClicked = false;\n                cllGlobals.isDownVoteBtnClicked = false;\n              })[\"catch\"](function (error) {\n                console.log(error);\n              });\n              return;\n            }\n          }\n        })[\"catch\"](function (error) {\n          console.log(error);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleUpVoteBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/isObjEmpty.js":
/*!*******************************************!*\
  !*** ./assets/js/functions/isObjEmpty.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function isObjEmpty(obj) {\n  for (var key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      return false;\n    }\n  }\n\n  return true;\n};\n\n//# sourceURL=webpack:///./assets/js/functions/isObjEmpty.js?");

/***/ }),

/***/ "./assets/js/functions/isUrl.js":
/*!**************************************!*\
  !*** ./assets/js/functions/isUrl.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function isUrl(str) {\n  regexp = /^(?:(?:https?|ftp):\\/\\/)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:\\/\\S*)?$/;\n\n  if (regexp.test(str)) {\n    //console.log('returned true');\n    return true;\n  } else {\n    //console.log('returned false')\n    return false;\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/isUrl.js?");

/***/ }),

/***/ "./assets/js/functions/makeRequest.js":
/*!********************************************!*\
  !*** ./assets/js/functions/makeRequest.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function makeRequest(url, method, sendData, refresh) {\n  var refreshInput = refresh || ''; //console.log(\"request made\");\n  // Create the XHR request\n\n  var request = new XMLHttpRequest(); // Return it as a Promise\n\n  return new Promise(function (resolve, reject) {\n    // Setup our listener to process compeleted requests\n    request.onreadystatechange = function () {\n      // Only run if the request is complete\n      if (request.readyState !== 4) return; // Process the response\n\n      if (request.status >= 200 && request.status < 300) {\n        // If successful\n        resolve(request);\n\n        if (typeof sendData !== 'undefined') {//document.location.reload(true);\n          //console.log('sendData was present!');\n        }\n\n        if (refreshInput === false) {} else if (refreshInput === true) {\n          document.location.reload(true);\n        }\n      } else {\n        // If failed\n        reject({\n          status: request.status,\n          statusText: request.statusText\n        });\n      }\n    }; // Setup our HTTP request\n\n\n    request.open(method || 'GET', url, true);\n    request.setRequestHeader(\"X-WP-Nonce\", magicalData.nonce);\n    request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\"); // Send the request\n\n    if (typeof sendData === 'undefined') {\n      request.send(); //console.log(\"Data is undefined! No data was sent\");\n    } else {\n      //console.log(sendData);\n      request.send(sendData);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/makeRequest.js?");

/***/ }),

/***/ "./assets/js/functions/removeAllChildFromNodeExceptText.js":
/*!*****************************************************************!*\
  !*** ./assets/js/functions/removeAllChildFromNodeExceptText.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function removeAllChildFromNodeExceptText(node) {\n  //var node = document.querySelector(nodeSelector);\n  for (var i = 0; i < node.childNodes.length; i++) {\n    if (node.childNodes[i].nodeType == 3) {\n      //check if text node\n      continue;\n    } else {\n      node.removeChild(node.childNodes[i]);\n      i--;\n    }\n  }\n\n  return node;\n};\n\n//# sourceURL=webpack:///./assets/js/functions/removeAllChildFromNodeExceptText.js?");

/***/ }),

/***/ "./assets/js/functions/replaceOccurence.js":
/*!*************************************************!*\
  !*** ./assets/js/functions/replaceOccurence.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function replaceOccurrence(string, regex, n, replace) {\n  var i = 0; //set up incrementer\n\n  return string.replace(regex, function (match) {\n    //i+=1;\n    if (i === n) {\n      //console.log(replace);\n      i += 1;\n      return replace;\n    }\n\n    i += 1; //console.log(match);\n\n    return match;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/replaceOccurence.js?");

/***/ }),

/***/ "./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js":
/*!***************************************************************************!*\
  !*** ./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function setAttributeOfElementsInArrayIncrementally(array, attribute_name) {\n  var incrementer = 0;\n  array.forEach(function (item) {\n    var attribute = document.createAttribute(attribute_name);\n    item.setAttributeNode(attribute);\n    item.setAttribute(attribute_name, incrementer);\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js?");

/***/ }),

/***/ "./assets/js/functions/setVoterStatusToDownAndUpdatePostMeta.js":
/*!**********************************************************************!*\
  !*** ./assets/js/functions/setVoterStatusToDownAndUpdatePostMeta.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest) {\n  var voteRecordObj = JSON.parse(metaObj.voteRecord);\n\n  if (voteType === \"downVote\") {\n    //increment downVote\n    metaObj.down_votes += 1;\n  } else if (voteType === 'switch') {\n    //decrement upvote\n    metaObj.up_votes -= 1; //increment downvote\n\n    metaObj.down_votes += 1;\n  } else if (voteType === \"none\") {//do nothing\n  }\n\n  voteRecordObj[cllUserId[0]] = \"0\";\n  var newVoteStatusData = JSON.stringify(voteRecordObj);\n  metaObj.voteRecord = newVoteStatusData;\n  var newPostMetaData = JSON.stringify({\n    \"meta\": metaObj\n  });\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + currentLinkItemPostId, 'POST', newPostMetaData).then(function (request) {\n    //make buttons clickable again\n    cllGlobals.isUpVoteBtnClicked = false;\n    cllGlobals.isNeutralVoteBtnClicked = false;\n    cllGlobals.isDownVoteBtnClicked = false;\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setVoterStatusToDownAndUpdatePostMeta.js?");

/***/ }),

/***/ "./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js":
/*!*************************************************************************!*\
  !*** ./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest) {\n  var voteRecordObj = JSON.parse(metaObj.voteRecord);\n\n  if (voteType === \"upVote\") {\n    //decrement upvote\n    metaObj.up_votes -= 1;\n  } else if (voteType === 'downVote') {\n    //decrement downvote\n    metaObj.down_votes -= 1;\n  } else if (voteType === \"none\") {//do nothing\n  }\n\n  voteRecordObj[cllUserId[0]] = \"3\";\n  var newVoteStatusData = JSON.stringify(voteRecordObj);\n  metaObj.voteRecord = newVoteStatusData;\n  var newPostMetaData = JSON.stringify({\n    \"meta\": metaObj\n  });\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + currentLinkItemPostId, 'POST', newPostMetaData).then(function (request) {\n    //Make other buttons clickable,\n    cllGlobals.isUpVoteBtnClicked = false;\n    cllGlobals.isNeutralVoteBtnClicked = false;\n    cllGlobals.isDownVoteBtnClicked = false;\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js?");

/***/ }),

/***/ "./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js":
/*!********************************************************************!*\
  !*** ./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest) {\n  var voteRecordObj = JSON.parse(metaObj.voteRecord);\n\n  if (voteType === \"upVote\") {\n    //increment upvote\n    metaObj.up_votes += 1;\n  } else if (voteType === 'switch') {\n    //increment upvote\n    metaObj.up_votes += 1; //decrement downvote\n\n    metaObj.down_votes -= 1;\n  } else if (voteType === \"none\") {//do nothing\n  }\n\n  voteRecordObj[cllUserId[0]] = \"1\";\n  var newVoteStatusData = JSON.stringify(voteRecordObj);\n  metaObj.voteRecord = newVoteStatusData;\n  var newPostMetaData = JSON.stringify({\n    \"meta\": metaObj\n  });\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + currentLinkItemPostId, 'POST', newPostMetaData).then(function (request) {\n    cllGlobals.isUpVoteBtnClicked = false;\n    cllGlobals.isNeutralVoteBtnClicked = false;\n    cllGlobals.isDownVoteBtnClicked = false;\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js?");

/***/ }),

/***/ "./assets/js/functions/throughLinkRequest.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/throughLinkRequest.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function throughLinkRequest(currentAddToListBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var NewLinkPageData = {\n    \"title\": document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value,\n    \"slug\": \"/\" + document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value.replace(/ /g, '-').toLowerCase(),\n    \"content\": '[cll_list]',\n    \"type\": \"page\",\n    \"status\": \"publish\" //Create new link page with user entered URL + information about how to make page\n    //createLinkPage\n\n  };\n\n  if (cllIsAdmin[0] === \"true\") {\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages', 'POST', JSON.stringify(NewLinkPageData)).then(function () {//console.log(\"Success, new page created!\");\n      //document.location.reload(true);\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n  } else {\n    var NewLinkPageData_non_admin = {\n      \"post_title\": NewLinkPageData.title,\n      \"post_content\": NewLinkPageData.content,\n      \"post_type\": \"page\",\n      \"post_status\": \"publish\" //custom end point request\n\n    };\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-link/v1/create-page/', 'POST', JSON.stringify(NewLinkPageData_non_admin)).then(function (request) {\n      console.log(request.responseText);\n      console.log(JSON.parse(request.responseText));\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }\n\n  var multiListPageCategoryIds = \"cll_category_ids\" + \"_\" + currentAddToListBtn.getAttribute('cllid');\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/users/' + cllUserId[0], 'GET').then(function (request) {\n    var objResponse = JSON.parse(request.responseText); //console.log(objResponse.name);\n\n    return objResponse.name;\n  }).then(function (username) {\n    var NewLinkItemData = {\n      \"title\": document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value,\n      \"slug\": \"/\" + document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value.replace(/ /g, '-').toLowerCase(),\n      \"meta\": {\n        \"URL\": cllGlobals.currentProtocalDomain + '/' + document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value.replace(/ /g, '-').replace(/%20/g, '-'),\n        \"link_type\": \"internal link\",\n        \"submitted_by\": username\n      },\n      \"status\": \"publish\",\n      \"link_category\": [window[multiListPageCategoryIds]] //create new link post type\n\n    };\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(NewLinkItemData), true).then(function () {//console.log(\"Success, new post created\");\n      //document.location.reload(true);\n    });\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n  var newListItemTitle = document.querySelector('[name=\"newListItemTitle\"].add_to_list_input').value; //event.stopPropagation();\n\n  var jsDataArray = {\n    \"newListItemTitle\": newListItemTitle,\n    \"currentAddToListBtn\": currentAddToListBtn //addNewListItemJS(jsDataArray);\n\n  };\n};\n\n//# sourceURL=webpack:///./assets/js/functions/throughLinkRequest.js?");

/***/ }),

/***/ "./assets/js/functions/updateCllListRequest.js":
/*!*****************************************************!*\
  !*** ./assets/js/functions/updateCllListRequest.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = //Function for updating shortcode of current page\nfunction updateCllListRequest(cllRequestData, deps) {\n  var selectedCategory = cllRequestData['selectedCategory'];\n  var currentCllId = parseInt(cllRequestData['currentCllId']); //console.log(selectedCategory);\n\n  console.log(currentCllId);\n  var makeRequest = deps.makeRequest;\n  var replaceOccurrence = deps.replaceOccurrence;\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + current_page_id, \"POST\").then(function (request) {\n    var response = request.responseText;\n    var rawResponse = response.split('{\"id\":' + current_page_id).pop();\n    var jsonResponse = '{\"id\":' + current_page_id + rawResponse;\n    var objResponse = JSON.parse(jsonResponse);\n    var cllListRegex = /\\[cll_list]?\\s?/g;\n    var cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);\n    console.log(cllListShortCodeArray);\n    var currentShortCode = cllListShortCodeArray[currentCllId].toString().toLowerCase();\n    var plainCllListRegex = /\\[cll_list]?(\\s+)?]/g;\n    var plainShortCodeArray = currentShortCode.match(plainCllListRegex);\n\n    if (plainShortCodeArray !== null) {\n      //else{\n      var cllReplacementRegex = /\\[cll_list]?\\s?\\]?/g;\n      var pageContent = objResponse.content.raw; //replace ONLY the correctly numbered short code using INDEX\n\n      var newPageContent = replaceOccurrence(pageContent, cllReplacementRegex, parseInt(currentCllId), '[cll_list category_name=\"' + selectedCategory + '\"]'); //var newPageContent = pageContent.replace(cllReplacementRegex,'[cll_list category_name=\"'+selectedCategory+'\"]');\n\n      console.log(\"selected category is: \" + selectedCategory);\n      console.log(pageContent);\n      console.log(newPageContent);\n      var NewShortCodeData = {\n        \"content\": newPageContent //}\n\n      };\n      return NewShortCodeData;\n    } else {\n      console.log(\"Short Code with New Category FOUND!\");\n      var cllPopulatedReplacementRegex = /category_name\\s?=\\s?\"(.*?)\"/g;\n      var pageContent = objResponse.content.raw; //replace ONLY the correctly numbered short code using INDEX\n\n      var newPageContent = replaceOccurrence(pageContent, cllPopulatedReplacementRegex, parseInt(currentCllId), 'category_name=\"' + selectedCategory + '\"');\n      var NewShortCodeData = {\n        \"content\": newPageContent\n      };\n      return NewShortCodeData;\n    }\n  }).then(function (newShortCodeData) {\n    //console.log(\"WIN NUMBER TWO\");\n    //console.log(newShortCodeData);\n    return makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + current_page_id, \"POST\", JSON.stringify(newShortCodeData), true);\n  })[\"catch\"](function (error) {\n    //console.log(\"FAILED\");\n    console.log(error);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/updateCllListRequest.js?");

/***/ }),

/***/ "./assets/js/functions/visuallyUpdateVoteCounter.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/visuallyUpdateVoteCounter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function visuallyUpdateVoteCounter(updateType, voteCounter) {\n  var currentVoteValue = parseInt(voteCounter.textContent);\n\n  if (updateType === \"increment\") {\n    currentVoteValue += 1;\n    voteCounter.innerHTML = currentVoteValue;\n    return voteCounter.innerHTML;\n  } else if (updateType = \"decrement\") {\n    currentVoteValue -= 1;\n    voteCounter.innerHTML = currentVoteValue;\n    return voteCounter.innerHTML;\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/visuallyUpdateVoteCounter.js?");

/***/ }),

/***/ "./assets/src/mainjs.js":
/*!******************************!*\
  !*** ./assets/src/mainjs.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/cllGlobals */ \"./assets/js/cllGlobals.js\");\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/functions/setAttributeOfElementsInArrayIncrementally */ \"./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js\");\n/* harmony import */ var _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/functions/removeAllChildFromNodeExceptText */ \"./assets/js/functions/removeAllChildFromNodeExceptText.js\");\n/* harmony import */ var _js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/functions/visuallyUpdateVoteCounter */ \"./assets/js/functions/visuallyUpdateVoteCounter.js\");\n/* harmony import */ var _js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/functions/setVoterStatusToNeutralAndUpdatePostMeta */ \"./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js\");\n/* harmony import */ var _js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/functions/setVoterStatusToUpAndUpdatePostMeta */ \"./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js\");\n/* harmony import */ var _js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/functions/setVoterStatusToDownAndUpdatePostMeta */ \"./assets/js/functions/setVoterStatusToDownAndUpdatePostMeta.js\");\n/* harmony import */ var _js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/functions/makeRequest */ \"./assets/js/functions/makeRequest.js\");\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../js/functions/createAddToListBtn */ \"./assets/js/functions/createAddToListBtn.js\");\n/* harmony import */ var _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../js/functions/replaceOccurence */ \"./assets/js/functions/replaceOccurence.js\");\n/* harmony import */ var _js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../js/functions/displayDataPerItem */ \"./assets/js/functions/displayDataPerItem.js\");\n/* harmony import */ var _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _js_functions_handleCategoryEdit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../js/functions/handleCategoryEdit */ \"./assets/js/functions/handleCategoryEdit.js\");\n/* harmony import */ var _js_functions_handleCategoryEdit__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleCategoryEdit__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../js/functions/handleUpVoteBtnClick */ \"./assets/js/functions/handleUpVoteBtnClick.js\");\n/* harmony import */ var _js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../js/functions/handleNeutralVoteBtnClick */ \"./assets/js/functions/handleNeutralVoteBtnClick.js\");\n/* harmony import */ var _js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../js/functions/handleDownVoteBtnClick */ \"./assets/js/functions/handleDownVoteBtnClick.js\");\n/* harmony import */ var _js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _js_functions_createEditCategoryBtnForm__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../js/functions/createEditCategoryBtnForm */ \"./assets/js/functions/createEditCategoryBtnForm.js\");\n/* harmony import */ var _js_functions_createEditCategoryBtnForm__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createEditCategoryBtnForm__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../js/functions/createDownVoteBtn */ \"./assets/js/functions/createDownVoteBtn.js\");\n/* harmony import */ var _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../js/functions/createNeutralVoteBtn */ \"./assets/js/functions/createNeutralVoteBtn.js\");\n/* harmony import */ var _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../js/functions/createUpVoteBtn */ \"./assets/js/functions/createUpVoteBtn.js\");\n/* harmony import */ var _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _js_functions_createDeleteListBtn__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../js/functions/createDeleteListBtn */ \"./assets/js/functions/createDeleteListBtn.js\");\n/* harmony import */ var _js_functions_createDeleteListBtn__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createDeleteListBtn__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _js_functions_createNewListBtn__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../js/functions/createNewListBtn */ \"./assets/js/functions/createNewListBtn.js\");\n/* harmony import */ var _js_functions_createNewListBtn__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createNewListBtn__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../js/functions/createAddToListBtnForm */ \"./assets/js/functions/createAddToListBtnForm.js\");\n/* harmony import */ var _js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony import */ var _js_functions_createEditCategoryBtn__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../js/functions/createEditCategoryBtn */ \"./assets/js/functions/createEditCategoryBtn.js\");\n/* harmony import */ var _js_functions_createEditCategoryBtn__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createEditCategoryBtn__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var _js_functions_isUrl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../js/functions/isUrl */ \"./assets/js/functions/isUrl.js\");\n/* harmony import */ var _js_functions_isUrl__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_js_functions_isUrl__WEBPACK_IMPORTED_MODULE_23__);\n/* harmony import */ var _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../js/functions/handleSearchInput */ \"./assets/js/functions/handleSearchInput.js\");\n/* harmony import */ var _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_24__);\n/* harmony import */ var _js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../js/functions/isObjEmpty */ \"./assets/js/functions/isObjEmpty.js\");\n/* harmony import */ var _js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_25__);\n/* harmony import */ var _js_functions_createAdminRemoveBtn__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../js/functions/createAdminRemoveBtn */ \"./assets/js/functions/createAdminRemoveBtn.js\");\n/* harmony import */ var _js_functions_createAdminRemoveBtn__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createAdminRemoveBtn__WEBPACK_IMPORTED_MODULE_26__);\n/* harmony import */ var _js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../js/functions/addClickToAddToListBtn */ \"./assets/js/functions/addClickToAddToListBtn.js\");\n/* harmony import */ var _js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_27__);\n/* harmony import */ var _js_functions_addClickToEditCategoryFormCancelBtn__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../js/functions/addClickToEditCategoryFormCancelBtn */ \"./assets/js/functions/addClickToEditCategoryFormCancelBtn.js\");\n/* harmony import */ var _js_functions_addClickToEditCategoryFormCancelBtn__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToEditCategoryFormCancelBtn__WEBPACK_IMPORTED_MODULE_28__);\n/* harmony import */ var _js_functions_addClickToAddToListFormCancelBtn__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../js/functions/addClickToAddToListFormCancelBtn */ \"./assets/js/functions/addClickToAddToListFormCancelBtn.js\");\n/* harmony import */ var _js_functions_addClickToAddToListFormCancelBtn__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToAddToListFormCancelBtn__WEBPACK_IMPORTED_MODULE_29__);\n/* harmony import */ var _js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../js/functions/addClickToAddToListBtnFormSubmitBtn */ \"./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js\");\n/* harmony import */ var _js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_30__);\n/* harmony import */ var _js_functions_throughLinkRequest__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../js/functions/throughLinkRequest */ \"./assets/js/functions/throughLinkRequest.js\");\n/* harmony import */ var _js_functions_throughLinkRequest__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_js_functions_throughLinkRequest__WEBPACK_IMPORTED_MODULE_31__);\n/* harmony import */ var _js_functions_endLinkRequest__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../js/functions/endLinkRequest */ \"./assets/js/functions/endLinkRequest.js\");\n/* harmony import */ var _js_functions_endLinkRequest__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_js_functions_endLinkRequest__WEBPACK_IMPORTED_MODULE_32__);\n/* harmony import */ var _js_functions_updateCllListRequest__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../js/functions/updateCllListRequest */ \"./assets/js/functions/updateCllListRequest.js\");\n/* harmony import */ var _js_functions_updateCllListRequest__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_js_functions_updateCllListRequest__WEBPACK_IMPORTED_MODULE_33__);\n/* harmony import */ var _js_functions_createNewCategoryRequest__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../js/functions/createNewCategoryRequest */ \"./assets/js/functions/createNewCategoryRequest.js\");\n/* harmony import */ var _js_functions_createNewCategoryRequest__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createNewCategoryRequest__WEBPACK_IMPORTED_MODULE_34__);\n/* harmony import */ var _js_functions_addClickToEditCategoryFormSubmitBtn__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../js/functions/addClickToEditCategoryFormSubmitBtn */ \"./assets/js/functions/addClickToEditCategoryFormSubmitBtn.js\");\n/* harmony import */ var _js_functions_addClickToEditCategoryFormSubmitBtn__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToEditCategoryFormSubmitBtn__WEBPACK_IMPORTED_MODULE_35__);\n/* harmony import */ var _js_functions_addClickToEditCategoryBtn__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../js/functions/addClickToEditCategoryBtn */ \"./assets/js/functions/addClickToEditCategoryBtn.js\");\n/* harmony import */ var _js_functions_addClickToEditCategoryBtn__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToEditCategoryBtn__WEBPACK_IMPORTED_MODULE_36__);\n/* harmony import */ var _js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../js/functions/addClickToUpVoteBtn */ \"./assets/js/functions/addClickToUpVoteBtn.js\");\n/* harmony import */ var _js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_37__);\n/* harmony import */ var _js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../js/functions/addClickToDownVoteBtn */ \"./assets/js/functions/addClickToDownVoteBtn.js\");\n/* harmony import */ var _js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_38__);\n/* harmony import */ var _js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../js/functions/addClickToNeutralVoteBtn */ \"./assets/js/functions/addClickToNeutralVoteBtn.js\");\n/* harmony import */ var _js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_39__);\n\n\n\n\n\n\n //const setAttributeOfElementsInArrayIncrementally = require( '../js/functions/setAttributeOfElementsInArrayIncrementally');\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nwindow.onload = function () {\n  var dependencies = {\n    'handleCategoryEdit': _js_functions_handleCategoryEdit__WEBPACK_IMPORTED_MODULE_11___default.a,\n    'setAttributeOfElementsInArrayIncrementally': _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default.a,\n    'removeAllChildFromNodeExceptText': _js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_2___default.a,\n    'setVoterStatusToNeutralAndUpdatePostMeta': _js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_4___default.a,\n    'setVoterStatusToUpAndUpdatePostMeta': _js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_5___default.a,\n    'setVoterStatusToDownAndUpdatePostMeta': _js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_6___default.a,\n    'makeRequest': _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7___default.a,\n    'visuallyUpdateVoteCounter': _js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_3___default.a,\n    'replaceOccurrence': _js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_9___default.a,\n    'isUrl': _js_functions_isUrl__WEBPACK_IMPORTED_MODULE_23___default.a,\n    'isObjEmpty': _js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_25___default.a,\n    'createAddToListBtn': _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_8___default.a,\n    'createAddToListBtnForm': _js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_21___default.a,\n    'createEditCategoryBtnForm': _js_functions_createEditCategoryBtnForm__WEBPACK_IMPORTED_MODULE_15___default.a,\n    'createNewCategoryRequest': _js_functions_createNewCategoryRequest__WEBPACK_IMPORTED_MODULE_34___default.a,\n    'throughLinkRequest': _js_functions_throughLinkRequest__WEBPACK_IMPORTED_MODULE_31___default.a,\n    'endLinkRequest': _js_functions_endLinkRequest__WEBPACK_IMPORTED_MODULE_32___default.a,\n    'updateCllListRequest': _js_functions_updateCllListRequest__WEBPACK_IMPORTED_MODULE_33___default.a,\n    'handleSearchInput': _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_24___default.a,\n    'handleUpVoteBtnClick': _js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_12___default.a,\n    'handleNeutralVoteBtnClick': _js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_13___default.a,\n    'handleDownVoteBtnClick': _js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_14___default.a,\n    'addClickToAddToListBtn:': _js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_27___default.a,\n    'addClickToEditCategoryFormCancelBtn': _js_functions_addClickToEditCategoryFormCancelBtn__WEBPACK_IMPORTED_MODULE_28___default.a,\n    'addClickToAddToListFormCancelBtn': _js_functions_addClickToAddToListFormCancelBtn__WEBPACK_IMPORTED_MODULE_29___default.a,\n    'addClickToAddToListBtnFormSubmitBtn': _js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_30___default.a,\n    'addClickToEditCategoryFormSubmitBtn': _js_functions_addClickToEditCategoryFormSubmitBtn__WEBPACK_IMPORTED_MODULE_35___default.a,\n    'addClickToEditCategoryBtn': _js_functions_addClickToEditCategoryBtn__WEBPACK_IMPORTED_MODULE_36___default.a\n  };\n\n  if (document.querySelector(\".cll_search_form_input\")) {\n    //console.log(\"Search bar exists\");\n    _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_24___default()(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7___default.a);\n  } else {} //console.log(\"Search bar doesn't exist\");\n  //createListTitles(); deprecated\n\n\n  var allListItemsArray = document.querySelectorAll('.link-list-item');\n  _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default()(allListItemsArray, 'cllId');\n  var linkListTitleArray = document.querySelectorAll('.link-list-title');\n  _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default()(linkListTitleArray, 'cllId');\n  /*\r\n  \tfunction testButton(){\r\n  \t\tvar testButton = document.createElement('type', 'button');\r\n  \t\ttestButton.innerHTML = \"Test Request\";\r\n  \t\tvar cllLinkList = document.querySelector('.cll_link_list');\r\n  \t\tcllLinkList.appendChild(testButton);\r\n  \r\n  \t\tvar NewLinkPageData = {\r\n  \t\t\t\"post_title\": \"my fake page\",\r\n  \t\t\t\"post_content\": 'fake stuff',\r\n  \t\t\t\"post_type\": \"page\",\r\n  \t\t\t\"post_status\": \"publish\"\r\n  \t\t}\r\n  \r\n  \t\ttestButton.addEventListener('click', function(){\r\n  \t\t\tmakeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-link/v1/create-page/','POST', JSON.stringify(NewLinkPageData))\r\n  \t\t\t.then(function(request){\r\n  \t\t\t\tconsole.log(request.responseText);\r\n  \t\t\t\tconsole.log(JSON.parse(request.responseText));\r\n  \t\t\t})\r\n  \t\t\t.catch(function(error){\r\n  \t\t\t\tconsole.log(error);\r\n  \t\t\t});\r\n  \t\t})\r\n  \t}\r\n  \ttestButton();\r\n  */\n\n  _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_8___default()();\n  _js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_27___default()(dependencies); //done\n\n  _js_functions_createEditCategoryBtn__WEBPACK_IMPORTED_MODULE_22___default()(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default.a); //done\n\n  _js_functions_addClickToEditCategoryBtn__WEBPACK_IMPORTED_MODULE_36___default()(dependencies); //done\n\n  _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_10___default()(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default.a, _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7___default.a); //done\n\n  _js_functions_createDeleteListBtn__WEBPACK_IMPORTED_MODULE_19___default()(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default.a, _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7___default.a); //done\n\n  _js_functions_createNewListBtn__WEBPACK_IMPORTED_MODULE_20___default()(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7___default.a); //done\n  //goal extract click functionality\n\n  _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_16___default()(); //\n\n  _js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_38___default()(dependencies); //in progress\n\n  _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_18___default()(); //\n\n  _js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_37___default()(dependencies); //\n\n  _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_17___default()(); //\n\n  _js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_39___default()(dependencies); //\n\n  _js_functions_createAdminRemoveBtn__WEBPACK_IMPORTED_MODULE_26___default()(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_7___default.a, _js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_25___default.a);\n};\n\n//# sourceURL=webpack:///./assets/src/mainjs.js?");

/***/ })

/******/ });