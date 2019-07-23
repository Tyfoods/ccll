	import cllGlobals from '../js/cllGlobals';
	import setAttributeOfElementsInArray from '../js/functions/setAttributeOfElementsInArray';
	//const setAttributeOfElementsInArray = require( '../js/functions/setAttributeOfElementsInArray');
	import makeRequest from '../js/functions/makeRequest';
	import createAddToListBtn from '../js/functions/createAddToListBtn';
	import replaceOccurrence from '../js/functions/replaceOccurence';
	import displayVotesPerItem from '../js/functions/displayVotesPerItem';
	//const displayVotesPerItem = require('../js/functions/displayVotesPerItem');
	import createDownVoteBtn from '../js/functions/createDownVoteBtn';
	import createNeutralVoteBtn from '../js/functions/createNeutralVoteBtn';
	import createUpVoteBtn from '../js/functions/createUpVoteBtn'; 
	import createDeleteListBtn from '../js/functions/createDeleteListBtn';
	import createNewListBtn from '../js/functions/createNewListBtn';
	import isUrl from '../js/functions/isUrl';
	import handleSearchInput from '../js/functions/handleSearchInput';
	import isObjEmpty from '../js/functions/isObjEmpty';
	import createAdminRemoveBtn from '../js/functions/createAdminRemoveBtn';
	import cllCreateForm from '../js/functions/cllCreateForm';
	import addClickToSettingsCancelBtn from '../js/functions/addClickToSettingsCancelBtn';
	import cllAddOnClickToCancelBtn from '../js/functions/cllAddOnClickToCancelBtn';
	import cllAddOnClickToSubmitBtn from '../js/functions/cllAddOnClickToSubmitBtn';
	import throughLinkRequest from '../js/functions/throughLinkRequest';
	import endLinkRequest from '../js/functions/endLinkRequest';
	import updateCllListRequest from '../js/functions/updateCllListRequest';
	import createNewCategoryRequest from '../js/functions/createNewCategoryRequest';
	import addClickToSettingsSubmitBtn from '../js/functions/addClickToSettingsSubmitBtn';
	import cllCreateSettingsForm from '../js/functions/cllCreateSettingsForm';


/*
setAttributeOfElementsInArray
createDeleteListBtn
createNewListBtn
isUrl
handleSearchInput
isObjEmpty
createAdminRemoveBtn
makeRequest ?...
cllCreateForm
addClickToSettingsCancelBtn
cllAddOnClickToCancelBtn
cllAddOnClickToSubmitBtn
throughLinkRequest
endLinkRequest
updateCllListRequest
createNewCategoryRequest
addClickToSettingsSubmitBtn
cllCreateSettingsForm
*/


window.onload=function()
{	


	if(document.querySelector(".cll_search_form_input")){
		//console.log("Search bar exists");
		handleSearchInput();
	}
	else
	{
		//console.log("Search bar doesn't exist");
	}

	let test = () => {
		console.log("I'm a test");
	}

	test();

	//createListTitles(); deprecated

	var allListItemsArray = document.querySelectorAll('.link-list-item');
	setAttributeOfElementsInArray(allListItemsArray, 'cllId');

	createAddToListBtn();

	

	cllCreateForm(cllAddOnClickToSubmitBtn,
				  cllAddOnClickToCancelBtn,
				  isUrl,
				  endLinkRequest,
				  throughLinkRequest,
				  makeRequest);

	cllCreateSettingsForm(addClickToSettingsSubmitBtn,
						  addClickToSettingsCancelBtn,
						  updateCllListRequest,
						  createNewCategoryRequest,
						  makeRequest,
						  replaceOccurrence);


	displayVotesPerItem(setAttributeOfElementsInArray, makeRequest);
	createDeleteListBtn(setAttributeOfElementsInArray, makeRequest);
	createNewListBtn(makeRequest);
	createDownVoteBtn(setAttributeOfElementsInArray, makeRequest);
	createUpVoteBtn(setAttributeOfElementsInArray, makeRequest);
	createNeutralVoteBtn(setAttributeOfElementsInArray, makeRequest);
	createAdminRemoveBtn(makeRequest, isObjEmpty);

}
