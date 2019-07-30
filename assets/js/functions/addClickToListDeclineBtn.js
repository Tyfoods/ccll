module.exports = function addClickToListDeclineBtn(deps){

	var cllListDeclineBtnArray = document.querySelectorAll(".pending-list-data__decline-btn");
	cllListDeclineBtnArray.forEach(function(cllListDeclineBtn) {
		cllListDeclineBtn.addEventListener("click", function(){
            deps.handleListDeclineBtnClick(cllListDeclineBtn, deps);
        });
    });
}