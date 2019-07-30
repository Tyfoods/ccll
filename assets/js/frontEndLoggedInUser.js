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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/frontEndLoggedInUser.js");
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

eval("module.exports = function addClickToAddToListBtn(deps) {\n  var add_to_list_btn_array = document.querySelectorAll(\".cll-link-list__add-to-list-btn\");\n  deps.setAttributeOfElementsInArrayIncrementally(add_to_list_btn_array, 'cllId');\n  add_to_list_btn_array.forEach(function (currentAddToListBtn) {\n    currentAddToListBtn.addEventListener(\"click\", function () {\n      deps.createAddToListBtnForm(currentAddToListBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToAddToListBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToAddToListBtnFormCancelBtn.js":
/*!********************************************************************!*\
  !*** ./assets/js/functions/addClickToAddToListBtnFormCancelBtn.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToAddToListBtnFormCancelBtn() {\n  var cancelBtnArray = document.querySelectorAll(\".add-to-list-form__cancel-btn\");\n  cancelBtnArray.forEach(function (cancelBtn) {\n    if (typeof cancelBtn !== 'undefined') {\n      cancelBtn.addEventListener(\"click\", function () {\n        var addToListForm = document.getElementById(\"addToListForm\");\n        addToListForm.parentNode.removeChild(addToListForm);\n        event.stopPropagation(); //prevent parent element from being clicked\n\n        cllGlobals.isAddToListBtnClicked = false;\n      });\n    } else {//console.log('cancelBtn is not defined');\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToAddToListBtnFormCancelBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js":
/*!********************************************************************!*\
  !*** ./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToAddToListBtnFormSubmitBtn(currentAddToListBtn, deps) {\n  var submitBtn = document.querySelector('button.add-to-list-form__submit-btn');\n\n  if (typeof submitBtn !== 'undefined') {\n    //console.log(\"Submit Button Existance Verified\");\n    submitBtn.addEventListener(\"click\", function () {\n      //console.log(document.querySelector('[name=\"newListItemUrl\"].add-to-list-form__add-to-list-input'));\n      if (cllIsAdmin[0] === \"true\") {\n        var x = document.getElementById(\"add-to-list-form__link-type-selector\").selectedIndex;\n        var linkType = document.getElementsByTagName(\"option\")[x].value;\n\n        if (document.querySelector('[name=\"newListItemTitle\"].add-to-list-form__add-to-list-input').value === '') {\n          alert(\"You must submit a title!\");\n        } else if (linkType.toLowerCase() === 'external link') {\n          if (document.querySelector('[name=\"newListItemUrl\"].add-to-list-form__add-to-list-input').value === '') {\n            alert(\"You must submit a URL!\");\n          } else if (!deps.isUrl(document.querySelector('[name=\"newListItemUrl\"].add-to-list-form__add-to-list-input').value)) {\n            alert(\"Please enter a valid URL!\");\n          } else {\n            deps.endLinkRequest(currentAddToListBtn, deps);\n          }\n        } else if (linkType.toLowerCase() === 'internal link') {\n          deps.throughLinkRequest(currentAddToListBtn, deps);\n        } else if (linkType.toLowerCase() !== 'internal link' && linkType.toLowerCase() !== 'external link') {\n          alert(\"You must select a Link Type!\");\n        }\n      } else {\n        if (document.querySelector('[name=\"newListItemTitle\"].add-to-list-form__add-to-list-input').value === '') {\n          alert(\"You must submit a title!\");\n        } else if (document.querySelector('[name=\"newListItemUrl\"].add-to-list-form__add-to-list-input').value === '') {\n          alert(\"You must submit a URL!\");\n        } else if (!deps.isUrl(document.querySelector('[name=\"newListItemUrl\"].add-to-list-form__add-to-list-input').value)) {\n          alert(\"Please enter a valid URL!\");\n        } else {\n          var multiListPageCategoryIds = \"cll_category_ids\" + \"_\" + currentAddToListBtn.getAttribute('cllid');\n          var NewLinkItemData = {\n            \"title\": document.querySelector('[name=\"newListItemTitle\"].add-to-list-form__add-to-list-input').value,\n            \"content\": document.querySelector('[name=\"newListItemUrl\"].add-to-list-form__add-to-list-input').value,\n            \"categories\": [window[multiListPageCategoryIds]],\n            \"status\": \"publish\" //If Content is valid\n\n          };\n          NewLinkItemData = \"commonUserId=\" + JSON.stringify(cllUserId[0]) + \"json_string=\" + JSON.stringify(NewLinkItemData);\n          console.log(cllUserId[0]);\n          console.log(JSON.stringify(cllUserId[0]));\n          deps.makeRequest(cllGlobals.currentProtocalDomain + '/wp-content/plugins/curation-link-library/cll-core/common-user-request-handler.php', 'POST', NewLinkItemData).then(function (request) {\n            console.log(request.responseText);\n          })[\"catch\"](function (error) {\n            console.log(error);\n          });\n          alert(\"Thank you for submitting!\"); //Change this so the JS instead says \"Thank you for submitting, maybe an alert?\"\n          //add some function to refresh form fields and add temporary checkmark symbol\n\n          document.getElementById(\"addToListForm\").reset();\n          var f = document.getElementById(\"addToListForm\");\n          var checkmark_symbol = document.createElement(\"img\"); //button element, b button\n\n          f.appendChild(checkmark_symbol);\n          checkmark_symbol.setAttribute('name', \"checkmark_symbol\");\n          checkmark_symbol.setAttribute('id', \"checkmark_symbol\");\n          checkmark_symbol.setAttribute('src', cllGlobals.currentProtocalDomain + '/wp-content/plugins/curation-link-library/assets/images/checkmark.jpg'); //fadeIn(checkmark_symbol);\n\n          setTimeout(function () {\n            document.getElementById(\"checkmark_symbol\");\n            deps.fadeOut(checkmark_symbol);\n          }, 750);\n        }\n        /*\r\n        var createLinkItemQuery = new XMLHttpRequest();\r\n        createLinkItemQuery.onreadystatechange = function()\r\n        \t{\r\n        \t\tif(this.readyState == 4 && this.status == 200)\r\n        \t\t{\r\n        \t\t\t//Nothing below gets called :O ready state is NEVER 4!!!\r\n        \t\t\t//console.log('Success - Hello');\r\n        \t\t\t//console.log(createLinkItemQuery.responseText);\r\n        \t\t\t////console.log(commonUserId);\r\n        \t\t}\r\n        \t\t\t//if request fails...?\r\n        \t\r\n        \t}\r\n        NewLinkItemData = \"commonUserId=\" + JSON.stringify(cllUserId) + \"json_string=\" + JSON.stringify(NewLinkItemData);\r\n        createLinkItemQuery.open(\"POST\", cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/common-user-request-handler.php');\r\n        createLinkItemQuery.setRequestHeader(\"X-WP-Nonce\", magicalData.nonce);\r\n        createLinkItemQuery.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\r\n        createLinkItemQuery.send(NewLinkItemData);\r\n        */\n        //var newListItemTitle = document.querySelector('[name=\"newListItemTitle\"].add-to-list-form__add-to-list-input').value //what's this for?\n        //event.stopPropagation();\n\n      }\n    });\n    return;\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToDownVoteBtn.js":
/*!******************************************************!*\
  !*** ./assets/js/functions/addClickToDownVoteBtn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToDownVoteBtn(deps) {\n  var downVoteBtnArray = document.querySelectorAll('.link-list-item__down-vote-button');\n  downVoteBtnArray.forEach(function (downVoteBtn) {\n    downVoteBtn.addEventListener('click', function () {\n      deps.handleDownVoteBtnClick(downVoteBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToDownVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToNeutralVoteBtn.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/addClickToNeutralVoteBtn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToNeutralVoteBtn(deps) {\n  var neutralVoteBtnArray = document.querySelectorAll('.link-list-item__neutral-vote-button');\n  neutralVoteBtnArray.forEach(function (neutralVoteBtn) {\n    neutralVoteBtn.addEventListener('click', function () {\n      deps.handleNeutralVoteBtnClick(neutralVoteBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToNeutralVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToUpVoteBtn.js":
/*!****************************************************!*\
  !*** ./assets/js/functions/addClickToUpVoteBtn.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToUpVoteBtn(deps) {\n  var upVoteBtnArray = document.querySelectorAll('.link-list-item__up-vote-button');\n  upVoteBtnArray.forEach(function (upVoteBtn) {\n    upVoteBtn.addEventListener('click', function () {\n      deps.handleUpVoteBtnClick(upVoteBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToUpVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createAddToListBtn.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/createAddToListBtn.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createAddToListBtn() {\n  var allListsArray = document.querySelectorAll('.cll-link-list__link-list--style-1');\n  allListsArray.forEach(function (list) {\n    //append Add To List! button\n    var addToListBtn = document.createElement('button');\n    addToListBtn.setAttribute('class', \"cll-link-list__add-to-list-btn\");\n    addToListBtn.innerHTML = \"Add To List +\";\n    list.parentNode.insertBefore(addToListBtn, list.nextSibling);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createAddToListBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createAddToListBtnForm.js":
/*!*******************************************************!*\
  !*** ./assets/js/functions/createAddToListBtnForm.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createAddToListBtnForm(currentAddToListBtn, deps) {\n  //if button has not been clicked, create form\n  if (cllGlobals.isAddToListBtnClicked === false) {\n    var f = document.createElement(\"form\");\n    f.setAttribute('id', 'addToListForm');\n    var linktitle = document.createElement(\"input\");\n    linktitle.setAttribute('type', \"text\");\n    linktitle.setAttribute('name', \"newListItemTitle\");\n    linktitle.setAttribute('placeholder', \"Link title here\");\n    linktitle.setAttribute(\"class\", \"add-to-list-form__add-to-list-input\");\n    var link = document.createElement(\"input\");\n    link.setAttribute('type', \"text\");\n    link.setAttribute('name', \"newListItemUrl\");\n    link.setAttribute('placeholder', \"URL here\");\n    link.setAttribute(\"class\", \"add-to-list-form__add-to-list-input\");\n    var b = document.createElement(\"button\");\n    b.setAttribute('name', \"submitBtn\");\n    b.setAttribute('type', 'button');\n    b.setAttribute('class', 'add-to-list-form__submit-btn');\n    b.innerHTML = 'Submit';\n    var cancelBtn = document.createElement(\"button\");\n    cancelBtn.setAttribute('name', \"cancelBtn\");\n    cancelBtn.setAttribute('type', 'button');\n    cancelBtn.setAttribute('class', 'add-to-list-form__cancel-btn');\n\n    if (cllIsAdmin[0] === \"true\") {\n      var dropDownBox = document.createElement(\"select\");\n      dropDownBox.setAttribute('id', 'add-to-list-form__link-type-selector');\n      var dropDownBoxPlaceHolder = document.createElement(\"option\");\n      dropDownBoxPlaceHolder.innerHTML = \"Link Type\";\n      dropDownBoxPlaceHolder.value = '';\n      dropDownBoxPlaceHolder.disabled = true;\n      dropDownBoxPlaceHolder.selected = true;\n      dropDownBoxPlaceHolder.hidden = true; //dropDownBoxPlaceHolder.required = true;\n\n      var endLinkOption = document.createElement(\"option\");\n      endLinkOption.innerHTML = \"External Link\"; //endLinkOption.setAttribute('name',\"Link Type\");\n\n      var throughLinkOption = document.createElement(\"option\");\n      throughLinkOption.innerHTML = \"Internal Link\"; //throughLinkOption.setAttribute('name',\"Link Type\");\n\n      dropDownBox.appendChild(endLinkOption);\n      dropDownBox.appendChild(throughLinkOption);\n      dropDownBox.appendChild(dropDownBoxPlaceHolder);\n      f.appendChild(dropDownBox);\n      dropDownBox.addEventListener('change', function () {\n        var x = document.getElementById(\"add-to-list-form__link-type-selector\").selectedIndex;\n        var linkType = document.getElementsByTagName(\"option\")[x].value;\n\n        if (linkType.toLowerCase() === 'internal link') {\n          link.parentNode.removeChild(link);\n        } else if (linkType.toLowerCase() === 'external link') {\n          linktitle.parentNode.insertBefore(link, linktitle.nextSibling); //f.appendChild(link);\n        }\n      });\n    }\n\n    f.appendChild(linktitle);\n    f.appendChild(link);\n    f.appendChild(b);\n    f.appendChild(cancelBtn);\n    currentAddToListBtn.appendChild(f);\n    cllGlobals.isAddToListBtnClicked = true;\n    deps.addClickToAddToListBtnFormSubmitBtn(currentAddToListBtn, deps);\n    deps.addClickToAddToListBtnFormCancelBtn(); //change form depending on link type selected\n    //var box = document.getElementById(\"linkTypeSelecter\");\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createAddToListBtnForm.js?");

/***/ }),

