	import cllGlobals from '../js/cllGlobals'; 
	import setAttributeOfElementsInArrayIncrementally from '../js/functions/setAttributeOfElementsInArrayIncrementally';
	import removeAllChildFromNodeExceptText from '../js/functions/removeAllChildFromNodeExceptText';
	import visuallyUpdateVoteCounter from '../js/functions/visuallyUpdateVoteCounter';
	import setVoterStatusToNeutralAndUpdatePostMeta from '../js/functions/setVoterStatusToNeutralAndUpdatePostMeta';
	import setVoterStatusToUpAndUpdatePostMeta from '../js/functions/setVoterStatusToUpAndUpdatePostMeta';
	import setVoterStatusToDownAndUpdatePostMeta from '../js/functions/setVoterStatusToDownAndUpdatePostMeta';
	import slugify from '../js/functions/slugify';

	//const setAttributeOfElementsInArrayIncrementally = require( '../js/functions/setAttributeOfElementsInArrayIncrementally');
	import makeRequest from '../js/functions/makeRequest';
	import createAddToListBtn from '../js/functions/createAddToListBtn';
	import replaceOccurrence from '../js/functions/replaceOccurence';
	import displayDataPerItem from '../js/functions/displayDataPerItem';

	import handleCategoryEdit from '../js/functions/handleCategoryEdit'
	import handleUpVoteBtnClick from '../js/functions/handleUpVoteBtnClick';
	import handleNeutralVoteBtnClick from '../js/functions/handleNeutralVoteBtnClick';
	import handleDownVoteBtnClick from '../js/functions/handleDownVoteBtnClick';
	
	import createEditCategoryBtnForm from '../js/functions/createEditCategoryBtnForm';
	import createDownVoteBtn from '../js/functions/createDownVoteBtn';
	import createNeutralVoteBtn from '../js/functions/createNeutralVoteBtn';
	import createUpVoteBtn from '../js/functions/createUpVoteBtn'; 
	import createDeleteListBtn from '../js/functions/createDeleteListBtn';
	import createNewListBtn from '../js/functions/createNewListBtn';
	import createAddToListBtnForm from '../js/functions/createAddToListBtnForm';
	import createEditCategoryBtn from '../js/functions/createEditCategoryBtn';
	import isUrl from '../js/functions/isUrl';
	import handleSearchInput from '../js/functions/handleSearchInput';
	import isObjEmpty from '../js/functions/isObjEmpty';
	import createAdminRemoveBtn from '../js/functions/createAdminRemoveBtn';
	import addClickToAddToListBtn from '../js/functions/addClickToAddToListBtn';
	import addClickToEditCategoryFormCancelBtn from '../js/functions/addClickToEditCategoryFormCancelBtn';
	import addClickToAddToListBtnFormCancelBtn from '../js/functions/addClickToAddToListBtnFormCancelBtn';
	import addClickToAddToListBtnFormSubmitBtn from '../js/functions/addClickToAddToListBtnFormSubmitBtn';
	import throughLinkRequest from '../js/functions/throughLinkRequest';
	import endLinkRequest from '../js/functions/endLinkRequest';
	import updateCllListRequest from '../js/functions/updateCllListRequest';
	import createNewCategoryRequest from '../js/functions/createNewCategoryRequest';
	import addClickToEditCategoryFormSubmitBtn from '../js/functions/addClickToEditCategoryFormSubmitBtn';
	import addClickToEditCategoryBtn from '../js/functions/addClickToEditCategoryBtn';
	import addClickToUpVoteBtn from '../js/functions/addClickToUpVoteBtn';
	import addClickToDownVoteBtn from '../js/functions/addClickToDownVoteBtn';
	import addClickToNeutralVoteBtn from '../js/functions/addClickToNeutralVoteBtn';



