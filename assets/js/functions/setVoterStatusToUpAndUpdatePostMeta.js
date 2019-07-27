module.exports = function setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, voteType, makeRequest){

    var voteRecordObj = JSON.parse(metaObj.voteRecord);

    if(voteType === "upVote"){
        //increment upvote
        metaObj.up_votes+=1;
    } 
    else if(voteType === 'switch'){
        //increment upvote
        metaObj.up_votes+=1;
        //decrement downvote
        metaObj.down_votes-=1;
    }
    else if(voteType === "none"){
        //do nothing
    }

    voteRecordObj[cllUserId[0]] = "1";
    var newVoteStatusData = JSON.stringify(voteRecordObj);
    metaObj.voteRecord = newVoteStatusData;

    var newPostMetaData = JSON.stringify({
        "meta" : metaObj

    });

    makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+currentLinkItemPostId, 'POST', newPostMetaData)
        .then(function(request){
            cllGlobals.isUpVoteBtnClicked = false;
            cllGlobals.isNeutralVoteBtnClicked = false;
            cllGlobals.isDownVoteBtnClicked = false;
        })
        .catch(function(error){
            console.log(error);
        });
}