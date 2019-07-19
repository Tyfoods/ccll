
window.onload=function()
{

var cllGlobals = {
			add_to_list_btn: document.getElementById("add_to_list_btn"),
			isAddToListBtnClicked: false,
			isSubmitBtnClicked: false,
			isSettingsFormClicked: false,
			currentProtocalDomain: document.location.origin,
			searchEngineRequestSent: false,
			//searchEngineLooping: false,
			currentSearchResultsCollection: document.createElement("div").getElementsByClassName('noClassHere')
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

function replaceOccurrence(string, regex, n, replace) {
	var i = 0; //set up incrementer
	return string.replace(regex, function(match) {
		//i+=1;
		if(i===n){
			//console.log(replace);
			i+=1;
			return replace;
		}
		i+=1;
		//console.log(match);
		return match;
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

						//display "submittedByElement";
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
							console.log(error);
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
								if(isNaN(voteRecordObj)){
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

									var newPostMetaData = JSON.stringify({
										"meta" : metaObj

									});

									makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
										.then(function(request){
											//console.log(request.responseText);
										})
										.catch(function(error){
											console.log(error);
										});
									return;
								}
								else if(voteRecordObj[cllUserId]  !== "") //if current user status is not empty
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

										var newPostMetaData = JSON.stringify({
											"meta" : metaObj
		
										});

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
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
												console.log(error);
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

										var newPostMetaData = JSON.stringify({
											"meta" : metaObj
		
										});

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												//console.log(request.responseText);

												var downVoteElement = document.querySelector('.down_votes_counter[cllId="'+currentLinkItemId+'"]');

												var currentDownVoteValue = parseInt(downVoteElement.innerHTML);
												currentDownVoteValue+=1;
												downVoteElement.innerHTML = currentDownVoteValue;

											})
											.catch(function(error){
												console.log(error);
											});
			

										//console.log("Switch vote status to 1");
										//console.log("Add UpVote to Post");
										
									}

								}

							}
							catch(error) {
								console.log(error);
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

								var newPostMetaData = JSON.stringify({
									"meta" : metaObj

								});

								makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
									.then(function(request){
										//console.log(request.responseText);
									})
									.catch(function(error){
										console.log(error);
									});
								return;
							}
						})
						.catch(function(error){
							console.log(error);
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
								if(isNaN(voteRecordObj[cllUserId])){
									//console.log(error);
									////console.log("Could not parse voteRecord");
									//console.log("There is no information on record *assertion");
									
									//console.log(metaObj.voteRecord);
									//console.log("Change voter status to 3");
									metaObj.voteRecord = '{"'+cllUserId+'":'+'"3"}';

									var newPostMetaData = JSON.stringify({
										"meta" : metaObj

									});

									makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
										.then(function(request){
											//console.log(request.responseText);
										})
										.catch(function(error){
											console.log(error);
										});
									return;
								}
								else if(voteRecordObj[cllUserId] === "1"){
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

								var newPostMetaData = JSON.stringify({
									"meta" : metaObj

								});


								makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
									.then(function(request){
										//console.log(request.responseText);
									})
									.catch(function(error){
										console.log(error);
									});
							}
							catch(error) {
									//console.log(error);
									////console.log("Could not parse voteRecord");
									//console.log("There is no information on record *assertion");
									
									//console.log(metaObj.voteRecord);
									//console.log("Change voter status to 3");
									metaObj.voteRecord = '{"'+cllUserId+'":'+'"3"}';

									var newPostMetaData = JSON.stringify({
										"meta" : metaObj

									});

									makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
										.then(function(request){
											//console.log(request.responseText);
										})
										.catch(function(error){
											console.log(error);
										});
									return;
							}
						})
						.catch(function(error){
							console.log(error);
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
				//console.log(post_slug);
				if(linkListTitle.getAttribute('cllId') === upVoteBtn.getAttribute('cllId')){

					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+post_slug, 'GET')
						.then(function(request){
							var objResponse = JSON.parse(request.responseText);
							var currentLinkItemId = upVoteBtn.getAttribute('cllId');

							var metaObj = objResponse[0].meta;
							
							try {
								var voteRecordObj = JSON.parse(metaObj.voteRecord);
								//console.log(voteRecordObj[cllUserId]);

								if(voteRecordObj[cllUserId]  !== "") //if current user status is not empty
								{
									
									//console.log("There is information on record, here's the information: ");
									//console.log(metaObj.voteRecord);

									var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId]);
									
									//console.log(JSON.parse(metaObj.voteRecord))
									if(!isNaN(currentUserVoteStatus)){
										metaObj.voteRecord = '{"'+cllUserId+'":'+'"1"}';
										//console.log("add UpVote to post");
										metaObj.up_votes+=1;
										//visually increment upvote
		
		
										var upVoteButton = document.querySelector('.up_vote_button[cllId="'+currentLinkItemId+'"]');
										//upVoteButton.style.backgroundColor = '#16C60C';
		
										//console.log(currentLinkItemId);
		
										var upVoteElement = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemId+'"]');
										var currentUpVoteValue = parseInt(upVoteElement.textContent);
										currentUpVoteValue+=1;
										upVoteElement.innerHTML = currentUpVoteValue;
		
										var newPostMetaData = JSON.stringify({
											"meta" : metaObj
		
										});
		
										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												//console.log(request.responseText);
											})
											.catch(function(error){
												console.log(error);
											});
										return;
									}
									else if(currentUserVoteStatus === 1)
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

										var newPostMetaData = JSON.stringify({
											"meta" : metaObj
		
										});

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												//console.log(request.responseText);
											})
											.catch(function(error){
												console.log(error);
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

										var newPostMetaData = JSON.stringify({
											"meta" : metaObj
		
										});

										makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
											.then(function(request){
												//console.log(request.responseText);
											})
											.catch(function(error){
												console.log(error);
											});
										
									}

								}

							}
							catch(error) {
								//console.log(error);
								//console.log("Could not parse voteRecord");
								//console.log("There is no information on record *assertion");

								metaObj.voteRecord = '{"'+cllUserId+'":'+'"1"}';
								//console.log("add UpVote to post");
								metaObj.up_votes+=1;
								//visually increment upvote


								var upVoteButton = document.querySelector('.up_vote_button[cllId="'+currentLinkItemId+'"]');
								//upVoteButton.style.backgroundColor = '#16C60C';

								//console.log(currentLinkItemId);

								var upVoteElement = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemId+'"]');
								var currentUpVoteValue = parseInt(upVoteElement.textContent);
								currentUpVoteValue+=1;
								upVoteElement.innerHTML = currentUpVoteValue;

								var newPostMetaData = JSON.stringify({
									"meta" : metaObj

								});

								makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
									.then(function(request){
										//console.log(request.responseText);
									})
									.catch(function(error){
										//console.log(error);
									});
								return;
							}
						})
						.catch(function(error){
							console.log(error);
						});
					}
			})
		});
	});
}

