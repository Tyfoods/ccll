module.exports = function addOnClickToListApproveBtn(deps){
	var cllListApproveBtnArray = document.querySelectorAll(".cllListApproveBtn");
	cllListApproveBtnArray.forEach(function(cllListApproveBtn) {
		cllListApproveBtn.addEventListener("click", function(){
            deps.handleListApproveBtnClick(cllListApproveBtn, deps);
        });
    });
}