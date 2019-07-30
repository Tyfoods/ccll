module.exports = function addClickToUpVoteBtn(deps){
	var upVoteBtnArray = document.querySelectorAll('.link-list-item__up-vote-button');
	upVoteBtnArray.forEach(function(upVoteBtn){
		upVoteBtn.addEventListener('click', function(){
			deps.handleUpVoteBtnClick(upVoteBtn, deps);
		});
	});
}