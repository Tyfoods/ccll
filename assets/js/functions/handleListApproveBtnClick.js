function createNewPageData(jsonResponse, shortcode_source_id, newCategory){
    //console.log("created new page data");
    var objResponse = JSON.parse(jsonResponse);
    const ccllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
    const ccllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
    const ccllListRegex = /\[ccll_list\s?(.*?)\]/g;
    const ccllIsSearchEngineOnRegex = /is_search_engine_on\s?=\s?(\'|\")(.*?)(\'|\")/g


    //Get array of all shortcodes on page
    const ccllListShortcodeArray = objResponse.content.raw.match(ccllListRegex);
    //Get entire shortcode from which this set of lists was born.
    const entireCurrentShortcodeString = ccllListShortcodeArray[shortcode_source_id-1];

    let searchEngineSetting = entireCurrentShortcodeString.match(ccllIsSearchEngineOnRegex);
    if(searchEngineSetting == null){
        searchEngineSetting = '';
    }

    //getData and check if it exists
    let listDataAtt = entireCurrentShortcodeString.match(ccllListDataRegex);
    if(listDataAtt == null){ //if data doesn't exist do this
        listDataAtt = [];
        listDataAtt[0] = `"{ "1": { "style": "2", "category_name": "${newCategory}" } }"`
        //when not null, "listDataArrayString" requires one to strip the first and last character
        //To leverage the code below, we'll stick extra characters in hence the extra quotes outside jSon

    }
    let listDataArrayString = listDataAtt[0].match(ccllListMatchJson);
    //console.log(listDataArrayString);
    //console.log(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));
    let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));


    //get id for NewList
    function createNewListId(prospectiveNewListId){

        function checkPropspectiveNewListExistence(){
            if(listDataObj.hasOwnProperty(prospectiveNewListId)){
                return true;
                }
        }
        while (checkPropspectiveNewListExistence() === true){
            prospectiveNewListId+=1;
        }
        return prospectiveNewListId;

    }
    let listDataObjKeysArray = Object.keys(listDataObj);
    let smallestKeyInListArray = Math.min(...listDataObjKeysArray);
    let newListId = createNewListId(smallestKeyInListArray);

    //Modify Data appropriately
    listDataObj[`${newListId}`] = {};
    listDataObj[`${newListId}`]['category_name'] = newCategory;
    listDataObj[`${newListId}`]['style'] = "2";

    //createShortCode
    let newShortcode = `[ccll_list list_data='${JSON.stringify(listDataObj)}' ${searchEngineSetting}']`;


    //console.log(objResponse.content.raw);

    let newPageContent = objResponse.content.raw.replace(ccllListShortcodeArray[shortcode_source_id-1], newShortcode);

    let newPageData = {
        "content": newPageContent
    }

    return newPageData;
}

export default function handleListApproveBtnClick(ccllListApproveBtn, deps){
    //Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked
    var ccllListApproveBtnCcllId = ccllListApproveBtn.getAttribute('ccllid'); //get ccllid of Approvebtn
    const makeRequest = deps.makeRequest;
    var newListItemData = {};
    var table = document.getElementById("pending-list-data-table");
    for (var i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++){
            //var element = row.cells[j];
            if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data
                if(row.cells[j].getAttribute('ccllid') === ccllListApproveBtnCcllId){
                    var rowToDelete = row.rowIndex;
                    if(row.cells[j].title === 'listId'){
                        newListItemData['listId'] = row.cells[j].innerHTML;

                    }
                    else if(row.cells[j].title === 'userId'){
                        newListItemData['commonUserId'] = row.cells[j].innerHTML;

                    }

                    else if(row.cells[j].title === 'list_category'){
                        newListItemData['list_category'] = row.cells[j].innerHTML;

                        }
                    else if(row.cells[j].title === 'pageId'){
                        newListItemData['pageId'] = row.cells[j].innerHTML;

                        }
                    else if(row.cells[j].title === 'list_page_origin'){
                        newListItemData['list_page_origin'] = row.cells[j].innerHTML;

                    }
                    else if(row.cells[j].title === 'screen_type'){
                        newListItemData['screen_type'] = row.cells[j].innerHTML;

                    }
                    else if(row.cells[j].title === 'shortcode_source_id'){
                        newListItemData['shortcode_source_id'] = row.cells[j].innerHTML;

                    }
                }
            }
        } 
    }
    table.deleteRow(rowToDelete);

    //add some function to refresh form fields and add temporary checkmark symbol
    deps.deletePendingListRequest(newListItemData);

    //console.log(newListItemData['screen_type'].replace(/\s/g, ''));

    let shortcode_source_id = newListItemData['shortcode_source_id'].replace(/\s/g, '');
    let screen_type = newListItemData['screen_type'].replace(/\s/g, '');
    let list_page_origin_id = newListItemData['list_page_origin'].replace(/\s/g, '').replace(/%20/g, '');
    if (confirm("Are you sure you would like to add this new list?")) {
        //////console.log("You pressed YES!");
        if(screen_type === "page"){
			makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+list_page_origin_id, "POST")
                .then(function(request){
                    var rawResponse = request.responseText.split('{"id":'+list_page_origin_id).pop();
                    var jsonResponse = '{"id":'+list_page_origin_id+rawResponse;

                    let newPageData = createNewPageData(jsonResponse, shortcode_source_id, newListItemData['list_category']);

                    //creates new category
                    deps.createNewCategory(newListItemData['list_category'], deps);
                    //console.log("making second request to update");
                    makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+list_page_origin_id, "POST", JSON.stringify(newPageData))
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
		if(screen_type === "post"){
            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+list_page_origin_id, "POST")
            .then(function(request){
                var rawResponse = request.responseText.split('{"id":'+list_page_origin_id).pop();
                var jsonResponse = '{"id":'+list_page_origin_id+rawResponse;

                let newPageData = createNewPageData(jsonResponse, shortcode_source_id);

                //creates new category
                deps.createNewCategory(newListItemData['list_category'], deps);

                makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+list_page_origin_id, "POST", JSON.stringify(newPageData))
                    .then(function(request){
                        //console.log("Successfully updated page!");
                        //console.log(JSON.parse(request.responseText));
                    })
                    .catch(function(error){
                        //console.log(error);
                        ////console.log("Unsuccesful page update!");
                    });
            })
            .catch(function(error){
                //console.log(error);
                ////console.log("Unable to get page with given ID");
            });
		}


	}
	else
	{
		////console.log("You pressed NO");
	}
}