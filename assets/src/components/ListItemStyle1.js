import React from 'react'
import UpVoteBtn from './UpVoteBtn'
import NeutralVoteBtn from './NeutralVoteBtn'
import DownVoteBtn from './DownVoteBtn'
import DeleteLinkBtn from './DeleteLinkBtn'

class ListItemStyle1 extends React.Component{
    render(){
        return(
            <li className="link-list--style-1__link-list-item--style-1">
                <a className="link-list-item__link-list-title--style-1" href={this.props.href}>
                    {this.props.title}
                </a>
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

                                            <p className="link-list-item__submitted-by--style-1">Submitted by: {this.props.submitted_by}</p>
                                        </>
                                    )
                                }
                            }
                    })()
                }
            </li>
        )
    }
}

export default ListItemStyle1;