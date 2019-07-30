module.exports = function addClickToEditCategoryBtn(deps){
	
	var editCategoryBtnArray = document.querySelectorAll(".cll-link-list__cll-edit-category-btn");

	editCategoryBtnArray.forEach(function(editCategoryBtn)
	{

		editCategoryBtn.addEventListener("click", function()
		{
			deps.createEditCategoryBtnForm(editCategoryBtn, deps);

		});
	});
}
