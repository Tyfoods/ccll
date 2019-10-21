import React from 'react'
import makeRequest from '../../js/functions/makeRequest'
import isObjEmpty from '../../js/functions/isObjEmpty'
import ListStyle1 from './ListStyle1'
import ListStyle2 from './ListStyle2'

class List extends React.Component{
    constructor(){
        super();
        this.state={
            category: "",
            style: "",
            userIsAdmin: true,
            noPosts: false,
            listItemComponentsBuilt: false,
            listItemComponentsArray: [],
            linkItems: [],
            displayNone: false,
 
        }
        this.setDisplayNoneOnList = this.setDisplayNoneOnList.bind(this);
        this.buildListItemComponents = this.buildListItemComponents.bind(this);
        this.getData = this.getData.bind(this);

    }

    componentDidMount(){
        this.getData();
    }

    setDisplayNoneOnList(){
        let ListState = this.state;
        ListState.displayNone = true;
        this.setState(ListState);
    }

    getData(){
        let ThisList = this;
        makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+'?link_category='+ThisList.props.categoryId.toString(), 'GET')
        .then(function(request){
            
            let objResponse = JSON.parse(request.responseText);
            ////console.log(objResponse);
            ////console.log("Obj Response Below");
            ////console.log(objResponse);

            if(isObjEmpty(objResponse)){
                let newListState = ThisList.state;
                newListState.noPosts = true;
                ThisList.setState(newListState)
            }
            else{
                ////console.log("Object is not empty");
                let newListState = ThisList.state;
                //get information from each link and save it in List State
                let iterator = 1;
                objResponse.forEach(function(link){
                    newListState.linkItems[iterator] = {
                        "id": link.id,
                        "title": link.title.rendered,
                        "URL": link.meta.URL,
                        "link_type": link.meta.link_type,
                        "down_votes": link.meta.down_votes,
                        "up_votes": link.meta.up_votes,
                        "mention_record": link.meta.mention_record,
                        "vote_record": link.meta.voteRecord,
                        "meta":link.meta,

                    }
                    iterator+=1;
                })
                ThisList.setState(newListState);
                ////console.log(ThisList);
                ThisList.buildListItemComponents();

            }
        })
        .catch(function(error){
            //console.log(error);
        })
    }

    buildListItemComponents(){
        let ThisListState = this.state;
        let ThisListProps = this.props;
        var listItemComponents = [];
        let linkItemsArray = ThisListState.linkItems;

        /*
        //console.log(linkItemsArray);
        //console.log(ThisListProps);
        //console.log(ThisListProps.children);
        */


       let iterator = 0;
        linkItemsArray.forEach(function(linkItem){
            listItemComponents.push(
                React.cloneElement(ThisListProps.children,
                                    {key: iterator,
                                    title: linkItem.title,
                                    link_type: linkItem.link_type,
                                    linkItemPostId: linkItem.id,
                                    meta: linkItem.meta,
                                    shortcodeSourceId: ThisListProps.shortcodeSourceId,
                                    listId: ThisListProps.listId}))
            iterator+=1;
        })

        ThisListState.listItemComponentsBuilt = true;
        ThisListState.listItemComponentsArray = listItemComponents;
        this.setState(ThisListState);
    }

    render(){

        let style = (()=>{if(this.state.displayNone===true){
            return{display: "none"}; 
        }})();

        //const ThisList = this;
        //const ListStyle = eval(`ListStyle${ThisList.props.style}`);

        if(this.props.style==="2"){
            return(
                <ListStyle2 style={style}
                shortcodeSourceId={this.props.shortcodeSourceId}
                setDisplayNoneOnList={this.setDisplayNoneOnList}
                listId={this.props.listId}
                category={this.props.category}
                noPosts={this.state.noPosts}
                listItemComponentsBuilt={this.state.listItemComponentsBuilt}
                listItemComponentsArray={this.state.listItemComponentsArray}
                categoryId={this.props.categoryId} />
            )
        }
        else if(this.props.style==="1"){
            return(
                <ListStyle1 style={style}
                shortcodeSourceId={this.props.shortcodeSourceId}
                setDisplayNoneOnList={this.setDisplayNoneOnList}
                listId={this.props.listId}
                category={this.props.category}
                noPosts={this.state.noPosts}
                listItemComponentsBuilt={this.state.listItemComponentsBuilt}
                listItemComponentsArray={this.state.listItemComponentsArray}
                categoryId={this.props.categoryId} />
            )
        }
    }
}

export default List;