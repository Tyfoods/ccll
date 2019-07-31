module.exports = function createNewListRequestBtn(makeRequest){
    var newListRequestBtn = document.createElement('button');
    newListRequestBtn.setAttribute("class", "new-list-btn");
    newListRequestBtn.innerHTML = "Request New Category +";


    var cll_link_list = document.querySelector('.cll-link-list');

    cll_link_list.parentElement.insertBefore(newListRequestBtn, cll_link_list.parentElement.firstChild);

    newListRequestBtn.addEventListener("click", function(){
        var requestMsg= prompt("What category would you like to add?");
        if (requestMsg != null || requestMsg != '')
        {

            //console.log(requestMsg);
            
            var NewPendingListItemData = {
                "list_category": requestMsg,
                "list_page_origin":current_page_id

            }
            //Make request to PHP handler and have it add to backend admin page.
            NewPendingListItemData = "commonUserId=" + JSON.stringify(cllUserId[0]) + "json_string=" + JSON.stringify(NewPendingListItemData);
            makeRequest(cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/request-handlers/logged-in-user-list-request-handler.php', "POST", NewPendingListItemData)
                .then(function(request){

                    console.log(request.responseText);
                })
                .catch(function(error){

                    //console.log(error);
                });
        }
        else
        {
            //console.log("User Canceled");
        }
    });
}