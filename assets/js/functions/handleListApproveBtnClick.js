module.exports = function handleListApproveBtnClick(cllListApproveBtn, deps){
    //Get Title/Content I.E. Link Title Link URL based on which ApproveBtn was picked
    var cllListApproveBtnCllId = cllListApproveBtn.getAttribute('cllid'); //get cllid of Approvebtn
    const makeRequest = deps.makeRequest;
    var newListItemData = {};
    var table = document.getElementById("pending-list-data-table");
    for (var i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++){
            //var element = row.cells[j];
            if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data
                if(row.cells[j].getAttribute('cllid') === cllListApproveBtnCllId){
                    var rowToDelete = row.rowIndex;
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
                    else if(row.cells[j].title === 'list_page_origin'){
                        newListItemData['list_page_origin'] = row.cells[j].innerHTML;
                        //console.log("The pageId was found: "+row.cells[j].title);
                        //console.log("This is the InnerHTML: "+newListItemData['list_page_origin']);
                        ////console.log("The elements ID is: "+row.cells[j].id);
                        //row.cells[j].parentNode.removeChild(row.cells[j]);
                    }
                }
            }
        } 
    }
    table.deleteRow(rowToDelete);

    //add some function to refresh form fields and add temporary checkmark symbol
    deps.deletePendingListRequest(newListItemData);

    var list_page_origin_id = newListItemData['list_page_origin'].replace(/\s/g, '').replace(/%20/g, '');
    if (confirm("Are you sure you would like to add this new list?")) {
        ////console.log("You pressed YES!");
        makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+list_page_origin_id, "POST")
            .then(function(request){
                var rawResponse = request.responseText.split('{"id":'+list_page_origin_id).pop();
                var jsonResponse = '{"id":'+list_page_origin_id+rawResponse;
                var objResponse = JSON.parse(jsonResponse);

                var newPageContent = {
                    "content": objResponse.content.raw+' [cll_list category_name = "'+newListItemData['list_category'].toLowerCase().trim()+'"]'
                }

                //creates new category
                deps.createNewCategory(newListItemData['list_category'], deps);

                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+list_page_origin_id, "POST", JSON.stringify(newPageContent))
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
		//console.log("You pressed NO");
	}
}