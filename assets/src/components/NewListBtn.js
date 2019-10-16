import React from 'react'
import makeRequest from '../../js/functions/makeRequest'

class NewListBtn extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

        this.handleClick = this.handleClick.bind(this);
        this.processNewListRequest = this.processNewListRequest.bind(this);
    }

    processNewListRequest(request){
        var objResponse = JSON.parse(request.responseText);

        const cllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
        const cllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
        const cllListRegex = /\[cll_list\s?(.*?)\]/g;
        const cllIsSearchEngineOnRegex = /is_search_engine_on\s?=\s?(\'|\")(.*?)(\'|\")/g

        
        //Get array of all shortcodes on page
        const cllListShortcodeArray = objResponse.content.raw.match(cllListRegex);
        //Get entire shortcode from which this set of lists was born.
        const entireCurrentShortcodeString = cllListShortcodeArray[this.props.shortcodeSourceId-1];
        
        let searchEngineSetting = entireCurrentShortcodeString.match(cllIsSearchEngineOnRegex);
        if(searchEngineSetting == null){
            searchEngineSetting = '';
        }

        //getData and check if it exists
        let listDataAtt = entireCurrentShortcodeString.match(cllListDataRegex);
        if(listDataAtt == null){ //if data doesn't exist do this
            listDataAtt = [];
            listDataAtt[0] = '"{ "1": { "style": "2", "category_name": "" } }"'
            //when not null, "listDataArrayString" requires one to strip the first and last character
            //To leverage the code below, we'll stick extra characters in hence the extra quotes outside jSon

        }
        let listDataArrayString = listDataAtt[0].match(cllListMatchJson);
        //console.log(listDataArrayString);
        //console.log(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));
        let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));


        //get id for NewList
        function createNewListId(prospectiveNewListId){

            function checkPropspectiveNewListExistence(){
                if(listDataObj.hasOwnProperty(prospectiveNewListId)){
                    return true;
                    }
            }
            while (checkPropspectiveNewListExistence() === true){
                prospectiveNewListId+=1;
            }
            return prospectiveNewListId;

        }
        let listDataObjKeysArray = Object.keys(listDataObj);
        let smallestKeyInListArray = Math.min(...listDataObjKeysArray);
        let newListId = createNewListId(smallestKeyInListArray);

        //Modify Data appropriately
        listDataObj[`${newListId}`] = {};
        listDataObj[`${newListId}`]['category_name'] = "";
        listDataObj[`${newListId}`]['style'] = "2";
        
        //createShortCode
        let newShortcode = `[cll_list list_data='${JSON.stringify(listDataObj)}' ${searchEngineSetting}']`;

    
        //console.log(objResponse.content.raw);
    
        let newPageContent = objResponse.content.raw.replace(cllListShortcodeArray[this.props.shortcodeSourceId-1], newShortcode);

        //console.log(newPageContent);

        let newPageData = {
            "content": newPageContent
        }
    
        const updatePage = (newPageData)=>{
            if(current_screen_type[0] === "page"){
            return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData));
            }
            if(current_screen_type[0] === "post"){
                return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST", JSON.stringify(newPageData));
            }
        }

        
        updatePage(newPageData)
            .then(function(){
                document.location.reload(true);
             })
            .catch(function(){
                ////console.log("Unsuccesful page update!");
            });
            
    }

    handleClick(){
        /*
        Page, or Post? Request content
        Determine WHICH shortcode you're on, 
        */

        let ThisNewListBtn = this;
       
		if (confirm("Are you sure you would like to add a new list?")) {
			////console.log("You pressed YES!");
				(()=>{
					if(current_screen_type[0] === "page"){
					return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST");
					}
					if(current_screen_type[0] === "post"){
						return makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST");
					}
				})()
				.then(function(request){

                    ThisNewListBtn.processNewListRequest(request);
				})
				.catch(function(error){
					//console.log(error);
					////console.log("Unable to get page with given ID");
				});

        } else {
        ////console.log("You pressed NO");
        }
    }
    
    render(){
        return(
            <button onClick={this.handleClick} className={`new-list-btn cll-admin-button`}>Add New List +</button>
        )
    }
    
}

export default NewListBtn;