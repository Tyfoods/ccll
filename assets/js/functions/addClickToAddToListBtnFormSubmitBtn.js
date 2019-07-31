module.exports = function addClickToAddToListBtnFormSubmitBtn(currentAddToListBtn, deps){

	var submitBtn = document.querySelector('button.add-to-list-form__submit-btn');


	if (typeof submitBtn !== 'undefined')
	{
		//console.log("Submit Button Existance Verified");
		submitBtn.addEventListener("click", function()
		{
			//console.log(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input'));

			if(cllIsAdmin[0] === "true"){
				var x = document.getElementById("add-to-list-form__link-type-selector").selectedIndex;
				var linkType = document.getElementsByTagName("option")[x].value;

				if(document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value === ''){
					alert("You must submit a title!");
				}
				else if(linkType.toLowerCase() === 'external link')
				{
					if(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input').value === ''){
						alert("You must submit a URL!");
					}
					else if(!deps.isUrl(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input').value))
					{
						alert("Please enter a valid URL!");
					}
					else
					{
						deps.endLinkRequest(currentAddToListBtn, deps);
					}
				}
				else if(linkType.toLowerCase() === 'internal link')
				{
					deps.throughLinkRequest(currentAddToListBtn, deps);
				}
				else if(linkType.toLowerCase() !== 'internal link' && linkType.toLowerCase() !== 'external link')
				{
					alert("You must select a Link Type!");
				}
			}
			else{
				if(document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value === ''){
					alert("You must submit a title!");
				}
				else if(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input').value === ''){
					alert("You must submit a URL!");
				}
				else if(!deps.isUrl(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input').value))
				{
					alert("Please enter a valid URL!");
				}
				else
				{
					var multiListPageCategoryIds = "cll_category_ids"+"_"+currentAddToListBtn.getAttribute('cllid');

					var NewLinkItemData = {
						"title": document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value,
						"content": document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input').value,
						"categories": [window[multiListPageCategoryIds]],
						"status": "publish"
					}
					//If Content is valid
					NewLinkItemData = "commonUserId=" + JSON.stringify(cllUserId[0]) + "json_string=" + JSON.stringify(NewLinkItemData);
					console.log(cllUserId[0]);
					console.log(JSON.stringify(cllUserId[0]));
					deps.makeRequest(cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/request-handlers/logged-in-user-link-request-handler.php', 'POST', NewLinkItemData)
						.then(function(request){
							console.log(request.responseText);
						})
						.catch(function(error){
							console.log(error);
						});

					alert("Thank you for submitting!") //Change this so the JS instead says "Thank you for submitting, maybe an alert?"
					//add some function to refresh form fields and add temporary checkmark symbol
					document.getElementById("addToListForm").reset();
					
					var f = document.getElementById("addToListForm")
					var checkmark_symbol = document.createElement("img"); //button element, b button
					f.appendChild(checkmark_symbol);
					checkmark_symbol.setAttribute('name',"checkmark_symbol");
					checkmark_symbol.setAttribute('id',"checkmark_symbol");
					checkmark_symbol.setAttribute('src', cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/assets/images/checkmark.jpg');

					//fadeIn(checkmark_symbol);

					setTimeout(function(){ 
						document.getElementById("checkmark_symbol");
						deps.fadeOut(checkmark_symbol); 
						}, 750);
					}

					/*
					var createLinkItemQuery = new XMLHttpRequest();
					createLinkItemQuery.onreadystatechange = function()
						{
							if(this.readyState == 4 && this.status == 200)
							{
								//Nothing below gets called :O ready state is NEVER 4!!!
								//console.log('Success - Hello');
								//console.log(createLinkItemQuery.responseText);
								////console.log(commonUserId);
							}
								//if request fails...?
						
						}
					NewLinkItemData = "commonUserId=" + JSON.stringify(cllUserId) + "json_string=" + JSON.stringify(NewLinkItemData);
					createLinkItemQuery.open("POST", cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/request-handlers/common-user-request-handler.php');
					createLinkItemQuery.setRequestHeader("X-WP-Nonce", magicalData.nonce);
					createLinkItemQuery.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					createLinkItemQuery.send(NewLinkItemData);
					*/

					//var newListItemTitle = document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input').value //what's this for?
					//event.stopPropagation();
			}

		});
	return;
	}
}