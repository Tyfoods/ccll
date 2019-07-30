module.exports = function addClickToDownVoteBtn (deps){
    var downVoteBtnArray = document.querySelectorAll('.link-list-item__down-vote-button');
    
	downVoteBtnArray.forEach(function(downVoteBtn){
		downVoteBtn.addEventListener('click', function(){
			deps.handleDownVoteBtnClick(downVoteBtn, deps);
		});
	});
}