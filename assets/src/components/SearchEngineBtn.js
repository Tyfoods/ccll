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
        //console.log(request.responseText);
        let objResponse = JSON.parse(request.responseText);
        //console.log("processing turn ons search engine request");
        //console.log(objResponse);


        const ccllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
   
        const ccllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
        const ccllListRegex = /\[ccll_list\s?(.*?)\]/g;
        
        const ccllListShortcodeArray = objResponse.content.raw.match(ccllListRegex);
		//Get entire shortcode from which this set of lists was born.
        const entireCurrentShortcodeString = ccllListShortcodeArray[0];
        
        let listDataAtt = entireCurrentShortcodeString.match(ccllListDataRegex);

		if(listDataAtt == null){
            listDataAtt = '';
        }
        else{
            let listDataArrayString = listDataAtt[0].match(ccllListMatchJson);
            let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));
            //console.log(listDataObj);

            let newShortcode = `[ccll_list list_data='${JSON.stringify(listDataObj)}' is_search_engine_on='${!this.state.value}']`;
            
            let newPageContent = objResponse.content.raw.replace(ccllListShortcodeArray[0], newShortcode);

            let newPageData = {
                "content": newPageContent
            }


            if(current_screen_type[0] === "page"){
                makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData))
                    .then(function(){
                        document.location.reload(true);
                    })
                    //server side work to change visuals
            }
            if(current_screen_type[0] === "post"){
                makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+current_post_id, "POST", JSON.stringify(newPageData))
                    .then(function(){
                        document.location.reload(true);
                    })
                    //server side work to change visuals
            }
    
            
        }
    }


    handleClick(){
        if(confirm(`Are you sure you would like to turn ${(()=>{if(this.state.value === true){return "off";}else{return "on"}})()} the search engine?`)){
            let ThisSearchEngineBtn = this;
            if(current_screen_type[0] === "page"){
                makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
                    .then(function(request){
                        ThisSearchEngineBtn.processTurnOnSearchEngineRequest(request);
                    })
                    .catch(function(error){
                        //console.log(error);
                    });
            }
            if(current_screen_type[0] === "post"){
                makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+current_post_id, "POST")
                .then(function(request){
                    ThisSearchEngineBtn.processTurnOnSearchEngineRequest(request);
                })
                .catch(function(error){
                    //console.log(error);
                });
            }
        }
        else{

        }
    }

    render(){
        return(
                <button className="ccll-admin-button search-engine-btn" onClick={this.handleClick}>
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

