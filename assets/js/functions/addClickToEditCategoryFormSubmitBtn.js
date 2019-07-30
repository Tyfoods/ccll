module.exports = //Function for creating on-click functionality and information to UPDATE page
function addClickToEditCategoryFormSubmitBtn(editCategoryBtn, deps){
	var editCategoryFormSubmitBtnArray = document.querySelectorAll('.cll-edit-categoy-btn__submit-btn');
	editCategoryFormSubmitBtnArray.forEach(function(editCategoryFormSubmitBtn){
		if (typeof editCategoryFormSubmitBtn !== 'undefined'){

			editCategoryFormSubmitBtn.addEventListener("click", function(){
				event.preventDefault();
				var x = document.querySelector(".cll-edit-category-btn__list-category-selector").selectedIndex;
				var selectedCategory = document.getElementsByTagName("option")[x].value;

				deps.handleCategoryEdit(editCategoryBtn, selectedCategory, deps);
			});
		}
	});
}