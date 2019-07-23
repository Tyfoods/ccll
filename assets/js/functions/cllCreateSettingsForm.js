module.exports = function cllCreateSettingsForm(addClickToSettingsSubmitBtn, addClickToSettingsCancelBtn, updateCllListRequest, createNewCategoryRequest, makeRequest, replaceOccurrence)
{
	var settingsFormInc = 0;

	//createElementandAppendIt
	var cllLinkListArray = document.querySelectorAll('.cll_link_list');

	cllLinkListArray.forEach(function(cllLinkList)
	{
		var cllSettingsBtn = document.createElement("button");
		cllSettingsBtn.setAttribute('class', 'cll_edit_category_btn');
		cllSettingsBtn.innerHTML = "Edit Category"
		cllLinkList.insertBefore(cllSettingsBtn, cllLinkList.firstChild);
	});

	var cllSettingsFormArray = document.querySelectorAll(".cll_edit_category_btn");

	cllSettingsFormArray.forEach(function(cllSettingsForm)
	{
		var cllid = document.createAttribute('cllid');
		cllSettingsForm.setAttributeNode(cllid);
		cllSettingsForm.setAttribute('cllid',settingsFormInc);

		settingsFormInc+=1;
	});
	

	cllSettingsFormArray.forEach(function(cllSettingsForm)
	{


		cllSettingsForm.addEventListener("click", function()
		{
			if(cllGlobals.isSettingsFormClicked === false)
			{
				var dropDownBox = document.createElement("select"); //input element, text
				dropDownBox.setAttribute('class','listCategorySelector');

				var dropDownBoxPlaceHolder = document.createElement("option"); //input element, text
				dropDownBoxPlaceHolder.innerHTML = "List Category";
				dropDownBoxPlaceHolder.value = '';
				dropDownBoxPlaceHolder.disabled = true;
				dropDownBoxPlaceHolder.selected = true;
				dropDownBoxPlaceHolder.hidden = true;

				var addNewCategory = document.createElement("option"); //input element, text
				addNewCategory.innerHTML = "New Category + ";
				addNewCategory.value = 'new category';

				dropDownBox.appendChild(addNewCategory);

				var b = document.createElement("button"); //button element, b button
				b.setAttribute('name',"settingsSubmitBtn");
				b.setAttribute('type', 'button');
				b.setAttribute('class','settingsSubmitBtn');
				b.innerHTML = 'Submit';

				var cancelBtn = document.createElement("button");
				cancelBtn.setAttribute('name',"cancelBtn");
				cancelBtn.setAttribute('type', 'button');
				cancelBtn.setAttribute('class','cancelBtn');


				existing_category_names_array.forEach(function(existing_category_name){
					var existing_category_option = document.createElement("option");
					existing_category_option.innerHTML = existing_category_name;

					dropDownBox.appendChild(existing_category_option);
				});


				cllSettingsForm.appendChild(dropDownBox);
				cllSettingsForm.appendChild(b);
				cllSettingsForm.appendChild(cancelBtn);


				//console.log("Create Settings Form has Run");
				cllGlobals.isSettingsFormClicked = true;

				addClickToSettingsSubmitBtn(cllSettingsForm, updateCllListRequest, createNewCategoryRequest, makeRequest, replaceOccurrence);
				addClickToSettingsCancelBtn();
			}

		});
	});
}