/* Deprecated, using JS to create listTitles, now done in PHP.
function createListTitles(){
	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
		.then(function (request) {
	
			var response = request.responseText;
			var rawResponse = response.split('{"id":'+current_page_id).pop();
			var jsonResponse = '{"id":'+current_page_id+rawResponse;
			var objResponse = JSON.parse(jsonResponse);

			const cllListRegex = /\[cll_list\s?(.*?)\]/g;
			const cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);
	
			console.log(cllListShortCodeArray);

			var cllListCategoryArray = [];
			cllListShortCodeArray.forEach(function(cllListShortCode){
				console.log(cllListShortCode);
				var categoryRegex = /category_name\s?=\s?"(.*?)"/g;
				var categoryKeySelectorRegex = /category_name\s?=\s?/g;
				var extractedCategory = cllListShortCode.match(categoryRegex);

				if(extractedCategory != null || extractedCategory === '')
				{
					cllListCategoryArray.push(extractedCategory[0].replace(categoryKeySelectorRegex, '').replace(/\"/g,''));
					console.log("Extracted category exists and is not empty!");
				}
				else{
					cllListCategoryArray.push("Uncategorized");
				}

			});
			console.log(cllListCategoryArray);

			var cllLinkListArray = document.querySelectorAll('.cll_link_list');

			var catInc = 0;

			cllLinkListArray.forEach(function(cllLinkList){
				var listTitleElement = document.createElement('h4');
				listTitleElement.setAttribute('class','list_title');
				listTitleElement.innerHTML = cllListCategoryArray[catInc];

				cllLinkList.insertBefore(listTitleElement, cllLinkList.firstChild);
				catInc+=1;
			});


		})
		.catch(function(error){
			console.log(error);
		});
}
*/

function setAttributeOfElementsInArray(array, attribute_name){
	var incrementer = 0;

	array.forEach(function(item){
		var attribute = document.createAttribute(attribute_name);
		item.setAttributeNode(attribute);
		item.setAttribute(attribute_name, incrementer);
		incrementer+=1;
	});
}



