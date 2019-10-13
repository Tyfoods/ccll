import cllGlobals from '../js/cllGlobals'; 
import setAttributeOfElementsInArrayIncrementally from '../js/functions/setAttributeOfElementsInArrayIncrementally';
import removeAllChildFromNodeExceptText from '../js/functions/removeAllChildFromNodeExceptText';
import visuallyUpdateVoteCounter from '../js/functions/visuallyUpdateVoteCounter';
import setVoterStatusToNeutralAndUpdatePostMeta from '../js/functions/setVoterStatusToNeutralAndUpdatePostMeta';
import setVoterStatusToUpAndUpdatePostMeta from '../js/functions/updatePostMetaAndRefreshButtonClickStates';
import setVoterStatusToDownAndUpdatePostMeta from '../js/functions/setVoterStatusToDownAndUpdatePostMeta';
import slugify from '../js/functions/slugify';

import makeRequest from '../js/functions/makeRequest';
import createAddToListBtn from '../js/functions/createAddToListBtn';
import replaceOccurrence from '../js/functions/replaceOccurence';
import displayDataPerItem from '../js/functions/displayDataPerItem';

import handleCategoryEdit from '../js/functions/handleCategoryEdit'
import handleUpVoteBtnClick from '../js/functions/handleUpVoteBtnClick';
import handleNeutralVoteBtnClick from '../js/functions/handleNeutralVoteBtnClick';
import handleDownVoteBtnClick from '../js/functions/handleDownVoteBtnClick';

import createEditCategoryBtnForm from '../js/functions/createEditCategoryBtnForm';
import createDownVoteBtn from '../js/functions/createDownVoteBtn';
import createNeutralVoteBtn from '../js/functions/createNeutralVoteBtn';
import createUpVoteBtn from '../js/functions/createUpVoteBtn'; 
import createDeleteListBtn from '../js/functions/createDeleteListBtn';
import createNewListBtn from '../js/functions/createNewListBtn';
import createBackBtn from '../js/functions/createBackBtn';
import createAddToListBtnForm from '../js/functions/createAddToListBtnForm';
import createEditCategoryBtn from '../js/functions/createEditCategoryBtn';
import isUrl from '../js/functions/isUrl';
import handleSearchInput from '../js/functions/handleSearchInput';
import isObjEmpty from '../js/functions/isObjEmpty';
import createAdminRemoveBtn from '../js/functions/createAdminRemoveBtn';
import addClickToAddToListBtn from '../js/functions/addClickToAddToListBtn';
import addClickToEditCategoryFormCancelBtn from '../js/functions/addClickToEditCategoryFormCancelBtn';
import addClickToAddToListBtnFormCancelBtn from '../js/functions/addClickToAddToListBtnFormCancelBtn';
import addClickToAddToListBtnFormSubmitBtn from '../js/functions/addClickToAddToListBtnFormSubmitBtn';
import throughLinkRequest from '../js/functions/throughLinkRequest';
import endLinkRequest from '../js/functions/endLinkRequest';
import updateCllListRequest from '../js/functions/updateCllListRequest';
import createNewCategoryRequest from '../js/functions/createNewCategoryRequest';
import addClickToEditCategoryFormSubmitBtn from '../js/functions/addClickToEditCategoryFormSubmitBtn';
import addClickToEditCategoryBtn from '../js/functions/addClickToEditCategoryBtn';
import addClickToUpVoteBtn from '../js/functions/addClickToUpVoteBtn';
import addClickToDownVoteBtn from '../js/functions/addClickToDownVoteBtn';
import addClickToNeutralVoteBtn from '../js/functions/addClickToNeutralVoteBtn';
import addClickToCancelBackBtn from '../js/functions/addClickToCancelBackBtn';



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

        let linkListContainerArray = document.querySelectorAll(".cll-link-lists");
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
            
            
            //console.log(listComponentsArray);

            /* deprecated
            for(let i=1; i <= attsObj.list_quantity; i+=1){
                let categoryObj = JSON.parse(attsObj.category_name);
                let styleObj = JSON.parse(attsObj.style);
        
                //console.log('final_category_id'+j);
                //console.log(eval('final_category_id_'+j));

                listComponentsArray.push(
                    <List key={i} category={categoryObj[i]}
                        style = {styleObj[i]}
                        categoryId = {eval('final_category_id_'+i)}
                        shortcodeSourceId = {j}
                        listId={i}>
                        
                        <ListItem/>
                    </List>
                );
                
            }
            */
                            
            //console.log(listComponentsArray);
            
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
        let cll_link_list = document.querySelector('.cll-link-lists');
        cll_link_list.parentElement.insertBefore(controlBoxElement, cll_link_list.parentElement.firstChild);

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
            //handleSearchInput(makeRequest); Doing this in React now
        }
        else
        {
            //console.log("Search bar doesn't exist");
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



    var source = new EventSource(`${time_sse_path}`);
    source.onmessage = function(event) {
      document.getElementById("result").innerHTML += event.data + "<br>";
    };



}
