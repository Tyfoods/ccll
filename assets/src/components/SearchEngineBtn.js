import React from 'react'
import makeRequest from '../../js/functions/makeRequest'

class SearchEngineBtn extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            value: this.props.is_search_engine_on
        }

        this.handleClick = this.handleClick.bind(this);
    }
    
    processTurnOnSearchEngineRequest(request){
        console.log(request.responseText);
        let objResponse = JSON.parse(request.responseText);
        console.log("processing turn ons search engine request");
        console.log(objResponse);


        const cllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
   
        const cllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
        const cllListRegex = /\[new_cll_list\s?(.*?)\]/g;
        
        const cllListShortcodeArray = objResponse.content.raw.match(cllListRegex);
		//Get entire shortcode from which this set of lists was born.
        const entireCurrentShortcodeString = cllListShortcodeArray[0];
        
        let listDataAtt = entireCurrentShortcodeString.match(cllListDataRegex);

		if(listDataAtt == null){
            listDataAtt = '';
        }
        else{
            let listDataArrayString = listDataAtt[0].match(cllListMatchJson);
            let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));
            console.log(listDataObj);

            let newShortcode = `[new_cll_list list_data='${JSON.stringify(listDataObj)}' is_search_engine_on='${!this.state.value}']`;
            
            let newPageContent = objResponse.content.raw.replace(cllListShortcodeArray[0], newShortcode);

            let newPageData = {
                "content": newPageContent
            }


            if(current_screen_type[0] === "page"){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData));
                    //server side work to change visuals
            }
            if(current_screen_type[0] === "post"){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST", JSON.stringify(newPageData));
                    //server side work to change visuals
            }
    
            
        }
    }


    handleClick(){
        if(confirm(`Are you sure you would like to turn ${(()=>{if(this.state.value === true){return "off";}else{return "on"}})()} the search engine?`)){
            let ThisSearchEngineBtn = this;
            if(current_screen_type[0] === "page"){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
                    .then(function(request){
                        ThisSearchEngineBtn.processTurnOnSearchEngineRequest(request);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            if(current_screen_type[0] === "post"){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST")
                .then(function(request){
                    ThisSearchEngineBtn.processTurnOnSearchEngineRequest(request);
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        }
        else{

        }
    }

    render(){
        return(
                <button className="cll-admin-button search-engine-btn" onClick={this.handleClick}>
                {
                    (()=>{if(this.props.is_search_engine_on === true){
                            return(
                                "Search Engine Status: On"
                            )
                        }
                        else{
                            return(
                                "Search Engine Status: Off"
                            )
                        }

                    })()
                    }
                </button>
        )
    }
}

export default SearchEngineBtn;

