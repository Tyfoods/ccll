module.exports = function addClickToEditCategoryBtn(deps){
	
	var editCategoryBtnArray = document.querySelectorAll(".cll_edit_category_btn");

	editCategoryBtnArray.forEach(function(editCategoryBtn)
	{

		editCategoryBtn.addEventListener("click", function()
		{
			deps.createEditCategoryBtnForm(editCategoryBtn, deps);

		});
	});
}
