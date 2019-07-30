module.exports = function createEditCategoryBtn(setAttributeOfElementsInArrayIncrementally){

	//createElementandAppendIt
	var cllLinkListArray = document.querySelectorAll('.cll-link-list');

	cllLinkListArray.forEach(function(cllLinkList)
	{
		var cllSettingsBtn = document.createElement("button");
		cllSettingsBtn.setAttribute('class', 'cll-link-list__cll-edit-category-btn');
		cllSettingsBtn.innerHTML = "Edit Category"
		cllLinkList.insertBefore(cllSettingsBtn, cllLinkList.firstChild);
	});

	var editCategoryBtnArray = document.querySelectorAll(".cll-link-list__cll-edit-category-btn");

    setAttributeOfElementsInArrayIncrementally(editCategoryBtnArray, "cllId");
}