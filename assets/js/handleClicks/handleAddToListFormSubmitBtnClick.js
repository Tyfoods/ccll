import isUrl from "../functions/isUrl";
import endLinkRequest from "../functions/endLinkRequest";
import throughLinkRequest from "../functions/throughLinkRequest";
import makeRequest from "../functions/makeRequest";
import fadeOut from "../functions/fadeOut";

function handleAddToListFormSubmitBtnClick(categoryId, style){

    if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
        var x = document.getElementById("add-to-list-form__link-type-selector").selectedIndex;
        var linkType = document.getElementsByTagName("option")[x].value;

        if(document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input--style-'+style).value === ''){
            alert("You must submit a title!");
        }
        else if(linkType.toLowerCase() === 'external link')
        {
            if(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value === ''){
                alert("You must submit a URL!");
            }
            else if(!isUrl(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value))
            {
                alert("Please enter a valid URL!");
            }
            else
            {
                //console.log("running endlinkrequest");
                endLinkRequest(categoryId, style);
            }
        }
        else if(linkType.toLowerCase() === 'internal link')
        {
            throughLinkRequest(categoryId, style);
        }
        else if(linkType.toLowerCase() !== 'internal link' && linkType.toLowerCase() !== 'external link')
        {
            alert("You must select a Link Type!");
        }
    }
    else{
        if(document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input--style-'+style).value === ''){
            alert("You must submit a title!");
        }
        else if(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value === ''){
            alert("You must submit a URL!");
        }
        else if(!isUrl(document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value))
        {
            alert("Please enter a valid URL!");
        }
        else
        {
            
            //pass down list categoryId
            var multiListPageCategoryIds = categoryId;

            let linkRequestData = {
                newLinkItemData: {
                    "title": document.querySelector('[name="newListItemTitle"].add-to-list-form__add-to-list-input--style-'+style).value,
                    "content": document.querySelector('[name="newListItemUrl"].add-to-list-form__add-to-list-input--style-'+style).value,
                    "categories": multiListPageCategoryIds,
                    "status": "publish"
                },
                commonUserId: ccllUserId[0]
            }

            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-link/v1/link-request/'+ccllUserId[0], 'POST', JSON.stringify(linkRequestData))
                .then(function(request){
                    //console.log(request.responseText);
                    
                })
                .catch(function(error){
                    //console.log(error);
                });

            alert("Thank you for submitting!") //Change this so the JS instead says "Thank you for submitting, maybe an alert?"
            //add some function to refresh form fields and add temporary checkmark symbol
            document.getElementById("addToListForm").reset();
            
            var f = document.getElementById("addToListForm")
            var checkmark_symbol = document.createElement("img"); //button element, b button
            f.appendChild(checkmark_symbol);
            checkmark_symbol.setAttribute('name',"checkmark_symbol");
            checkmark_symbol.setAttribute('id',"checkmark_symbol");
            checkmark_symbol.setAttribute('src', ccllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/assets/images/checkmark.jpg');

            //fadeIn(checkmark_symbol);

            setTimeout(function(){ 
                document.getElementById("checkmark_symbol");
                fadeOut(checkmark_symbol); 
                }, 750);
            }

            
    }
}

export default handleAddToListFormSubmitBtnClick