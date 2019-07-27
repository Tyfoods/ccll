

module.exports = function addClickToEditCategoryFormCancelBtn(deps) {
	var cancelBtnArray = document.querySelectorAll(".cancelBtn");
	cancelBtnArray.forEach(function(cancelBtn){
		if (typeof cancelBtn !== 'undefined'){
			cancelBtn.addEventListener("click", function(){

				var editCategoryBtn = cancelBtn.parentNode;
				deps.removeAllChildFromNodeExceptText(editCategoryBtn);

				event.stopPropagation(); //prevent parent element from being clicked
				cllGlobals.isEditCategoryFormCreated = false;
				//return false;
			});
		} else {
			//console.log('settings cancelBtn is not defined');
		}
	});
};