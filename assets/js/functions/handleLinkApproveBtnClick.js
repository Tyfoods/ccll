export default function handleLinkApproveBtnClick(ccllApproveBtn, deps){
    const makeRequest = deps.makeRequest;
    var ccllApproveBtnCcllId = ccllApproveBtn.getAttribute('ccllid'); 
        var newLinkItemData = {};
        var table = document.getElementById("pending-link-data-table");
        for (var i = 0, row; row = table.rows[i]; i++) 
        {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
            for (var j = 0, col; col = row.cells[j]; j++){
                //var element = row.cells[j];
                if(row.cells[j].nodeName.toLowerCase() === "td"){ //Check if it is table data

                    if(row.cells[j].getAttribute('ccllid') === ccllApproveBtnCcllId){
                        var rowToDelete = row.rowIndex;
                        if(row.cells[j].title === 'linkId'){
                            newLinkItemData['pendingLinkId'] = row.cells[j].innerHTML;
                        }
                        else if(row.cells[j].title === 'userId'){
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


    newLinkItemData['status'] = 'publish';

    var userId = newLinkItemData['commonUserId'];
    var userId = parseInt(newLinkItemData['commonUserId']).toString();

    makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/users/'+userId, 'GET')
        .then(function(request){
            var objResponse = JSON.parse(request.responseText);
            newLinkItemData['meta'] = {"submitted_by" : objResponse.name,
                                        "URL" : newLinkItemData['content'].trim(),
                                        "link_type" : "external link"};
            return;
        })
        .then(function(){
            ////console.log(newLinkItemData);
            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link', 'POST', JSON.stringify(newLinkItemData))
           // makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link', 'GET')
            .then(function(request){
                //console.log("Successful Link Addition");
                alert("You have approved a link!");
                makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-link/v1/link-approved-request/'+userId, 'POST', JSON.stringify(newLinkItemData))
                    .then(function(request){
                        ////console.log(request.responseText);
                        ////console.log("Successful pending link deletion");
                    });
            })
            .catch(function(error){
                //console.log(error);
            });
        })
        .catch(function(error){
            //console.log(error);
        })

}