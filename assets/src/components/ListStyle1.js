import React from 'react'
import DeleteListBtn from './DeleteListBtn'
import EditCategoryBtn from './EditCategoryBtn'
import AddToListBtn from './AddToListBtn'
import EditStyleBtn from './EditStyleBtn'

class ListStyle1 extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
        <div className="ccll-link-list ccll-link-list--style-1">
            {
            (()=>{if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                    return(
                            <div className="top-buttons-container--style-1">
                                <DeleteListBtn shortcodeSourceId={this.props.shortcodeSourceId}
                                            setDisplayNoneOnList={this.props.setDisplayNoneOnList}
                                            listId={this.props.listId}/>
                                <EditStyleBtn shortcodeSourceId={this.props.shortcodeSourceId}
                                    listId={this.props.listId}/>
                                <EditCategoryBtn shortcodeSourceId={this.props.shortcodeSourceId}
                                                listId={this.props.listId}
                                                parentClassName={"top-buttons-container--style-1"}/>
                            </div>
                        )
                    }
                })()
            }
            <h4  className="ccll-link-list__list-title--style-1">Category: {this.props.category}</h4>
            <ul  className="ccll-link-list__link-list--style-1">
                {
                    (()=>{if(this.props.noPosts === true){
                            return(
                            <p>Sorry, there are no links to display!</p>
                            )
                        }
                        else if(this.props.listItemComponentsBuilt === true & this.props.noPosts === false){
                            return(
                                    this.props.listItemComponentsArray
                            )
                        }
                        else{
                            return(
                                <div>Loading...</div>
                            )
                        }
                    })()
                }
            </ul>
            <AddToListBtn categoryId={this.props.categoryId}/>
        </div>
        )
    }

}

export default ListStyle1