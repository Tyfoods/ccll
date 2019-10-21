import React from 'react'
import ReactDOM from 'react-dom'
import makeRequest from '../js/functions/makeRequest'




window.onload=function(){

    class CCLLSettingsPage extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                fbAppIdStatus: "Invalid",
                fbAccessTokenStatus: "Invalid",
                fbAppIdValue: "",
                fbAccessTokenValue: "",
            }

            this.handleSubmitBtnClick = this.handleSubmitBtnClick.bind(this);
            this.handleAppIdValueChange = this.handleAppIdValueChange.bind(this);
            this.handleAccessTokenValueChange = this.handleAccessTokenValueChange.bind(this);
            this.setFbValuesToDefaultAndValid = this.setFbValuesToDefaultAndValid.bind(this);
            this.clearFbApiCredentialsFromDatabase = this.clearFbApiCredentialsFromDatabase.bind(this);
        }

        clearFbApiCredentialsFromDatabase(){
            event.preventDefault();
            if(confirm("Are you sure you would like to clear API credentials from the database?")){
                makeRequest(document.location.origin+'/wp-json/ccll-link/v1/clear-fb-api-credentials', 'DELETE')
                    .then(function(response){
                        console.log(response.responseText);
                        alert("API Credentials have been deleted");
                        document.location.reload();
                    })
                    .catch(function(error){
                        console.log(error);
                        alert("Unable to delete API credentials");
                    })
            }
        }

        setFbValuesToDefaultAndValid(){
            //console.log("setting values");
            this.setState((prevState)=>{
                prevState.fbAppIdStatus = "Valid";
                prevState.fbAccessTokenStatus = "Valid";
                prevState.fbAppIdValue = "--------------------------";
                prevState.fbAccessTokenValue = "----------------------------------------------------";
                return prevState;
            });
        }

        componentDidMount(){
            if(do_api_credentials_exist[0] === "true"){
                //console.log("api credentials exist");
                //console.log(do_api_credentials_exist[1]);
                this.setFbValuesToDefaultAndValid();
            }
            else{
                //console.log("api credentials don't exist");
                //console.log(do_api_credentials_exist[1]);
                
            }
        }


        handleSubmitBtnClick(event){
            event.preventDefault();
            let ThisSettingsPage = this;
            if(this.state.fbAppIdValue.replace(/\s/g, '').length !== 0 && this.state.fbAccessTokenValue.replace(/\s/g, '').length !== 0){
                if(this.state.fbAppIdValue !== '--------------------------'){
                    FB.api(
                        '/',
                        'POST',
                        {"access_token": `${this.state.fbAccessTokenValue}`,
                        "scrape":"true",
                        "id":"http://www.google.com"},
                        function(response) {
                            if (!response || response.error) {
                                ThisSettingsPage.setState((prevState)=>{
                                    prevState.fbAppIdStatus = "Invalid";
                                    prevState.fbAccessTokenStatus = "Invalid";
                                    return prevState;
                                });
                                alert("We were unable to validate your App ID and Access Token, please check for typos");
                                
                            }
                            else{
                                //console.log("Success!");
                                //console.log(response);

                                let apiCredentials = {
                                    appId: ThisSettingsPage.state.fbAppIdValue,
                                    accessToken: ThisSettingsPage.state.fbAccessTokenValue,
                                }

                                makeRequest(document.location.origin+"/wp-json/ccll-link/v1/handle-api-credentials-update/", "POST", JSON.stringify(apiCredentials))
                                    .then(function(response){
                                        console.log(response.responseText);
                                        ThisSettingsPage.setFbValuesToDefaultAndValid();
                                    })
                                    .catch(function(error){
                                        console.log(error);
                                    })
                            }
                        }
                    );
                }
                  
            }
            else{
                alert("Both App Id and Access Token must be entered");
            }

        }

        handleAppIdValueChange(event){
            event.persist();
            this.setState((prevState)=>{prevState.fbAppIdValue = event.target.value; return prevState},
                ()=>{
                    //console.log(this.state.fbAppIdValue);
                });
        }

        handleAccessTokenValueChange(event){
            event.persist();
            this.setState((prevState)=>{prevState.fbAccessTokenValue = event.target.value; return prevState},
                ()=>{
                    //console.log(this.state.fbAccessTokenValue);
                });
        }
        

        render(){
            return(
                <div>
                    <h3>Link Preview Settings</h3>
                    <form>
                        <p>Facebook App ID status: {this.state.fbAppIdStatus}</p>
                        <p>Facebook App Access Token: {this.state.fbAccessTokenStatus}</p>
                        <hr></hr>
                        
                        <input value={this.state.fbAppIdValue}onChange={this.handleAppIdValueChange} className="fb-api-credentials-inputs" title="app-id" type="text" placeholder="Enter your App ID here" ></input>
                        <input value={this.state.fbAccessTokenValue} onChange={this.handleAccessTokenValueChange} className="fb-api-credentials-inputs" title="access-token" type="text" placeholder="Enter your access token here" ></input>
                        <button onClick={this.handleSubmitBtnClick} type="submit">
                            Submit
                        </button>
                        <button onClick={this.clearFbApiCredentialsFromDatabase} type="submit">
                            Clear API Credentials
                        </button>

                    </form>
                </div>
            )
        }
    }



    ReactDOM.render(<CCLLSettingsPage/>, document.querySelector('.ccll-settings-page-container'));


}

