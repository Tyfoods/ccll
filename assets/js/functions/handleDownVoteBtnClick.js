module.exports = function handleDownVoteBtnClick(downVoteBtn, deps){
    const makeRequest = deps.makeRequest;
    const visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;
    const setVoterStatusToDownAndUpdatePostMeta = deps.setVoterStatusToDownAndUpdatePostMeta;

	var linkListTitleArray = document.querySelectorAll('.link-list-item__link-list-title');
    if(cllGlobals.isDownVoteBtnClicked === false){
        linkListTitleArray.forEach(function(linkListTitle){
            var post_slug = linkListTitle.textContent.trim().replace(/\s/g, '-').toLowerCase();
            if(linkListTitle.getAttribute('cllId') === downVoteBtn.getAttribute('cllId')){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+post_slug, 'GET')
                    .then(function(request){
                        var objResponse = JSON.parse(request.responseText);
                        var metaObj = objResponse[0].meta;
                        var currentLinkItemPostId = objResponse[0].id;

                        var currentLinkItemId = downVoteBtn.getAttribute('cllId');

                        var downVoteCounter = document.querySelector('.link-list-item__down-votes-counter[cllId="'+currentLinkItemId+'"]');
                        var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId="'+currentLinkItemId+'"]');
                        
                        try {
                            var voteRecordObj = JSON.parse(metaObj.voteRecord);
                            if(typeof voteRecordObj[cllUserId[0]]  === "undefined"){ //if current user has never voted then...
                                if(cllGlobals.isDownVoteBtnClicked === false){
                                    cllGlobals.isDownVoteBtnClicked = true;

                                    //Make other buttons un-clickable, they become clickable again after request below
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    cllGlobals.isUpVoteBtnClicked = true;
                                    //console.log("There is no information on record for this user");

                                    //visually add 1 down vote
                                    downVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", downVoteCounter);

                                    setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, "downVote", makeRequest);
                                    return;
                                }
                            }
                            //console.log("There is information on record for this user");
                            //Get user vote status
                            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);
                            if(currentUserVoteStatus === 0)
                            {
                                alert("You've already down voted this post!");
                                return;
                            }
                            else if(currentUserVoteStatus === 1)
                            {
                                if(cllGlobals.isDownVoteBtnClicked === false){
                                    cllGlobals.isDownVoteBtnClicked = true;

                                    //Make other buttons un-clickable, they become clickable again after request below
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    cllGlobals.isUpVoteBtnClicked = true;

                                    downVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", downVoteCounter);
                                    upVoteCounter.innerHTML = visuallyUpdateVoteCounter("decrement", upVoteCounter);

                                    //User "Up Voted" last.
                                    //Set user vote status to 0
                                    setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, "switch", makeRequest);
                                    return;
                                }
                            }
                            else if(currentUserVoteStatus === 3)
                            {
                                if(cllGlobals.isDownVoteBtnClicked === false){
                                    cllGlobals.isDownVoteBtnClicked = true;

                                    //Make other buttons un-clickable, they become clickable again after request below
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    cllGlobals.isUpVoteBtnClicked = true;

                                    //visually add 1 down vote
                                    downVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", downVoteCounter);

                                    setVoterStatusToDownAndUpdatePostMeta(currentLinkItemPostId, metaObj, "downVote", makeRequest);
                                    return;
                                }
                            }

                        }
                        catch(error) {
                            if(cllGlobals.isDownVoteBtnClicked === false){
                                cllGlobals.isDownVoteBtnClicked = true;

                                //Make other buttons un-clickable, they become clickable again after request below
                                cllGlobals.isNeutralVoteBtnClicked = true;
                                cllGlobals.isUpVoteBtnClicked = true;

                                console.log(error);
                                //console.log("Could not parse voteRecord");
                                //console.log("There is no information on record AT ALL");
                                
                                //console.log("Change voter status to 0");
                                metaObj.voteRecord = '{"'+cllUserId[0]+'":'+'"0"}';
                                ////console.log("add downvote to post");
                                metaObj.down_votes+=1;

                                var newPostMetaData = JSON.stringify({
                                    "meta" : metaObj

                                });
                                
                                //visually add 1 to down vote
                                downVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", downVoteCounter);

                               if(cllIsAdmin[0] === "true"){
                                    makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
                                        .then(function(){
                                            cllGlobals.isUpVoteBtnClicked = false;
                                            cllGlobals.isNeutralVoteBtnClicked = false;
                                            cllGlobals.isDownVoteBtnClicked = false;
                                        })
                                        .catch(function(error){
                                            console.log(error);
                                        });
                                    return;
                                }
                                else{
                                    makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-vote/v1/cll-link/'+objResponse[0].id, 'POST', JSON.stringify(metaObj))
                                    .then(function(){
                                        //console.log(request.responseText);
                                        cllGlobals.isUpVoteBtnClicked = false;
                                        cllGlobals.isNeutralVoteBtnClicked = false;
                                        cllGlobals.isDownVoteBtnClicked = false;
                                    })
                                    .catch(function(error){
                                        console.log(error);
                                    });
                                }
                            }
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }
        })
    }
}