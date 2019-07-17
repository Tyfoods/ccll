	
var cllGlobals = {
	currentProtocalDomain : document.location.origin
}


var makeRequest = function (url, method, sendData, refresh) {


	var refreshInput = refresh || '';


	//console.log("request made");
	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {

		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);

				if(typeof sendData !== 'undefined')
				{
					//document.location.reload(true);
					//console.log('sendData was present!');
				}

				if(refreshInput === false){

				}
				else if(refreshInput === true){
					document.location.reload(true);
				}

			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

		// Setup our HTTP request
		request.open(method || 'GET', url, true);
		request.setRequestHeader("X-WP-Nonce", magicalData.nonce);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		// Send the request
		if(typeof sendData === 'undefined'){
			request.send();	
			////console.log("Data is undefined! No data was sent");
		}
		else{
			//console.log(sendData);
			request.send(sendData);
		}

	});
};

function createNewCategoryRequest(newCategoryValue)
{

	var NewCategoryData = {
		"name": newCategoryValue,
		"slug": newCategoryValue.replace(" ","-")
	}

	//console.log("Submit Button was clicked, now I'll post");
	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/categories/', 'POST', JSON.stringify(NewCategoryData))
		.then(function(){
			//console.log("Request for new category has been made successfully");
		})
		.catch(function(error){
			//console.log("Failed to make the new category request");
			//console.log(error);
		});

}

function deletePendingListRequest(newListItemData){
	var deletePendingListRequest = new XMLHttpRequest();
	deletePendingListRequest.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				//Nothing below gets called :O ready state is NEVER 4!!!
				//console.log('Successful Pending List Deletion - Hello');
				//console.log(deletePendingListRequest.responseText);
			}
				//if request fails...?
		}
	deletePendingListRequest.open("POST", cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/decline-list-item-handler.php');
	deletePendingListRequest.setRequestHeader("X-WP-Nonce", magicalData.nonce);
	deletePendingListRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	deletePendingListRequest.send("json_string="+JSON.stringify(newListItemData));
}

