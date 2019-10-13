import makeRequest from '../functions/makeRequest'

//Function for updating shortcode of current page
function updateCllListRequest(cllRequestData)
{
	var selectedCategory = cllRequestData['selectedCategory'];
	var shortcodeSourceId = parseInt(cllRequestData['shortcodeSourceId']);
	var listId = cllRequestData['listId'];

		(()=>{
			if(current_screen_type[0] === "page"){
			return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST");
			}
			if(current_screen_type[0] === "post"){
				return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST");
			}
		})()
		.then(function (request) {
			let objResponse = JSON.parse(request.responseText);

			const cllListRegex = /\[new_cll_list\s?(.*?)\]/g;
			const cllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
			const cllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
			const cllIsSearchEngineOnRegex = /is_search_engine_on\s?=\s?(\'|\")(.*?)(\'|\")/g

			
			const cllListShortCodeArray = objResponse.content.raw.match(cllListRegex);

			//later used with "replace()" to editShortCode
			const entireCurrentShortcodeString = cllListShortCodeArray[shortcodeSourceId-1];
			console.log(entireCurrentShortcodeString);

			const searchEngineSetting = entireCurrentShortcodeString.match(cllIsSearchEngineOnRegex);
			if(searchEngineSetting == null){
				searchEngineSetting = '';
			}


			//getData
			let listDataAtt = entireCurrentShortcodeString.match(cllListDataRegex);
			if(listDataAtt == null){ //if data doesn't exist set to default
				listDataAtt = [];
				listDataAtt[0] = '"{ "1": { "style": "2", "category_name": "" } }"'
				//when not null, "listDataArrayString" requires one to strip the first and last character
				//To leverage the code below, we'll stick extra characters in hence the extra quotes outside jSon

        	}
			let listDataArrayString = listDataAtt[0].match(cllListMatchJson);
			let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));


			//Modify Data appropriately
			console.log(listId);
			console.log(listDataObj[listId]);
			listDataObj[`${listId}`]['category_name'] = selectedCategory;
			console.log(listDataObj);

			//createShortCode
			let newShortcode = `[new_cll_list list_data='${JSON.stringify(listDataObj)}' ${searchEngineSetting}']`;

			//console.log(newShortcode);
			let pageContent = objResponse.content.raw;

			console.log(pageContent);

			let newPageContent = pageContent.replace(entireCurrentShortcodeString, newShortcode);

			console.log(newPageContent);
			
			
			(()=>{
				var NewShortCodeData = {
					"content": newPageContent

				}
				if(current_screen_type[0] === "page"){
				return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(NewShortCodeData));
				}
				if(current_screen_type[0] === "post"){
					return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST", JSON.stringify(NewShortCodeData));
				}
			})()
			.catch(function(error){
				console.log(error);
			});
			

		})
		.catch(function (error){
			//console.log("FAILED");
			console.log(error);
		});
}

export default updateCllListRequest;