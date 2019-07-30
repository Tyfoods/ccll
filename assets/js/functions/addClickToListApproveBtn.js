module.exports = function addOnClickToListApproveBtn(deps){
	var cllListApproveBtnArray = document.querySelectorAll(".pending-list-data__approve-btn");
	cllListApproveBtnArray.forEach(function(cllListApproveBtn) {
		cllListApproveBtn.addEventListener("click", function(){
            deps.handleListApproveBtnClick(cllListApproveBtn, deps);
        });
    });
}