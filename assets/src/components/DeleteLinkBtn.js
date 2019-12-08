import React from 'react'
import makeRequest from '../../js/functions/makeRequest'
import isObjEmpty from '../../js/functions/isObjEmpty'
import {DataStorageContext} from './MyProvider'
import slugify from '../../js/functions/slugify'

class DeleteLinkBtn extends React.Component{

    static contextType = DataStorageContext;

    constructor(props){
        super(props);
        this.state = {

        }

        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick = async () => {
        //console.log(this.props.linkItemTitle);
        var listItemSlug = await slugify(this.props.linkItemTitle);


        console.log(listItemSlug);
        
        //Delete post if it exists
        let ThisDeleteLinkBtn = this;
        await makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link?slug='+listItemSlug, 'GET')
            .then(function(request){
                var objResponse = JSON.parse(request.responseText);
                ////console.log(objResponse);
                
                if(isObjEmpty(objResponse) === true){
                    //console.log("A post with a slug of that type was unable to be found. (Response was empty)"); 
                }
                else
                {
                    //console.log(objResponse);
                    //console.log(window["final_category_data_"+ThisDeleteLinkBtn.props.shortcodeSourceId+"_"+ThisDeleteLinkBtn.props.listId]);
                    if(objResponse[0].link_category.length>1){
                        let linkCategoryArray = objResponse[0].link_category;
                        //console.log(window["final_category_data_"+ThisDeleteLinkBtn.props.shortcodeSourceId+"_"+ThisDeleteLinkBtn.props.listId]);
                        let final_category_data = window["final_category_data_"+ThisDeleteLinkBtn.props.shortcodeSourceId+"_"+ThisDeleteLinkBtn.props.listId];
                        

                        for (let i=0; i < linkCategoryArray.length; i++){
                            makeRequest(ccllGlobals.currentProtocalDomain+"/wp-json/ccll-link-category/v1/ccll-link/"+linkCategoryArray[i], 'GET')
                                .then(function(request){
                                    //console.log(request);

                                    if(JSON.parse(request.responseText).name === final_category_data[0]['final_category']){
                                        //console.log(linkCategoryArray);
                                        linkCategoryArray.splice(i, 1);
                                        //console.log(linkCategoryArray);

                                        let newLinkCategory = {
                                            "link_category": linkCategoryArray
                                        };
                                        makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+objResponse[0].id, 'POST', JSON.stringify(newLinkCategory))
                                            .then(function(request){
                                                //console.log(request);
                                                //console.log("Succesfully removed category");
                                                ThisDeleteLinkBtn.props.setIsDeletedTrue();
                                            })
                                            .catch(function(error){
                                                console.log(error);
                                                console.log("Unable to remove category");
                                            });
                                    }

                                });
                            

                        }
                    }
                    else{
                        //console.log("Post only had one category, deleting post");
                        
                        makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+objResponse[0].id, 'DELETE')
                            .then(function(){
                                //console.log("Successfully deleted post!");
                                ThisDeleteLinkBtn.props.setIsDeletedTrue();
                            })
                            .catch(function(error){
                                console.log("Failed to delete post");
                                console.log(error);
                            });
                    }
                }
            })
            .catch(function(error){
                console.log("unable to get post information about list item");
                console.log(error);
            });
    }

    render(){
        return(
            <button className={`admin-delete-button--style-${this.context.style}`} onClick={this.handleClick} />
        )
    }
}

export default DeleteLinkBtn