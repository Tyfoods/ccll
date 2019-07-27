
window.onload=function()
{

var cllGlobals = {
			add_to_list_btn: document.getElementById("add_to_list_btn"),
			isAddToListBtnClicked: false,
			isSubmitBtnClicked: false,
			currentProtocalDomain: document.location.origin
}

var makeRequest = function (url, method, sendData, refresh) {


	var refreshInput = refresh || '';


	////console.log("request made");
	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {

		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);

				if(typeof sendData !== 'undefined')
				{
					//document.location.reload(true);
					////console.log('sendData was present!');
				}

				if(refreshInput === false){

				}
				else if(refreshInput === true){
					document.location.reload(true);
				}

			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

		// Setup our HTTP request
		request.open(method || 'GET', url, true);
		request.setRequestHeader("X-WP-Nonce", magicalData.nonce);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		// Send the request
		if(typeof sendData === 'undefined'){
			request.send();	
			////console.log("Data is undefined! No data was sent");
		}
		else{
			////console.log(sendData);
			request.send(sendData);
		}

	});
};

function createAddToListBtn(){
	var allListsArray = document.querySelectorAll('.link-list-style-1');
	allListsArray.forEach(function(list){
		//append Add To List! button
		var addToListBtn = document.createElement('button');
		addToListBtn.setAttribute('class', "add_to_list_btn");
		addToListBtn.innerHTML = "Add To List +";

		list.parentNode.insertBefore(addToListBtn, list.nextSibling);
	});
}

function setAttributeOfElementsInArrayIncrementally(array, attribute_name){
	var incrementer = 0;

	array.forEach(function(item){
		var attribute = document.createAttribute(attribute_name);
		item.setAttributeNode(attribute);
		item.setAttribute(attribute_name, incrementer);
		incrementer+=1;
	});
}

//after buttons are created, run this function
function displayVotesPerItem(){

	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/', 'GET')
		.then(function(request){

			var cllLinkArray = JSON.parse(request.responseText);
			var linkListTitleArray = document.querySelectorAll('.link-list-title');
			var incrementer = 0;

			////console.log(cllLinkArray);

			cllLinkArray.forEach(function(cllLink){
				linkListTitleArray.forEach(function(linkListTitle){
					var post_slug = linkListTitle.textContent.trim().replace(/\s/g, '-').toLowerCase();
					if(cllLink.slug === post_slug){
						/*
						//console.log("Matched a slug!");
						//console.log(cllLinkArray[incrementer].meta.up_votes);
						//console.log(cllLinkArray[incrementer].meta.down_votes);
						*/
						var upVotesElement = document.createElement('p');
						upVotesElement.setAttribute('class','up_votes_counter');
						upVotesElement.innerHTML = cllLinkArray[incrementer].meta.up_votes;

						var downVotesElement = document.createElement('p');
						downVotesElement.setAttribute('class','down_votes_counter');
						downVotesElement.innerHTML = cllLinkArray[incrementer].meta.down_votes;

						var currentLinkItemId = linkListTitle.getAttribute('cllId');

						var downVoteButton = document.querySelector('.down_vote_button[cllId="'+currentLinkItemId+'"]');
						var upVoteButton = document.querySelector('.up_vote_button[cllId="'+currentLinkItemId+'"]');


						downVoteButton.appendChild(downVotesElement);
						upVoteButton.appendChild(upVotesElement);

						//add "submitted_by";
						var submittedByElement = document.createElement('p');
						submittedByElement.setAttribute('class','submitted_by');

						////console.log(cllLinkArray[incrementer].meta);

						submittedByElement.innerHTML = "Submitted by: "+cllLinkArray[incrementer].meta.submitted_by;

						////console.log(currentLinkItemId);
						var linkListItem = document.querySelector('.link-list-item[cllId="'+currentLinkItemId+'"]');
						try{
							linkListItem.appendChild(submittedByElement);
						}
						catch(error){
							////console.log(error);
						}

					}
				});
				incrementer+=1;
			});
			var downVoteCounterArray = document.querySelectorAll('.down_votes_counter');
			setAttributeOfElementsInArrayIncrementally(downVoteCounterArray, 'cllId');

			var upVoteCounterArray = document.querySelectorAll('.up_votes_counter');
			setAttributeOfElementsInArrayIncrementally(upVoteCounterArray, 'cllId');
		});
}


function createDownVoteBtn(){
	var allListItemsArray = document.querySelectorAll('.link-list-item');
	
	var incrementer = 0;

	allListItemsArray.forEach(function(listItem){
		var downVoteBtn = document.createElement("button");
		downVoteBtn.setAttribute('class','down_vote_button');

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		downVoteBtn.setAttributeNode(cllId);
		downVoteBtn.setAttribute('cllid', incrementer);

		listItem.appendChild(downVoteBtn);//append to inner html
		incrementer +=1;
	});


	var linkListTitleArray = document.querySelectorAll('.link-list-title');
	setAttributeOfElementsInArrayIncrementally(linkListTitleArray, 'cllId');

	var downVoteBtnArray = document.querySelectorAll('.down_vote_button');
	downVoteBtnArray.forEach(function(downVoteBtn){
		downVoteBtn.addEventListener('click', function(){
            alert("You must be logged in to down vote!");
		});
	});
}

