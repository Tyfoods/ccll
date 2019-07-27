module.exports = //Function for creating on-click functionality and information to UPDATE page
function addClickToEditCategoryFormSubmitBtn(editCategoryBtn, deps){
	var editCategoryFormSubmitBtnArray = document.querySelectorAll('.settingsSubmitBtn');
	editCategoryFormSubmitBtnArray.forEach(function(editCategoryFormSubmitBtn){
		if (typeof editCategoryFormSubmitBtn !== 'undefined'){

			editCategoryFormSubmitBtn.addEventListener("click", function(){
				event.preventDefault();
				var x = document.querySelector(".listCategorySelector").selectedIndex;
				var selectedCategory = document.getElementsByTagName("option")[x].value;

				deps.handleCategoryEdit(editCategoryBtn, selectedCategory, deps);
			});
		}
	});
}