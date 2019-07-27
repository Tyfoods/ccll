module.exports = function setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest){

    var voteRecordObj = JSON.parse(metaObj.voteRecord);

    if(voteType === "downVote"){
        //increment downVote
        metaObj.down_votes+=1;
    } 
    else if(voteType === 'switch'){
        //decrement upvote
        metaObj.up_votes-=1;
        //increment downvote
        metaObj.down_votes+=1;
    }
    else if(voteType === "none"){
        //do nothing
    }

    voteRecordObj[cllUserId[0]] = "0";
    var newVoteStatusData = JSON.stringify(voteRecordObj);
    metaObj.voteRecord = newVoteStatusData;

    var newPostMetaData = JSON.stringify({
        "meta" : metaObj

    });

    makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+currentLinkItemPostId, 'POST', newPostMetaData)
        .then(function(request){
            //make buttons clickable again
            cllGlobals.isUpVoteBtnClicked = false;
            cllGlobals.isNeutralVoteBtnClicked = false;
            cllGlobals.isDownVoteBtnClicked = false;
        })
        .catch(function(error){
            console.log(error);
        });
}