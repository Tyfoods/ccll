module.exports = function addClickToListDeclineBtn(deps){

	var ccllListDeclineBtnArray = document.querySelectorAll(".pending-list-data__decline-btn");
	ccllListDeclineBtnArray.forEach(function(ccllListDeclineBtn) {
		ccllListDeclineBtn.addEventListener("click", function(){
            deps.handleListDeclineBtnClick(ccllListDeclineBtn, deps);
        });
    });
}