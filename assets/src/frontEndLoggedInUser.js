import cllGlobals from '../js/cllGlobals';
import setAttributeOfElementsInArrayIncrementally from '../js/functions/setAttributeOfElementsInArrayIncrementally';
import makeRequest from '../js/functions/makeRequest';
import handleSearchInput from '../js/functions/handleSearchInput';
import isUrl from '../js/functions/isUrl';
import isObjEmpty from '../js/functions/isObjEmpty';
import replaceOccurrence from '../js/functions/replaceOccurence';
import removeAllChildFromNodeExceptText from '../js/functions/removeAllChildFromNodeExceptText';
import visuallyUpdateVoteCounter from '../js/functions/visuallyUpdateVoteCounter';
import setVoterStatusToNeutralAndUpdatePostMeta from '../js/functions/setVoterStatusToNeutralAndUpdatePostMeta';
import setVoterStatusToUpAndUpdatePostMeta from '../js/functions/setVoterStatusToUpAndUpdatePostMeta';
import setVoterStatusToDownAndUpdatePostMeta from '../js/functions/setVoterStatusToDownAndUpdatePostMeta';
import fadeOut from '../js/functions/fadeOut';
import slugify from '../js/functions/slugify';

import createNewListRequestBtn from '../js/functions/createNewListRequestBtn';

import displayDataPerItem from '../js/functions/displayDataPerItem';

import createUpVoteBtn from '../js/functions/createUpVoteBtn';
import createNeutralVoteBtn from '../js/functions/createNeutralVoteBtn';
import createDownVoteBtn from '../js/functions/createDownVoteBtn';

import createAddToListBtn from '../js/functions/createAddToListBtn';
import createAddToListBtnForm from '../js/functions/createAddToListBtnForm';

import addClickToUpVoteBtn from '../js/functions/addClickToUpVoteBtn';
import addClickToNeutralVoteBtn from '../js/functions/addClickToNeutralVoteBtn';
import addClickToDownVoteBtn from '../js/functions/addClickToDownVoteBtn';

import handleUpVoteBtnClick from '../js/functions/handleUpVoteBtnClick';
import handleNeutralVoteBtnClick from '../js/functions/handleNeutralVoteBtnClick';
import handleDownVoteBtnClick from '../js/functions/handleDownVoteBtnClick';

import addClickToAddToListBtn from '../js/functions/addClickToAddToListBtn';
import addClickToAddToListBtnFormSubmitBtn from '../js/functions/addClickToAddToListBtnFormSubmitBtn';
import addClickToAddToListBtnFormCancelBtn from '../js/functions/addClickToAddToListBtnFormCancelBtn'
import addClickToCancelBackBtn from '../js/functions/addClickToCancelBackBtn';

window.onload=function()
{



if(document.querySelector(".cll_search_form_input")){
	//console.log("Search bar exists");
	handleSearchInput(makeRequest);
}
else
{
	//console.log("Search bar doesn't exist");
}

	const dependencies = {
		'replaceOccurrence': replaceOccurrence,
		'removeAllChildFromNodeExceptText': removeAllChildFromNodeExceptText,
		'visuallyUpdateVoteCounter': visuallyUpdateVoteCounter,
		'setVoterStatusToNeutralAndUpdatePostMeta' :setVoterStatusToNeutralAndUpdatePostMeta,
		'setVoterStatusToUpAndUpdatePostMeta' : setVoterStatusToUpAndUpdatePostMeta,
		'setVoterStatusToDownAndUpdatePostMeta': setVoterStatusToDownAndUpdatePostMeta,

		'addClickToAddToListBtnFormSubmitBtn': addClickToAddToListBtnFormSubmitBtn,
		'addClickToAddToListBtnFormCancelBtn': addClickToAddToListBtnFormCancelBtn,
		'addClickToCancelBackBtn': addClickToCancelBackBtn,
		

		'handleUpVoteBtnClick': handleUpVoteBtnClick,
		'handleNeutralVoteBtnClick': handleNeutralVoteBtnClick,
		'handleDownVoteBtnClick': handleDownVoteBtnClick,


		'isObjEmpty': isObjEmpty,
		'isUrl': isUrl,
		'setAttributeOfElementsInArrayIncrementally': setAttributeOfElementsInArrayIncrementally,
		'makeRequest': makeRequest,
		'fadeOut': fadeOut,
		'slugify': slugify,

		'createAddToListBtnForm': createAddToListBtnForm,

	}

	let controlBox = document.createElement("div");
	controlBox.setAttribute('class', 'control-box');

	var cll_link_list = document.querySelector('.cll-link-list');
	cll_link_list.parentElement.insertBefore(controlBox, cll_link_list.parentElement.firstChild);

	createBackBtn(makeRequest, addClickToCancelBackBtn, dependencies);

	var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');
	setAttributeOfElementsInArrayIncrementally(allListItemsArray, 'cllId');
	
	var linkListTitleArray = document.querySelectorAll('.link-list-item__link-list-title');
	setAttributeOfElementsInArrayIncrementally(linkListTitleArray, 'cllId');

    displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest, slugify);

    createNewListRequestBtn(makeRequest);
    
    createAddToListBtn();
    addClickToAddToListBtn(dependencies);

    createDownVoteBtn();
    addClickToDownVoteBtn(dependencies);
    
    createUpVoteBtn();
    addClickToUpVoteBtn(dependencies);
    
    createNeutralVoteBtn();
    addClickToNeutralVoteBtn(dependencies);
    


}
