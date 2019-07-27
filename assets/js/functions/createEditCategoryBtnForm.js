module.exports = function handleEditCategoryBtnClick(editCategoryBtn, deps){
    if(cllGlobals.isEditCategoryFormCreated === false)
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


        editCategoryBtn.appendChild(dropDownBox);
        editCategoryBtn.appendChild(b);
        editCategoryBtn.appendChild(cancelBtn);


        //console.log("Create Settings Form has Run");
        cllGlobals.isEditCategoryFormCreated = true;

        deps.addClickToEditCategoryFormSubmitBtn(editCategoryBtn, deps);
        deps.addClickToEditCategoryFormCancelBtn(deps);
    }
}