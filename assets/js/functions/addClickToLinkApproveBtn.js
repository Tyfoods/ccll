module.exports = function addClickToLinkApproveBtn(deps){
    var cllApproveBtnArray = document.querySelectorAll(".pending-link-data__approve-btn");
    cllApproveBtnArray.forEach(function(cllApproveBtn) {
        cllApproveBtn.addEventListener("click", function(){
            deps.handleLinkApproveBtnClick(cllApproveBtn, deps);
        });
    });
}