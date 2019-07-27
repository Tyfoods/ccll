module.exports = function addClickToUpVoteBtn(deps){
	var upVoteBtnArray = document.querySelectorAll('.up_vote_button');
	upVoteBtnArray.forEach(function(upVoteBtn){
		upVoteBtn.addEventListener('click', function(){
			deps.handleUpVoteBtnClick(upVoteBtn, deps);
		});
	});
}