
window.onload=function()
{

var cllGlobals = {
			add_to_list_btn: document.getElementById("add_to_list_btn"),
			isAddToListBtnClicked: false,
			isSubmitBtnClicked: false,
			currentProtocalDomain: document.location.origin
}

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

function setAttributeOfElementsInArray(array, attribute_name){
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

			//console.log(cllLinkArray);

			cllLinkArray.forEach(function(cllLink){
				linkListTitleArray.forEach(function(linkListTitle){
					var post_slug = linkListTitle.textContent.trim().replace(/\s/g, '-').toLowerCase();
					if(cllLink.slug === post_slug){
						/*
						console.log("Matched a slug!");
						console.log(cllLinkArray[incrementer].meta.up_votes);
						console.log(cllLinkArray[incrementer].meta.down_votes);
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

						//console.log(cllLinkArray[incrementer].meta);

						submittedByElement.innerHTML = "Submitted by: "+cllLinkArray[incrementer].meta.submitted_by;

						//console.log(currentLinkItemId);
						var linkListItem = document.querySelector('.link-list-item[cllId="'+currentLinkItemId+'"]');
						try{
							linkListItem.appendChild(submittedByElement);
						}
						catch(error){
							//console.log(error);
						}

					}
				});
				incrementer+=1;
			});
			var downVoteCounterArray = document.querySelectorAll('.down_votes_counter');
			setAttributeOfElementsInArray(downVoteCounterArray, 'cllId');

			var upVoteCounterArray = document.querySelectorAll('.up_votes_counter');
			setAttributeOfElementsInArray(upVoteCounterArray, 'cllId');
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
	setAttributeOfElementsInArray(linkListTitleArray, 'cllId');

	var downVoteBtnArray = document.querySelectorAll('.down_vote_button');
	downVoteBtnArray.forEach(function(downVoteBtn){

		downVoteBtn.addEventListener('click', function(){
			linkListTitleArray.forEach(function(linkListTitle){
				var post_slug = linkListTitle.textContent.trim().replace(/\s/g, '-').toLowerCase();
				//console.log(post_slug);
				if(linkListTitle.getAttribute('cllId') === downVoteBtn.getAttribute('cllId')){

					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+post_slug, 'GET')
						.then(function(request){
							var objResponse = JSON.parse(request.responseText);
							var currentLinkItemId = downVoteBtn.getAttribute('cllId');
							//console.log(objResponse);

							var metaObj = objResponse[0].meta;
							
							try {
								var voteRecordObj = JSON.parse(metaObj.voteRecord);
								//console.log(voteRecordObj[cllUserId]);

								if(voteRecordObj[cllUserId]  !== "") //if current user status is not empty
								{
									//console.log("There is information on record, here's the information: ");
									//console.log(metaObj.voteRecord);
									//console.log("Here is the current users vote status: ");
									//console.log(parseInt(voteRecordObj[cllUserId]));
									var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId]);
									////console.log(JSON.parse(metaObj.voteRecord))

									if(currentUserVoteStatus === 0)
									{
										alert("You've already down voted this post!");
										return;
									}
									else if(currentUserVoteStatus === 1)
									{
										//Set user vote status to 0
										var voteRecordObj = JSON.parse(metaObj.voteRecord);
										
										voteRecordObj[cllUserId] = "0";

										var newVoteStatusData = JSON.stringify(voteRecordObj);

										metaObj.voteRecord = newVoteStatusData;

										//add down vote
										metaObj.down_votes+=1;

										//remove up vote
										metaObj.up_votes-=1;

										var newPostMetaData = JSON.stringify(metaObj);

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												//console.log(request.responseText);
												//get appropriate upVoteBtn + DownVoteBtn and change their values

												var downVoteElement = document.querySelector('.down_votes_counter[cllId="'+currentLinkItemId+'"]');
												var upVoteElement = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemId+'"]');

												var currentDownVoteValue = parseInt(downVoteElement.innerHTML);
												currentDownVoteValue+=1;
												downVoteElement.innerHTML = currentDownVoteValue;

												var currentUpVoteValue = parseInt(upVoteElement.innerHTML);
												currentUpVoteValue-=1;
												upVoteElement.innerHTML = currentUpVoteValue;


											})
											.catch(function(error){
												//console.log(error);
											});
									}
									else if(currentUserVoteStatus === 3)
									{
										//Increment down_votes in metaObj
										metaObj.down_votes+=1;

										//Edit JSONstring metaObj.voteRecord
										var voteRecordObj = JSON.parse(metaObj.voteRecord);
										
										voteRecordObj[cllUserId] = "0";

										var newVoteStatusData = JSON.stringify(voteRecordObj);

										metaObj.voteRecord = newVoteStatusData;

										var newPostMetaData = JSON.stringify(metaObj);

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												//console.log(request.responseText);

												var downVoteElement = document.querySelector('.down_votes_counter[cllId="'+currentLinkItemId+'"]');

												var currentDownVoteValue = parseInt(downVoteElement.innerHTML);
												currentDownVoteValue+=1;
												downVoteElement.innerHTML = currentDownVoteValue;

											})
											.catch(function(error){
												//console.log(error);
											});
			

										////console.log("Switch vote status to 1");
										////console.log("Add UpVote to Post");
										
									}

								}

							}
							catch(error) {
								//console.log(error);
								//console.log("Could not parse voteRecord");
								//console.log("There is no information on record *assertion");
								
								////console.log("Change voter status to 0");
								metaObj.voteRecord = '{"'+cllUserId+'":'+'"0"}';
								////console.log("add downvote to post");
								metaObj.down_votes+=1;

								//visually down vote

								var downVoteElement = document.querySelector('.down_votes_counter[cllId="'+currentLinkItemId+'"]');

								var currentDownVoteValue = parseInt(downVoteElement.textContent);
								//console.log(downVoteElement.textContent);
								//console.log(currentDownVoteValue);
								//console.log(typeof currentDownVoteValue);
								currentDownVoteValue+=1;
								downVoteElement.innerHTML = currentDownVoteValue;



								var newPostMetaData = JSON.stringify(metaObj);

								makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
									.then(function(request){
										//console.log(request.responseText);
									})
									.catch(function(error){
										//console.log(error);
									});

							}
						})
						.catch(function(error){
							//console.log(error);
						});
					}
			})
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
	setAttributeOfElementsInArray(linkListTitleArray, 'cllId');

	var neutralVoteBtnArray = document.querySelectorAll('.neutral_vote_button');
	neutralVoteBtnArray.forEach(function(neutralVoteBtn){
		neutralVoteBtn.addEventListener('click', function(){
			linkListTitleArray.forEach(function(linkListTitle){
				var post_slug = linkListTitle.textContent.trim().replace(/\s/g, '-').toLowerCase();
				//console.log(post_slug);
				if(linkListTitle.getAttribute('cllId') === neutralVoteBtn.getAttribute('cllId')){

					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+post_slug, 'GET')
						.then(function(request){
							var objResponse = JSON.parse(request.responseText);
							var currentLinkItemId = neutralVoteBtn.getAttribute('cllId');
							//console.log(objResponse);

							var metaObj = objResponse[0].meta;
							
							try {
								var voteRecordObj = JSON.parse(metaObj.voteRecord);
								//console.log(voteRecordObj[cllUserId]);

								//decrement appropriate vote
								if(voteRecordObj[cllUserId] === "1"){
									metaObj.up_votes-=1;
									//visually remove users up vote
									var upVoteElement = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemId+'"]');

									var currentUpVoteValue = parseInt(upVoteElement.innerHTML);
									currentUpVoteValue-=1;
									upVoteElement.innerHTML = currentUpVoteValue;
								}
								else if(voteRecordObj[cllUserId] === "0"){
									metaObj.down_votes-=1;
									//visually remove users down vote
									var downVoteElement = document.querySelector('.down_votes_counter[cllId="'+currentLinkItemId+'"]');

									var currentDownVoteValue = parseInt(downVoteElement.innerHTML);
									currentDownVoteValue-=1;
									downVoteElement.innerHTML = currentDownVoteValue;
								}
								else if(voteRecordObj[cllUserId])
								{
									alert("You're already neutral!");
									return;
								}

								//Set Voter Status to 3
								var voteRecordObj = JSON.parse(metaObj.voteRecord);
								
								voteRecordObj[cllUserId] = "3";

								var newVoteStatusData = JSON.stringify(voteRecordObj);

								metaObj.voteRecord = newVoteStatusData;

								var newPostMetaData = JSON.stringify(metaObj);


								makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
									.then(function(request){
										//console.log(request.responseText);
									})
									.catch(function(error){
										//console.log(error);
									});
							}
							catch(error) {
								if(voteRecordObj[cllUserId]  !== ""){ //if current user status is not empty
									//console.log("There is information on record, here's the information: ");
								} else {
									//console.log(error);
									////console.log("Could not parse voteRecord");
									////console.log("There is no information on record *assertion");
									
									////console.log(metaObj.voteRecord);
									////console.log("Change voter status to 3");
									metaObj.voteRecord = '{"'+cllUserId+'":'+'"3"}';

									var newPostMetaData = JSON.stringify(metaObj);

									makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
										.then(function(request){
											////console.log(request.responseText);
										})
										.catch(function(error){
											////console.log(error);
										});
								}
							}
						})
						.catch(function(error){
							////console.log(error);
						});
					}
			})
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
	setAttributeOfElementsInArray(linkListTitleArray, 'cllId');

	var upVoteBtnArray = document.querySelectorAll('.up_vote_button');
	upVoteBtnArray.forEach(function(upVoteBtn){
		upVoteBtn.addEventListener('click', function(){
			linkListTitleArray.forEach(function(linkListTitle){
				var post_slug = linkListTitle.textContent.trim().replace(/\s/g, '-').toLowerCase();
				////console.log(post_slug);
				if(linkListTitle.getAttribute('cllId') === upVoteBtn.getAttribute('cllId')){

					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+post_slug, 'GET')
						.then(function(request){
							var objResponse = JSON.parse(request.responseText);
							var currentLinkItemId = upVoteBtn.getAttribute('cllId');

							var metaObj = objResponse[0].meta;
							
							try {
								var voteRecordObj = JSON.parse(metaObj.voteRecord);
								////console.log(voteRecordObj[cllUserId]);

								if(voteRecordObj[cllUserId]  !== "") //if current user status is not empty
								{
									
									//console.log("There is information on record, here's the information: ");
									//console.log(metaObj.voteRecord);

									var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId]);
									
									////console.log(JSON.parse(metaObj.voteRecord))

									if(currentUserVoteStatus === 1)
									{
										alert("You've already up voted this post!");
										return;
									}
									else if(currentUserVoteStatus === 0)
									{
										//console.log("Voter status was 0, incrementing up vote /removing downvote (visually too), changing status to 1");
										//Set voter status to 1
										var voteRecordObj = JSON.parse(metaObj.voteRecord);
										
										voteRecordObj[cllUserId] = "1";

										var newVoteStatusData = JSON.stringify(voteRecordObj);

										metaObj.voteRecord = newVoteStatusData;

										//remove 1 down vote
										metaObj.down_votes-=1;
										//visually remove down vote
										var downVoteElement = document.querySelector('.down_votes_counter[cllId="'+currentLinkItemId+'"]');

										var currentDownVoteValue = parseInt(downVoteElement.textContent);
										currentDownVoteValue-=1;
										downVoteElement.innerHTML = currentDownVoteValue;


										//addUpVote
										metaObj.up_votes+=1;
										//visually add up vote
										var upVoteElement = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemId+'"]');

										var currentUpVoteValue = parseInt(upVoteElement.textContent);
										currentUpVoteValue+=1;
										upVoteElement.innerHTML = currentUpVoteValue;

										var newPostMetaData = JSON.stringify(metaObj);

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												////console.log(request.responseText);
											})
											.catch(function(error){
												////console.log(error);
											});
									}
									else if(currentUserVoteStatus === 3)
									{
										//console.log("Voter status was 3, incrementing up vote (visually too), changing status to 1");
										//Increment up_votes in metaObj
										metaObj.up_votes+=1;
										//visually increment up vote
										var upVoteElement = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemId+'"]');
										var currentUpVoteValue = parseInt(upVoteElement.textContent);
										currentUpVoteValue+=1;
										upVoteElement.innerHTML = currentUpVoteValue;

										//Edit JSONstring metaObj.voteRecord
										var voteRecordObj = JSON.parse(metaObj.voteRecord);
										
										voteRecordObj[cllUserId] = "1";

										var newVoteStatusData = JSON.stringify(voteRecordObj);

										metaObj.voteRecord = newVoteStatusData;

										var newPostMetaData = JSON.stringify(metaObj);

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												////console.log(request.responseText);
											})
											.catch(function(error){
												////console.log(error);
											});
										
									}

								}

							}
							catch(error) {
								//console.log(error);
								//console.log("Could not parse voteRecord");
								//console.log("There is no information on record *assertion");

								metaObj.voteRecord = '{"'+cllUserId+'":'+'"1"}';
								////console.log("add UpVote to post");
								metaObj.up_votes+=1;
								//visually increment upvote
								var upVoteButton = document.querySelector('.up_vote_button[cllId="'+currentLinkItemId+'"]');
								upVoteButton.style.backgroundColor = '#16C60C';

								var upVoteElement = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemId+'"]');
								var currentUpVoteValue = parseInt(upVoteElement.textContent);
								currentUpVoteValue+=1;
								upVoteElement.innerHTML = currentUpVoteValue;

								var newPostMetaData = JSON.stringify(metaObj);

								makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
									.then(function(request){
										////console.log(request.responseText);
									})
									.catch(function(error){
										////console.log(error);
									});
							}
						})
						.catch(function(error){
							//console.log(error);
						});
					}
			})
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
		var requestMsg= prompt("What category would you like to add?");
		if (requestMsg != null || requestMsg != '')
		{

			//console.log(requestMsg);
			
			var NewPendingListItemData = {
				"list_category": requestMsg,
				"list_page_orgin":current_page_id

			}
			//Make request to PHP handler and have it add to backend admin page.
			NewPendingListItemData = "commonUserId=" + JSON.stringify(cllUserId) + "json_string=" + JSON.stringify(NewPendingListItemData);
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/common-user-list-request-handler.php', "POST", NewPendingListItemData)
				.then(function(request){

					//console.log(request.responseText);
				})
				.catch(function(error){

					//console.log(error);
				});
		}
		else
		{
			//console.log("User Canceled");
		}
	});


}




var makeRequest = function (url, method, sendData, refresh) {


	var refreshInput = refresh || '';


	//console.log("request made");
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
					//console.log('sendData was present!');
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
			//console.log(sendData);
			request.send(sendData);
		}

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
								//console.log("Search result below!");
								//console.log(searchResult);
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
						//console.log(error);
					});
				}	
			}, 1000);
		};
		
	}
}

function isUrl(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
        //console.log('returned true');
          return true;
        }
        else
        {
        //console.log('returned false')
          return false;
        }
}

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

function cllAddOnClickToCancelBtn()
{
	var cancelBtnArray = document.querySelectorAll(".cancelBtn");
	cancelBtnArray.forEach(function(cancelBtn)
	{

		if (typeof cancelBtn !== 'undefined')
		{
			cancelBtn.addEventListener("click", function()
			{
				var addToListForm = document.getElementById("addToListForm");
				addToListForm.parentNode.removeChild(addToListForm);
				event.stopPropagation(); //stops addtolistbtn from being clicked
				cllGlobals.isAddToListBtnClicked = false;
			});
		}
		else{
			//console.log('cancelBtn is not defined');
		}
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
    */
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

if(document.querySelector(".cll_search_form_input")){
	//console.log("Search bar exists");
	handleSearchInput();
}
else
{
	//console.log("Search bar doesn't exist");
}
	var allListItemsArray = document.querySelectorAll('.link-list-item');
	setAttributeOfElementsInArray(allListItemsArray, 'cllId');
	createAddToListBtn();
	cllCreateForm();//Calls cllAddOnClickToSubmitBtn(); & cllAddOnClickToCancelBtn <-- this.addNewListItemJS
	displayVotesPerItem();
	createDownVoteBtn();
	createUpVoteBtn();
	createNeutralVoteBtn();
	createNewListRequestBtn();

}
