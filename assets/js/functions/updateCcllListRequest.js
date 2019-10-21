import makeRequest from './makeRequest'

//Function for updating shortcode of current page
function updateCcllListRequest(ccllRequestData)
{
	var selectedCategory = ccllRequestData['selectedCategory'];
	var shortcodeSourceId = parseInt(ccllRequestData['shortcodeSourceId']);
	var listId = ccllRequestData['listId'];

		(()=>{
			if(current_screen_type[0] === "page"){
			return makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST");
			}
			if(current_screen_type[0] === "post"){
				return makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+current_post_id, "POST");
			}
		})()
		.then(function (request) {
			let objResponse = JSON.parse(request.responseText);

			const ccllListRegex = /\[ccll_list\s?(.*?)\]/g;
			const ccllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
			const ccllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
			const ccllIsSearchEngineOnRegex = /is_search_engine_on\s?=\s?(\'|\")(.*?)(\'|\")/g

			
			const ccllListShortCodeArray = objResponse.content.raw.match(ccllListRegex);

			//later used with "replace()" to editShortCode
			const entireCurrentShortcodeString = ccllListShortCodeArray[shortcodeSourceId-1];
			//console.log(entireCurrentShortcodeString);

			let searchEngineSetting = entireCurrentShortcodeString.match(ccllIsSearchEngineOnRegex);
			if(searchEngineSetting == null){
				searchEngineSetting = '';
			}


			//getData
			let listDataAtt = entireCurrentShortcodeString.match(ccllListDataRegex);
			if(listDataAtt == null){ //if data doesn't exist set to default
				listDataAtt = [];
				listDataAtt[0] = '"{ "1": { "style": "2", "category_name": "" } }"'
				//when not null, "listDataArrayString" requires one to strip the first and last character
				//To leverage the code below, we'll stick extra characters in hence the extra quotes outside jSon

        	}
			let listDataArrayString = listDataAtt[0].match(ccllListMatchJson);
			let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));


			//Modify Data appropriately
			//console.log(listId);
			//console.log(listDataObj[listId]);
			listDataObj[`${listId}`]['category_name'] = selectedCategory;
			//console.log(listDataObj);

			//createShortCode
			let newShortcode = `[ccll_list list_data='${JSON.stringify(listDataObj)}' ${searchEngineSetting}]`;

			////console.log(newShortcode);
			let pageContent = objResponse.content.raw;

			//console.log(pageContent);

			let newPageContent = pageContent.replace(entireCurrentShortcodeString, newShortcode);

			//console.log(newPageContent);
			
			
			(()=>{
				var NewShortCodeData = {
					"content": newPageContent

				}
				if(current_screen_type[0] === "page"){
				return makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(NewShortCodeData));
				}
				if(current_screen_type[0] === "post"){
					return makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+current_post_id, "POST", JSON.stringify(NewShortCodeData));
				}
			})()
			.then(function(){
				document.location.reload(true);
			})
			.catch(function(error){
				//console.log(error);
			});
			

		})
		.catch(function (error){
			////console.log("FAILED");
			//console.log(error);
		});
}

export default updateCcllListRequest;