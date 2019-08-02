module.exports = (function displayDataPerItem(setAttributeOfElementsInArrayIncrementally, makeRequest) {


	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/', 'GET')
		.then(function(request){

			var cllLinkArray = JSON.parse(request.responseText);
			var linkListItemArray = document.querySelectorAll('.link-list--style-1__link-list-item');
			var incrementer = 0;

			//console.log(cllLinkArray);

			cllLinkArray.forEach(function(cllLink){
				linkListItemArray.forEach(function(linkListItem){
					var post_slug = linkListItem.textContent.trim().replace(/\s/g, '-').toLowerCase();
					if(cllLink.slug === post_slug){
						//if(cllLink.meta.link_type !== "internal link"){
							//console.log("external link");
							//console.log(linkListItem);
							var upVotesCounter = document.createElement('p');
							upVotesCounter.setAttribute('class','link-list-item__up-votes-counter');
							upVotesCounter.innerHTML = cllLinkArray[incrementer].meta.up_votes;

							var downVotesCounter = document.createElement('p');
							downVotesCounter.setAttribute('class','link-list-item__down-votes-counter');
							downVotesCounter.innerHTML = cllLinkArray[incrementer].meta.down_votes;

							var currentLinkItemId = linkListItem.getAttribute('cllId');

							var downVoteButton = document.querySelector('.link-list-item__down-vote-button[cllId="'+currentLinkItemId+'"]');
							var upVoteButton = document.querySelector('.link-list-item__up-vote-button[cllId="'+currentLinkItemId+'"]');


							downVoteButton.appendChild(downVotesCounter);
							upVoteButton.appendChild(upVotesCounter);

							//display "submittedByElement";
							var submittedByElement = document.createElement('p');
							submittedByElement.setAttribute('class','link-list-item__submitted-by');

							//console.log(cllLinkArray[incrementer].meta);

							submittedByElement.innerHTML = "Submitted by: "+cllLinkArray[incrementer].meta.submitted_by;

							//console.log(currentLinkItemId);
							//var linkListItem = document.querySelector('.link-list-item[cllId="'+currentLinkItemId+'"]')
							try{
								linkListItem.appendChild(submittedByElement);
							}
							catch(error){
								console.log(error);
							}
						//}
						if(cllLink.meta.link_type === "internal link"){

							var neutralVoteButton = document.querySelector('.link-list-item__neutral-vote-button[cllId="'+currentLinkItemId+'"]');
							submittedByElement.style.display = 'none';
							neutralVoteButton.style.display = 'none';
							downVoteButton.style.display = 'none';
							upVoteButton.style.display = 'none';
							downVotesCounter.style.display = 'none';
							upVotesCounter.style.display = 'none';
						}

					}
				});
				incrementer+=1;
			});
			var downVoteCounterArray = document.querySelectorAll('.link-list-item__down-votes-counter');
			setAttributeOfElementsInArrayIncrementally(downVoteCounterArray, 'cllId');

			var upVoteCounterArray = document.querySelectorAll('.link-list-item__up-votes-counter');
			setAttributeOfElementsInArrayIncrementally(upVoteCounterArray, 'cllId');
		});
});