/***/ "./assets/js/functions/createDownVoteBtn.js":
/*!**************************************************!*\
  !*** ./assets/js/functions/createDownVoteBtn.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createDownVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var downVoteBtn = document.createElement(\"button\");\n    downVoteBtn.setAttribute('class', 'link-list-item__down-vote-button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    downVoteBtn.setAttributeNode(cllId);\n    downVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(downVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createDownVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createNeutralVoteBtn.js":
/*!*****************************************************!*\
  !*** ./assets/js/functions/createNeutralVoteBtn.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createNeutralVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var neutralVoteBtn = document.createElement(\"button\");\n    neutralVoteBtn.setAttribute('class', 'link-list-item__neutral-vote-button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    neutralVoteBtn.setAttributeNode(cllId);\n    neutralVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(neutralVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createNeutralVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createNewListRequestBtn.js":
/*!********************************************************!*\
  !*** ./assets/js/functions/createNewListRequestBtn.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createNewListRequestBtn(makeRequest) {\n  var newListRequestBtn = document.createElement('button');\n  newListRequestBtn.setAttribute(\"class\", \"new-list-btn\");\n  newListRequestBtn.innerHTML = \"Request New Category +\";\n  var cll_link_list = document.querySelector('.cll-link-list');\n  cll_link_list.parentElement.insertBefore(newListRequestBtn, cll_link_list.parentElement.firstChild);\n  newListRequestBtn.addEventListener(\"click\", function () {\n    var requestMsg = prompt(\"What category would you like to add?\");\n\n    if (requestMsg != null || requestMsg != '') {\n      //console.log(requestMsg);\n      var NewPendingListItemData = {\n        \"list_category\": requestMsg,\n        \"list_page_orgin\": current_page_id //Make request to PHP handler and have it add to backend admin page.\n\n      };\n      NewPendingListItemData = \"commonUserId=\" + JSON.stringify(cllUserId[0]) + \"json_string=\" + JSON.stringify(NewPendingListItemData);\n      makeRequest(cllGlobals.currentProtocalDomain + '/wp-content/plugins/curation-link-library/cll-core/common-user-list-request-handler.php', \"POST\", NewPendingListItemData).then(function (request) {//console.log(request.responseText);\n      })[\"catch\"](function (error) {//console.log(error);\n      });\n    } else {//console.log(\"User Canceled\");\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createNewListRequestBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createUpVoteBtn.js":
/*!************************************************!*\
  !*** ./assets/js/functions/createUpVoteBtn.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createUpVoteBtn() {\n  var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');\n  var incrementer = 0;\n  allListItemsArray.forEach(function (listItem) {\n    var upVoteBtn = document.createElement(\"button\");\n    upVoteBtn.setAttribute('class', 'link-list-item__up-vote-button');\n    var cllId = document.createAttribute(\"cllId\"); // Create a \"class\" attribute\n\n    upVoteBtn.setAttributeNode(cllId);\n    upVoteBtn.setAttribute('cllid', incrementer);\n    listItem.appendChild(upVoteBtn); //append to inner html\n\n    incrementer += 1;\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createUpVoteBtn.js?");

/***/ }),

