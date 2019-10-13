import React from 'react'
import UpVoteBtn from './UpVoteBtn'
import NeutralVoteBtn from './NeutralVoteBtn'
import DownVoteBtn from './DownVoteBtn'
import DeleteLinkBtn from './DeleteLinkBtn';

class ListItemStyle2 extends React.Component{
    constructor(props){
        super(props);
    
    }
    render(){

        //const displayNoneStyle = (()=>{if(this.props.isDeleted === true){{display: "none"}}})()
        
        return(
            <li style={(()=>{if(this.props.isDeleted === true){ return {display: "none"} }})()}className="link-list--style-2__link-list-item--style-2">
            <div className="link-item-content-container--style-2">
            <h3 onClick={this.props.linkToListURL} className = "link-list-item__link-list-title--style-2">{this.props.title}</h3>
            {
                    (()=>{if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                            return(
                                <DeleteLinkBtn linkItemTitle={this.props.title}
                                    linkItemPostId={this.props.linkItemPostId}
                                    listId={this.props.listId}
                                    shortcodeSourceId={this.props.shortcodeSourceId}
                                    setIsDeletedTrue={this.props.setIsDeletedTrue}/>
                            )
                        }
                    })()
            }
            <a className = "link-list-item__link-list-anchor--style-2" href={this.props.URL}>
                <img src="https://wordpress-170702-826059.cloudwaysapps.com/wp-content/plugins/curation-link-library/assets/images/test-image.png" className = "cll-link-thumbnail--style-2"/>
            </a>
            { (() => {if (this.props.link_type === 'external link'){
                return(
                    <div className = "link-stats-container--style-2">
                        <div className = "vote-buttons--style-2">
                            {
                                (()=>{
                                        if(this.props.dataIsLoading===true){
                                            return(
                                                <>Loading</>
                                            )
                                        }
                                        else{
                                            if(this.props.link_type === "external link"){
                                                return(
                                                    <>
                                                        <UpVoteBtn handleUpVoteBtnClick={this.props.handleUpVoteBtnClick}
                                                                upVotes={this.props.upVotes}
                                                                setVoteBtnClickedToTrue={this.props.setVoteBtnClickedToTrue}/>

                                                        <NeutralVoteBtn setVoteBtnClickedToTrue={this.props.setVoteBtnClickedToTrue}
                                                                        handleNeutralVoteBtnClick={this.props.handleNeutralVoteBtnClick}/>

                                                        <DownVoteBtn downVotes={this.props.downVotes}
                                                                    setVoteBtnClickedToTrue={this.props.setVoteBtnClickedToTrue}
                                                                    handleDownVoteBtnClick={this.props.handleDownVoteBtnClick}/>


                                                    </>
                                                )
                                            }
                                        }
                                })()
                            }
                        </div>

                    </div>
                )
            }})()
            }
                {
                    (()=>{
                        if(this.props.link_type === "external link"){
                            return  <p className="submitted-by--style-2">
                                        Submitted By: {this.props.submitted_by}
                                    </p>
                    }})()
                }
            </div>
        </li>
        )
    }
}

export default ListItemStyle2