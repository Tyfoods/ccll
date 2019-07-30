module.exports = function addClickToNeutralVoteBtn(deps){
	var neutralVoteBtnArray = document.querySelectorAll('.link-list-item__neutral-vote-button');
	neutralVoteBtnArray.forEach(function(neutralVoteBtn){
		neutralVoteBtn.addEventListener('click', function(){
			deps.handleNeutralVoteBtnClick(neutralVoteBtn, deps);
		});
	});
}