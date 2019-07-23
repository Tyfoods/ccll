/* Deprecated, using JS to create listTitles, now done in PHP. */

function createListTitles(){
	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
		.then(function (request) {
	
			var response = request.responseText;
			var rawResponse = response.split('{"id":'+current_page_id).pop();
			var jsonResponse = '{"id":'+current_page_id+rawResponse;
			var objResponse = JSON.parse(jsonResponse);

			const cllListRegex = /\[cll_list\s?(.*?)\]/g;
			const cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);
	
			console.log(cllListShortCodeArray);

			var cllListCategoryArray = [];
			cllListShortCodeArray.forEach(function(cllListShortCode){
				console.log(cllListShortCode);
				var categoryRegex = /category_name\s?=\s?"(.*?)"/g;
				var categoryKeySelectorRegex = /category_name\s?=\s?/g;
				var extractedCategory = cllListShortCode.match(categoryRegex);

				if(extractedCategory != null || extractedCategory === '')
				{
					cllListCategoryArray.push(extractedCategory[0].replace(categoryKeySelectorRegex, '').replace(/\"/g,''));
					console.log("Extracted category exists and is not empty!");
				}
				else{
					cllListCategoryArray.push("Uncategorized");
				}

			});
			console.log(cllListCategoryArray);

			var cllLinkListArray = document.querySelectorAll('.cll_link_list');

			var catInc = 0;

			cllLinkListArray.forEach(function(cllLinkList){
				var listTitleElement = document.createElement('h4');
				listTitleElement.setAttribute('class','list_title');
				listTitleElement.innerHTML = cllListCategoryArray[catInc];

				cllLinkList.insertBefore(listTitleElement, cllLinkList.firstChild);
				catInc+=1;
			});


		})
		.catch(function(error){
			console.log(error);
		});
}
