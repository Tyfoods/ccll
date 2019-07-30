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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/backEndAdminManager.js");
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

/***/ "./assets/js/functions/addClickToLinkApproveBtn.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/addClickToLinkApproveBtn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToLinkApproveBtn(deps) {\n  var cllApproveBtnArray = document.querySelectorAll(\".pending-link-data__approve-btn\");\n  cllApproveBtnArray.forEach(function (cllApproveBtn) {\n    cllApproveBtn.addEventListener(\"click\", function () {\n      deps.handleLinkApproveBtnClick(cllApproveBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToLinkApproveBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToLinkDeclineBtn.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/addClickToLinkDeclineBtn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToLinkDeclineBtn(deps) {\n  var cllDeclineBtnArray = document.querySelectorAll(\".pending-link-data__decline-btn\");\n  cllDeclineBtnArray.forEach(function (cllDeclineBtn) {\n    cllDeclineBtn.addEventListener(\"click\", function () {\n      deps.handleLinkDeclineBtnClick(cllDeclineBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToLinkDeclineBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToListApproveBtn.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/addClickToListApproveBtn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addOnClickToListApproveBtn(deps) {\n  var cllListApproveBtnArray = document.querySelectorAll(\".pending-list-data__approve-btn\");\n  cllListApproveBtnArray.forEach(function (cllListApproveBtn) {\n    cllListApproveBtn.addEventListener(\"click\", function () {\n      deps.handleListApproveBtnClick(cllListApproveBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToListApproveBtn.js?");

/***/ }),

/***/ "./assets/js/functions/addClickToListDeclineBtn.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/addClickToListDeclineBtn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function addClickToListDeclineBtn(deps) {\n  var cllListDeclineBtnArray = document.querySelectorAll(\".pending-list-data__decline-btn\");\n  cllListDeclineBtnArray.forEach(function (cllListDeclineBtn) {\n    cllListDeclineBtn.addEventListener(\"click\", function () {\n      deps.handleListDeclineBtnClick(cllListDeclineBtn, deps);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/addClickToListDeclineBtn.js?");

/***/ }),

/***/ "./assets/js/functions/createNewCategory.js":
/*!**************************************************!*\
  !*** ./assets/js/functions/createNewCategory.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createNewCategory(newCategoryValue, deps) {\n  var NewCategoryData = {\n    \"name\": newCategoryValue,\n    \"slug\": newCategoryValue.replace(\" \", \"-\") //console.log(\"Submit Button was clicked, now I'll post\");\n\n  };\n  deps.makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/cll-link-category/v1/cll-link/' + NewCategoryData.name, 'POST').then(function () {//console.log(\"Request for new category has been made successfully\");\n  })[\"catch\"](function (error) {//console.log(\"Failed to make the new category request\");\n    //console.log(error);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/createNewCategory.js?");

/***/ }),

/***/ "./assets/js/functions/deletePendingListRequest.js":
/*!*********************************************************!*\
  !*** ./assets/js/functions/deletePendingListRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function deletePendingListRequest(newListItemData) {\n  var deletePendingListRequest = new XMLHttpRequest();\n\n  deletePendingListRequest.onreadystatechange = function () {\n    if (this.readyState == 4 && this.status == 200) {} //Nothing below gets called :O ready state is NEVER 4!!!\n    //console.log('Successful Pending List Deletion - Hello');\n    //console.log(deletePendingListRequest.responseText);\n    //if request fails...?\n\n  };\n\n  deletePendingListRequest.open(\"POST\", cllGlobals.currentProtocalDomain + '/wp-content/plugins/curation-link-library/cll-core/decline-list-item-handler.php');\n  deletePendingListRequest.setRequestHeader(\"X-WP-Nonce\", magicalData.nonce);\n  deletePendingListRequest.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n  deletePendingListRequest.send(\"json_string=\" + JSON.stringify(newListItemData));\n};\n\n//# sourceURL=webpack:///./assets/js/functions/deletePendingListRequest.js?");

/***/ }),

