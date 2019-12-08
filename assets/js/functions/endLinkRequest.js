import slugify from '../functions/slugify'
import makeRequest from '../functions/makeRequest'
import isObjEmpty from '../functions/isObjEmpty'

async function endLinkRequest(categoryId, style){

	let userInputedTitle = document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input--style-'+style).value;
	let wpSlug = await slugify(userInputedTitle);
		
	makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/users/'+ccllUserId[0], 'GET')
		.then(function(request){
			var objResponse = JSON.parse(request.responseText);
			////console.log(objResponse.name);
	
			return objResponse.name;
		})
		.then(function(username){

			/*
			Is there a way to determine if two URLs are pointing to the same resource reliably? 
			if so, we can allow only one instance of that resource to be represented our library.
			
			For now I'll just check if the URLs are exactly the same.
			*/

			makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/', 'GET')
			.then( function(request){
					let doesPostExist = false;
					let linkObjArray = JSON.parse(request.responseText);
					console.log(linkObjArray);

					if(isObjEmpty(linkObjArray) !== true){
						//loop to check if userinputted title or URL already exists, if it does, do something, else do nothing.
						for (let linkObj of linkObjArray){

							let userInputedUrl = document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value.replace(/ /g, '-').replace(/%20/g,'-');
							
							if(linkObj.meta.URL === userInputedUrl || linkObj.slug === wpSlug){
								doesPostExist = true;			
								//check if link is already on list <--- DO THIS (this hasn't been done yet!)
								if(linkObj.meta.URL === userInputedUrl){
									if(confirm('Is this URL: '+linkObj.meta.URL+', the URL you wanted the link to have?')){
										alert("This link already exists! We will not use your title when adding this link to this list, instead we'll use the title that already exists in our database!");
										let linkCategoryArray = linkObj.link_category;
										////console.log(categoryId);
										linkCategoryArray.push(categoryId[0]);
			
										let newLinkCategory = {
											"link_category": linkCategoryArray
										};

										////console.log(newLinkCategory);
										console.log(linkObj.id);
			
										makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+linkObj.id, 'POST', JSON.stringify(newLinkCategory))
											.then(function(){
												document.location.reload(true);
											})
											.catch(function(error){
												console.log(error);
											});
											return;
									}
									else{
										return;
									}
								}
								if(linkObj.slug === wpSlug){
									alert("The link title that you specified already exists, please change it slightly");
									return;
								}
							}
						}
						if(doesPostExist === false){
							//console.log("creating brand new external link");
							var NewLinkItemData = {
								"title": document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input--style-'+style).value,
								"slug": wpSlug,
								"meta" : {"URL" : document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value.replace(/ /g, '-').replace(/%20/g,'-'), "link_type" : "external link", "submitted_by": username },
								"status": "publish",
								"link_category": categoryId[0]
							}

							//console.log(NewLinkItemData);
				
							//create new link post type
							makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link', 'POST', JSON.stringify(NewLinkItemData))
								.then(function(){
									document.location.reload(true);
								})
								.catch(function(error){
									console.log(error);
								});
							return;

						}
					}
					else{
						//console.log("creating brand new external link");
						var NewLinkItemData = {
							"title": document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input--style-'+style).value,
							"slug": wpSlug,
							"meta" : {"URL" : document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value.replace(/ /g, '-').replace(/%20/g,'-'), "link_type" : "external link", "submitted_by": username },
							"status": "publish",
							"link_category": categoryId[0]
						}


						console.log(wpSlug);
						//console.log(NewLinkItemData);
			
						//create new link post type
						makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link', 'POST', JSON.stringify(NewLinkItemData))
							.then(function(){
								document.location.reload(true);
							})
							.catch(function(error){
								console.log(error);
							});

						return;
					}
				});
			

			
		})
		.catch(function(error){
			console.log(error);
		});
	alert("Thank you for submitting!");


	/*
	var newListItemTitle = document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value
	//event.stopPropagation();
	var jsDataArray = {
			"newListItemTitle":newListItemTitle,
			"currentAddToListBtn":currentAddToListBtn
	}
	*/
	//addNewListItemJS(jsDataArray);


}

export default endLinkRequest;