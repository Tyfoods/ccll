module.exports = (function displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest) {


	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/', 'GET')
		.then(function(request){

			var cllLinkArray = JSON.parse(request.responseText);
			var linkListItemArray = document.querySelectorAll('.link-list-item');
			var incrementer = 0;

			//console.log(cllLinkArray);

			cllLinkArray.forEach(function(cllLink){
				linkListItemArray.forEach(function(linkListItem){
					var post_slug = linkListItem.textContent.trim().replace(/\s/g, '-').toLowerCase();
					if(cllLink.slug === post_slug){

						var upVotesCounter = document.createElement('p');
						upVotesCounter.setAttribute('class','up_votes_counter');
						upVotesCounter.innerHTML = cllLinkArray[incrementer].meta.up_votes;

						var downVotesCounter = document.createElement('p');
						downVotesCounter.setAttribute('class','down_votes_counter');
						downVotesCounter.innerHTML = cllLinkArray[incrementer].meta.down_votes;

						var currentLinkItemId = linkListItem.getAttribute('cllId');

						var downVoteButton = document.querySelector('.down_vote_button[cllId="'+currentLinkItemId+'"]');
						var upVoteButton = document.querySelector('.up_vote_button[cllId="'+currentLinkItemId+'"]');


						downVoteButton.appendChild(downVotesCounter);
						upVoteButton.appendChild(upVotesCounter);

						//display "submittedByElement";
						var submittedByElement = document.createElement('p');
						submittedByElement.setAttribute('class','submitted_by');

						//console.log(cllLinkArray[incrementer].meta);

						submittedByElement.innerHTML = "Submitted by: "+cllLinkArray[incrementer].meta.submitted_by;

						//console.log(currentLinkItemId);
						//var linkListItem = document.querySelector('.link-list-item[cllId="'+currentLinkItemId+'"]');
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
			setAttributeOfElementsInArrayIncrementally(downVoteCounterArray, 'cllId');

			var upVoteCounterArray = document.querySelectorAll('.up_votes_counter');
			setAttributeOfElementsInArrayIncrementally(upVoteCounterArray, 'cllId');
		});
});