/***/ "./assets/js/functions/displayDataPerItem.js":
/*!***************************************************!*\
  !*** ./assets/js/functions/displayDataPerItem.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest) {\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/', 'GET').then(function (request) {\n    var cllLinkArray = JSON.parse(request.responseText);\n    var linkListItemArray = document.querySelectorAll('.link-list--style-1__link-list-item');\n    var incrementer = 0; //console.log(cllLinkArray);\n\n    cllLinkArray.forEach(function (cllLink) {\n      linkListItemArray.forEach(function (linkListItem) {\n        var post_slug = linkListItem.textContent.trim().replace(/\\s/g, '-').toLowerCase();\n\n        if (cllLink.slug === post_slug) {\n          var upVotesCounter = document.createElement('p');\n          upVotesCounter.setAttribute('class', 'link-list-item__up-votes-counter');\n          upVotesCounter.innerHTML = cllLinkArray[incrementer].meta.up_votes;\n          var downVotesCounter = document.createElement('p');\n          downVotesCounter.setAttribute('class', 'link-list-item__down-votes-counter');\n          downVotesCounter.innerHTML = cllLinkArray[incrementer].meta.down_votes;\n          var currentLinkItemId = linkListItem.getAttribute('cllId');\n          var downVoteButton = document.querySelector('.link-list-item__down-vote-button[cllId=\"' + currentLinkItemId + '\"]');\n          var upVoteButton = document.querySelector('.link-list-item__up-vote-button[cllId=\"' + currentLinkItemId + '\"]');\n          downVoteButton.appendChild(downVotesCounter);\n          upVoteButton.appendChild(upVotesCounter); //display \"submittedByElement\";\n\n          var submittedByElement = document.createElement('p');\n          submittedByElement.setAttribute('class', 'link-list-item__submitted-by'); //console.log(cllLinkArray[incrementer].meta);\n\n          submittedByElement.innerHTML = \"Submitted by: \" + cllLinkArray[incrementer].meta.submitted_by; //console.log(currentLinkItemId);\n          //var linkListItem = document.querySelector('.link-list-item[cllId=\"'+currentLinkItemId+'\"]');\n\n          try {\n            linkListItem.appendChild(submittedByElement);\n          } catch (error) {\n            console.log(error);\n          }\n        }\n      });\n      incrementer += 1;\n    });\n    var downVoteCounterArray = document.querySelectorAll('.link-list-item__down-votes-counter');\n    setAttributeOfElementsInArrayIncrementally(downVoteCounterArray, 'cllId');\n    var upVoteCounterArray = document.querySelectorAll('.link-list-item__up-votes-counter');\n    setAttributeOfElementsInArrayIncrementally(upVoteCounterArray, 'cllId');\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/displayDataPerItem.js?");

/***/ }),