function createNeutralVoteBtn(){
	var allListItemsCollection = document.getElementsByClassName('link-list-item');
	var allListItemsArray = Array.prototype.slice.call( allListItemsCollection, 0 );
	
	var incrementer = 0;

	allListItemsArray.forEach(function(listItem){
		var neutralVoteBtn = document.createElement("button");
		neutralVoteBtn.setAttribute('class','neutral_vote_button');

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		neutralVoteBtn.setAttributeNode(cllId);
		neutralVoteBtn.setAttribute('cllid', incrementer);

		listItem.appendChild(neutralVoteBtn);//append to inner html
		incrementer +=1;
	});

	var linkListTitleArray = document.querySelectorAll('.link-list-title');
	setAttributeOfElementsInArrayIncrementally(linkListTitleArray, 'cllId');

	var neutralVoteBtnArray = document.querySelectorAll('.neutral_vote_button');
	neutralVoteBtnArray.forEach(function(neutralVoteBtn){
		neutralVoteBtn.addEventListener('click', function(){
            alert("You must be logged in to neutral vote");
		});
	});
}


function createUpVoteBtn(){
	var allListItemsCollection = document.getElementsByClassName('link-list-item');
	var allListItemsArray = Array.prototype.slice.call( allListItemsCollection, 0 );
	
	var incrementer = 0;

	allListItemsArray.forEach(function(listItem){
		var upVoteBtn = document.createElement("button");
		upVoteBtn.setAttribute('class','up_vote_button');


		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		upVoteBtn.setAttributeNode(cllId);
		upVoteBtn.setAttribute('cllid', incrementer);

		listItem.appendChild(upVoteBtn);//append to inner html
		incrementer +=1;
	});

	var linkListTitleArray = document.querySelectorAll('.link-list-title');
	setAttributeOfElementsInArrayIncrementally(linkListTitleArray, 'cllId');

	var upVoteBtnArray = document.querySelectorAll('.up_vote_button');
	upVoteBtnArray.forEach(function(upVoteBtn){
		upVoteBtn.addEventListener('click', function(){
            alert("You must be logged in to upvote!");
		});
	});
}


function createNewListRequestBtn(){
	var newListRequestBtn = document.createElement('button');
	newListRequestBtn.setAttribute("class", "newListBtn");
	newListRequestBtn.innerHTML = "Request New Category +";


	var cll_link_list = document.querySelector('.cll_link_list');

	cll_link_list.parentElement.insertBefore(newListRequestBtn, cll_link_list.parentElement.firstChild);

	newListRequestBtn.addEventListener("click", function(){
        alert("You must be logged in to request a new category!");
	});
};

function handleSearchInput(){
	var cllSearchFormInput = document.querySelector('.cll_search_form_input');
	var cllSuggestions = document.querySelector('.cll-suggestions');

	if(cllSearchFormInput !== undefined){

		var searchEngineTimeout;

		cllSearchFormInput.onkeydown = function(){
			if (event.keyCode == 13){
				event.preventDefault();
			}
		}

		cllSearchFormInput.onkeyup = function(){

			//clear search results
			cllSuggestions.innerHTML = '';

			//clear search results array with IIFE
			(function (){
				//var cllSuggestions = document.querySelector('.cll-suggestions');
				var loadingElementCollection = document.querySelectorAll('#cll-loading')

					var loadingElement = document.createElement("div");
					loadingElement.setAttribute('id','cll-loading');
					loadingElement.innerHTML = 'LOADING';
					if(loadingElementCollection.length === 0){
						////console.log("Adding Loading Element");
						cllSuggestions.appendChild(loadingElement);
					}

			}());

			//Process searchEngine Input after one second
			searchEngineTimeout = setTimeout( function () {

				clearTimeout(searchEngineTimeout);

				//If the input is nothing then clear search results
				if(cllSearchFormInput.value === ' ' || cllSearchFormInput.value === '')
				{
					////console.log("No value was entered");
					cllSuggestions.innerHTML = '';


				}
				else
				{

					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?search='+cllSearchFormInput.value,
						'GET',
						false
					)
					.then(function(request){
						cllSuggestions.innerHTML = '';

						var searchResultsObj = JSON.parse(request.responseText);

						searchResultsObj.forEach(function(searchResult){
							if(cllSuggestions.childElementCount < 5)
							{
								////console.log("Search result below!");
								////console.log(searchResult);
								var searchResultElement = document.createElement("div");
								searchResultElement.setAttribute('class','search-result-element');

								searchResultElement.innerHTML = searchResult.title.rendered; //set innerHTML to title

								if(searchResult.meta.link_type.toLowerCase() === "external link"){
									cllSuggestions.appendChild(searchResultElement);
								}

								//make searchResult Clickable
								searchResultElement.addEventListener('click', function(){
									event.preventDefault();
									window.open(searchResult.meta.URL); //Open in link new window
								});
							}

						});

					})
					.catch(function(error){
						////console.log(error);
					});
				}	
			}, 1000);
		};
		
	}
}


function cllCreateForm()
{
	var i = 0;
	var add_to_list_btn_array = document.querySelectorAll(".add_to_list_btn");
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
	handleSearchInput();
}
else
{
	//console.log("Search bar doesn't exist");
}
	var allListItemsArray = document.querySelectorAll('.link-list-item');
    setAttributeOfElementsInArrayIncrementally(allListItemsArray, 'cllId');
    
	createAddToListBtn();
	cllCreateForm();
	displayVotesPerItem();
	createDownVoteBtn();
	createUpVoteBtn();
	createNeutralVoteBtn();
	createNewListRequestBtn();

}
