import React from 'react'
import makeRequest from '../../js/functions/makeRequest'

class EditStyleBtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "1",
            isClicked: false,
            

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
        this.handleSubmitBtnClick = this.handleSubmitBtnClick.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    processEditStyleRequest(request){
        //console.log(request.responseText);
        let objResponse = JSON.parse(request.responseText);
        //console.log("processing edit style request");
        //console.log(objResponse);


        const cllListDataRegex = /list_data\s?=\s?(\'|\")\{(.*?)\}(\'|\")/g
        const cllIsSearchEngineOnRegex = /is_search_engine_on\s?=\s?(\'|\")(.*?)(\'|\")/g
        const cllListMatchJson = /(\'|\")\{(.*?)\}(\'|\")/g;
        const cllListRegex = /\[cll_list\s?(.*?)\]/g;
        
        const cllListShortcodeArray = objResponse.content.raw.match(cllListRegex);
		//Get entire shortcode from which this set of lists was born.
        const entireCurrentShortcodeString = cllListShortcodeArray[this.props.shortcodeSourceId-1];
        
        let listDataAtt = entireCurrentShortcodeString.match(cllListDataRegex);
        let searchEngineSetting = entireCurrentShortcodeString.match(cllIsSearchEngineOnRegex);
        if(searchEngineSetting == null){
            searchEngineSetting = '';
        }
		//if data doesn't there is only one "starter" list, that should probably just be deleted off of the page after use confirms
		if(listDataAtt == null){
            //there is one list and there isn't any listData
            //console.log("There is one list and no data");
            
            let newShortcode = `[new_list_data list_data='{ "1": { "style": "${this.state.value}", "category_name": "" } }']`
            let newPageContent = objResponse.content.raw.replace(cllListShortcodeArray[this.props.shortcodeSourceId-1], newShortcode);
            
            let newPageData = {
                "content": newPageContent
            }

            //Delete the appropriate list from the front end and server.
            if(current_screen_type[0] === "page"){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData));
                //server side work to change visuals
            }
            if(current_screen_type[0] === "post"){
                makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST", JSON.stringify(newPageData));
                //server side work to change visuals
            }
                

        }
        else{
            let listDataArrayString = listDataAtt[0].match(cllListMatchJson);
            let listDataObj = JSON.parse(listDataArrayString[0].substr(1, listDataArrayString[0].length-2));
            //console.log(listDataObj);
            let currentListStyle = listDataObj[`${this.props.listId}`].style;
            if(currentListStyle === this.state.value){
                //console.log("current style equals state!");
                alert(this.state.value+" is already the style!");
            }
            else{
                //console.log("Does not equal state!");
                //makeRequest to change the state.

                listDataObj[`${this.props.listId}`].style = this.state.value;
                //console.log(listDataObj);

                let newShortcode = `[cll_list list_data='${JSON.stringify(listDataObj)}' ${searchEngineSetting}]'`;

                //console.log(newShortcode);

                
                
                let newPageContent = objResponse.content.raw.replace(cllListShortcodeArray[this.props.shortcodeSourceId-1], newShortcode);

                

				let newPageData = {
					"content": newPageContent
				}
	
				////console.log(newPageContent);
	
	
				if(current_screen_type[0] === "page"){
                    makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST", JSON.stringify(newPageData))
                        .then(function(){
                            document.location.reload(true);
                        })
	                    //server side work to change visuals
				}
				if(current_screen_type[0] === "post"){
                    makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST", JSON.stringify(newPageData))
                        .then(function(){
                            document.location.reload(true);
                        })
					    //server side work to change visuals
                }
    
            }
        }
    }


    makeEditStyleRequest(){
        let ThisEditStyleBtn = this;
        if(current_screen_type[0] === "page"){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/pages/'+current_page_id, "POST")
				.then(function(request){
					ThisEditStyleBtn.processEditStyleRequest(request);
				})
				.catch(function(error){
					//console.log(error);
				});
		}
		if(current_screen_type[0] === "post"){
			makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link/'+current_post_id, "POST")
			.then(function(request){
				ThisEditStyleBtn.processEditStyleRequest(request);
			})
			.catch(function(error){
				//console.log(error);
			});
		}

    }
    createExistingStyleOptionsArray(){
        let optionArray = [];
        let i = 1;
        let existing_style_names_array = ["1","2"]
        existing_style_names_array.forEach(function(style_name){
            optionArray.push(<option key={i} value={style_name}>{style_name}</option>)
            i+=1;
        });

        return optionArray;  
    }

    handleCancelBtnClick(){
        this.setState((prevState)=>{prevState.isClicked = false; return prevState});
    }

    handleClick(){
        this.setState((prevState)=>{prevState.isClicked = true; return prevState});
    }

    handleSubmitBtnClick(){
        this.makeEditStyleRequest();
    }

    handleChange(event){
        event.persist();
        this.setState((prevState)=>{prevState.value=event.target.value; return prevState});
    }


    render(){
        return(
            (()=>{if(this.state.isClicked ===true){
                return(
                    <div className="cll-admin-button">
                        <select value={this.state.value} onChange={this.handleChange} className={``}>
                            {this.createExistingStyleOptionsArray()}
                        </select>
                        <button onClick = {this.handleSubmitBtnClick} type="button" className={`cll-admin-button`}>Submit</button>
                        <button onClick={this.handleCancelBtnClick} type="button" className={`cancel-btn edit-style-button__cancel-btn--style-${this.context.style}`}></button>
                    </div>
                )
            }   
            else{
                return(
                    <button className="cll-admin-button" onClick={this.handleClick}>
                        Edit Style
                    </button>
                )
            }
            })()
        )
    }
}

export default EditStyleBtn;