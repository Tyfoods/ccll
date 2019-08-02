import cllGlobals from '../js/cllGlobals';
import makeRequest from '../js/functions/makeRequest';
import setAttributeOfElementsInArrayIncrementally from '../js/functions/setAttributeOfElementsInArrayIncrementally';

import displayDataPerItem from '../js/functions/displayDataPerItem';
import handleSearchInput from '../js/functions/handleSearchInput';

import createAddToListBtn from '../js/functions/createAddToListBtn';
import createDownVoteBtn from '../js/functions/createDownVoteBtn';
import createNeutralVoteBtn from '../js/functions/createNeutralVoteBtn';
import createUpVoteBtn from '../js/functions/createUpVoteBtn'; 


window.onload=function()
{

function createNewListRequestBtn(){
	var newListRequestBtn = document.createElement('button');
	newListRequestBtn.setAttribute("class", "new-list-btn");
	newListRequestBtn.innerHTML = "Request New Category +";


	var cll_link_list = document.querySelector('.cll-link-list');

	cll_link_list.parentElement.insertBefore(newListRequestBtn, cll_link_list.parentElement.firstChild);

	newListRequestBtn.addEventListener("click", function(){
        alert("You must be logged in to request a new category!");
	});
};


function addClickToAddToListBtn()
{
	var i = 0;
	var add_to_list_btn_array = document.querySelectorAll(".cll-link-list__add-to-list-btn");
	add_to_list_btn_array.forEach(function(add_to_list_btn)
	{

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		add_to_list_btn.setAttributeNode(cllId);
		add_to_list_btn.setAttribute('cllid',i);

		i+=1;
		//when button is clicked check what class the add_to_list_btn is and use this to add form to specific
		//var add_to_list_btn = document.getElementById("add_to_list_btn");
		add_to_list_btn.addEventListener("click", function(){
            alert("You must be logged in to add a link!");
		});
	});
}





if(document.querySelector(".cll_search_form_input")){
	//console.log("Search bar exists");
    handleSearchInput(makeRequest);
}
else
{
	//console.log("Search bar doesn't exist");
}
	var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');
	setAttributeOfElementsInArrayIncrementally(allListItemsArray, 'cllId');
	
	const dependencies = {
		"makeRequest": makeRequest,
		"setAttributeOfElementsInArrayIncrementally": setAttributeOfElementsInArrayIncrementally,
	}
    
	createAddToListBtn();
	addClickToAddToListBtn();
	createDownVoteBtn();
	createUpVoteBtn();
	createNeutralVoteBtn();
	displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest);
	createNewListRequestBtn();


	var upVoteBtnArray = document.querySelectorAll('.link-list-item__up-vote-button');
	upVoteBtnArray.forEach(function(upVoteBtn){
		upVoteBtn.addEventListener('click', function(){
            alert("You must be logged in to upvote!");
		});
	});

	var neutralVoteBtnArray = document.querySelectorAll('.link-list-item__neutral-vote-button');
	neutralVoteBtnArray.forEach(function(neutralVoteBtn){
		neutralVoteBtn.addEventListener('click', function(){
            alert("You must be logged in to neutral vote");
		});
	});

	var downVoteBtnArray = document.querySelectorAll('.link-list-item__down-vote-button');
	downVoteBtnArray.forEach(function(downVoteBtn){
		downVoteBtn.addEventListener('click', function(){
            alert("You must be logged in to down vote!");
		});
	});

}