function addOnClickToListApproveBtn(){
	var cllListApproveBtnArray = document.querySelectorAll(".cllListApproveBtn");
	cllListApproveBtnArray.forEach(function(cllListApproveBtn) {
		cllListApproveBtn.addEventListener("click", function()
	{
		//Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked
		var cllListApproveBtnCllId = cllListApproveBtn.getAttribute('cllid'); //get cllid of Approvebtn
		var newListItemData = {};
		var table = document.getElementById("pending-list-data-table");
		for (var i = 0, row; row = table.rows[i]; i++) 
		{
		//iterate through rows
		//rows would be accessed using the "row" variable assigned in the for loop
			for (var j = 0, col; col = row.cells[j]; j++)
			{
		     //var element = row.cells[j];
		     if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data

		     	if(row.cells[j].getAttribute('cllid') === cllListApproveBtnCllId)
		     	{
					if(row.cells[j].title === 'listId'){
						newListItemData['listId'] = row.cells[j].innerHTML;
						//console.log("This listId was found: "+row.cells[j].title);
						//console.log("This is the InnerHTML: "+newListItemData['listId']);
					}
					else if(row.cells[j].title === 'userId'){
						newListItemData['commonUserId'] = row.cells[j].innerHTML;
		     			//console.log("This userId was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newListItemData['commonUserId']);
		     		}

		     		else if(row.cells[j].title === 'list_category'){
						newListItemData['list_category'] = row.cells[j].innerHTML;
		     			//console.log("The list_category was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newListItemData['list_category']);
		     			////console.log("The elements ID is: "+row.cells[j].id);
						//row.cells[j].parentNode.removeChild(row.cells[j]);
					 }
		     		else if(row.cells[j].title === 'pageId'){
						newListItemData['pageId'] = row.cells[j].innerHTML;
		     			//console.log("The pageId was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newListItemData['pageId']);
		     			////console.log("The elements ID is: "+row.cells[j].id);
						//row.cells[j].parentNode.removeChild(row.cells[j]);
					 }
		     		else if(row.cells[j].title === 'list_page_orgin'){
						newListItemData['list_page_orgin'] = row.cells[j].innerHTML;
		     			//console.log("The pageId was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newListItemData['list_page_orgin']);
		     			////console.log("The elements ID is: "+row.cells[j].id);
						//row.cells[j].parentNode.removeChild(row.cells[j]);
		     		}
		     	}
		     }
		     //iterate through columns
		     //columns would be accessed using the "col" variable assigned in the for loop
		   } 
		}
		table.deleteRow(cllListApproveBtnCllId);

		//add some function to refresh form fields and add temporary checkmark symbol
		deletePendingListRequest(newListItemData);

		var list_page_orgin_id = newListItemData['list_page_orgin'].replace(/\s/g, '').replace(/%20/g, '');
		if (confirm("Are you sure you would like to add this new list?")) {
			////console.log("You pressed YES!");
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+list_page_orgin_id, "POST")
				.then(function(request){
					var rawResponse = request.responseText.split('{"id":'+list_page_orgin_id).pop();
					var jsonResponse = '{"id":'+list_page_orgin_id+rawResponse;
					var objResponse = JSON.parse(jsonResponse);

					var newPageContent = {
						"content": objResponse.content.raw+' [cll_list category_name = "'+newListItemData['list_category'].toLowerCase().trim()+'"]'
					}

					//creates new category
					createNewCategoryRequest(newListItemData['list_category']);

					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+list_page_orgin_id, "POST", JSON.stringify(newPageContent))
						.then(function(request){
							//console.log("Successfully updated page!");
							//console.log(request.responseText);
						})
						.catch(function(error){
							//console.log(error);
							//console.log("Unsuccesful page update!");
						});
				})
				.catch(function(error){
					//console.log(error);
					//console.log("Unable to get page with given ID");
				});

		}
		else
		{
			////console.log("You pressed NO");
		}

		});
	});

}

function addOnClickToListDeclineBtn()
{

	var cllListDeclineBtnArray = document.querySelectorAll(".cllListDeclineBtn");
	cllListDeclineBtnArray.forEach(function(cllListDeclineBtn) {
		cllListDeclineBtn.addEventListener("click", function()
	{
		//Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked
		var cllListDeclineBtnCllId = cllListDeclineBtn.getAttribute('cllid'); //get cllid of Approvebtn
		var newListItemData = {};
		var table = document.getElementById("pending-list-data-table");
		for (var i = 0, row; row = table.rows[i]; i++) 
		{
		//iterate through rows
		//rows would be accessed using the "row" variable assigned in the for loop
			for (var j = 0, col; col = row.cells[j]; j++)
			{
		     //var element = row.cells[j];
		     if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data

		     	if(row.cells[j].getAttribute('cllid') === cllListDeclineBtnCllId)
		     	{
					if(row.cells[j].title === 'listId'){
						newListItemData['listId'] = row.cells[j].innerHTML;
						//console.log("This userId was found: "+row.cells[j].title);
						//console.log("This is the InnerHTML: "+newListItemData['listId']);
					}
					else if(row.cells[j].title === 'userId'){
						newListItemData['commonUserId'] = row.cells[j].innerHTML;
		     			//console.log("This userId was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newListItemData['commonUserId']);
		     		}

		     		else if(row.cells[j].title === 'list_category'){
						newListItemData['list_category'] = row.cells[j].innerHTML;
		     			//console.log("The content was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newListItemData['list_category']);
		     			////console.log("The elements ID is: "+row.cells[j].id);
						//row.cells[j].parentNode.removeChild(row.cells[j]);
		     		}
		     	}
		     }
		     //iterate through columns
		     //columns would be accessed using the "col" variable assigned in the for loop
		   } 
		}
		table.deleteRow(cllListDeclineBtnCllId);
		//add some function to refresh form fields and add temporary checkmark symbol
		deletePendingListRequest(newListItemData);
		alert("You have declined a list!");
		});
	});
}