/***/ "./assets/js/functions/handleLinkApproveBtnClick.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/handleLinkApproveBtnClick.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleLinkApproveBtnClick(cllApproveBtn, deps) {\n  var makeRequest = deps.makeRequest;\n  var cllApproveBtnCllId = cllApproveBtn.getAttribute('cllid');\n  var newLinkItemData = {};\n  var table = document.getElementById(\"pending-link-data-table\");\n\n  for (var i = 0, row; row = table.rows[i]; i++) {\n    //iterate through rows\n    //rows would be accessed using the \"row\" variable assigned in the for loop\n    for (var j = 0, col; col = row.cells[j]; j++) {\n      //var element = row.cells[j];\n      if (row.cells[j].nodeName.toLowerCase() === \"td\") {\n        //Check if it is table data\n        if (row.cells[j].getAttribute('cllid') === cllApproveBtnCllId) {\n          var rowToDelete = row.rowIndex;\n\n          if (row.cells[j].title === 'linkId') {\n            newLinkItemData['pendingLinkId'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'userId') {\n            newLinkItemData['commonUserId'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'linkTitle') {\n            newLinkItemData['title'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'content') {\n            newLinkItemData['content'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'category') {\n            newLinkItemData['link_category'] = row.cells[j].innerHTML;\n          }\n        }\n      }\n    }\n  }\n\n  table.deleteRow(rowToDelete);\n  newLinkItemData['status'] = 'publish';\n  var userId = newLinkItemData['commonUserId'];\n  var userId = parseInt(newLinkItemData['commonUserId']).toString();\n  makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/users/' + userId, 'GET').then(function (request) {\n    var objResponse = JSON.parse(request.responseText);\n    newLinkItemData['meta'] = {\n      \"submitted_by\": objResponse.name,\n      \"URL\": newLinkItemData['content'].trim(),\n      \"link_type\": \"external link\"\n    };\n    return;\n  }).then(function () {\n    //console.log(newLinkItemData);\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(newLinkItemData)).then(function (request) {\n      //console.log(\"Successful Link Addition\");\n      alert(\"You have approved a link!\");\n      makeRequest(cllGlobals.currentProtocalDomain + '/wp-content/plugins/curation-link-library/cll-core/approve-link-item-handler.php', 'POST', \"json_string=\" + JSON.stringify(newLinkItemData)).then(function (request) {//console.log(request.responseText);\n        //console.log(\"Successful pending link deletion\");\n      });\n    })[\"catch\"](function (error) {\n      console.log(error);\n    });\n  })[\"catch\"](function (error) {\n    console.log(error);\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleLinkApproveBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/handleLinkDeclineBtnClick.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/handleLinkDeclineBtnClick.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleLinkDeclineBtnClick(cllDeclineBtn, deps) {\n  var cllDeclineBtnCllId = cllDeclineBtn.getAttribute('cllid');\n  var newLinkItemData = {};\n  var table = document.getElementById(\"pending-link-data-table\");\n\n  for (var i = 0, row; row = table.rows[i]; i++) {\n    //iterate through rows\n    //rows would be accessed using the \"row\" variable assigned in the for loop\n    for (var j = 0, col; col = row.cells[j]; j++) {\n      //var element = row.cells[j];\n      if (row.cells[j].nodeName.toLowerCase() === \"td\") {\n        //Check if it is table data\n        if (row.cells[j].getAttribute('cllId') === cllDeclineBtnCllId) {\n          var rowToDelete = row.rowIndex;\n\n          if (row.cells[j].title === 'linkId') {\n            //check if element.title is equal to 'string'\n            newLinkItemData['pendingLinkId'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'userId') {\n            //check if element.title is equal to 'string'\n            newLinkItemData['commonUserId'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'linkTitle') {\n            newLinkItemData['title'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'content') {\n            newLinkItemData['content'] = row.cells[j].innerHTML;\n          } else if (row.cells[j].title === 'category') {\n            newLinkItemData['link_category'] = row.cells[j].innerHTML;\n          }\n        }\n      }\n    }\n  }\n\n  table.deleteRow(rowToDelete); //add some function to refresh form fields and add temporary checkmark symbol\n\n  var deletePendingLinkRequest = new XMLHttpRequest();\n\n  deletePendingLinkRequest.onreadystatechange = function () {\n    if (this.readyState == 4 && this.status == 200) {//do something\n    }\n  };\n\n  deletePendingLinkRequest.open(\"POST\", cllGlobals.currentProtocalDomain + '/wp-content/plugins/curation-link-library/cll-core/approve-link-item-handler.php');\n  deletePendingLinkRequest.setRequestHeader(\"X-WP-Nonce\", magicalData.nonce);\n  deletePendingLinkRequest.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\");\n  deletePendingLinkRequest.send(\"json_string=\" + JSON.stringify(newLinkItemData));\n  alert(\"You have declined a link!\");\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleLinkDeclineBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/handleListApproveBtnClick.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/handleListApproveBtnClick.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleListApproveBtnClick(cllListApproveBtn, deps) {\n  //Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked\n  var cllListApproveBtnCllId = cllListApproveBtn.getAttribute('cllid'); //get cllid of Approvebtn\n\n  var makeRequest = deps.makeRequest;\n  var newListItemData = {};\n  var table = document.getElementById(\"pending-list-data-table\");\n\n  for (var i = 0, row; row = table.rows[i]; i++) {\n    //iterate through rows\n    //rows would be accessed using the \"row\" variable assigned in the for loop\n    for (var j = 0, col; col = row.cells[j]; j++) {\n      //var element = row.cells[j];\n      if (row.cells[j].nodeName.toLowerCase() === \"td\") {\n        //Check if it is table data\n        if (row.cells[j].getAttribute('cllid') === cllListApproveBtnCllId) {\n          var rowToDelete = row.rowIndex;\n\n          if (row.cells[j].title === 'listId') {\n            newListItemData['listId'] = row.cells[j].innerHTML; //console.log(\"This listId was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['listId']);\n          } else if (row.cells[j].title === 'userId') {\n            newListItemData['commonUserId'] = row.cells[j].innerHTML; //console.log(\"This userId was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['commonUserId']);\n          } else if (row.cells[j].title === 'list_category') {\n            newListItemData['list_category'] = row.cells[j].innerHTML; //console.log(\"The list_category was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['list_category']);\n            ////console.log(\"The elements ID is: \"+row.cells[j].id);\n            //row.cells[j].parentNode.removeChild(row.cells[j]);\n          } else if (row.cells[j].title === 'pageId') {\n            newListItemData['pageId'] = row.cells[j].innerHTML; //console.log(\"The pageId was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['pageId']);\n            ////console.log(\"The elements ID is: \"+row.cells[j].id);\n            //row.cells[j].parentNode.removeChild(row.cells[j]);\n          } else if (row.cells[j].title === 'list_page_orgin') {\n            newListItemData['list_page_orgin'] = row.cells[j].innerHTML; //console.log(\"The pageId was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['list_page_orgin']);\n            ////console.log(\"The elements ID is: \"+row.cells[j].id);\n            //row.cells[j].parentNode.removeChild(row.cells[j]);\n          }\n        }\n      }\n    }\n  }\n\n  table.deleteRow(rowToDelete); //add some function to refresh form fields and add temporary checkmark symbol\n\n  deps.deletePendingListRequest(newListItemData);\n  var list_page_orgin_id = newListItemData['list_page_orgin'].replace(/\\s/g, '').replace(/%20/g, '');\n\n  if (confirm(\"Are you sure you would like to add this new list?\")) {\n    ////console.log(\"You pressed YES!\");\n    makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + list_page_orgin_id, \"POST\").then(function (request) {\n      var rawResponse = request.responseText.split('{\"id\":' + list_page_orgin_id).pop();\n      var jsonResponse = '{\"id\":' + list_page_orgin_id + rawResponse;\n      var objResponse = JSON.parse(jsonResponse);\n      var newPageContent = {\n        \"content\": objResponse.content.raw + ' [cll_list category_name = \"' + newListItemData['list_category'].toLowerCase().trim() + '\"]' //creates new category\n\n      };\n      deps.createNewCategory(newListItemData['list_category'], deps);\n      makeRequest(cllGlobals.currentProtocalDomain + '/wp-json/wp/v2/pages/' + list_page_orgin_id, \"POST\", JSON.stringify(newPageContent)).then(function (request) {//console.log(\"Successfully updated page!\");\n        //console.log(request.responseText);\n      })[\"catch\"](function (error) {//console.log(error);\n        //console.log(\"Unsuccesful page update!\");\n      });\n    })[\"catch\"](function (error) {//console.log(error);\n      //console.log(\"Unable to get page with given ID\");\n    });\n  } else {//console.log(\"You pressed NO\");\n  }\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleListApproveBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/handleListDeclineBtnClick.js":
/*!**********************************************************!*\
  !*** ./assets/js/functions/handleListDeclineBtnClick.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function handleListDeclineBtnClick(cllListDeclineBtn, deps) {\n  //Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked\n  var cllListDeclineBtnCllId = cllListDeclineBtn.getAttribute('cllid'); //get cllid of Approvebtn\n\n  var newListItemData = {};\n  var table = document.getElementById(\"pending-list-data-table\");\n\n  for (var i = 0, row; row = table.rows[i]; i++) {\n    //iterate through rows\n    //rows would be accessed using the \"row\" variable assigned in the for loop\n    for (var j = 0, col; col = row.cells[j]; j++) {\n      //var element = row.cells[j];\n      if (row.cells[j].nodeName.toLowerCase() === \"td\") {\n        //Check if it is table data\n        if (row.cells[j].getAttribute('cllid') === cllListDeclineBtnCllId) {\n          var rowToDelete = row.rowIndex;\n\n          if (row.cells[j].title === 'listId') {\n            newListItemData['listId'] = row.cells[j].innerHTML; //console.log(\"This userId was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['listId']);\n          } else if (row.cells[j].title === 'userId') {\n            newListItemData['commonUserId'] = row.cells[j].innerHTML; //console.log(\"This userId was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['commonUserId']);\n          } else if (row.cells[j].title === 'list_category') {\n            newListItemData['list_category'] = row.cells[j].innerHTML; //console.log(\"The content was found: \"+row.cells[j].title);\n            //console.log(\"This is the InnerHTML: \"+newListItemData['list_category']);\n            ////console.log(\"The elements ID is: \"+row.cells[j].id);\n            //row.cells[j].parentNode.removeChild(row.cells[j]);\n          }\n        }\n      } //iterate through columns\n      //columns would be accessed using the \"col\" variable assigned in the for loop\n\n    }\n  }\n\n  table.deleteRow(rowToDelete); //add some function to refresh form fields and add temporary checkmark symbol\n\n  deps.deletePendingListRequest(newListItemData);\n  alert(\"You have declined a list!\");\n};\n\n//# sourceURL=webpack:///./assets/js/functions/handleListDeclineBtnClick.js?");

/***/ }),