function createDeleteListBtn(){

	var cllLinkListArray = document.querySelectorAll('.cll_link_list');
	//console.log(cllLinkListArray);

	cllLinkListArray.forEach(function(cllLinkList)
	{
		var deleteListBtn = document.createElement("button");
		deleteListBtn.setAttribute('class', 'delete_list_btn')
		deleteListBtn.innerHTML = "Delete List";
		cllLinkList.insertBefore(deleteListBtn, cllLinkList.firstChild);
	});

	
	var listArray = document.querySelectorAll('.cll_link_list');
	var deleteListBtnCollection = document.querySelectorAll(".delete_list_btn");

	setAttributeOfElementsInArray(deleteListBtnCollection, 'cllId');
	setAttributeOfElementsInArray(listArray, 'cllId');


	deleteListBtnCollection.forEach(function(deleteListBtn){
		deleteListBtn.addEventListener("click", function(){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
				.then(function (request) {
		
					var response = request.responseText;
					var rawResponse = response.split('{"id":'+current_page_id).pop();
					var jsonResponse = '{"id":'+current_page_id+rawResponse;
					var objResponse = JSON.parse(jsonResponse);

					const cllListRegex = /\[cll_list\s?(.*?)\]/g;
					const cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);
		
		
					//console.log(cllListShortCodeArray);
					//console.log(cllListShortCodeArray[deleteListBtn.getAttribute('cllId')]);

					//console.log(objResponse.content.raw);
					var newPageContent = objResponse.content.raw.replace(cllListShortCodeArray[deleteListBtn.getAttribute('cllId')], '');
					//console.log(newPageContent);

					var newPageData = {
						"content": newPageContent
					}

					//Delete the appropriate list from the front end.
					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData), true);

					//Delete list from front end visually
					listArray.forEach(function(listToRemove){
						if(listToRemove.getAttribute('cllId') === deleteListBtn.getAttribute('cllId'))
						{
							listToRemove.parentNode.removeChild(listToRemove);
							while (listToRemove.firstChild) {
								listToRemove.removeChild(listToRemove.firstChild);
							}
						}
					});



					return;
				});
		});
	});
	
}


function createNewListBtn(){
	var newListBtn = document.createElement('button');
	newListBtn.setAttribute("class", "newListBtn");
	newListBtn.innerHTML = "Add New List +";

	/*
	// Debugging script
	var testElement = document.createElement('button');
	testElement.setAttribute('type', 'button');
	
	testElement.addEventListener('click', function(event){
		event.preventDefault();
		//working one
		makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-link-category/v1/cll-link/'+"Flower Sticks", 'POST')
			.then(function(request){
				console.log(request.responseText);

			});
	
		
	});
	cll_link_list.parentElement.insertBefore(testElement, cll_link_list.parentElement.firstChild);
	*/

	

	var cll_link_list = document.querySelector('.cll_link_list');
	//entryContent.parentNode.insertBefore(newListBtn, entryContent);
	cll_link_list.parentElement.insertBefore(newListBtn, cll_link_list.parentElement.firstChild);
	//entryContent.appendChild(newListBtn);



	newListBtn.addEventListener("click", function(){
		if (confirm("Are you sure you would like to add a new list?")) {
			//console.log("You pressed YES!");
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
				.then(function(request){
					var rawResponse = request.responseText.split('{"id":'+current_page_id).pop();
					var jsonResponse = '{"id":'+current_page_id+rawResponse;
					var objResponse = JSON.parse(jsonResponse);

					var NewShortCodeData = {
						"content": objResponse.content.raw+' [cll_list]'
					}
					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(NewShortCodeData), true)
						.then(function(){
							//console.log("Successfully updated page!");
						})
						.catch(function(){
							//console.log("Unsuccesful page update!");
						});
				})
				.catch(function(error){
					console.log(error);
					//console.log("Unable to get page with given ID");
				});

		  } else {
			//console.log("You pressed NO");
		  }
	});


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
						//console.log("Adding Loading Element");
						cllSuggestions.appendChild(loadingElement);
					}

			}());

			//Process searchEngine Input after one second
			searchEngineTimeout = setTimeout( function () {

				clearTimeout(searchEngineTimeout);

				//If the input is nothing then clear search results
				if(cllSearchFormInput.value === ' ' || cllSearchFormInput.value === '')
				{
					//console.log("No value was entered");
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
						console.log(error);
					});
				}	
			}, 1000);
		};
		
	}
}


function isObjEmpty(obj)
{
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
		{
	        return false;
		}
	}
    return true;
}

