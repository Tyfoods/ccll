module.exports = function createNeutralVoteBtn(setAttributeOfElementsInArray, makeRequest){
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