/***/ "./assets/js/functions/fadeOut.js":
/*!****************************************!*\
  !*** ./assets/js/functions/fadeOut.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function fadeOut(element) {\n  var op = 1; // initial opacity\n\n  var timer = setInterval(function () {\n    if (op <= 0.1) {\n      clearInterval(timer);\n      element.style.display = 'none';\n    }\n\n    element.style.opacity = op;\n    element.style.filter = 'alpha(opacity=' + op * 100 + \")\";\n    op -= op * 0.1;\n  }, 50);\n};\n\n//# sourceURL=webpack:///./assets/js/functions/fadeOut.js?");

/***/ }),

/***/ "./assets/js/functions/handleDownVoteBtnClick.js":
/*!*******************************************************!*\
  !*** ./assets/js/functions/handleDownVoteBtnClick.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleDownVoteBtnClick(downVoteBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;\n  var setVoterStatusToDownAndUpdatePostMeta = deps.setVoterStatusToDownAndUpdatePostMeta;\n  var linkListTitleArray = document.querySelectorAll('.link_list_item__link-list-title');\n\n  if (cllGlobals.isDownVoteBtnClicked === false) {\n    linkListTitleArray.forEach(function (linkListTitle) {\n      var post_slug = linkListTitle.textContent.trim().replace(/\\s/g, '-').toLowerCase();\n\n      if (linkListTitle.getAttribute('cllId') === downVoteBtn.getAttribute('cllId')) {\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?slug=' + post_slug, 'GET').then(function (request) {\n          var objResponse = JSON.parse(request.responseText);\n          var metaObj = objResponse[0].meta;\n          var currentLinkItemPostId = objResponse[0].id;\n          var currentLinkItemId = downVoteBtn.getAttribute('cllId');\n          var downVoteCounter = document.querySelector('.link-list-item__down-votes-counter[cllId=\"' + currentLinkItemId + '\"]');\n          var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId=\"' + currentLinkItemId + '\"]');\n\n          try {\n            var voteRecordObj = JSON.parse(metaObj.voteRecord);\n\n            if (typeof voteRecordObj[cllUserId[0]] === \"undefined\") {\n              //if current user has never voted then...\n              if (cllGlobals.isDownVoteBtnClicked === false) {\n                cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isUpVoteBtnClicked = true; //console.log(\"There is no information on record for this user\");\n                //visually add 1 down vote\n\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n                setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"downVote\", makeRequest);\n                return;\n              }\n            } //console.log(\"There is information on record for this user\");\n            //Get user vote status\n\n\n            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);\n\n            if (currentUserVoteStatus === 0) {\n              alert(\"You've already down voted this post!\");\n              return;\n            } else if (currentUserVoteStatus === 1) {\n              if (cllGlobals.isDownVoteBtnClicked === false) {\n                cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isUpVoteBtnClicked = true;\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", upVoteCounter); //User \"Up Voted\" last.\n                //Set user vote status to 0\n\n                setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"switch\", makeRequest);\n                return;\n              }\n            } else if (currentUserVoteStatus === 3) {\n              if (cllGlobals.isDownVoteBtnClicked === false) {\n                cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isUpVoteBtnClicked = true; //visually add 1 down vote\n\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n                setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"downVote\", makeRequest);\n                return;\n              }\n            }\n          } catch (error) {\n            if (cllGlobals.isDownVoteBtnClicked === false) {\n              cllGlobals.isDownVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n              cllGlobals.isNeutralVoteBtnClicked = true;\n              cllGlobals.isUpVoteBtnClicked = true;\n              console.log(error); //console.log(\"Could not parse voteRecord\");\n              //console.log(\"There is no information on record AT ALL\");\n              //console.log(\"Change voter status to 0\");\n\n              metaObj.voteRecord = '{\"' + cllUserId[0] + '\":' + '\"0\"}'; ////console.log(\"add downvote to post\");\n\n              metaObj.down_votes += 1;\n              var newPostMetaData = JSON.stringify({\n                \"meta\": metaObj\n              }); //visually add 1 to down vote\n\n              downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", downVoteCounter);\n\n              if (cllIsAdmin[0] === \"true\") {\n                makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + objResponse[0].id, 'POST', newPostMetaData).then(function () {\n                  cllGlobals.isUpVoteBtnClicked = false;\n                  cllGlobals.isNeutralVoteBtnClicked = false;\n                  cllGlobals.isDownVoteBtnClicked = false;\n                })[\"catch\"](function (error) {\n                  console.log(error);\n                });\n                return;\n              } else {\n                makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-vote/v1/cll-link/' + objResponse[0].id, 'POST', JSON.stringify(metaObj)).then(function () {\n                  //console.log(request.responseText);\n                  cllGlobals.isUpVoteBtnClicked = false;\n                  cllGlobals.isNeutralVoteBtnClicked = false;\n                  cllGlobals.isDownVoteBtnClicked = false;\n                })[\"catch\"](function (error) {\n                  console.log(error);\n                });\n              }\n            }\n          }\n        })[\"catch\"](function (error) {\n          console.log(error);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleDownVoteBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/handleNeutralVoteBtnClick.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/handleNeutralVoteBtnClick.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleNeutralVoteBtnClick(neutralVoteBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;\n  var setVoterStatusToNeutralAndUpdatePostMeta = deps.setVoterStatusToNeutralAndUpdatePostMeta;\n  var linkListTitleArray = document.querySelectorAll('.link_list_item__link-list-title');\n\n  if (cllGlobals.isNeutralVoteBtnClicked === false) {\n    linkListTitleArray.forEach(function (linkListTitle) {\n      var post_slug = linkListTitle.textContent.trim().replace(/\\s/g, '-').toLowerCase();\n\n      if (linkListTitle.getAttribute('cllId') === neutralVoteBtn.getAttribute('cllId')) {\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?slug=' + post_slug, 'GET').then(function (request) {\n          var objResponse = JSON.parse(request.responseText);\n          var currentLinkItemPostId = objResponse[0].id;\n          var currentLinkItemCllId = neutralVoteBtn.getAttribute('cllId'); //console.log(objResponse);\n\n          var metaObj = objResponse[0].meta;\n\n          try {\n            var voteRecordObj = JSON.parse(metaObj.voteRecord); //console.log(voteRecordObj[cllUserId]);\n\n            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);\n\n            if (typeof voteRecordObj[cllUserId[0]] === \"undefined\") {\n              //if current user has never voted then...\n              if (cllGlobals.isNeutralVoteBtnClicked === false) {\n                cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n                cllGlobals.isUpVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true;\n                console.log(\"There is no information for this user on record\");\n                console.log(\"Voter status unavailable, updating status\");\n                setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"none\", makeRequest);\n                return;\n              }\n            } else if (currentUserVoteStatus === 3) {\n              alert(\"You're already neutral!\");\n              return;\n            } else if (currentUserVoteStatus === 1) {\n              if (cllGlobals.isNeutralVoteBtnClicked === false) {\n                cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n                cllGlobals.isUpVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true;\n                console.log(\"Voter status 1, updating status, removing up vote updating voter status\"); //visually remove users up vote\n\n                var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId=\"' + currentLinkItemCllId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", upVoteCounter);\n                setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"upVote\", makeRequest);\n                return;\n              }\n            } else if (currentUserVoteStatus === 0) {\n              if (cllGlobals.isNeutralVoteBtnClicked === false) {\n                cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n                cllGlobals.isUpVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true;\n                console.log(\"Voter status 0, updating status, removing down vote updating voter status\"); //visually remove users down vote\n\n                var downVoteCounter = document.querySelector('.link-list-item__down-votes-counter[cllId=\"' + currentLinkItemCllId + '\"]');\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", downVoteCounter);\n                setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"downVote\", makeRequest);\n                return;\n              }\n            }\n          } catch (error) {\n            if (cllGlobals.isNeutralVoteBtnClicked === false) {\n              cllGlobals.isNeutralVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs\n\n              cllGlobals.isUpVoteBtnClicked = true;\n              cllGlobals.isDownVoteBtnClicked = true;\n              console.log(error);\n              console.log(\"Could not parse voteRecord\"); //console.log(\"There is no information on record *assertion\");\n              //console.log(metaObj.voteRecord);\n\n              console.log(\"Change voter status to 3\");\n              metaObj.voteRecord = '{\"' + cllUserId[0] + '\":' + '\"3\"}';\n              var newPostMetaData = JSON.stringify({\n                \"meta\": metaObj\n              });\n\n              if (cllIsAdmin[0] === \"true\") {\n                makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + objResponse[0].id, 'POST', newPostMetaData).then(function () {\n                  cllGlobals.isUpVoteBtnClicked = false;\n                  cllGlobals.isNeutralVoteBtnClicked = false;\n                  cllGlobals.isDownVoteBtnClicked = false;\n                })[\"catch\"](function (error) {\n                  console.log(error);\n                });\n                return;\n              } else {\n                makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-vote/v1/cll-link/' + objResponse[0].id, 'POST', JSON.stringify(metaObj)).then(function () {\n                  //console.log(request.responseText);\n                  cllGlobals.isUpVoteBtnClicked = false;\n                  cllGlobals.isNeutralVoteBtnClicked = false;\n                  cllGlobals.isDownVoteBtnClicked = false;\n                })[\"catch\"](function (error) {\n                  console.log(error);\n                });\n              }\n            }\n          }\n        })[\"catch\"](function (error) {\n          console.log(error);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleNeutralVoteBtnClick.js?");

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

eval("module.exports = function handleUpVoteBtnClick(upVoteBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;\n  var setVoterStatusToUpAndUpdatePostMeta = deps.setVoterStatusToUpAndUpdatePostMeta;\n  var linkListTitleArray = document.querySelectorAll('.link_list_item__link-list-title');\n\n  if (cllGlobals.isUpVoteBtnClicked === false) {\n    linkListTitleArray.forEach(function (linkListTitle) {\n      var post_slug = linkListTitle.textContent.trim().replace(/\\s/g, '-').toLowerCase(); //console.log(post_slug);\n\n      if (linkListTitle.getAttribute('cllId') === upVoteBtn.getAttribute('cllId')) {\n        makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link?slug=' + post_slug, 'GET').then(function (request) {\n          var objResponse = JSON.parse(request.responseText);\n          var currentLinkItemPostId = objResponse[0].id;\n          var currentLinkItemId = upVoteBtn.getAttribute('cllId');\n          var metaObj = objResponse[0].meta;\n\n          try {\n            var voteRecordObj = JSON.parse(metaObj.voteRecord);\n            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);\n\n            if (cllGlobals.isUpVoteBtnClicked === false) {\n              if (typeof voteRecordObj[cllUserId[0]] === \"undefined\") {\n                //if current user has never voted then...\n                cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true; //console.log(\"There is no information for this user on record\");\n\n                var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId=\"' + currentLinkItemId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter); //increments upvote\n\n                setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"upVote\", makeRequest);\n                return;\n              } else if (currentUserVoteStatus === 1) {\n                alert(\"You've already up voted this post!\");\n                return;\n              } else if (currentUserVoteStatus === 0) {\n                cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true; //console.log(\"Voter status was 0, incrementing up vote /removing downvote (visually too), changing status to 1\");\n                //visually remove down vote\n\n                var downVoteCounter = document.querySelector('.link-list-item__down-votes-counter[cllId=\"' + currentLinkItemId + '\"]');\n                downVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"decrement\", downVoteCounter); //visually add up vote\n\n                var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId=\"' + currentLinkItemId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter);\n                setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"switch\", makeRequest);\n                return;\n              } else if (currentUserVoteStatus === 3) {\n                cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs\n\n                cllGlobals.isNeutralVoteBtnClicked = true;\n                cllGlobals.isDownVoteBtnClicked = true; //console.log(\"Voter status was 3, incrementing up vote (visually too), changing status to 1\");\n                //visually add up vote\n\n                var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId=\"' + currentLinkItemId + '\"]');\n                upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter); //Increment up_votes in metaObj\n\n                setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, \"upVote\", makeRequest);\n                return;\n              }\n            }\n          } catch (error) {\n            if (cllGlobals.isUpVoteBtnClicked === false) {\n              cllGlobals.isUpVoteBtnClicked = true; //Make other buttons un-clickable, they become clickable again after request below\n\n              cllGlobals.isNeutralVoteBtnClicked = true;\n              cllGlobals.isDownVoteBtnClicked = true;\n              console.log(error);\n              console.log(\"Could not parse voteRecord\"); //console.log(\"There is no information on record *assertion\");\n\n              metaObj.voteRecord = '{\"' + cllUserId[0] + '\":' + '\"1\"}'; //console.log(\"add UpVote to post\");\n\n              metaObj.up_votes += 1;\n              var newPostMetaData = JSON.stringify({\n                \"meta\": metaObj\n              });\n              var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId=\"' + currentLinkItemId + '\"]');\n              upVoteCounter.innerHTML = visuallyUpdateVoteCounter(\"increment\", upVoteCounter);\n\n              if (cllIsAdmin[0] === \"true\") {\n                makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + objResponse[0].id, 'POST', newPostMetaData).then(function () {\n                  cllGlobals.isUpVoteBtnClicked = false;\n                  cllGlobals.isNeutralVoteBtnClicked = false;\n                  cllGlobals.isDownVoteBtnClicked = false;\n                })[\"catch\"](function (error) {\n                  console.log(error);\n                });\n                return;\n              } else {\n                makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-vote/v1/cll-link/' + objResponse[0].id, 'POST', JSON.stringify(metaObj)).then(function () {\n                  //console.log(request.responseText);\n                  cllGlobals.isUpVoteBtnClicked = false;\n                  cllGlobals.isNeutralVoteBtnClicked = false;\n                  cllGlobals.isDownVoteBtnClicked = false;\n                })[\"catch\"](function (error) {\n                  console.log(error);\n                });\n              }\n            }\n          }\n        })[\"catch\"](function (error) {\n          console.log(error);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleUpVoteBtnClick.js?");

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

eval("module.exports = function setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest) {\n  var voteRecordObj = JSON.parse(metaObj.voteRecord);\n\n  if (voteType === \"downVote\") {\n    //increment downVote\n    metaObj.down_votes += 1;\n  } else if (voteType === 'switch') {\n    //decrement upvote\n    metaObj.up_votes -= 1; //increment downvote\n\n    metaObj.down_votes += 1;\n  } else if (voteType === \"none\") {//do nothing\n  }\n\n  voteRecordObj[cllUserId[0]] = \"0\";\n  var newVoteStatusData = JSON.stringify(voteRecordObj);\n  metaObj.voteRecord = newVoteStatusData;\n  var newPostMetaData = JSON.stringify({\n    \"meta\": metaObj\n  });\n\n  if (cllIsAdmin[0] === \"true\") {\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + currentLinkItemPostId, 'POST', newPostMetaData).then(function () {\n      //console.log(request.responseText);\n      //make buttons clickable again\n      cllGlobals.isUpVoteBtnClicked = false;\n      cllGlobals.isNeutralVoteBtnClicked = false;\n      cllGlobals.isDownVoteBtnClicked = false;\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n    return;\n  } else {\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-vote/v1/cll-link/' + currentLinkItemPostId, 'POST', JSON.stringify(metaObj)).then(function () {\n      cllGlobals.isUpVoteBtnClicked = false;\n      cllGlobals.isNeutralVoteBtnClicked = false;\n      cllGlobals.isDownVoteBtnClicked = false;\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setVoterStatusToDownAndUpdatePostMeta.js?");

/***/ }),