function addOnClickToDeclineBtn()
{

	var elementsArray = document.querySelectorAll(".cllDeclineBtn");
	elementsArray.forEach(function(elem) {
	elem.addEventListener("click", function()
	        //this function does stuff
	{
		//Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked
		var cllDeclineBtnCllId = elem.getAttribute('cllid'); //get cllid of Approvebtn
		var newLinkItemData = {};
		var table = document.getElementById("pending-link-data-table");
		for (var i = 0, row; row = table.rows[i]; i++) 
		{
		//iterate through rows
		//rows would be accessed using the "row" variable assigned in the for loop
			for (var j = 0, col; col = row.cells[j]; j++)
			{
		     //var element = row.cells[j];
		     if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data

		     	if(row.cells[j].getAttribute('cllid') === cllDeclineBtnCllId)
		     	{
		     		if(row.cells[j].title === 'linkId'){ //check if element.title is equal to 'string'
		     			newLinkItemData['pendingLinkId'] = row.cells[j].innerHTML;
		     			//console.log("This linkID was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newLinkItemData['pendingLinkId']);
		     		}
		     		else if(row.cells[j].title === 'userId'){ //check if element.title is equal to 'string'
						 newLinkItemData['commonUserId'] = row.cells[j].innerHTML;
		     			//console.log("This userId was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newLinkItemData['commonUserId']);
		     		}
		     		else if(row.cells[j].title === 'linkTitle'){
		     			newLinkItemData['title'] = row.cells[j].innerHTML;
		     			//console.log("The linkTitle was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newLinkItemData['title']);
						//row.cells[j].parentNode.removeChild(row.cells[j]);
		     		}
		     		else if(row.cells[j].title === 'content'){
		     			newLinkItemData['content'] = row.cells[j].innerHTML;
		     			//console.log("The content was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newLinkItemData['content']);
		     			////console.log("The elements ID is: "+row.cells[j].id);
						//row.cells[j].parentNode.removeChild(row.cells[j]);
		     		}
		     		else if(row.cells[j].title === 'categories'){
		     			newLinkItemData['categories'] = row.cells[j].innerHTML;
		     			//console.log("The content was found: "+row.cells[j].title);
		     			//console.log("This is the InnerHTML: "+newLinkItemData['categories']);
		     			////console.log("The elements ID is: "+row.cells[j].id);
						//row.cells[j].parentNode.removeChild(row.cells[j]);
		     		}
		     	}
		     }
		     //iterate through columns
		     //columns would be accessed using the "col" variable assigned in the for loop
		   } 
		}
		table.deleteRow(cllDeclineBtnCllId);

	

		//add some function to refresh form fields and add temporary checkmark symbol

		
			var deletePendingLinkRequest = new XMLHttpRequest();
			deletePendingLinkRequest.onreadystatechange = function()
				{
					if(this.readyState == 4 && this.status == 200)
					{
						//Nothing below gets called :O ready state is NEVER 4!!!
						//console.log('Successful Pending Link Deletion - Hello');
						//console.log(deletePendingLinkRequest.responseText);
					}
						//if request fails...?
				}
			deletePendingLinkRequest.open("POST", cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/approve-link-item-handler.php');
			deletePendingLinkRequest.setRequestHeader("X-WP-Nonce", magicalData.nonce);
			deletePendingLinkRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			deletePendingLinkRequest.send("json_string="+JSON.stringify(newLinkItemData));
			alert("You have declined a link!");
		});
	});
}


