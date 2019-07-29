module.exports = function handleLinkDeclineBtnClick(cllDeclineBtn, deps){
  
    var cllDeclineBtnCllId = cllDeclineBtn.getAttribute('cllid'); 
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
                else if(row.cells[j].title === 'category'){
                    newLinkItemData['link_category'] = row.cells[j].innerHTML;
                    //console.log("The content was found: "+row.cells[j].title);
                    //console.log("This is the InnerHTML: "+newLinkItemData['link_category']);
                    ////console.log("The elements ID is: "+row.cells[j].id);
                    //row.cells[j].parentNode.removeChild(row.cells[j]);
                }
            }
            }
        } 
    }
    table.deleteRow(cllDeclineBtnCllId);


    //add some function to refresh form fields and add temporary checkmark symbol

    var deletePendingLinkRequest = new XMLHttpRequest();
    deletePendingLinkRequest.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {

            }
        }
    deletePendingLinkRequest.open("POST", cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/approve-link-item-handler.php');
    deletePendingLinkRequest.setRequestHeader("X-WP-Nonce", magicalData.nonce);
    deletePendingLinkRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    deletePendingLinkRequest.send("json_string="+JSON.stringify(newLinkItemData));
    alert("You have declined a link!");
}