function createAdminRemoveBtn(){
	var allListItemsArray = document.querySelectorAll('.link-list-item');
	var allListItemsAnchorArray = document.querySelectorAll('.link-list-title');

	var deleteBtnIncrementer = 0;


	//append delete buttons to list items
	allListItemsArray.forEach(function(listItem){
		var adminDeleteBtn = document.createElement("button");
		adminDeleteBtn.setAttribute('class','adminDeleteBtn');

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		adminDeleteBtn.setAttributeNode(cllId);
		adminDeleteBtn.setAttribute('cllid', deleteBtnIncrementer);

		listItem.appendChild(adminDeleteBtn);//append to inner html
		deleteBtnIncrementer +=1;
	});

	var adminDeleteBtnArray = document.querySelectorAll('.adminDeleteBtn'); 
	adminDeleteBtnArray.forEach(function(adminDeleteBtn){
		adminDeleteBtn.addEventListener("click", function(){
			allListItemsAnchorArray.forEach(function(listItem){
				if(listItem.getAttribute('cllid') === adminDeleteBtn.getAttribute('cllid'))
				{

					//console.log(listItem.textContent.trim().replace(/ /g, '-').toLowerCase());
					var listItemSlug = listItem.textContent.trim().replace(/\s/g, '-').toLowerCase();
					//console.log(listItemSlug);
					//console.log(listItem.innerHTML);

					//deletePage if it exists
					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages?slug='+listItemSlug, "GET")
						.then(function(request){

							var objResponse = JSON.parse(request.responseText);
							//console.log(objResponse);
							//console.log(objResponse[0].id);

							//get ID

							if(isObjEmpty(objResponse) === true){
								//console.log("A page with a slug of that type was unable to be found. (Response was empty)");
								
								
							}
							else
							{
								//console.log(objResponse[0].id);
								//console.log("Response was not empty");
								//console.log("deleting the associated page");
								makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+objResponse[0].id, "DELETE")
									.then(function(){
										//console.log("Successfully deleted page!");
									})
									.catch(function(error){
										//console.log("Failed to delete page");
										console.log(error);
									});
							}
						})
						.catch(function(error){
							//console.log("Unable to get page information about list item");
							console.log(error);
						});

						//Delete post if it exists
						makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+listItemSlug, 'GET')
							.then(function(request){
								var objResponse = JSON.parse(request.responseText);
								//console.log(objResponse);

								if(isObjEmpty(objResponse) === true){
									//console.log("A post with a slug of that type was unable to be found. (Response was empty)");
									
									
								}
								else
								{
									//console.log(objResponse[0].id);
									//console.log("Response was not empty");
									//console.log("deleting the associated post");
									makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'DELETE')
										.then(function(){
											//console.log("Successfully deleted post!");
										})
										.catch(function(error){
											//console.log("Failed to delete post");
											console.log(error);
										});
								}
							})
							.catch(function(error){
								//console.log("unable to get post information about list item");
								console.log(error);
							});
							allListItemsArray.forEach(function(listItemToRemove){
								if(listItemToRemove.getAttribute('cllId') === adminDeleteBtn.getAttribute('cllId'))
								{
									listItemToRemove.parentNode.removeChild(listItemToRemove);
									while (listItemToRemove.firstChild) {
										listItemToRemove.removeChild(listItemToRemove.firstChild);
									}
								}
							});
				}
				else{
					//console.log("No match was found!");
				}
			});

		});

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
			//console.log("Data is undefined! No data was sent");
		}
		else{
			//console.log(sendData);
			request.send(sendData);
		}

	});
};


/*
function addNewListItemJS(jsDataArray){

	var newListItemTitle = jsDataArray.newListItemTitle;
	var currentAddToListBtn = jsDataArray.currentAddToListBtn;

  	var li = document.createElement("li");
  	li.innerHTML = newListItemTitle;

 	currentAddToListBtn.parentNode.insertBefore(li, currentAddToListBtn);

 
}
*/

