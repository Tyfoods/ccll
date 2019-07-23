module.exports = function createUpVoteBtn(setAttributeOfElementsInArray, makeRequest){
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