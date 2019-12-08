import React from 'react'
import createNewCategoryRequest from '../../js/functions/createNewCategoryRequest'
import updateCcllListRequest from '../../js/functions/updateCcllListRequest'
import {DataStorageContext} from './MyProvider'
import makeRequest from '../../js/functions/makeRequest'

class EditCategoryBtn extends React.Component{

    static contextType = DataStorageContext;

    constructor(props){
        super(props);
        this.state = {
            isClicked: false,
            isCategoryInputCreated: true,
            value: 'new category',
            inputValue: '',

        }


    }

    updateStateInputValue = ()=>{
        this.setState((prevState)=>{
            prevState.inputValue = event.target.value;
            return prevState;
        });
        
        ////console.log(event.target.value);
    }

    updateStateValue = ()=>{
        this.setState((prevState)=>{
            prevState.value = event.target.value;
            return prevState;
        });
        //If user input is not new category, don't display "category input" box.
        if(event.target.value !== 'new category'){
            this.setState((prevState)=>{
                prevState.isCategoryInputCreated = false;
                return prevState;
            });
        }
        else{
            this.setState((prevState)=>{
                prevState.isCategoryInputCreated = true;
                return prevState;
            });
        }
    }

    createExistingCategoryOptionsArray = () => {
        let optionArray = [];
        let i = 0;
        existing_category_names_array[0].forEach(function(category_name){
            optionArray.push(<option key={i} value={`${category_name}`}>{category_name}</option>)
            i+=1;
        });

        return optionArray;  
    }


    handleClick = ()=>{


        let topButtonsContainer = document.querySelector(`.${this.props.parentClassName}`);
        this.setState((prevState)=>{
            prevState.isClicked = true;
            return prevState;
        }, (()=>{topButtonsContainer.style.height = "150px";})());

    }

    handleSubmitBtnClick = ()=>{
        let EditCategoryBtnState = this.state;
        existing_category_names_array[0].push('new category');
        if(this.state.value === 'new category'){
            let isMatched = (function matchExistingCategory(){
                for (let categoryName of existing_category_names_array[0]){
                    if(categoryName === EditCategoryBtnState.inputValue){
                        alert("That category already exists, please select it from the drop down menu");
                        return true;
                    }
                }
                return false;
            })();
            if(isMatched === false){
                if(confirm('Would you like to make a new category called: '+this.state.inputValue+'?')){
                    //create new category with this value and change page to this category
                    createNewCategoryRequest(this.state.inputValue.toLowerCase());
                    var ccllRequestData = {
                        "selectedCategory":this.state.inputValue,
                        "shortcodeSourceId":this.props.shortcodeSourceId,
                        "listId": this.props.listId,
                    }
                    updateCcllListRequest(ccllRequestData);
                    //break;
                    
                }
            }
        }
        else if(this.state.value !== 'new category'){
            var ccllRequestData = {
                "selectedCategory":this.state.value.toLowerCase(),
                "shortcodeSourceId":this.props.shortcodeSourceId,
                "listId": this.props.listId,
            }
            updateCcllListRequest(ccllRequestData);
            
        }
    }

    handleCancelBtnClick = ()=>{
        let topButtonsContainer = document.querySelector(`.${this.props.parentClassName}`);
        this.setState((prevState)=>{
            prevState.isClicked = false;
            return prevState;
        }, (()=>{topButtonsContainer.style.height = "100px";})());
    }

    render(){

        if(this.state.isClicked === true){
            return(
                <div className={`ccll-admin-button edit-category-btn--style-${this.context.style}`}>
                    Edit Category Btn
                    <select value={this.state.value} onChange={this.updateStateValue} className={`ccll-edit-category-btn__list-category-selector--style-${this.context.style}`}>
                        <option value="new category">New Category + </option>
                        {this.createExistingCategoryOptionsArray()}
                    </select>
                    {
                    (()=>{if(this.state.isCategoryInputCreated === true){
                        return(
                                        <input value={this.state.inputValue} onChange={this.updateStateInputValue} type="text" name="newCategoryRequestElement" placeholder="New category here"></input>
                                    )
                                }
                            })()
                    }
                    <button onClick = {this.handleSubmitBtnClick} name="settingsSubmitBtn" type="button" className={`ccll-admin-button edit-categoy-btn__submit-btn--style-${this.context.style}`}>Submit</button>
                    <button onClick={this.handleCancelBtnClick} name="cancelBtn" type="button" className={`cancel-btn edit-category-btn__cancel-btn--style-${this.context.style}`}></button>
                </div>
            )
        }
        else{
            return(
                <button onClick={this.handleClick} className={`ccll-admin-button edit-category-btn--style-${this.context.style}`}>
                    Edit Category
                </button>
            )
        }
    }
}

export default EditCategoryBtn;

