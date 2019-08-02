const addClickToAddToListBtn = require('../functions/addClickToAddToListBtn');
const setAttributeOfElementsInArrayIncrementally = require('../functions/setAttributeOfElementsInArrayIncrementally');
const isObjEmpty = require('../functions/isObjEmpty');

const deps = {
    "setAttributeOfElementsInArrayIncrementally": setAttributeOfElementsInArrayIncrementally,
}



//let testDiv = document.createElement('div');

document.body.innerHTML =
'<div id="testDiv">' +
'</div>';

let numberOfAddToListBtns = 4;
while(numberOfAddToListBtns !==0 ){
    let addToListBtn = document.createElement('p');
    addToListBtn.setAttribute('class', 'cll-link-list__add-to-list-btn');
    addToListBtn.setAttribute('id', 'add-to-list-btn');
    document.getElementById('testDiv').appendChild(addToListBtn);

    numberOfAddToListBtns-=1;
}

it("addToListBtnArray is not empty when addToListBtn class = 'cll-link-list__add-to-list-btn'",()=>{
    let addToListBtnArray = addClickToAddToListBtn(deps);

    //var testBtnGrab = document.getElementById('add-to-list-btn');
    //expect(testBtnGrab !== null).toBe(true); //fails testBtnGrab is null
    expect(isObjEmpty(addToListBtnArray)).toBe(false); //fails

   //expect(typeof addToListBtnArray).toBe("object"); //passes


});

it("",()=>{
    let addToListBtnArray = addClickToAddToListBtn(deps);

    expect(isObjEmpty(addToListBtnArray)).toBe(false); //passes
    addToListBtnArray.forEach(function(addToListBtn){
        //check if addToListBtn has cllId Attribute
    })

});
