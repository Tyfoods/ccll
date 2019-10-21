import React from 'react'
import makeRequest from '../../js/functions/makeRequest'

class RequestNewCategoryBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
		if(typeof is_user_logged_in !== 'undefined' && is_user_logged_in[0] === "false"){
            alert("Sorry, only logged in users request a category!");
            return;
		}
		else{

			
			var requestMsg= prompt("What category would you like to add?");
			if (requestMsg != null || requestMsg != '')
			{


				
				if(current_screen_type[0] === "page"){
					var current_screen_id = current_page_id;
				}
				if(current_screen_type[0] === "post"){
					var current_screen_id = current_post_id;
				}

				let newListData = {
						pendingListData: {
							"list_category": requestMsg,
							"list_page_orgin":current_screen_id[0],
							"screen_type": current_screen_type[0],
							"shortcode_source_id": parseInt(this.props.shortcodeSourceId)
						},
						commonUserId: ccllUserId[0]
				}

				//console.log(newListData);

				makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-link/v1/list-request/'+ccllUserId[0], "POST", JSON.stringify(newListData))
					.then(function(request){
						//console.log(request.responseText);
						alert("Thank you for submitting!");
					})
					.catch(function(error){
						console.log(error);
					});
			}
			else
			{
				////console.log("User Canceled");
			}
		}
    }


    render(){
        return(
            <button onClick ={this.handleClick} className = "ccll-admin-button request-new-category-btn">
                Request New Category +
            </button>
        )
    }
}

export default RequestNewCategoryBtn;