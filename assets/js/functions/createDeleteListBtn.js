module.exports = function createDeleteListBtn(setAttributeOfElementsInArray, makeRequest){


	var cllLinkListArray = document.querySelectorAll('.cll_link_list');
	//console.log(cllLinkListArray);

	cllLinkListArray.forEach(function(cllLinkList)
	{
		var deleteListBtn = document.createElement("button");
		deleteListBtn.setAttribute('class', 'delete_list_btn')
		deleteListBtn.innerHTML = "Delete List";
		cllLinkList.insertBefore(deleteListBtn, cllLinkList.firstChild);
	});

	
	var listArray = document.querySelectorAll('.cll_link_list');
	var deleteListBtnCollection = document.querySelectorAll(".delete_list_btn");

	setAttributeOfElementsInArray(deleteListBtnCollection, 'cllId');
	setAttributeOfElementsInArray(listArray, 'cllId');


	deleteListBtnCollection.forEach(function(deleteListBtn){
		deleteListBtn.addEventListener("click", function(){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
				.then(function (request) {
		
					var response = request.responseText;
					var rawResponse = response.split('{"id":'+current_page_id).pop();
					var jsonResponse = '{"id":'+current_page_id+rawResponse;
					var objResponse = JSON.parse(jsonResponse);

					const cllListRegex = /\[cll_list\s?(.*?)\]/g;
					const cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);
		
		
					//console.log(cllListShortCodeArray);
					//console.log(cllListShortCodeArray[deleteListBtn.getAttribute('cllId')]);

					//console.log(objResponse.content.raw);
					var newPageContent = objResponse.content.raw.replace(cllListShortCodeArray[deleteListBtn.getAttribute('cllId')], '');
					//console.log(newPageContent);

					var newPageData = {
						"content": newPageContent
					}

					//Delete the appropriate list from the front end.
					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData), true);

					//Delete list from front end visually
					listArray.forEach(function(listToRemove){
						if(listToRemove.getAttribute('cllId') === deleteListBtn.getAttribute('cllId'))
						{
							listToRemove.parentNode.removeChild(listToRemove);
							while (listToRemove.firstChild) {
								listToRemove.removeChild(listToRemove.firstChild);
							}
						}
					});



					return;
				});
		});
	});
	
}