window.onload=function()
{	
	  const dependencies = { 
		'handleCategoryEdit':handleCategoryEdit,
		'setAttributeOfElementsInArrayIncrementally': setAttributeOfElementsInArrayIncrementally,
		'removeAllChildFromNodeExceptText': removeAllChildFromNodeExceptText,
		'setVoterStatusToNeutralAndUpdatePostMeta': setVoterStatusToNeutralAndUpdatePostMeta,
		'setVoterStatusToUpAndUpdatePostMeta': setVoterStatusToUpAndUpdatePostMeta,
		'setVoterStatusToDownAndUpdatePostMeta': setVoterStatusToDownAndUpdatePostMeta,
		'makeRequest': makeRequest,
		'visuallyUpdateVoteCounter': visuallyUpdateVoteCounter,
		'replaceOccurrence': replaceOccurrence,
		'isUrl': isUrl,
		'isObjEmpty': isObjEmpty,
		'slugify': slugify,
		
		'createAddToListBtn': createAddToListBtn,
		'createAddToListBtnForm': createAddToListBtnForm,
		'createEditCategoryBtnForm': createEditCategoryBtnForm,
		'createNewCategoryRequest': createNewCategoryRequest,

		'throughLinkRequest': throughLinkRequest,
		'endLinkRequest': endLinkRequest,
		'updateCllListRequest': updateCllListRequest,
		'handleSearchInput': handleSearchInput,
		'handleUpVoteBtnClick': handleUpVoteBtnClick,
		'handleNeutralVoteBtnClick': handleNeutralVoteBtnClick,
		'handleDownVoteBtnClick': handleDownVoteBtnClick,
		
		'addClickToAddToListBtn:': addClickToAddToListBtn,
		'addClickToEditCategoryFormCancelBtn': addClickToEditCategoryFormCancelBtn,
		'addClickToAddToListBtnFormCancelBtn': addClickToAddToListBtnFormCancelBtn,
		'addClickToAddToListBtnFormSubmitBtn': addClickToAddToListBtnFormSubmitBtn,
		'addClickToEditCategoryFormSubmitBtn': addClickToEditCategoryFormSubmitBtn,
		'addClickToEditCategoryBtn': addClickToEditCategoryBtn,
	  }

	if(document.querySelector(".cll_search_form_input")){
		//console.log("Search bar exists");
		handleSearchInput(makeRequest);
	}
	else
	{
		//console.log("Search bar doesn't exist");
	}

	//createListTitles(); deprecated

	var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');
	setAttributeOfElementsInArrayIncrementally(allListItemsArray, 'cllId');

	
	var linkListTitleArray = document.querySelectorAll('.link-list-item__link-list-title');
	setAttributeOfElementsInArrayIncrementally(linkListTitleArray, 'cllId');
	

/*
	function testButton(){
		var testButton = document.createElement('type', 'button');
		testButton.innerHTML = "Test Request";
		var cllLinkList = document.querySelector('.cll-link-list');
		cllLinkList.appendChild(testButton);

		var NewLinkPageData = {
			"post_title": "my fake page",
			"post_content": 'fake stuff',
			"post_type": "page",
			"post_status": "publish"
		}

		testButton.addEventListener('click', function(){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-link/v1/create-page/','POST', JSON.stringify(NewLinkPageData))
			.then(function(request){
				console.log(request.responseText);
				console.log(JSON.parse(request.responseText));
			})
			.catch(function(error){
				console.log(error);
			});
		})
	}
	testButton();
*/


	createAddToListBtn();
	addClickToAddToListBtn(dependencies);//done
	
	createEditCategoryBtn(setAttributeOfElementsInArrayIncrementally);//done
	addClickToEditCategoryBtn(dependencies);//done

	displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest, slugify); //done

	createDeleteListBtn(setAttributeOfElementsInArrayIncrementally, makeRequest); //done

	createNewListBtn(makeRequest); //done

	
	createDownVoteBtn(); //
	addClickToDownVoteBtn(dependencies);

	createUpVoteBtn(); //
	addClickToUpVoteBtn(dependencies); //

	createNeutralVoteBtn(); //
	addClickToNeutralVoteBtn(dependencies);//

	createAdminRemoveBtn(makeRequest, isObjEmpty);

}
