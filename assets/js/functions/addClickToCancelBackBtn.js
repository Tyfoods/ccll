module.exports = function addClickToCancelBackBtn(deps) {
	var cancelBackBtn = document.querySelector(".back-btn__cancel-btn");
    if (typeof cancelBackBtn !== 'undefined'){
        cancelBackBtn.addEventListener("click", function(){

            var backBtn = cancelBackBtn.parentNode;
            backBtn.style.cssText = "";
            deps.removeAllChildFromNodeExceptText(backBtn);

            event.stopPropagation(); //prevent parent element from being clicked
            cllGlobals.isBackBtnClicked = false;
        });
    } else {
        console.log('back-btn is not defined');
    }

};