/***/ "./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js":
/*!*************************************************************************!*\
  !*** ./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest) {\n  var voteRecordObj = JSON.parse(metaObj.voteRecord);\n\n  if (voteType === \"upVote\") {\n    //decrement upvote\n    metaObj.up_votes -= 1;\n  } else if (voteType === 'downVote') {\n    //decrement downvote\n    metaObj.down_votes -= 1;\n  } else if (voteType === \"none\") {//do nothing\n  }\n\n  voteRecordObj[cllUserId[0]] = \"3\";\n  var newVoteStatusData = JSON.stringify(voteRecordObj);\n  metaObj.voteRecord = newVoteStatusData;\n  var newPostMetaData = JSON.stringify({\n    \"meta\": metaObj\n  });\n\n  if (cllIsAdmin[0] === \"true\") {\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + currentLinkItemPostId, 'POST', newPostMetaData).then(function () {\n      //Make other buttons clickable,\n      cllGlobals.isUpVoteBtnClicked = false;\n      cllGlobals.isNeutralVoteBtnClicked = false;\n      cllGlobals.isDownVoteBtnClicked = false;\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n    return;\n  } else {\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-vote/v1/cll-link/' + currentLinkItemPostId, 'POST', JSON.stringify(metaObj)).then(function () {\n      cllGlobals.isUpVoteBtnClicked = false;\n      cllGlobals.isNeutralVoteBtnClicked = false;\n      cllGlobals.isDownVoteBtnClicked = false;\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js?");

/***/ }),

