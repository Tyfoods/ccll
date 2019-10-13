import React from 'react'
import {DataStorageContext} from './MyProvider'

class DownVoteBtn extends React.Component{

    static contextType = DataStorageContext

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.handleDownVoteBtnClick();
        this.props.setVoteBtnClickedToTrue('down vote');
    }

    render(){

        return(
            <>
                <button onClick={this.handleClick} className = {`down-vote-button--style-${this.context.style}`}></button>
                <p className={`down-votes-counter--style-${this.context.style}`}>{this.props.downVotes}</p>
            </>
        )
    }
}

export default DownVoteBtn