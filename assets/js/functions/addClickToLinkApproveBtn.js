module.exports = function addClickToLinkApproveBtn(deps){
    var ccllApproveBtnArray = document.querySelectorAll(".pending-link-data__approve-btn");
    ccllApproveBtnArray.forEach(function(ccllApproveBtn) {
        ccllApproveBtn.addEventListener("click", function(){
            deps.handleLinkApproveBtnClick(ccllApproveBtn, deps);
        });
    });
}