function addOnClickToApproveBtn()
{

	var elementsArray = document.querySelectorAll(".cllApproveBtn");
	elementsArray.forEach(function(elem) {
	elem.addEventListener("click", function()
	        //this function does stuff
	{
		//Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked
		var cllApproveBtnCllId = elem.getAttribute('cllid'); 
		var newLinkItemData = {};
		var table = document.getElementById("pending-link-data-table");
		for (var i = 0, row; row = table.rows[i]; i++) 
		{
		//iterate through rows
		//rows would be accessed using the "row" variable assigned in the for loop
			for (var j = 0, col; col = row.cells[j]; j++)
			{
		     //var element = row.cells[j];
		     if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data

		     	if(row.cells[j].getAttribute('cllid') === cllApproveBtnCllId)
		     	{
					////console.log(row.cells[j].title);
		     		if(row.cells[j].title === 'linkId'){
		     			newLinkItemData['pendingLinkId'] = row.cells[j].innerHTML;
		     			////console.log("This linkID was found: "+row.cells[j].title);
		     			////console.log("This is the InnerHTML: "+newLinkItemData['pendingLinkId']);
		     		}
		     		else if(row.cells[j].title === 'userId'){
						 newLinkItemData['commonUserId'] = row.cells[j].innerHTML;
		     			////console.log("This userId was found: "+row.cells[j].title);
		     			////console.log("This is the InnerHTML: "+newLinkItemData['commonUserId']);
		     		}
		     		else if(row.cells[j].title === 'linkTitle'){
		     			newLinkItemData['title'] = row.cells[j].innerHTML;
		     			////console.log("The linkTitle was found: "+row.cells[j].title);
		     			////console.log("This is the InnerHTML: "+newLinkItemData['title']);

		     		}
		     		else if(row.cells[j].title === 'content'){
		     			newLinkItemData['content'] = row.cells[j].innerHTML;
		     			////console.log("The content was found: "+row.cells[j].title);
		     			////console.log("This is the InnerHTML: "+newLinkItemData['content']);

		     		}
		     		else if(row.cells[j].title === 'category'){
		     			newLinkItemData['categories'] = row.cells[j].innerHTML;
		     			////console.log("The content was found: "+row.cells[j].title);
		     			////console.log("This is the InnerHTML: "+newLinkItemData['categories']);

		     		}
		     	}
		     }
		     //iterate through columns
		     //columns would be accessed using the "col" variable assigned in the for loop
		   } 
		}
		table.deleteRow(cllApproveBtnCllId);

	
		newLinkItemData['status'] = 'publish';

		var userId = newLinkItemData['commonUserId'];
		var userId = parseInt(newLinkItemData['commonUserId']).toString();

		makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/users/'+userId, 'GET')
			.then(function(request){
				var objResponse = JSON.parse(request.responseText);
				newLinkItemData['meta'] = {"submitted_by" : objResponse.name, "URL" : newLinkItemData['content'].trim(), "link_type" : "external link"};
				return;
			})
			.then(function(request){
				makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link', 'POST', JSON.stringify(newLinkItemData))
					.then(function(request){
						//console.log("Successful Link Addition");
						alert("You have approved a link!");
						makeRequest(cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/approve-link-item-handler.php', 'POST', "json_string="+JSON.stringify(newLinkItemData))
							.then(function(request){
								//console.log(request.responseText);
								//console.log("Successful pending link deletion");
							});
					});
				
			})
			.catch(function(error){
				//console.log(error)
			});
/*
		var deletePendingLinkRequest = new XMLHttpRequest();
		deletePendingLinkRequest.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{
					//Nothing below gets called :O ready state is NEVER 4!!!
					console.log('Successful Pending Link Deletion - Hello');
					console.log(deletePendingLinkRequest.responseText);
				}
					//if request fails...?
			}
		deletePendingLinkRequest.open("POST", cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/approve-link-item-handler.php');
		deletePendingLinkRequest.setRequestHeader("X-WP-Nonce", magicalData.nonce);
		deletePendingLinkRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		deletePendingLinkRequest.send("json_string="+JSON.stringify(newLinkItemData));
		*/
	});
		
	});
}

window.onload=function()
{
	addOnClickToApproveBtn();
	addOnClickToDeclineBtn();
	addOnClickToListApproveBtn();
	addOnClickToListDeclineBtn();
}