import React from 'react'
import makeRequest from '../../js/functions/makeRequest'
import {DataStorageContext} from './MyProvider'

class DeleteListBtn extends React.Component{

	static contextType = DataStorageContext;

    constructor(){
        super();
        this.state = {

		}
		this.processDeleteRequest = this.processDeleteRequest.bind(this);
	}

	processDeleteRequest(request){
		var objResponse = JSON.parse(request.responseText);

		const cllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
        const cllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
		const cllListRegex = /\[cll_list\s?(.*?)\]/g;
		
		//Get array of all shortcodes on page
		const cllListShortcodeArray = objResponse.content.raw.match(cllListRegex);
		//Get entire shortcode from which this set of lists was born.
		const entireCurrentShortcodeString = cllListShortcodeArray[this.props.shortcodeSourceId-1];

		//getData and check if it exists
		let listDataAtt = entireCurrentShortcodeString.match(cllListDataRegex);
		//if data doesn't there is only one "starter" list, that should probably just be deleted off of the page after use confirms
		if(listDataAtt == null){
			if(confirm("There's only one list! Would you like to delete the shortcode from the page?")){
							//using -1 because "shortcodeSourceId" starts its count a 1, not 0.
				let newPageContent = objResponse.content.raw.replace(cllListShortcodeArray[this.props.shortcodeSourceId-1], '');

				let newPageData = {
					"content": newPageContent
				}
	
				////console.log(newPageContent);
	
	
				//Delete the appropriate list from the front end and server.
				if(current_screen_type[0] === "page"){
					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData));
	
					this.props.setDisplayNoneOnList();
				}
				if(current_screen_type[0] === "post"){
					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST", JSON.stringify(newPageData));
	
					this.props.setDisplayNoneOnList();
				}
			}
			else{
				return;
			}

		}
		else{

			let listDataArrayString = listDataAtt[0].match(cllListMatchJson);
			let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));


			//Modify Data appropriately
			delete listDataObj[`${this.props.listId}`];

			//Create newShortcode
			let newShortcode = "[cll_list = "+"list_data='"+JSON.stringify(listDataObj)+"']";
			//console.log(Object.keys(listDataObj));
			if(Object.keys(listDataObj).length === 0){
				if(confirm("There's only one list! Would you like to delete the shortcode from the page?")){
					newShortcode = '';
				}
				else{
					throw new Error("User did not want to delete shortcode!");
				}
			}



			let newPageContent = objResponse.content.raw.replace(cllListShortcodeArray[this.props.shortcodeSourceId-1], newShortcode);

			let newPageData = {
				"content": newPageContent
			}

			////console.log(newPageContent);


			//Delete the appropriate list from the front end and server.
			if(current_screen_type[0] === "page"){
				makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData));

				this.props.setDisplayNoneOnList();
			}
			if(current_screen_type[0] === "post"){
				makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST", JSON.stringify(newPageData));

				this.props.setDisplayNoneOnList();
			}

		}
		

	}
	
	handleDeleteListBtnClick(){
		let ThisDeleteBtn = this;

		//console.log(current_screen_type[0] === "page");
		//console.log(current_screen_type[0] === "post");


		if(current_screen_type[0] === "page"){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
				.then(function(request){
					ThisDeleteBtn.processDeleteRequest(request);
				})
				.catch(function(error){
					//console.log(error);
				});
		}
		if(current_screen_type[0] === "post"){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST")
			.then(function(request){
				ThisDeleteBtn.processDeleteRequest(request);
			})
			.catch(function(error){
				//console.log(error);
			});
		}



			return;
	}
    
    render(){
        return(
            <button className={`cll-admin-button delete-list-btn--style-${this.context.style}`} onClick={this.handleDeleteListBtnClick.bind(this)}>Delete List</button>
        )
    }
}

export default DeleteListBtn;