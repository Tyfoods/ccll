import React from 'react'
import handleAddToListFormSubmitBtnClick from '../../js/handleClicks/handleAddToListFormSubmitBtnClick'
import {DataStorageContext} from './MyProvider'

class AddToListBtn extends React.Component{

    static contextType = DataStorageContext;

    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
            value: 'external link'
        }

        this.handleAddToListBtnClick = this.handleAddToListBtnClick.bind(this);
        this.handleSubmitBtnClick = this.handleSubmitBtnClick.bind(this);
        this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleAddToListBtnClick(){
        if(typeof is_user_logged_in !== 'undefined' && is_user_logged_in[0] === "false"){
            alert("Sorry, only logged in users may add to the list!");
            return;
        }
        else{
            let AddToListBtnState = this.state;
            AddToListBtnState.isClicked = true;
            this.setState(AddToListBtnState);
        }


    }

    handleCancelBtnClick(){
        this.setState((prevState)=>{prevState.isClicked = false; return prevState});
    }

    handleSubmitBtnClick(){
        handleAddToListFormSubmitBtnClick(this.props.categoryId, this.context.style);
    }

    handleChange(){
        this.setState({value: event.target.value});
    }

    render(){

        const AddToListFormStyle = {
                    display: "flex",
                    flexDirection:"columns",
        }

        if(this.state.isClicked===true){
            return(
                <div className="ccll-admin-button add-to-list-btn--style-">
                    <form id="addToListForm" style={AddToListFormStyle}>
                            {
                                (()=>{if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === 'true'){
                                    return(
                                        <select value={this.state.value} onChange={this.handleChange} id='add-to-list-form__link-type-selector'>
                                            <option value="external link">External Link</option>
                                            <option value="internal link">Internal Link</option>
                                            <option value="" disabled="" hidden="">Link Type</option>
                                        </select>
                                    )
                                }
                                })()
                            }
                        <input type="text" name="newListItemTitle" id="newListItemTitle" placeholder="Link title here" className={`add-to-list-form__add-to-list-input--style-${this.context.style}`}>
                        </input>
                        
                        {(()=>{
                            if(this.state.value === "external link"){
                                return(
                                <input type="text" name="newListItemUrl" id="newListItemUrl" placeholder="URL here" className={`add-to-list-form__add-to-list-input--style-${this.context.style}`}></input>
                                )
                            }
                        })()}

                        <button onClick = {this.handleSubmitBtnClick} name="submitBtn" type="button" className={`ccll-admin-button add-to-list-form__submit-btn--style-${this.context.style}`}>
                            Submit
                        </button>
                        <button onClick={this.handleCancelBtnClick} name="cancelBtn" type="button" className={`cancel-btn add-to-list-form__cancel-btn--style-${this.context.style}`}></button>
                    </form>
                </div>
            )
        }
        else{
            return(
                <button onClick={this.handleAddToListBtnClick} className={`ccll-admin-button add-to-list-btn--style-${this.context.style}`}>
                    Add To List +
                </button>
            )
        }
    }
}

export default AddToListBtn