module.exports = function throughLinkRequest(currentAddToListBtn, deps)
{

	const makeRequest = deps.makeRequest;
	
	var NewLinkPageData = {
		"title": document.querySelector('[name="newListItemTitle"].add_to_list_input').value,
		"slug": "/"+document.querySelector('[name="newListItemTitle"].add_to_list_input').value.replace(/ /g,'-').toLowerCase(),
		"content": '[cll_list]',
		"type": "page",
		"status": "publish"
	}
	//Create new link page with user entered URL + information about how to make page

		//createLinkPage
		if(cllIsAdmin[0] === "true"){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages', 'POST', JSON.stringify(NewLinkPageData))
				.then(function(){
					//console.log("Success, new page created!");
					//document.location.reload(true);
				})
				.catch(function(error){
					console.log(error);
				});
		}
		else{
			var NewLinkPageData_non_admin = {
				"post_title": NewLinkPageData.title,
				"post_content": NewLinkPageData.content,
				"post_type": "page",
				"post_status": "publish"
			}
			//custom end point request
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-link/v1/create-page/','POST', JSON.stringify(NewLinkPageData_non_admin))
			.then(function(request){
				console.log(request.responseText);
				console.log(JSON.parse(request.responseText));
			})
			.catch(function(error){
				console.log(error);
			});
		}


	var multiListPageCategoryIds = "cll_category_ids"+"_"+currentAddToListBtn.getAttribute('cllid');

	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/users/'+cllUserId[0], 'GET')
		.then(function(request){
			var objResponse = JSON.parse(request.responseText);
			//console.log(objResponse.name);
			return objResponse.name;
		})
		.then(function(username){
			var NewLinkItemData = {
				"title": document.querySelector('[name="newListItemTitle"].add_to_list_input').value,
				"slug": "/"+document.querySelector('[name="newListItemTitle"].add_to_list_input').value.replace(/ /g,'-').toLowerCase(),
				"meta" : {"URL" : cllGlobals.currentProtocalDomain+'/'+document.querySelector('[name="newListItemTitle"].add_to_list_input').value.replace(/ /g, '-').replace(/%20/g,'-'), "link_type" : "internal link", "submitted_by": username },
				"status": "publish",
				"link_category": [window[multiListPageCategoryIds]]
			}
		
				//create new link post type
				makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(NewLinkItemData), true)
					.then(function(){
						//console.log("Success, new post created");
						//document.location.reload(true);
					});
		})
		.catch(function(error){
			console.log(error);
		});




	var newListItemTitle = document.querySelector('[name="newListItemTitle"].add_to_list_input').value
	//event.stopPropagation();
	var jsDataArray = {"newListItemTitle":newListItemTitle,
						"currentAddToListBtn":currentAddToListBtn}
	//addNewListItemJS(jsDataArray);
}