function cllCreateForm()
{
	var i = 0;
	var add_to_list_btn_array = document.querySelectorAll(".add_to_list_btn");


	add_to_list_btn_array.forEach(function(add_to_list_btn)
	{

		var cllId = document.createAttribute("cllId");   
		add_to_list_btn.setAttributeNode(cllId);
		add_to_list_btn.setAttribute('cllid',[i]);


		i+=1;


		add_to_list_btn.addEventListener("click", function()
		{//if button has not been clicked, create form
			if(cllGlobals.isAddToListBtnClicked === false)
			{

				//console.log("form created");
				var f = document.createElement("form");
				f.setAttribute('id','addToListForm');

				var linktitle = document.createElement("input");
				linktitle.setAttribute('type',"text");
				linktitle.setAttribute('name',"newListItemTitle");
				linktitle.setAttribute('placeholder',"Link title here");
				linktitle.setAttribute("class", "add_to_list_input");

				var link = document.createElement("input");
				link.setAttribute('type',"text");
				link.setAttribute('name',"newListItemUrl");
				link.setAttribute('placeholder',"URL here");
				link.setAttribute("class", "add_to_list_input");

				var dropDownBox = document.createElement("select");
				dropDownBox.setAttribute('id','linkTypeSelecter');

				var dropDownBoxPlaceHolder = document.createElement("option");
				dropDownBoxPlaceHolder.innerHTML = "Link Type";
				dropDownBoxPlaceHolder.value = '';
				dropDownBoxPlaceHolder.disabled = true;
				dropDownBoxPlaceHolder.selected = true;
				dropDownBoxPlaceHolder.hidden = true;
				//dropDownBoxPlaceHolder.required = true;

				var endLinkOption = document.createElement("option");
				endLinkOption.innerHTML = "External Link";
				//endLinkOption.setAttribute('name',"Link Type");

				var throughLinkOption = document.createElement("option");
				throughLinkOption.innerHTML = "Internal Link";
				//throughLinkOption.setAttribute('name',"Link Type");

				dropDownBox.appendChild(endLinkOption);
				dropDownBox.appendChild(throughLinkOption);
				dropDownBox.appendChild(dropDownBoxPlaceHolder);

				var b = document.createElement("button");
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
				f.appendChild(dropDownBox);
				f.appendChild(b);
				f.appendChild(cancelBtn);


				add_to_list_btn.appendChild(f);

				cllGlobals.isAddToListBtnClicked = true;
				cllAddOnClickToSubmitBtn(add_to_list_btn);
				cllAddOnClickToCancelBtn();

				//change form depending on link type selected

				//var box = document.getElementById("linkTypeSelecter");

				dropDownBox.addEventListener('change', function(){

					var x = document.getElementById("linkTypeSelecter").selectedIndex;
					var linkType = document.getElementsByTagName("option")[x].value;

					if(linkType.toLowerCase() === 'internal link')
					{
						link.parentNode.removeChild(link);
					}
					else if(linkType.toLowerCase() === 'external link')
					{
						linktitle.parentNode.insertBefore(link, linktitle.nextSibling);
						//f.appendChild(link);
					}
				});

			}
		});
	});
}

function addClickToSettingsCancelBtn()
{
	var cancelBtnArray = document.querySelectorAll(".cancelBtn");
	cancelBtnArray.forEach(function(cancelBtn)
	{

		if (typeof cancelBtn !== 'undefined')
		{
			cancelBtn.addEventListener("click", function()
			{

				var dropDownBox = document.querySelector(".listCategorySelector");
				var settingsSubmitBtn = document.querySelector(".settingsSubmitBtn");

				//var editCategoryBtnArray = document.querySelectorAll('.cll_edit_category_btn');

				var newCategoryInput = document.querySelector("input[name='newCategoryRequestElement']");
								
				dropDownBox.parentNode.removeChild(dropDownBox);
				settingsSubmitBtn.parentNode.removeChild(settingsSubmitBtn);
				cancelBtn.parentNode.removeChild(cancelBtn);
				if(newCategoryInput){
					newCategoryInput.parentNode.removeChild(newCategoryInput);
				}
				

				event.stopPropagation(); //prevent parent element from being clicked
				cllGlobals.isSettingsFormClicked = false;
			});
		}
		else
		{
			//console.log('settings cancelBtn is not defined');
		}
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
				event.stopPropagation(); //prevent parent element from being clicked
				cllGlobals.isAddToListBtnClicked = false;
			});
		}
		else
		{
			//console.log('cancelBtn is not defined');
		}
	});
}

function cllAddOnClickToSubmitBtn(currentAddToListBtn){


	var submitBtn = document.querySelector('button.submitBtn');


	if (typeof submitBtn !== 'undefined')
	{
		//console.log("Submit Button Existance Verified");
		submitBtn.addEventListener("click", function()
		{
			var x = document.getElementById("linkTypeSelecter").selectedIndex;
			var linkType = document.getElementsByTagName("option")[x].value;

			//console.log(document.querySelector('[name="newListItemUrl"].add_to_list_input'));

			if(document.querySelector('[name="newListItemTitle"].add_to_list_input').value === ''){
				alert("You must submit a title!");
			}
			else if(linkType.toLowerCase() === 'external link')
			{
				if(document.querySelector('[name="newListItemUrl"].add_to_list_input').value === ''){
					alert("You must submit a URL!");
				}
				else if(!isUrl(document.querySelector('[name="newListItemUrl"].add_to_list_input').value))
				{
					alert("Please enter a valid URL!");
				}
				else
				{
					endLinkRequest(currentAddToListBtn);
				}
			}
			else if(linkType.toLowerCase() === 'internal link')
			{
				throughLinkRequest(currentAddToListBtn);
			}
			else if(linkType.toLowerCase() !== 'internal link' && linkType.toLowerCase() !== 'external link')
			{
				alert("You must select a Link Type!");
			}
		});
	return;
	}
}

