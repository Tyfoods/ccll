module.exports = function endLinkRequest(currentAddToListBtn, makeRequest)
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