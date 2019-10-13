import React from 'react'
import {DataStorageContext} from './MyProvider'

class NeutralVoteBtn extends React.Component{

    static contextType = DataStorageContext;

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.handleNeutralVoteBtnClick();
        this.props.setVoteBtnClickedToTrue('neutral vote');
    }

    render(){

        return(
                <button onClick={this.handleClick} className = {`neutral-vote-button--style-${this.context.style}`}></button>
        )
    }
}

export default NeutralVoteBtn