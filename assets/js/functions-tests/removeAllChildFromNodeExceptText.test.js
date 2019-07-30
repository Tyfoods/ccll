const removeAllChildFromNodeExceptText = require('../functions/removeAllChildFromNodeExceptText.js');

/* Pseudo JSDom Enviornment for test */
const testEditCategoryBtn = document.createElement("type", "button");
testEditCategoryBtn.setAttribute("class", "cll-link-list__cll-edit-category-btn");
testEditCategoryBtn.innerHTML = "Edit Category";

var testCategorySelectorDropDownBox = document.createElement("type", "select");
//testCategorySelectorDropDownBox.setAttribute("class", "cll-edit-category-btn__list-category-selector");
//testCategorySelectorDropDownBox.setAttribute("class", "listCategorySelector");
//cll-edit-category-btn__list-category-selector

const testSubmitBtn = document.createElement("type", "button");
//testSubmitBtn.setAttribute("class", "cll-edit-category-btn__submit-btn");
testSubmitBtn.setAttribute("class", "settingsSubmitBtn");

const testCancelBtn = document.createElement("type", "button");
//cancelSubmitBtn.setAttribute("class", "cll-edit-category-btn__cancel-btn");
testCancelBtn.setAttribute("class", "cancelBtn");

testEditCategoryBtn.appendChild(testCategorySelectorDropDownBox);
testEditCategoryBtn.appendChild(testSubmitBtn);
testEditCategoryBtn.appendChild(testCancelBtn);


it('All non-text-node children removed', () =>{

    expect(testEditCategoryBtn.children.length).toBe(3);

    var node = removeAllChildFromNodeExceptText(testEditCategoryBtn);

    expect(node.children.length).toBe(0);
});