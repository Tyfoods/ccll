import React from 'react'
import {DataStorageContext} from './MyProvider'


class UpVoteBtn extends React.Component{

    static contextType = DataStorageContext;

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.handleUpVoteBtnClick();
        this.props.setVoteBtnClickedToTrue('up vote');
    }

    render(){
        //console.log(this.props.upVotes);

        return(
            <>
                <button onClick={this.handleClick} className = {`up-vote-button--style-${this.context.style}`}></button>
                <p className={`up-votes-counter--style-${this.context.style}`}>{this.props.upVotes}</p>
            </>
        )
    }
}

export default UpVoteBtn