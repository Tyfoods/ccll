module.exports = function createNewListBtn(makeRequest){
	var newListBtn = document.createElement('button');
	newListBtn.setAttribute("class", "new-list-btn");
	newListBtn.innerHTML = "Add New List +";
	
	var cll_link_list = document.querySelector('.cll-link-list');

	cll_link_list.parentElement.insertBefore(newListBtn, cll_link_list.parentElement.firstChild);

	newListBtn.addEventListener("click", function(){
		if (confirm("Are you sure you would like to add a new list?")) {
			//console.log("You pressed YES!");
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
				.then(function(request){
					var rawResponse = request.responseText.split('{"id":'+current_page_id).pop();
					var jsonResponse = '{"id":'+current_page_id+rawResponse;
					var objResponse = JSON.parse(jsonResponse);

					var NewShortCodeData = {
						"content": objResponse.content.raw+' [cll_list]'
					}
					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(NewShortCodeData), true)
						.then(function(){
							//console.log("Successfully updated page!");
						})
						.catch(function(){
							//console.log("Unsuccesful page update!");
						});
				})
				.catch(function(error){
					console.log(error);
					//console.log("Unable to get page with given ID");
				});

		  } else {
			//console.log("You pressed NO");
		  }
	});
}