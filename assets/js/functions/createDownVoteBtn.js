module.exports = function createDownVoteBtn(setAttributeOfElementsInArray, makeRequest){
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