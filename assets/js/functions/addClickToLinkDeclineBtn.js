module.exports = function addClickToLinkDeclineBtn(deps)
{

	var cllDeclineBtnArray = document.querySelectorAll(".pending-link-data__decline-btn");
	cllDeclineBtnArray.forEach(function(cllDeclineBtn) {
		cllDeclineBtn.addEventListener("click", function(){
			deps.handleLinkDeclineBtnClick(cllDeclineBtn, deps);
		});
	});
}