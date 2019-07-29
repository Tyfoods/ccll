module.exports = function addClickToListDeclineBtn(deps){

	var cllListDeclineBtnArray = document.querySelectorAll(".cllListDeclineBtn");
	cllListDeclineBtnArray.forEach(function(cllListDeclineBtn) {
		cllListDeclineBtn.addEventListener("click", function(){
            deps.handleListDeclineBtnClick(cllListDeclineBtn, deps);
        });
    });
}