/***/ "./assets/js/functions/makeRequest.js":
/*!********************************************!*\
  !*** ./assets/js/functions/makeRequest.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function makeRequest(url, method, sendData, refresh) {\n  var refreshInput = refresh || ''; //console.log(\"request made\");\n  // Create the XHR request\n\n  var request = new XMLHttpRequest(); // Return it as a Promise\n\n  return new Promise(function (resolve, reject) {\n    // Setup our listener to process compeleted requests\n    request.onreadystatechange = function () {\n      // Only run if the request is complete\n      if (request.readyState !== 4) return; // Process the response\n\n      if (request.status >= 200 && request.status < 300) {\n        // If successful\n        resolve(request);\n\n        if (typeof sendData !== 'undefined') {//document.location.reload(true);\n          //console.log('sendData was present!');\n        }\n\n        if (refreshInput === false) {} else if (refreshInput === true) {\n          document.location.reload(true);\n        }\n      } else {\n        // If failed\n        reject({\n          status: request.status,\n          statusText: request.statusText\n        });\n      }\n    }; // Setup our HTTP request\n\n\n    request.open(method || 'GET', url, true);\n    request.setRequestHeader(\"X-WP-Nonce\", magicalData.nonce);\n    request.setRequestHeader(\"Content-Type\", \"application/json;charset=UTF-8\"); // Send the request\n\n    if (typeof sendData === 'undefined') {\n      request.send(); //console.log(\"Data is undefined! No data was sent\");\n    } else {\n      //console.log(sendData);\n      request.send(sendData);\n    }\n  });\n};\n\n//# sourceURL=webpack:///./assets/js/functions/makeRequest.js?");

/***/ }),