function throughLinkRequest(currentAddToListBtn)
{

	var NewLinkPageData = {
		"title": document.querySelector('[name="newListItemTitle"].add_to_list_input').value,
		"slug": "/"+document.querySelector('[name="newListItemTitle"].add_to_list_input').value.replace(/ /g,'-').toLowerCase(),
		"content": '[cll_list]',
		"type": "page",
		"status": "publish"
	}
	//Create new link page with user entered URL + information about how to make page

		//createLinkPage
		makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages', 'POST', JSON.stringify(NewLinkPageData))
			.then(function(){
				//console.log("Success, new page created!");
				//document.location.reload(true);
			});


	var multiListPageCategoryIds = "cll_category_ids"+"_"+currentAddToListBtn.getAttribute('cllid');

	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/users/'+cllUserId, 'GET')
		.then(function(request){
			var objResponse = JSON.parse(request.responseText);
			//console.log(objResponse.name);
			return objResponse.name;
		})
		.then(function(username){
			var NewLinkItemData = {
				"title": document.querySelector('[name="newListItemTitle"].add_to_list_input').value,
				"slug": "/"+document.querySelector('[name="newListItemTitle"].add_to_list_input').value.replace(/ /g,'-').toLowerCase(),
				"meta" : {"URL" : cllGlobals.currentProtocalDomain+'/'+document.querySelector('[name="newListItemTitle"].add_to_list_input').value.replace(/ /g, '-').replace(/%20/g,'-'), "link_type" : "internal link", "submitted_by": username },
				"status": "publish",
				"link_category": [window[multiListPageCategoryIds]]
			}
		
				//create new link post type
				makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(NewLinkItemData), true)
					.then(function(){
						//console.log("Success, new post created");
						//document.location.reload(true);
					});
		})
		.catch(function(error){
			console.log(error);
		});




	var newListItemTitle = document.querySelector('[name="newListItemTitle"].add_to_list_input').value
	//event.stopPropagation();
	var jsDataArray = {"newListItemTitle":newListItemTitle,
						"currentAddToListBtn":currentAddToListBtn}
	//addNewListItemJS(jsDataArray);
}


function endLinkRequest(currentAddToListBtn)
{


	var multiListPageCategoryIds = "cll_category_ids"+"_"+currentAddToListBtn.getAttribute('cllid');


	//console.log(window[multiListPageCategoryIds]);
		
	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/users/'+cllUserId, 'GET')
		.then(function(request){
			var objResponse = JSON.parse(request.responseText);
			//console.log(objResponse.name);
			return objResponse.name;
		})
		.then(function(username){

			var NewLinkItemData = {
				"title": document.querySelector('[name="newListItemTitle"].add_to_list_input').value,
				"slug": "/"+document.querySelector('[name="newListItemTitle"].add_to_list_input').value.replace(/ /g,'-').toLowerCase(),
				"meta" : {"URL" : document.querySelector('[name="newListItemUrl"].add_to_list_input').value.replace(/ /g, '-').replace(/%20/g,'-'), "link_type" : "external link", "submitted_by": username },
				"status": "publish",
				"link_category": [window[multiListPageCategoryIds]]
			}

			//console.log(NewLinkItemData);
		
				//create new link post type
				makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(NewLinkItemData), true)
					.then(function(request){
						//console.log(request.responseText);
						//console.log("Success, new post created");
						//document.location.reload(true);
					});
		})
		.catch(function(error){
			console.log(error);
		});
	alert("Thank you for submitting!");


	var newListItemTitle = document.querySelector('[name="newListItemTitle"].add_to_list_input').value
	//event.stopPropagation();
	var jsDataArray = {
			"newListItemTitle":newListItemTitle,
			"currentAddToListBtn":currentAddToListBtn
	}
	//addNewListItemJS(jsDataArray);


}


