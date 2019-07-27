module.exports = function handleNeutralVoteBtnClick(neutralVoteBtn, deps){
    const makeRequest = deps.makeRequest;
    const visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;
    const setVoterStatusToNeutralAndUpdatePostMeta = deps.setVoterStatusToNeutralAndUpdatePostMeta;

    var linkListTitleArray = document.querySelectorAll('.link-list-title');
    if(cllGlobals.isNeutralVoteBtnClicked === false){
        linkListTitleArray.forEach(function(linkListTitle){
            var post_slug = linkListTitle.textContent.trim().replace(/\s/g, '-').toLowerCase();
            
            if(linkListTitle.getAttribute('cllId') === neutralVoteBtn.getAttribute('cllId')){

                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+post_slug, 'GET')
                    .then(function(request){
                        var objResponse = JSON.parse(request.responseText);
                        var currentLinkItemPostId = objResponse[0].id;
                        var currentLinkItemCllId = neutralVoteBtn.getAttribute('cllId');
                        //console.log(objResponse);

                        var metaObj = objResponse[0].meta;
                        
                        try {
                            var voteRecordObj = JSON.parse(metaObj.voteRecord);
                            //console.log(voteRecordObj[cllUserId]);

                            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);
                            if(typeof voteRecordObj[cllUserId[0]]  === "undefined"){ //if current user has never voted then...
                                if(cllGlobals.isNeutralVoteBtnClicked === false){
                                    cllGlobals.isNeutralVoteBtnClicked = true;

                                    //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs
                                    cllGlobals.isUpVoteBtnClicked = true;
                                    cllGlobals.isDownVoteBtnClicked = true;
                                    console.log("There is no information for this user on record");
                                    console.log("Voter status unavailable, updating status");
                                    setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, "none", makeRequest);
                                    return;
                                }
                            }
                            else if(currentUserVoteStatus === 3)
                            {
                            
                                alert("You're already neutral!");
                                return;
                            }
                            else if(currentUserVoteStatus === 1){
                                if(cllGlobals.isNeutralVoteBtnClicked === false){
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs
                                    cllGlobals.isUpVoteBtnClicked = true;
                                    cllGlobals.isDownVoteBtnClicked = true;

                                    console.log("Voter status 1, updating status, removing up vote updating voter status");
                                    //visually remove users up vote
                                    var upVoteCounter = document.querySelector('.up_votes_counter[cllId="'+currentLinkItemCllId+'"]');
                                    upVoteCounter.innerHTML = visuallyUpdateVoteCounter("decrement", upVoteCounter);

                                    setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, "upVote", makeRequest);

                                    return;
                                }
                            }
                            else if(currentUserVoteStatus === 0){
                                if(cllGlobals.isNeutralVoteBtnClicked === false){
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs
                                    cllGlobals.isUpVoteBtnClicked = true;
                                    cllGlobals.isDownVoteBtnClicked = true;
                                    
                                    console.log("Voter status 0, updating status, removing down vote updating voter status");
                                    //visually remove users down vote
                                    var downVoteCounter = document.querySelector('.down_votes_counter[cllId="'+currentLinkItemCllId+'"]');
                                    downVoteCounter.innerHTML = visuallyUpdateVoteCounter("decrement", downVoteCounter);

                                    setVoterStatusToNeutralAndUpdatePostMeta(currentLinkItemPostId, metaObj, "downVote", makeRequest);
                                    return;
                                }
                            }        
                        }
                        catch(error) {
                            if(cllGlobals.isNeutralVoteBtnClicked === false){
                                cllGlobals.isNeutralVoteBtnClicked = true;
                                //Make other buttons un-clickable, they become clickable again after setvoterstatus... runs
                                cllGlobals.isUpVoteBtnClicked = true;
                                cllGlobals.isDownVoteBtnClicked = true;
                                
                                console.log(error);
                                console.log("Could not parse voteRecord");
                                //console.log("There is no information on record *assertion");
                                
                                //console.log(metaObj.voteRecord);
                                console.log("Change voter status to 3");
                                metaObj.voteRecord = '{"'+cllUserId+'":'+'"3"}';

                                var newPostMetaData = JSON.stringify({
                                    "meta" : metaObj

                                });

                                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+objResponse[0].id, 'POST', newPostMetaData)
                                    .then(function(request){
                                        //Make other buttons clickable,
                                        cllGlobals.isUpVoteBtnClicked = false;
                                        cllGlobals.isNeutralVoteBtnClicked = false;
                                        cllGlobals.isDownVoteBtnClicked = false;
                                    })
                                    .catch(function(error){
                                        console.log(error);
                                    });
                                return;
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