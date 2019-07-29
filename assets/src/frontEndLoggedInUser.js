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

window.onload=function()
{

/*



function cllCreateForm()
{
	var i = 0;
	var add_to_list_btn_array = document.querySelectorAll(".add_to_list_btn");
	add_to_list_btn_array.forEach(function(add_to_list_btn)
	{
		//check if Class is set if not set then set it
		////console.log(add_to_list_btn.className);

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		add_to_list_btn.setAttributeNode(cllId);
		add_to_list_btn.setAttribute('cllid',i);

		i+=1;
		//when button is clicked check what class the add_to_list_btn is and use this to add form to specific
		//var add_to_list_btn = document.getElementById("add_to_list_btn");
		add_to_list_btn.addEventListener("click", function()
		{//if button has not been clicked, create form
			if(cllGlobals.isAddToListBtnClicked === false)
			{
				//console.log("form created");
				var f = document.createElement("form");
				f.setAttribute('id','addToListForm');

				var linktitle = document.createElement("input"); //input element, text
				linktitle.setAttribute('type',"text");
				linktitle.setAttribute('name',"newListItemTitle");
				linktitle.setAttribute('placeholder',"Link title here");
				linktitle.setAttribute("class", "add_to_list_input");


				var link = document.createElement("input"); //input element, text
				link.setAttribute('type',"text");
				link.setAttribute('name',"newListItemUrl");
				link.setAttribute('placeholder',"URL here");
				link.setAttribute("class", "add_to_list_input");

				var b = document.createElement("button"); //button element, b button
				b.setAttribute('name',"submitBtn");
				b.setAttribute('type', 'button');
				b.setAttribute('class','submitBtn');
				b.innerHTML = 'Submit';

				var cancelBtn = document.createElement("button");
				cancelBtn.setAttribute('name',"cancelBtn");
				cancelBtn.setAttribute('type', 'button');
				cancelBtn.setAttribute('class','cancelBtn');

				f.appendChild(linktitle);
				f.appendChild(link);
				f.appendChild(b);
				f.appendChild(cancelBtn);


				add_to_list_btn.appendChild(f);
				cllGlobals.isAddToListBtnClicked = true;
				cllAddOnClickToSubmitBtn(add_to_list_btn);
				cllAddOnClickToCancelBtn();
			}
		});
	});
}



function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function fadeIn($element) {
	//console.log(element);
	/*
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function cllAddOnClickToSubmitBtn(currentAddToListBtn){
	//Check if submitBtn Exists, if so add event listerner to publish post
	//if(cllGlobals.isSubmitBtnClicked === false)
	//{
		var multiListPageCategoryIds = "cll_category_ids"+"_"+currentAddToListBtn.getAttribute('cllid');

		var submitBtn = document.querySelector('.submitBtn');
		if (typeof submitBtn !== 'undefined')
		{
			//console.log("Submit Button Existance Verified");
			submitBtn.addEventListener("click", function()
			{
				if(document.querySelector('[name="newListItemTitle"].add_to_list_input').value === ''){
					alert("You must submit a title!");
				}
				else if(document.querySelector('[name="newListItemUrl"].add_to_list_input').value === ''){
					alert("You must submit a URL!");
				}
				else if(!isUrl(document.querySelector('[name="newListItemUrl"].add_to_list_input').value))
				{
					alert("Please enter a valid URL!");
				}
				else
				{
					var NewLinkItemData = {
						"title": document.querySelector('[name="newListItemTitle"].add_to_list_input').value,
						"content": document.querySelector('[name="newListItemUrl"].add_to_list_input').value,
						"categories": [window[multiListPageCategoryIds]],
						"status": "publish"
					}
					//If Content is valid
					var createLinkItemQuery = new XMLHttpRequest();
					createLinkItemQuery.onreadystatechange = function()
						{
							if(this.readyState == 4 && this.status == 200)
							{
								//Nothing below gets called :O ready state is NEVER 4!!!
								//console.log('Success - Hello');
								//console.log(createLinkItemQuery.responseText);
								////console.log(commonUserId);
							}
								//if request fails...?
						
						}
					NewLinkItemData = "commonUserId=" + JSON.stringify(cllUserId) + "json_string=" + JSON.stringify(NewLinkItemData);
					createLinkItemQuery.open("POST", cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/common-user-request-handler.php');
					createLinkItemQuery.setRequestHeader("X-WP-Nonce", magicalData.nonce);
					createLinkItemQuery.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					createLinkItemQuery.send(NewLinkItemData);

					var newListItemTitle = document.querySelector('[name="newListItemTitle"].add_to_list_input').value
					//event.stopPropagation();
					alert("Thank you for submitting!") //Change this so the JS instead says "Thank you for submitting, maybe an alert?"
					//add some function to refresh form fields and add temporary checkmark symbol
					document.getElementById("addToListForm").reset();
					
					var f = document.getElementById("addToListForm")
					var checkmark_symbol = document.createElement("img"); //button element, b button
					f.appendChild(checkmark_symbol);
					checkmark_symbol.setAttribute('name',"checkmark_symbol");
					checkmark_symbol.setAttribute('id',"checkmark_symbol");
					checkmark_symbol.setAttribute('src', cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/assets/images/checkmark.jpg');

					//fadeIn(checkmark_symbol);

					setTimeout(function(){ 
											//document.getElementById("checkmark_symbol");
											fadeOut(checkmark_symbol); 
										 }, 750);
				}
			});
		//cllGlobals.isSubmitBtnClicked = true;
		return;
		}
	//}
}
*/


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
		

		'handleUpVoteBtnClick': handleUpVoteBtnClick,
		'handleNeutralVoteBtnClick': handleNeutralVoteBtnClick,
		'handleDownVoteBtnClick': handleDownVoteBtnClick,


		'isObjEmpty': isObjEmpty,
		'isUrl': isUrl,
		'setAttributeOfElementsInArrayIncrementally': setAttributeOfElementsInArrayIncrementally,
		'makeRequest': makeRequest,
		'fadeOut': fadeOut,

		'createAddToListBtnForm': createAddToListBtnForm,

	}

	var allListItemsArray = document.querySelectorAll('.link-list-item');
	setAttributeOfElementsInArrayIncrementally(allListItemsArray, 'cllId');
	
	var linkListTitleArray = document.querySelectorAll('.link-list-title');
	setAttributeOfElementsInArrayIncrementally(linkListTitleArray, 'cllId');

    displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest);

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
