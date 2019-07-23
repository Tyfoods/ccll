module.exports = (function displayVotesPerItem(setAttributeOfElementsInArray, makeRequest) {


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
});