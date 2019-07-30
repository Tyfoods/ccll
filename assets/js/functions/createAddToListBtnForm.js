module.exports = function createAddToListBtnForm(currentAddToListBtn, deps){
    //if button has not been clicked, create form
    if(cllGlobals.isAddToListBtnClicked === false){
        var f = document.createElement("form");
        f.setAttribute('id','addToListForm');

        var linktitle = document.createElement("input");
        linktitle.setAttribute('type',"text");
        linktitle.setAttribute('name',"newListItemTitle");
        linktitle.setAttribute('placeholder',"Link title here");
        linktitle.setAttribute("class", "add-to-list-form__add-to-list-input");

        var link = document.createElement("input");
        link.setAttribute('type',"text");
        link.setAttribute('name',"newListItemUrl");
        link.setAttribute('placeholder',"URL here");
        link.setAttribute("class", "add-to-list-form__add-to-list-input");

        var b = document.createElement("button");
        b.setAttribute('name',"submitBtn");
        b.setAttribute('type', 'button');
        b.setAttribute('class','add-to-list-form__submit-btn');
        b.innerHTML = 'Submit';

        var cancelBtn = document.createElement("button");
        cancelBtn.setAttribute('name',"cancelBtn");
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.setAttribute('class','add-to-list-form__cancel-btn');

        if(cllIsAdmin[0] === "true"){
            var dropDownBox = document.createElement("select");
            dropDownBox.setAttribute('id','add-to-list-form__link-type-selector');

            var dropDownBoxPlaceHolder = document.createElement("option");
            dropDownBoxPlaceHolder.innerHTML = "Link Type";
            dropDownBoxPlaceHolder.value = '';
            dropDownBoxPlaceHolder.disabled = true;
            dropDownBoxPlaceHolder.selected = true;
            dropDownBoxPlaceHolder.hidden = true;
            //dropDownBoxPlaceHolder.required = true;

            var endLinkOption = document.createElement("option");
            endLinkOption.innerHTML = "External Link";
            //endLinkOption.setAttribute('name',"Link Type");

            var throughLinkOption = document.createElement("option");
            throughLinkOption.innerHTML = "Internal Link";
            //throughLinkOption.setAttribute('name',"Link Type");
        
            dropDownBox.appendChild(endLinkOption);
            dropDownBox.appendChild(throughLinkOption);
            dropDownBox.appendChild(dropDownBoxPlaceHolder);

            f.appendChild(dropDownBox);

            dropDownBox.addEventListener('change', function(){

                var x = document.getElementById("add-to-list-form__link-type-selector").selectedIndex;
                var linkType = document.getElementsByTagName("option")[x].value;
    
                if(linkType.toLowerCase() === 'internal link')
                {
                    link.parentNode.removeChild(link);
                }
                else if(linkType.toLowerCase() === 'external link')
                {
                    linktitle.parentNode.insertBefore(link, linktitle.nextSibling);
                    //f.appendChild(link);
                }
            });
        }

        f.appendChild(linktitle);
        f.appendChild(link);
        f.appendChild(b);
        f.appendChild(cancelBtn);


        currentAddToListBtn.appendChild(f);

        cllGlobals.isAddToListBtnClicked = true;
        deps.addClickToAddToListBtnFormSubmitBtn(currentAddToListBtn, deps);
        deps.addClickToAddToListBtnFormCancelBtn();

        //change form depending on link type selected

        //var box = document.getElementById("linkTypeSelecter");

    }
}