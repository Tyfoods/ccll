module.exports = function handleLinkDeclineBtnClick(ccllDeclineBtn, deps){
  
    var ccllDeclineBtnCcllId = ccllDeclineBtn.getAttribute('ccllid'); 
    var newLinkItemData = {};
    var table = document.getElementById("pending-link-data-table");
    for (var i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++){
            //var element = row.cells[j];
            if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data
                if(row.cells[j].getAttribute('ccllId') === ccllDeclineBtnCcllId){
                    var rowToDelete = row.rowIndex;
                    if(row.cells[j].title === 'linkId'){ //check if element.title is equal to 'string'
                        newLinkItemData['pendingLinkId'] = row.cells[j].innerHTML;
                    }
                    else if(row.cells[j].title === 'userId'){ //check if element.title is equal to 'string'
                            newLinkItemData['commonUserId'] = row.cells[j].innerHTML;
                    }
                    else if(row.cells[j].title === 'linkTitle'){
                        newLinkItemData['title'] = row.cells[j].innerHTML;
                    }
                    else if(row.cells[j].title === 'content'){
                        newLinkItemData['content'] = row.cells[j].innerHTML;
                    }
                    else if(row.cells[j].title === 'category'){
                        newLinkItemData['link_category'] = row.cells[j].innerHTML;
                    }
                }
            }
        } 
    }
    table.deleteRow(rowToDelete);


    //add some function to refresh form fields and add temporary checkmark symbol

    var deletePendingLinkRequest = new XMLHttpRequest();
    deletePendingLinkRequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                //do something
            }
    }
    deletePendingLinkRequest.open("POST", ccllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/ccll-core/request-handlers/approve-link-item-handler.php');
    deletePendingLinkRequest.setRequestHeader("X-WP-Nonce", magicalData.nonce);
    deletePendingLinkRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    deletePendingLinkRequest.send("json_string="+JSON.stringify(newLinkItemData));
    alert("You have declined a link!");
}