module.exports = function handleListDeclineBtnClick(cllListDeclineBtn, deps){
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
                var rowToDelete = row.rowIndex;
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
    table.deleteRow(rowToDelete);
    //add some function to refresh form fields and add temporary checkmark symbol
    deps.deletePendingListRequest(newListItemData);
    alert("You have declined a list!");
}