import React from 'react'
import makeRequest from '../../js/functions/makeRequest'
import {DataStorageContext} from './MyProvider'


export default class BackBtn extends React.Component{

    static contextType = DataStorageContext;

    constructor(props){
        super(props);
        this.state = {
            value: '',
            isBackBtnClicked: false,
            backOptionsArray: [],
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleCancelBtnClick = this.handleCancelBtnClick.bind(this);
    }

    handleCancelBtnClick(){
        this.setState((prevState)=>{prevState.isBackBtnClicked = true; return prevState});
    }

    handleClick(){
        if(this.state.isBackBtnClicked === false){
			if (confirm("Are you sure you would like to go back?")) {
                this.createBackRouteOptionsArray();
            }
            else {
                //console.log("You pressed NO");
                }
        }
    }

    handleOnChange(){
        this.setState((prevState)=>{prevState.value = event.target.value; return prevState});



    }

    createBackRouteOptionsArray(){
        let ThisBackBtn = this;
        let postSlug = window.location.pathname.replace(/[/]link[/]/g, '').replace(/[/]/g, '');
        makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+postSlug, "GET")
            .then(function(request){
                try{
                    let mentionObj = JSON.parse( (JSON.parse(request.responseText))[0].meta.mention_record );
                    let mentionArray = Object.values(mentionObj);
                    ////console.log(mentionArray);

                    let mentionSlugArray = mentionArray.map(function(mention){
                        mention = mention.replace(cllGlobals.currentProtocalDomain+'/', '').replace(/link[/]/g, '');
                        mention = mention.slice(0, -1);
                        return mention;
                    });

                    ////console.log(mentionArray);
                    ////console.log(mentionSlugArray);


                    let backOptionsArray = [];
                    let i = 0;
                    mentionSlugArray.forEach(function(mentionSlug){
                        backOptionsArray.push(<option key={i} value={`${mentionSlug}`}>{mentionSlug}</option>);
                        i+=1;
                    });
                    ////console.log(backOptionsArray);
                    ThisBackBtn.setState((prevState)=>{
                        prevState.backOptionsArray = backOptionsArray;
                        prevState.isBackBtnClicked = true;
                        return prevState;});

                    //ThisBackBtn.setState((prevState)=>{prevState.isBackBtnClicked = true;return prevState});

                }
                catch(error){
                    ////console.log("Unable to parse, it is likely that there is no mention_record available");
                    alert("Sorry, we couldn't find a back route for this page!");
                    //console.log(error);
                }
            })
    }
    

    render(){

        ////console.log(DataStorageContext);


        if(this.state.value !== ''){
            if(confirm("Would you like to go back to: "+this.state.value+'?')){
                window.location.href = this.state.value;
            }
        }
        if(this.state.isBackBtnClicked === true){
            return(
                    <>
                        <select value={this.state.value} onChange={this.handleOnChange} className={`back-selector`}>
                            <option value=''>Pick where to go back to...</option>
                            {this.state.backOptionsArray}
                        </select>
                        <button onClick={this.handleCancelBtnClick} name="cancelBtn" type="button" className={`back-btn__cancel-btn`}></button>
                    </>
            )
        }
        return(
                <button onClick={this.handleClick} className={`back-btn cll-admin-button`}></button>

        )
    }
}


