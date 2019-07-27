//DEPENDENCIES MUST BE ACCOUNTED FOR!

module.exports = function handleCategoryEdit(editCategoryForm, selectedCategory, deps){
    if(selectedCategory === 'new category'){
        if(cllGlobals.isCategoryInputCreated === false)
        {
        alert('You are making a New Category Request!');
        var newCategoryRequestElement = document.createElement("input"); //input element, text
        newCategoryRequestElement.setAttribute('type',"text");
        newCategoryRequestElement.setAttribute('name',"newCategoryRequestElement");
        newCategoryRequestElement.setAttribute('placeholder',"New category here");

        editCategoryForm.appendChild(newCategoryRequestElement);

        cllGlobals.isCategoryInputCreated = true;
        }
        else if(cllGlobals.isCategoryInputCreated === true)
        {
            var newCategoryValue = document.querySelector('[name="newCategoryRequestElement"]').value
            //console.log(newCategoryValue);
            deps.createNewCategoryRequest(newCategoryValue.toLowerCase(), deps);
            //create new category with this value and change page to this category
            var cllRequestData = {
                "selectedCategory":newCategoryValue.toLowerCase(),
                "currentCllId":editCategoryForm.getAttribute('cllid')
            }
            deps.updateCllListRequest(cllRequestData, deps);
        }
    }
    else{
        for (var {} of existing_category_names_array) {
            if(selectedCategory === ''){
                alert("You must select a link category!");
                break;
            } else if(selectedCategory !== ''){
                //console.log("Successfully adding "+selectedCategory);
                //HTTP Request to update page FUNCTION
                var cllRequestData = {
                    "selectedCategory":selectedCategory,
                    "currentCllId":editCategoryForm.getAttribute('cllid')
                }
                deps.updateCllListRequest(cllRequestData, deps);
                break;
            }
        }
    }
}