/***/ "./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js":
/*!********************************************************************!*\
  !*** ./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest) {\n  var voteRecordObj = JSON.parse(metaObj.voteRecord);\n\n  if (voteType === \"upVote\") {\n    //increment upvote\n    metaObj.up_votes += 1;\n  } else if (voteType === 'switch') {\n    //increment upvote\n    metaObj.up_votes += 1; //decrement downvote\n\n    metaObj.down_votes -= 1;\n  } else if (voteType === \"none\") {//do nothing\n  }\n\n  voteRecordObj[cllUserId[0]] = \"1\";\n  var newVoteStatusData = JSON.stringify(voteRecordObj);\n  metaObj.voteRecord = newVoteStatusData;\n  var newPostMetaData = JSON.stringify({\n    \"meta\": metaObj\n  });\n\n  if (cllIsAdmin[0] === \"true\") {\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link/' + currentLinkItemPostId, 'POST', newPostMetaData).then(function () {\n      cllGlobals.isUpVoteBtnClicked = false;\n      cllGlobals.isNeutralVoteBtnClicked = false;\n      cllGlobals.isDownVoteBtnClicked = false;\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n    return;\n  } else {\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-vote/v1/cll-link/' + currentLinkItemPostId, 'POST', JSON.stringify(metaObj)).then(function () {\n      cllGlobals.isUpVoteBtnClicked = false;\n      cllGlobals.isNeutralVoteBtnClicked = false;\n      cllGlobals.isDownVoteBtnClicked = false;\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js?");

/***/ }),

