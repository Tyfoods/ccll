module.exports = function throughLinkRequest(currentAddToListBtn, deps)
{

	const slugify = deps.slugify;
	const makeRequest = deps.makeRequest;
	var multiListPageCategoryIds = "cll_category_ids"+"_"+currentAddToListBtn.getAttribute('cllid');

	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/users/'+cllUserId[0], 'GET')
		.then(function(request){
			var objResponse = JSON.parse(request.responseText);
			//console.log(objResponse.name);
			return objResponse.name;
		})
		.then(function(username){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+slugify(document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value),
						'GET')
				.then(function(request){

					console.log(request);
					if(request.responseText === "[]"){

						console.log("There was no reponseText - Post does not exist");
						
						var NewLinkItemData = {
							"title": document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value,
							"slug": "/"+document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value.replace(/ /g,'-').toLowerCase(),
							"content": '[cll_list]',
							"meta" : {"URL" : cllGlobals.currentProtocalDomain+'/link/'+document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value.replace(/ /g, '-').replace(/%20/g,'-'),
									 "link_type" : "internal link",
									 "submitted_by": username,
									 "mention_record": '{ "0" : "'+window.location.href+'" }'},
							"status": "publish",
							"link_category": [window[multiListPageCategoryIds]]
						}
					
							//create new link post type
							makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(NewLinkItemData))
								.catch(function(error){
									console.log("Failed to create new post");
									console.log(error);
								});
					}
					else{
						alert("Link already exists! We'll add this link to the list");
						let objResponse = JSON.parse(request.responseText);
						console.log(objResponse);
						let linkCategoryArray = objResponse[0].link_category;
						linkCategoryArray.push(window[multiListPageCategoryIds]);

						let currentPageUrl = window.location.href;
						mentionObj = JSON.parse(objResponse[0].meta.mention_record);

						let mentionArray = Object.values(mentionObj);
						let mentionSlugArray = mentionArray.map(function(mention){
							mention = mention.replace(cllGlobals.currentProtocalDomain+'/', '').replace(/link[/]/g, '');
							mention = mention.slice(0, -1);
							return mention;
						});

						let newLinkCategory = (function ()
							{for (mentionSlug of mentionSlugArray){
								if(currentPageUrl !== mentionSlug){
									console.log("This page doesn't yet exist in the record, adding now");
									//change meta here such that mention record contains the new mention
									let mentionObjKeysArray = Object.keys(mentionObj);

									let largestKeyInMentionObj = Math.max(mentionObjKeysArray);

									let metaObj = objResponse[0].meta;

									mentionObj[largestKeyInMentionObj+1] = currentPageUrl;

									metaObj.mention_record = JSON.stringify(mentionObj);

									return {
										"link_category": linkCategoryArray,
										"meta": metaObj
									};
								}
								else{
									console.log("This page exists in the record already, not adding");
									return {
										"link_category": linkCategoryArray
									};
								}
							}})();

						makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', JSON.stringify(newLinkCategory), true)
							.catch(function(error){
								console.log(error);
							});
					}
					
				})
				.catch(function(error){
					console.log(error);
				});
		})
		.catch(function(error){
			console.log(error);
		});
}