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

/***/ "./assets/src/frontEndLoggedInUser.js":
/*!********************************************!*\
  !*** ./assets/src/frontEndLoggedInUser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* Deprecated!\r\n\r\n\r\nimport cllGlobals from '../js/cllGlobals';\r\nimport setAttributeOfElementsInArrayIncrementally from '../js/functions/setAttributeOfElementsInArrayIncrementally';\r\nimport makeRequest from '../js/functions/makeRequest';\r\nimport handleSearchInput from '../js/functions/handleSearchInput';\r\nimport isUrl from '../js/functions/isUrl';\r\nimport isObjEmpty from '../js/functions/isObjEmpty';\r\nimport replaceOccurrence from '../js/functions/replaceOccurence';\r\nimport removeAllChildFromNodeExceptText from '../js/functions/removeAllChildFromNodeExceptText';\r\nimport visuallyUpdateVoteCounter from '../js/functions/visuallyUpdateVoteCounter';\r\nimport setVoterStatusToNeutralAndUpdatePostMeta from '../js/functions/setVoterStatusToNeutralAndUpdatePostMeta';\r\nimport setVoterStatusToUpAndUpdatePostMeta from '../js/functions/setVoterStatusToUpAndUpdatePostMeta';\r\nimport setVoterStatusToDownAndUpdatePostMeta from '../js/functions/setVoterStatusToDownAndUpdatePostMeta';\r\nimport fadeOut from '../js/functions/fadeOut';\r\nimport slugify from '../js/functions/slugify';\r\n\r\nimport createNewListRequestBtn from '../js/functions/createNewListRequestBtn';\r\n\r\nimport displayDataPerItem from '../js/functions/displayDataPerItem';\r\n\r\nimport createUpVoteBtn from '../js/functions/createUpVoteBtn';\r\nimport createNeutralVoteBtn from '../js/functions/createNeutralVoteBtn';\r\nimport createDownVoteBtn from '../js/functions/createDownVoteBtn';\r\n\r\nimport createAddToListBtn from '../js/functions/createAddToListBtn';\r\nimport createAddToListBtnForm from '../js/functions/createAddToListBtnForm';\r\n\r\nimport addClickToUpVoteBtn from '../js/functions/addClickToUpVoteBtn';\r\nimport addClickToNeutralVoteBtn from '../js/functions/addClickToNeutralVoteBtn';\r\nimport addClickToDownVoteBtn from '../js/functions/addClickToDownVoteBtn';\r\n\r\nimport handleUpVoteBtnClick from '../js/functions/handleUpVoteBtnClick';\r\nimport handleNeutralVoteBtnClick from '../js/functions/handleNeutralVoteBtnClick';\r\nimport handleDownVoteBtnClick from '../js/functions/handleDownVoteBtnClick';\r\n\r\nimport addClickToAddToListBtn from '../js/functions/addClickToAddToListBtn';\r\nimport addClickToAddToListBtnFormSubmitBtn from '../js/functions/addClickToAddToListBtnFormSubmitBtn';\r\nimport addClickToAddToListBtnFormCancelBtn from '../js/functions/addClickToAddToListBtnFormCancelBtn'\r\nimport addClickToCancelBackBtn from '../js/functions/addClickToCancelBackBtn';\r\n\r\nwindow.onload=function()\r\n{\r\n\r\n\r\n\r\nif(document.querySelector(\".cll_search_form_input\")){\r\n\t//console.log(\"Search bar exists\");\r\n\thandleSearchInput(makeRequest);\r\n}\r\nelse\r\n{\r\n\t//console.log(\"Search bar doesn't exist\");\r\n}\r\n\r\n\tconst dependencies = {\r\n\t\t'replaceOccurrence': replaceOccurrence,\r\n\t\t'removeAllChildFromNodeExceptText': removeAllChildFromNodeExceptText,\r\n\t\t'visuallyUpdateVoteCounter': visuallyUpdateVoteCounter,\r\n\t\t'setVoterStatusToNeutralAndUpdatePostMeta' :setVoterStatusToNeutralAndUpdatePostMeta,\r\n\t\t'setVoterStatusToUpAndUpdatePostMeta' : setVoterStatusToUpAndUpdatePostMeta,\r\n\t\t'setVoterStatusToDownAndUpdatePostMeta': setVoterStatusToDownAndUpdatePostMeta,\r\n\r\n\t\t'addClickToAddToListBtnFormSubmitBtn': addClickToAddToListBtnFormSubmitBtn,\r\n\t\t'addClickToAddToListBtnFormCancelBtn': addClickToAddToListBtnFormCancelBtn,\r\n\t\t'addClickToCancelBackBtn': addClickToCancelBackBtn,\r\n\t\t\r\n\r\n\t\t'handleUpVoteBtnClick': handleUpVoteBtnClick,\r\n\t\t'handleNeutralVoteBtnClick': handleNeutralVoteBtnClick,\r\n\t\t'handleDownVoteBtnClick': handleDownVoteBtnClick,\r\n\r\n\r\n\t\t'isObjEmpty': isObjEmpty,\r\n\t\t'isUrl': isUrl,\r\n\t\t'setAttributeOfElementsInArrayIncrementally': setAttributeOfElementsInArrayIncrementally,\r\n\t\t'makeRequest': makeRequest,\r\n\t\t'fadeOut': fadeOut,\r\n\t\t'slugify': slugify,\r\n\r\n\t\t'createAddToListBtnForm': createAddToListBtnForm,\r\n\r\n\t}\r\n\r\n\tlet controlBox = document.createElement(\"div\");\r\n\tcontrolBox.setAttribute('class', 'control-box');\r\n\r\n\tvar cll_link_list = document.querySelector('.cll-link-list');\r\n\tcll_link_list.parentElement.insertBefore(controlBox, cll_link_list.parentElement.firstChild);\r\n\r\n\tcreateBackBtn(makeRequest, addClickToCancelBackBtn, dependencies);\r\n\r\n\tvar allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');\r\n\tsetAttributeOfElementsInArrayIncrementally(allListItemsArray, 'cllId');\r\n\t\r\n\tvar linkListTitleArray = document.querySelectorAll('.link-list-item__link-list-title');\r\n\tsetAttributeOfElementsInArrayIncrementally(linkListTitleArray, 'cllId');\r\n\r\n    displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest, slugify);\r\n\r\n    createNewListRequestBtn(makeRequest);\r\n    \r\n    createAddToListBtn();\r\n    addClickToAddToListBtn(dependencies);\r\n\r\n    createDownVoteBtn();\r\n    addClickToDownVoteBtn(dependencies);\r\n    \r\n    createUpVoteBtn();\r\n    addClickToUpVoteBtn(dependencies);\r\n    \r\n    createNeutralVoteBtn();\r\n    addClickToNeutralVoteBtn(dependencies);\r\n    \r\n\r\n\r\n}\r\n*/\n\n//# sourceURL=webpack:///./assets/src/frontEndLoggedInUser.js?");

/***/ })

/******/ });