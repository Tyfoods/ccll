//DEPENDENCIES MUST BE ACCOUNTED FOR!

module.exports = function handleCategoryEdit(editCategoryForm, selectedCategory, deps){
    if(selectedCategory === 'new category'){
        if(ccllGlobals.isCategoryInputCreated === false)
        {
        alert('You are making a New Category Request!');
        var newCategoryRequestElement = document.createElement("input"); //input element, text
        newCategoryRequestElement.setAttribute('type',"text");
        newCategoryRequestElement.setAttribute('name',"newCategoryRequestElement");
        newCategoryRequestElement.setAttribute('placeholder',"New category here");

        editCategoryForm.appendChild(newCategoryRequestElement);

        ccllGlobals.isCategoryInputCreated = true;
        }
        else if(ccllGlobals.isCategoryInputCreated === true)
        {
            var newCategoryValue = document.querySelector('[name="newCategoryRequestElement"]').value
            ////console.log(newCategoryValue);
            deps.createNewCategoryRequest(newCategoryValue.toLowerCase(), deps);
            //create new category with this value and change page to this category
            var ccllRequestData = {
                "selectedCategory":newCategoryValue.toLowerCase(),
                "currentccllId":editCategoryForm.getAttribute('ccllid')
            }
            deps.updateCcllListRequest(ccllRequestData, deps);
        }
    }
    else{
        for (var {} of existing_category_names_array) {
            if(selectedCategory === ''){
                alert("You must select a link category!");
                break;
            } else if(selectedCategory !== ''){
                ////console.log("Successfully adding "+selectedCategory);
                //HTTP Request to update page FUNCTION
                var ccllRequestData = {
                    "selectedCategory":selectedCategory,
                    "currentCcllId":editCategoryForm.getAttribute('ccllid')
                }
                deps.updateCcllListRequest(ccllRequestData, deps);
                break;
            }
        }
    }
}