//Function for updating shortcode of current page
function updateCllListRequest(cllRequestData)
{
	var selectedCategory = cllRequestData['selectedCategory'];
	var currentCllId = parseInt(cllRequestData['currentCllId']);

	//console.log(selectedCategory);
	//console.log(currentCllId);

	

	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
		.then(function (request) {

			var response = request.responseText;
			var rawResponse = response.split('{"id":'+current_page_id).pop();
			var jsonResponse = '{"id":'+current_page_id+rawResponse;
			var objResponse = JSON.parse(jsonResponse);

			
			const cllListRegex = /\[cll_list]?\s?/g;
			const cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);


			console.log(cllListShortCodeArray);
			var currentShortCode = cllListShortCodeArray[currentCllId].toString().toLowerCase();


			var plainCllListRegex = /\[cll_list]?(\s+)?]/g;
			console.log(typeof currentShortCode);

			console.log(currentShortCode.match(plainCllListRegex));



			//strreplace on this -> = cllListShortCodeArray[currentClassName]
			//console.log("WIN");
			
			var plainShortCodeArray = currentShortCode.match(plainCllListRegex)
			if(plainShortCodeArray !== null)
			{

				//else{
					const cllReplacementRegex = /\[cll_list]?\s?\]?/g;
					var pageContent = objResponse.content.raw;


					//replace ONLY the correctly numbered short code using INDEX
					var newPageContent = replaceOccurrence(pageContent, cllReplacementRegex, parseInt(currentCllId), '[cll_list category_name="'+selectedCategory+'"]');
					//var newPageContent = pageContent.replace(cllReplacementRegex,'[cll_list category_name="'+selectedCategory+'"]');


					console.log("selected category is: "+selectedCategory);
					console.log(pageContent);
					console.log(newPageContent);
						
					var NewShortCodeData = {
						"content": newPageContent

					}
				//}
				return NewShortCodeData;
			}
			else
			{
				console.log("Short Code with New Category FOUND!");

				const cllPopulatedReplacementRegex = /category_name\s?=\s?"(.*?)"/g;
				var pageContent = objResponse.content.raw;

				//replace ONLY the correctly numbered short code using INDEX
				var newPageContent = replaceOccurrence(pageContent, cllPopulatedReplacementRegex, parseInt(currentCllId), 'category_name="'+selectedCategory+'"');
						
				var NewShortCodeData = {
					"content": newPageContent

				}
				return NewShortCodeData;
			}
		})
		.then(function (newShortCodeData) {
			//console.log("WIN NUMBER TWO");
			//console.log(newShortCodeData);
			return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newShortCodeData), false);
		})
		.catch(function (error){
			//console.log("FAILED");
			console.log(error);
		});
}


function createNewCategoryRequest(newCategoryValue)
{

	var NewCategoryData = {
		"name": newCategoryValue,
		"slug": newCategoryValue.replace(" ","-")
	}

	//console.log("Submit Button was clicked, now I'll post");
	
	
	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-link-category/v1/cll-link/'+NewCategoryData.name, 'POST')
		.then(function(request){
			//console.log("Request for new category has been made successfully");
			console.log(request.responseText);
		})
		.catch(function(error){
			//console.log("Failed to make the new category request");
			console.log(error);
		});


}

//Function for creating on-click functionality and information to UPDATE page
function addClickToSettingsSubmitBtn(cllSettingsForm)
{
	var settingsSubmitBtnArray = document.querySelectorAll('.settingsSubmitBtn');
	settingsSubmitBtnArray.forEach(function(settingsSubmitBtn)
	{
		if (typeof settingsSubmitBtn !== 'undefined')
		{

			//console.log("Settings Submit Button Existance Verified");

			var isCategoryInputCreated = false;

			settingsSubmitBtn.addEventListener("click", function(event)
			{
				event.preventDefault();
				var x = document.querySelector(".listCategorySelector").selectedIndex;
				var selectedCategory = document.getElementsByTagName("option")[x].value;

				if(selectedCategory === 'new category')
				{
					if(isCategoryInputCreated === false)
					{
					alert('You are making a New Category Request!');
					var newCategoryRequestElement = document.createElement("input"); //input element, text
					newCategoryRequestElement.setAttribute('type',"text");
					newCategoryRequestElement.setAttribute('name',"newCategoryRequestElement");
					newCategoryRequestElement.setAttribute('placeholder',"New category here");

					cllSettingsForm.appendChild(newCategoryRequestElement);

					isCategoryInputCreated = true;
					}

					else if(isCategoryInputCreated === true)
					{
						var newCategoryValue = document.querySelector('[name="newCategoryRequestElement"]').value
						//console.log(newCategoryValue);
						createNewCategoryRequest(newCategoryValue.toLowerCase());
						//create new category with this value and change page to this category
						updateCllListRequest(newCategoryValue);
					}
				}
				else
				{
					for (var {} of existing_category_names_array) {
						if(selectedCategory === '')
						{
							alert("You must select a link category!");
							break;
						}
						else if(selectedCategory !== '')
						{
							//console.log("Successfully adding "+selectedCategory);
							//HTTP Request to update page FUNCTION
							var cllRequestData = {
								"selectedCategory":selectedCategory,
								"currentCllId":cllSettingsForm.getAttribute('cllid')
							}
							updateCllListRequest(cllRequestData);
							break;
						}
					}
				}
			});
		}
	});
}