/***/ "./assets/js/functions/visuallyUpdateVoteCounter.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/visuallyUpdateVoteCounter.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function visuallyUpdateVoteCounter(updateType, voteCounter) {\n  var currentVoteValue = parseInt(voteCounter.textContent);\n\n  if (updateType === \"increment\") {\n    currentVoteValue += 1;\n    voteCounter.innerHTML = currentVoteValue;\n    return voteCounter.innerHTML;\n  } else if (updateType = \"decrement\") {\n    currentVoteValue -= 1;\n    voteCounter.innerHTML = currentVoteValue;\n    return voteCounter.innerHTML;\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/visuallyUpdateVoteCounter.js?");

/***/ }),

/***/ "./assets/src/frontEndLoggedInUser.js":
/*!********************************************!*\
  !*** ./assets/src/frontEndLoggedInUser.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/cllGlobals */ \"./assets/js/cllGlobals.js\");\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/functions/setAttributeOfElementsInArrayIncrementally */ \"./assets/js/functions/setAttributeOfElementsInArrayIncrementally.js\");\n/* harmony import */ var _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/functions/makeRequest */ \"./assets/js/functions/makeRequest.js\");\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/functions/handleSearchInput */ \"./assets/js/functions/handleSearchInput.js\");\n/* harmony import */ var _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _js_functions_isUrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/functions/isUrl */ \"./assets/js/functions/isUrl.js\");\n/* harmony import */ var _js_functions_isUrl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_functions_isUrl__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/functions/isObjEmpty */ \"./assets/js/functions/isObjEmpty.js\");\n/* harmony import */ var _js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/functions/replaceOccurence */ \"./assets/js/functions/replaceOccurence.js\");\n/* harmony import */ var _js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/functions/removeAllChildFromNodeExceptText */ \"./assets/js/functions/removeAllChildFromNodeExceptText.js\");\n/* harmony import */ var _js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../js/functions/visuallyUpdateVoteCounter */ \"./assets/js/functions/visuallyUpdateVoteCounter.js\");\n/* harmony import */ var _js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../js/functions/setVoterStatusToNeutralAndUpdatePostMeta */ \"./assets/js/functions/setVoterStatusToNeutralAndUpdatePostMeta.js\");\n/* harmony import */ var _js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../js/functions/setVoterStatusToUpAndUpdatePostMeta */ \"./assets/js/functions/setVoterStatusToUpAndUpdatePostMeta.js\");\n/* harmony import */ var _js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../js/functions/setVoterStatusToDownAndUpdatePostMeta */ \"./assets/js/functions/setVoterStatusToDownAndUpdatePostMeta.js\");\n/* harmony import */ var _js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _js_functions_fadeOut__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../js/functions/fadeOut */ \"./assets/js/functions/fadeOut.js\");\n/* harmony import */ var _js_functions_fadeOut__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_js_functions_fadeOut__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _js_functions_createNewListRequestBtn__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../js/functions/createNewListRequestBtn */ \"./assets/js/functions/createNewListRequestBtn.js\");\n/* harmony import */ var _js_functions_createNewListRequestBtn__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createNewListRequestBtn__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../js/functions/displayDataPerItem */ \"./assets/js/functions/displayDataPerItem.js\");\n/* harmony import */ var _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../js/functions/createUpVoteBtn */ \"./assets/js/functions/createUpVoteBtn.js\");\n/* harmony import */ var _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../js/functions/createNeutralVoteBtn */ \"./assets/js/functions/createNeutralVoteBtn.js\");\n/* harmony import */ var _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../js/functions/createDownVoteBtn */ \"./assets/js/functions/createDownVoteBtn.js\");\n/* harmony import */ var _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../js/functions/createAddToListBtn */ \"./assets/js/functions/createAddToListBtn.js\");\n/* harmony import */ var _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../js/functions/createAddToListBtnForm */ \"./assets/js/functions/createAddToListBtnForm.js\");\n/* harmony import */ var _js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../js/functions/addClickToUpVoteBtn */ \"./assets/js/functions/addClickToUpVoteBtn.js\");\n/* harmony import */ var _js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../js/functions/addClickToNeutralVoteBtn */ \"./assets/js/functions/addClickToNeutralVoteBtn.js\");\n/* harmony import */ var _js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony import */ var _js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../js/functions/addClickToDownVoteBtn */ \"./assets/js/functions/addClickToDownVoteBtn.js\");\n/* harmony import */ var _js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var _js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../js/functions/handleUpVoteBtnClick */ \"./assets/js/functions/handleUpVoteBtnClick.js\");\n/* harmony import */ var _js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_23__);\n/* harmony import */ var _js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../js/functions/handleNeutralVoteBtnClick */ \"./assets/js/functions/handleNeutralVoteBtnClick.js\");\n/* harmony import */ var _js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_24__);\n/* harmony import */ var _js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../js/functions/handleDownVoteBtnClick */ \"./assets/js/functions/handleDownVoteBtnClick.js\");\n/* harmony import */ var _js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_25__);\n/* harmony import */ var _js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../js/functions/addClickToAddToListBtn */ \"./assets/js/functions/addClickToAddToListBtn.js\");\n/* harmony import */ var _js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_26__);\n/* harmony import */ var _js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../js/functions/addClickToAddToListBtnFormSubmitBtn */ \"./assets/js/functions/addClickToAddToListBtnFormSubmitBtn.js\");\n/* harmony import */ var _js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_27__);\n/* harmony import */ var _js_functions_addClickToAddToListBtnFormCancelBtn__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../js/functions/addClickToAddToListBtnFormCancelBtn */ \"./assets/js/functions/addClickToAddToListBtnFormCancelBtn.js\");\n/* harmony import */ var _js_functions_addClickToAddToListBtnFormCancelBtn__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToAddToListBtnFormCancelBtn__WEBPACK_IMPORTED_MODULE_28__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nwindow.onload = function () {\n  if (document.querySelector(\".cll_search_form_input\")) {\n    //console.log(\"Search bar exists\");\n    _js_functions_handleSearchInput__WEBPACK_IMPORTED_MODULE_3___default()(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_2___default.a);\n  } else {//console.log(\"Search bar doesn't exist\");\n  }\n\n  var dependencies = {\n    'replaceOccurrence': _js_functions_replaceOccurence__WEBPACK_IMPORTED_MODULE_6___default.a,\n    'removeAllChildFromNodeExceptText': _js_functions_removeAllChildFromNodeExceptText__WEBPACK_IMPORTED_MODULE_7___default.a,\n    'visuallyUpdateVoteCounter': _js_functions_visuallyUpdateVoteCounter__WEBPACK_IMPORTED_MODULE_8___default.a,\n    'setVoterStatusToNeutralAndUpdatePostMeta': _js_functions_setVoterStatusToNeutralAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_9___default.a,\n    'setVoterStatusToUpAndUpdatePostMeta': _js_functions_setVoterStatusToUpAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_10___default.a,\n    'setVoterStatusToDownAndUpdatePostMeta': _js_functions_setVoterStatusToDownAndUpdatePostMeta__WEBPACK_IMPORTED_MODULE_11___default.a,\n    'addClickToAddToListBtnFormSubmitBtn': _js_functions_addClickToAddToListBtnFormSubmitBtn__WEBPACK_IMPORTED_MODULE_27___default.a,\n    'addClickToAddToListBtnFormCancelBtn': _js_functions_addClickToAddToListBtnFormCancelBtn__WEBPACK_IMPORTED_MODULE_28___default.a,\n    'handleUpVoteBtnClick': _js_functions_handleUpVoteBtnClick__WEBPACK_IMPORTED_MODULE_23___default.a,\n    'handleNeutralVoteBtnClick': _js_functions_handleNeutralVoteBtnClick__WEBPACK_IMPORTED_MODULE_24___default.a,\n    'handleDownVoteBtnClick': _js_functions_handleDownVoteBtnClick__WEBPACK_IMPORTED_MODULE_25___default.a,\n    'isObjEmpty': _js_functions_isObjEmpty__WEBPACK_IMPORTED_MODULE_5___default.a,\n    'isUrl': _js_functions_isUrl__WEBPACK_IMPORTED_MODULE_4___default.a,\n    'setAttributeOfElementsInArrayIncrementally': _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default.a,\n    'makeRequest': _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_2___default.a,\n    'fadeOut': _js_functions_fadeOut__WEBPACK_IMPORTED_MODULE_12___default.a,\n    'createAddToListBtnForm': _js_functions_createAddToListBtnForm__WEBPACK_IMPORTED_MODULE_19___default.a\n  };\n  var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');\n  _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default()(allListItemsArray, 'cllId');\n  var linkListTitleArray = document.querySelectorAll('.link-list-item__link-list-title');\n  _js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default()(linkListTitleArray, 'cllId');\n  _js_functions_displayDataPerItem__WEBPACK_IMPORTED_MODULE_14___default()(_js_functions_setAttributeOfElementsInArrayIncrementally__WEBPACK_IMPORTED_MODULE_1___default.a, _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_2___default.a);\n  _js_functions_createNewListRequestBtn__WEBPACK_IMPORTED_MODULE_13___default()(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_2___default.a);\n  _js_functions_createAddToListBtn__WEBPACK_IMPORTED_MODULE_18___default()();\n  _js_functions_addClickToAddToListBtn__WEBPACK_IMPORTED_MODULE_26___default()(dependencies);\n  _js_functions_createDownVoteBtn__WEBPACK_IMPORTED_MODULE_17___default()();\n  _js_functions_addClickToDownVoteBtn__WEBPACK_IMPORTED_MODULE_22___default()(dependencies);\n  _js_functions_createUpVoteBtn__WEBPACK_IMPORTED_MODULE_15___default()();\n  _js_functions_addClickToUpVoteBtn__WEBPACK_IMPORTED_MODULE_20___default()(dependencies);\n  _js_functions_createNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_16___default()();\n  _js_functions_addClickToNeutralVoteBtn__WEBPACK_IMPORTED_MODULE_21___default()(dependencies);\n};\n\n//# sourceURL=webpack:///./assets/src/frontEndLoggedInUser.js?");

/***/ })

/******/ });