/***/ "./assets/src/backEndAdminManager.js":
/*!*******************************************!*\
  !*** ./assets/src/backEndAdminManager.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/cllGlobals */ \"./assets/js/cllGlobals.js\");\n/* harmony import */ var _js_cllGlobals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_cllGlobals__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/functions/makeRequest */ \"./assets/js/functions/makeRequest.js\");\n/* harmony import */ var _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _js_functions_createNewCategory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/functions/createNewCategory */ \"./assets/js/functions/createNewCategory.js\");\n/* harmony import */ var _js_functions_createNewCategory__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_functions_createNewCategory__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_functions_deletePendingListRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/functions/deletePendingListRequest */ \"./assets/js/functions/deletePendingListRequest.js\");\n/* harmony import */ var _js_functions_deletePendingListRequest__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_functions_deletePendingListRequest__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _js_functions_addClickToListApproveBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/functions/addClickToListApproveBtn */ \"./assets/js/functions/addClickToListApproveBtn.js\");\n/* harmony import */ var _js_functions_addClickToListApproveBtn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToListApproveBtn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _js_functions_addClickToListDeclineBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/functions/addClickToListDeclineBtn */ \"./assets/js/functions/addClickToListDeclineBtn.js\");\n/* harmony import */ var _js_functions_addClickToListDeclineBtn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToListDeclineBtn__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _js_functions_handleListApproveBtnClick__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/functions/handleListApproveBtnClick */ \"./assets/js/functions/handleListApproveBtnClick.js\");\n/* harmony import */ var _js_functions_handleListApproveBtnClick__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleListApproveBtnClick__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _js_functions_handleListDeclineBtnClick__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../js/functions/handleListDeclineBtnClick */ \"./assets/js/functions/handleListDeclineBtnClick.js\");\n/* harmony import */ var _js_functions_handleListDeclineBtnClick__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleListDeclineBtnClick__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _js_functions_addClickToLinkDeclineBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../js/functions/addClickToLinkDeclineBtn */ \"./assets/js/functions/addClickToLinkDeclineBtn.js\");\n/* harmony import */ var _js_functions_addClickToLinkDeclineBtn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToLinkDeclineBtn__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _js_functions_addClickToLinkApproveBtn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../js/functions/addClickToLinkApproveBtn */ \"./assets/js/functions/addClickToLinkApproveBtn.js\");\n/* harmony import */ var _js_functions_addClickToLinkApproveBtn__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_functions_addClickToLinkApproveBtn__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _js_functions_handleLinkDeclineBtnClick__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../js/functions/handleLinkDeclineBtnClick */ \"./assets/js/functions/handleLinkDeclineBtnClick.js\");\n/* harmony import */ var _js_functions_handleLinkDeclineBtnClick__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleLinkDeclineBtnClick__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _js_functions_handleLinkApproveBtnClick__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../js/functions/handleLinkApproveBtnClick */ \"./assets/js/functions/handleLinkApproveBtnClick.js\");\n/* harmony import */ var _js_functions_handleLinkApproveBtnClick__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_functions_handleLinkApproveBtnClick__WEBPACK_IMPORTED_MODULE_11__);\n\n\n\n //import deletePendingLinkRequest from '../js/functions/deletePendingLinkRequest';\n\n\n\n\n\n\n\n\n\n\nwindow.onload = function () {\n  var dependencies = {\n    'createNewCategory': _js_functions_createNewCategory__WEBPACK_IMPORTED_MODULE_2___default.a,\n    'handleListApproveBtnClick': _js_functions_handleListApproveBtnClick__WEBPACK_IMPORTED_MODULE_6___default.a,\n    'handleListDeclineBtnClick': _js_functions_handleListDeclineBtnClick__WEBPACK_IMPORTED_MODULE_7___default.a,\n    'handleLinkDeclineBtnClick': _js_functions_handleLinkDeclineBtnClick__WEBPACK_IMPORTED_MODULE_10___default.a,\n    'handleLinkApproveBtnClick': _js_functions_handleLinkApproveBtnClick__WEBPACK_IMPORTED_MODULE_11___default.a,\n    'deletePendingListRequest': _js_functions_deletePendingListRequest__WEBPACK_IMPORTED_MODULE_3___default.a,\n    'makeRequest': _js_functions_makeRequest__WEBPACK_IMPORTED_MODULE_1___default.a //addOnClickToApproveBtn();\n\n  };\n  _js_functions_addClickToLinkApproveBtn__WEBPACK_IMPORTED_MODULE_9___default()(dependencies); //addOnClickToDeclineBtn();\n\n  _js_functions_addClickToLinkDeclineBtn__WEBPACK_IMPORTED_MODULE_8___default()(dependencies); //addOnClickToListApproveBtn();\n\n  _js_functions_addClickToListApproveBtn__WEBPACK_IMPORTED_MODULE_4___default()(dependencies); //addOnClickToListDeclineBtn();\n\n  _js_functions_addClickToListDeclineBtn__WEBPACK_IMPORTED_MODULE_5___default()(dependencies);\n};\n\n//# sourceURL=webpack:///./assets/src/backEndAdminManager.js?");

/***/ })

/******/ });