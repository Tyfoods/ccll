module.exports = function addClickToSettingsCancelBtn() {
	var cancelBtnArray = document.querySelectorAll(".cancelBtn");
	cancelBtnArray.forEach(function(cancelBtn){
		if (typeof cancelBtn !== 'undefined'){
			cancelBtn.addEventListener("click", function(){

				var dropDownBox = document.querySelector(".listCategorySelector");
				var settingsSubmitBtn = document.querySelector(".settingsSubmitBtn");

				//var editCategoryBtnArray = document.querySelectorAll('.cll_edit_category_btn');

				var newCategoryInput = document.querySelector("input[name='newCategoryRequestElement']");
								
				dropDownBox.parentNode.removeChild(dropDownBox);
				settingsSubmitBtn.parentNode.removeChild(settingsSubmitBtn);
				cancelBtn.parentNode.removeChild(cancelBtn);
				if(newCategoryInput){
					newCategoryInput.parentNode.removeChild(newCategoryInput);
				}
				

				event.stopPropagation(); //prevent parent element from being clicked
				cllGlobals.isSettingsFormClicked = false;
			});
		} else {
			//console.log('settings cancelBtn is not defined');
		}
	});
};