module.exports = //Function for updating shortcode of current page
function updateCllListRequest(cllRequestData, deps)
{
	var selectedCategory = cllRequestData['selectedCategory'];
	var currentCllId = parseInt(cllRequestData['currentCllId']);

	//console.log(selectedCategory);
	console.log(currentCllId);
	
	const makeRequest = deps.makeRequest;
	const replaceOccurrence = deps.replaceOccurrence;

	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
		.then(function (request) {

			var response = request.responseText;
			var rawResponse = response.split('{"id":'+current_page_id).pop();
			var jsonResponse = '{"id":'+current_page_id+rawResponse;
			var objResponse = JSON.parse(jsonResponse);

			
			const cllListRegex = /\[cll_list]?\s?/g;
			const cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);


			console.log(cllListShortCodeArray);

			
			var currentShortCode = cllListShortCodeArray[currentCllId].toString().toLowerCase();


			var plainCllListRegex = /\[cll_list]?(\s+)?]/g;

			
			var plainShortCodeArray = currentShortCode.match(plainCllListRegex)
			if(plainShortCodeArray !== null)
			{

				//else{
					const cllReplacementRegex = /\[cll_list]?\s?\]?/g;
					var pageContent = objResponse.content.raw;


					//replace ONLY the correctly numbered short code using INDEX
					var newPageContent = replaceOccurrence(pageContent, cllReplacementRegex, parseInt(currentCllId), '[cll_list category_name="'+selectedCategory+'"]');
					//var newPageContent = pageContent.replace(cllReplacementRegex,'[cll_list category_name="'+selectedCategory+'"]');


					console.log("selected category is: "+selectedCategory);
					console.log(pageContent);
					console.log(newPageContent);
						
					var NewShortCodeData = {
						"content": newPageContent

					}
				//}
				return NewShortCodeData;
			}
			else
			{
				console.log("Short Code with New Category FOUND!");

				const cllPopulatedReplacementRegex = /category_name\s?=\s?"(.*?)"/g;
				var pageContent = objResponse.content.raw;

				//replace ONLY the correctly numbered short code using INDEX
				var newPageContent = replaceOccurrence(pageContent, cllPopulatedReplacementRegex, parseInt(currentCllId), 'category_name="'+selectedCategory+'"');
						
				var NewShortCodeData = {
					"content": newPageContent

				}
				return NewShortCodeData;
			}
		})
		.then(function (newShortCodeData) {
			//console.log("WIN NUMBER TWO");
			//console.log(newShortCodeData);
			return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newShortCodeData), true);
		})
		.catch(function (error){
			//console.log("FAILED");
			console.log(error);
		});
}