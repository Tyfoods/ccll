module.exports = function addClickToNeutralVoteBtn(deps){
	var neutralVoteBtnArray = document.querySelectorAll('.neutral_vote_button');
	neutralVoteBtnArray.forEach(function(neutralVoteBtn){
		neutralVoteBtn.addEventListener('click', function(){
			deps.handleNeutralVoteBtnClick(neutralVoteBtn, deps);
		});
	});
}