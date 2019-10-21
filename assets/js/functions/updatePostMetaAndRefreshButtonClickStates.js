 export default function updatePostMetaAndRefreshButtonClickStates(currentLinkItemPostId, metaObj, makeRequest, refreshButtonClickStates){


    var newPostMetaData = JSON.stringify({
        "meta" : metaObj

    });

    if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
        makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+currentLinkItemPostId, 'POST', newPostMetaData)
            .then(function(){
                refreshButtonClickStates();
            })
            .catch(function(error){
                //console.log(error);
            });
        return;
    }
    else{
        makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-vote/v1/ccll-link/'+currentLinkItemPostId, 'POST', JSON.stringify(metaObj))
        .then(function(){
            refreshButtonClickStates();
        })
        .catch(function(error){
            //console.log(error);
        });
    }
}