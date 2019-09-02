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
								if(objResponse[0].link_category.length > 1){
									console.log("removing category");	
									let linkCategoryArray = objResponse[0].link_category;

									//getArray of every Div
									//iterate through every div children
									//see if child textContent matches "objResponse[0].title"
									//if so then getAttribute("cllid"); of div
									//use it as below.
									let cllLinkId = (function(){
										let cllListDivArray = document.querySelectorAll('.cll-link-list');
										
										for(cllListDiv of cllListDivArray){

											for (cllListDivChild of cllListDiv.children){
												if(cllListDivChild.tagName === 'UL'){

													for (cllListUlChild of cllListDivChild.children){
														if(cllListUlChild.tagName === 'LI'){

															for (cllListItemChild of cllListUlChild.children){
																if(cllListItemChild.tagName === 'A'){
																	if(cllListItemChild.textContent.trim() === objResponse[0].title.rendered){
																		console.log(cllListDiv);
																		var cllLinkId = cllListDiv.getAttribute("cllid");
																		return cllLinkId;
																	}
																}
															}
														}
													}
												}
											}
										}
									}());
									console.log(window["cll_category_names_"+cllLinkId]);

									for (let i=0; i < linkCategoryArray.length; i++){
										makeRequest(cllGlobals.currentProtocalDomain+"/wp-json/cll-link-category/v1/cll-link/"+linkCategoryArray[i], 'GET')
											.then(function(request){
												console.log(request);

												if(JSON.parse(request.responseText).name === window["cll_category_names_"+cllLinkId]){
													console.log(linkCategoryArray);
													linkCategoryArray.splice(i, 1);
													console.log(linkCategoryArray);

													let newLinkCategory = {
														"link_category": linkCategoryArray
													};
													makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', JSON.stringify(newLinkCategory))
														.then(function(request){
															console.log(request);
															console.log("Succesfully removed category");
														})
														.catch(function(error){
															console.log(error);
															console.log("Unable to remove category");
														});
												}

											});
										

									}
			
								}
								else{
									console.log("Post only had one category, deleting post");
									
									makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'DELETE')
										.then(function(){
											//console.log("Successfully deleted post!");
										})
										.catch(function(error){
											//console.log("Failed to delete post");
											console.log(error);
										});
								}
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
						})
						.catch(function(error){
							//console.log("unable to get post information about list item");
							console.log(error);
						});
				}
				else{
					//console.log("No match was found!");
				}
			});

		});

	});

}