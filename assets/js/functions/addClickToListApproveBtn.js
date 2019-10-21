module.exports = function addOnClickToListApproveBtn(deps){
	var ccllListApproveBtnArray = document.querySelectorAll(".pending-list-data__approve-btn");
	ccllListApproveBtnArray.forEach(function(ccllListApproveBtn) {
		ccllListApproveBtn.addEventListener("click", function(){
            deps.handleListApproveBtnClick(ccllListApproveBtn, deps);
        });
    });
}