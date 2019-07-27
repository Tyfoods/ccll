module.exports = function createEditCategoryBtn(setAttributeOfElementsInArrayIncrementally){

	//createElementandAppendIt
	var cllLinkListArray = document.querySelectorAll('.cll_link_list');

	cllLinkListArray.forEach(function(cllLinkList)
	{
		var cllSettingsBtn = document.createElement("button");
		cllSettingsBtn.setAttribute('class', 'cll_edit_category_btn');
		cllSettingsBtn.innerHTML = "Edit Category"
		cllLinkList.insertBefore(cllSettingsBtn, cllLinkList.firstChild);
	});

	var editCategoryBtnArray = document.querySelectorAll(".cll_edit_category_btn");

    setAttributeOfElementsInArrayIncrementally(editCategoryBtnArray, "cllId");
}