module.exports = function handleUpVoteBtnClick(upVoteBtn, deps){
    const makeRequest = deps.makeRequest;
	const visuallyUpdateVoteCounter = deps.visuallyUpdateVoteCounter;
    const setVoterStatusToUpAndUpdatePostMeta = deps.setVoterStatusToUpAndUpdatePostMeta;
    const slugify = deps.slugify;

    var linkListTitleArray = document.querySelectorAll('.link-list-item__link-list-title');

    //if(cllGlobals.isUpVoteBtnClicked === false){
        //instead of iterating through each of these I can pass as props down the necessary information.
        //linkListTitleArray.forEach(function(linkListTitle){
            var postSlug = slugify(linkListTitle.textContent.trim()); //.replace(/\s/g, '-').toLowerCase();
            //if(linkListTitle.getAttribute('cllId') === upVoteBtn.getAttribute('cllId')){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+postSlug, 'GET')
                    .then(function(request){
                        var objResponse = JSON.parse(request.responseText);
                        var currentLinkItemPostId = objResponse[0].id;
                        var currentLinkItemId = upVoteBtn.getAttribute('cllId');
                        var metaObj = objResponse[0].meta;
                        
                        try {
                            var voteRecordObj = JSON.parse(metaObj.voteRecord);
                            var currentUserVoteStatus = parseInt(voteRecordObj[cllUserId[0]]);
                            if(cllGlobals.isUpVoteBtnClicked === false){
                                if(typeof voteRecordObj[cllUserId[0]]  === "undefined"){ //if current user has never voted then...
                                    cllGlobals.isUpVoteBtnClicked = true;
                                    //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    cllGlobals.isDownVoteBtnClicked = true;
                                    
                                    //console.log("There is no information for this user on record");
                                    
                                    var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId="'+currentLinkItemId+'"]');
                                    upVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", upVoteCounter);

                                    //increments upvote
                                    setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, "upVote", makeRequest);
                                    return;
                                }
                                else if(currentUserVoteStatus === 1)
                                {
                                    alert("You've already up voted this post!");
                                    return;
                                }
                                else if(currentUserVoteStatus === 0)
                                {
                                    cllGlobals.isUpVoteBtnClicked = true;
                                    //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    cllGlobals.isDownVoteBtnClicked = true;

                                    //console.log("Voter status was 0, incrementing up vote /removing downvote (visually too), changing status to 1");
                                    //visually remove down vote
                                    var downVoteCounter = document.querySelector('.link-list-item__down-votes-counter[cllId="'+currentLinkItemId+'"]');
                                    downVoteCounter.innerHTML = visuallyUpdateVoteCounter("decrement", downVoteCounter);

                                    //visually add up vote
                                    var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId="'+currentLinkItemId+'"]');
                                    upVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", upVoteCounter);

                                    setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, "switch", makeRequest);
                                    return;
                                }
                                else if(currentUserVoteStatus === 3)
                                {
                                    cllGlobals.isUpVoteBtnClicked = true;
                                    //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                                    cllGlobals.isNeutralVoteBtnClicked = true;
                                    cllGlobals.isDownVoteBtnClicked = true;
                                    //console.log("Voter status was 3, incrementing up vote (visually too), changing status to 1");

                                    //visually add up vote
                                    var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId="'+currentLinkItemId+'"]');
                                    upVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", upVoteCounter);

                                    //Increment up_votes in metaObj
                                    setVoterStatusToUpAndUpdatePostMeta(currentLinkItemPostId, metaObj, "upVote", makeRequest);
                                    return;
                                }
                            }
                        }
                        catch(error) {
                            if(cllGlobals.isUpVoteBtnClicked === false){
                                cllGlobals.isUpVoteBtnClicked = true;
                                //Make other buttons un-clickable, they become clickable again after request below
                                cllGlobals.isNeutralVoteBtnClicked = true;
                                cllGlobals.isDownVoteBtnClicked = true;
                                
                                console.log(error);
                                console.log("Could not parse voteRecord");
                                //console.log("There is no information on record *assertion");

                                metaObj.voteRecord = '{"'+cllUserId[0]+'":'+'"1"}';
                                //console.log("add UpVote to post");
                                metaObj.up_votes+=1;

                                var newPostMetaData = JSON.stringify({
                                    "meta" : metaObj

                                });
                                var upVoteCounter = document.querySelector('.link-list-item__up-votes-counter[cllId="'+currentLinkItemId+'"]');
                                upVoteCounter.innerHTML = visuallyUpdateVoteCounter("increment", upVoteCounter);
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
            //}

    //}
}