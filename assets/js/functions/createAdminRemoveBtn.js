module.exports = function createAdminRemoveBtn(makeRequest, isObjEmpty){
	var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');
	var allListItemsAnchorArray = document.querySelectorAll('.link-list-item__link-list-title');
	var deleteBtnIncrementer = 0;


	//append delete buttons to list items
	allListItemsArray.forEach(function(listItem){
		var adminDeleteBtn = document.createElement("button");
		adminDeleteBtn.setAttribute('class','link-list-item__admin-delete-button');

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		adminDeleteBtn.setAttributeNode(cllId);
		adminDeleteBtn.setAttribute('cllid', deleteBtnIncrementer);

		listItem.appendChild(adminDeleteBtn);//append to inner html
		deleteBtnIncrementer +=1;
	});

	var adminDeleteBtnArray = document.querySelectorAll('.link-list-item__admin-delete-button'); 
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