module.exports = function addClickToDownVoteBtn (deps){
    var downVoteBtnArray = document.querySelectorAll('.down_vote_button');
    
	downVoteBtnArray.forEach(function(downVoteBtn){
		downVoteBtn.addEventListener('click', function(){
			deps.handleDownVoteBtnClick(downVoteBtn, deps);
		});
	});
}