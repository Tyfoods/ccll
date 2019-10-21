import ccllGlobals from '../js/ccllGlobals'; 
import makeRequest from '../js/functions/makeRequest'

/* React Components */
import React from 'react'
import ReactDOM from 'react-dom'

import List from './components/List'
import ListItem from './components/ListItem'
import NewListBtn from './components/NewListBtn'
import BackBtn from './components/BackBtn'
import MyProvider from './components/MyProvider'
import SearchEngine from './components/SearchEngine'
import SearchEngineBtn from './components/SearchEngineBtn'
import RequestNewCategoryBtn from './components/RequestNewCategoryBtn'

window.onload=function(){	

    (function renderListComponentsArray(){

        //For each Shortcode I must create an "Add New List Button";

        let linkListContainerArray = document.querySelectorAll(".ccll-link-lists");
        //console.log("Length of array AKA amount of shortcodes: "+linkListContainerArray.length);

        //For each shortcode output...
        let j = 1;
        linkListContainerArray.forEach(function(linkListContainer){
            //console.log(eval("atts_"+j));

            let atts = eval("atts_"+j);
            
            let attsObj = JSON.parse(atts);
            //console.log(attsObj);
            let listComponentsArray = [];
            let attsArray = Object.entries(attsObj)
            //create list components array from attributesarray
            attsArray.forEach(function(list){
                //console.log(list);
                listComponentsArray.push(
                    <MyProvider key = {list[0]} 
                                dataStorage={ { style: list[1]['style'] } }>
                        <List key={list[0]}
                            category={list[1]['category_name']}
                            style={list[1]['style']}
                            categoryId = {eval('final_category_id_'+j+'_'+list[0])}
                            shortcodeSourceId = {j}
                            listId={list[0]}>
                            <ListItem style={list[1]['style']}/>
                        </List>
                    </MyProvider>
                )
            });
            
            
            
            ReactDOM.render(<div className="lists-wrapper">
                                {
                                (()=>{if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                                        return(
                                            <NewListBtn shortcodeSourceId={j}/>
                                        )
                                    }
                                    else{
                                        return(
                                            <RequestNewCategoryBtn shortcodeSourceId={j} />
                                        )
                                    }
                                })()
                                }
                                {listComponentsArray}
                            </div>,
                            linkListContainer);
            j+=1;
        })
    })();

    (function renderControlBox(){
        //create element
        let controlBoxElement = document.createElement("div");
        controlBoxElement.setAttribute('class', 'control-box');

        //insert it as the first element
        let ccll_link_list = document.querySelector('.ccll-link-lists');
        ccll_link_list.parentElement.insertBefore(controlBoxElement, ccll_link_list.parentElement.firstChild);

        //select control box to render imported <BackBtn/>
        let controlBox = document.querySelector('.control-box')

        if(typeof is_search_engine_on !== 'undefined' && is_search_engine_on[0] === "true"){
            ReactDOM.render(<>
                                <div className="control-buttons-container">
                                    <BackBtn/>
                                    {
                                    (()=>{if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                                            return(
                                                <SearchEngineBtn is_search_engine_on={true}/>
                                            )
                                        }
                                    })()
                                    }
                                </div>
                                <SearchEngine/>
                            </>, controlBox);
        }
        else
        {
            ReactDOM.render(<>
                            <div className="control-buttons-container">
                                <BackBtn />
                                {
                                    (()=>{if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                                            return(
                                                <SearchEngineBtn is_search_engine_on={false}/>
                                            )
                                        }
                                    })()
                                }
                            </div>
                            </>, controlBox);
        }
    })();

    /*
    let linkData = {
        url: 'http://www.google.com'
    }


    makeRequest(document.location.origin+'/wp-json/ccll-link/v1/link-preview-request/', 'POST', JSON.stringify(linkData))
    .then(function(request){
        console.log(request.responseText);
        //console.log(JSON.parse(request.responseText));
    })
    .catch(function(error){
        console.log(error);
    })
    */



    

}
