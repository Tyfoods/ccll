module.exports = function visuallyUpdateVoteCounter(updateType, voteCounter){
    var currentVoteValue = parseInt(voteCounter.textContent);
    if(updateType === "increment"){
        currentVoteValue+=1;
        voteCounter.innerHTML = currentVoteValue;
        return voteCounter.innerHTML;
    } else if (updateType = "decrement"){
        currentVoteValue-=1;
        voteCounter.innerHTML = currentVoteValue;
        return voteCounter.innerHTML;
    }
 }