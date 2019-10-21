module.exports = function addClickToLinkDeclineBtn(deps)
{

	var ccllDeclineBtnArray = document.querySelectorAll(".pending-link-data__decline-btn");
	ccllDeclineBtnArray.forEach(function(ccllDeclineBtn) {
		ccllDeclineBtn.addEventListener("click", function(){
			deps.handleLinkDeclineBtnClick(ccllDeclineBtn, deps);
		});
	});
}