function cllCreateSettingsForm()
{
	var settingsFormInc = 0;

	//createElementandAppendIt
	var cllLinkListArray = document.querySelectorAll('.cll_link_list');

	cllLinkListArray.forEach(function(cllLinkList)
	{
		var cllSettingsBtn = document.createElement("button");
		cllSettingsBtn.setAttribute('class', 'cll_edit_category_btn');
		cllSettingsBtn.innerHTML = "Edit Category"
		cllLinkList.insertBefore(cllSettingsBtn, cllLinkList.firstChild);
	});

	var cllSettingsFormArray = document.querySelectorAll(".cll_edit_category_btn");

	cllSettingsFormArray.forEach(function(cllSettingsForm)
	{
		var cllid = document.createAttribute('cllid');
		cllSettingsForm.setAttributeNode(cllid);
		cllSettingsForm.setAttribute('cllid',settingsFormInc);

		settingsFormInc+=1;
	});
	

	cllSettingsFormArray.forEach(function(cllSettingsForm)
	{


		cllSettingsForm.addEventListener("click", function()
		{
			if(cllGlobals.isSettingsFormClicked === false)
			{
				var dropDownBox = document.createElement("select"); //input element, text
				dropDownBox.setAttribute('class','listCategorySelector');

				var dropDownBoxPlaceHolder = document.createElement("option"); //input element, text
				dropDownBoxPlaceHolder.innerHTML = "List Category";
				dropDownBoxPlaceHolder.value = '';
				dropDownBoxPlaceHolder.disabled = true;
				dropDownBoxPlaceHolder.selected = true;
				dropDownBoxPlaceHolder.hidden = true;

				var addNewCategory = document.createElement("option"); //input element, text
				addNewCategory.innerHTML = "New Category + ";
				addNewCategory.value = 'new category';

				dropDownBox.appendChild(addNewCategory);

				var b = document.createElement("button"); //button element, b button
				b.setAttribute('name',"settingsSubmitBtn");
				b.setAttribute('type', 'button');
				b.setAttribute('class','settingsSubmitBtn');
				b.innerHTML = 'Submit';

				var cancelBtn = document.createElement("button");
				cancelBtn.setAttribute('name',"cancelBtn");
				cancelBtn.setAttribute('type', 'button');
				cancelBtn.setAttribute('class','cancelBtn');


				existing_category_names_array.forEach(function(existing_category_name){
					var existing_category_option = document.createElement("option");
					existing_category_option.innerHTML = existing_category_name;

					dropDownBox.appendChild(existing_category_option);
				});


				cllSettingsForm.appendChild(dropDownBox);
				cllSettingsForm.appendChild(b);
				cllSettingsForm.appendChild(cancelBtn);


				//console.log("Create Settings Form has Run");
				cllGlobals.isSettingsFormClicked = true;

				addClickToSettingsSubmitBtn(cllSettingsForm);
				addClickToSettingsCancelBtn();
			}

		});
	});
}


	if(document.querySelector(".cll_search_form_input")){
		//console.log("Search bar exists");
		handleSearchInput();
	}
	else
	{
		////console.log("Search bar doesn't exist");
	}


	//cllRoot.parentElement.firstChild = cllRoot;

	//createListTitles(); deprecated

	var allListItemsArray = document.querySelectorAll('.link-list-item');
	setAttributeOfElementsInArray(allListItemsArray, 'cllId');

	createAddToListBtn();
	displayVotesPerItem();
	createDownVoteBtn();
	createUpVoteBtn();
	createNeutralVoteBtn();
	createDeleteListBtn();
	createNewListBtn();
	cllCreateForm();//Calls cllAddOnClickToSubmitBtn(); & cllAddOnClickToCancelBtn <-- this.addNewListItemJS
	cllCreateSettingsForm();
	createAdminRemoveBtn();

}
