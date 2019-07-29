module.exports = function addClickToLinkDeclineBtn(deps)
{

	var cllDeclineBtnArray = document.querySelectorAll(".cllDeclineBtn");
	cllDeclineBtnArray.forEach(function(cllDeclineBtn) {
		cllDeclineBtn.addEventListener("click", function(){
			deps.handleLinkDeclineBtnClick(cllDeclineBtn, deps);
		});
	});
}