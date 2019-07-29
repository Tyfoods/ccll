module.exports = function addClickToLinkApproveBtn(deps){
    var cllApproveBtnArray = document.querySelectorAll(".cllApproveBtn");
    cllApproveBtnArray.forEach(function(cllApproveBtn) {
        cllApproveBtn.addEventListener("click", function(){
            deps.handleLinkApproveBtnClick(cllApproveBtn, deps);
        });
    });
}