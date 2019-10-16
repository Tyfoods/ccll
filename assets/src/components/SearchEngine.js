import React from "react";
import makeRequest from '../../js/functions/makeRequest'

class SearchEngine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          value: '',
          isLoading: "no load",
          searchResultsArray: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    };

  handleChange(event){
    event.persist();
    ////console.log(event.target.value);
    //console.log("set state");
    this.setState((prevState)=>{prevState.value=event.target.value; return prevState;});

  }

  handleKeyUp(event){
    this.setState((prevState)=>{prevState.isLoading = true; return prevState;})
    event.persist();
    //console.log(this.state.value);
    //console.log("key up");

    let ThisSearchEngine = this;
    if(this.state.value.replace(/\s/g, '').length !== 0){
      makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?search='+this.state.value,'GET')
        .then(function(request){
          let objResponse = JSON.parse(request.responseText);
          //console.log(objResponse);
          //console.log("Got Data");
          let i = 0;
          let searchResultsArray = [];
          objResponse.forEach(function(linkItem){
            searchResultsArray.push(
                  <div key = {i}>
                    <a href={`${linkItem.meta.URL}`}>
                      {linkItem.title.rendered}
                    </a>
                  </div>
            );
            i+=1;
          });
          ThisSearchEngine.setState((prevState)=>{
            prevState.searchResultsArray = searchResultsArray;
            prevState.isLoading = false;
            return prevState;
          })
        })
        .catch(function(error){
          //console.log(error);
        });
    }
    else{
      //console.log("no load, string was empty");
      this.setState((prevState)=>{prevState.isLoading = "no load"; return prevState;})
    }
    

  }

  handleKeyDown(event){
    event.persist();
    if(event.keyCode == 13){
      event.preventDefault();
    }
  }

  render() {
      return (
          
        <form className = 'cll_search_form'>
          <input type="text" onChange={this.handleChange} onKeyUp={this.handleKeyUp} onKeyDown={this.handleKeyDown} className = 'cll_search_form_input' placeholder = 'Search here!'></input>
          <div className = "cll-suggestions">
            {
              (()=>{
                if(this.state.isLoading===false && this.state.searchResultsArray.length > 0 && this.state.value.replace(/\s/g, '').length !== 0){
                  return(
                    this.state.searchResultsArray
                  )
                }
                else if(!this.state.searchResultsArray.length > 0 && this.state.isLoading === false){
                  return(
                    <div>
                      No results found
                    </div>
                  )
                }
                else if(this.state.isLoading === true){
                  return(
                    <div>
                      Loading...
                    </div>
                  )
                }
                else if(this.state.isLoading === "no load"){
                  return(
                    <>
                    </>
                  )
                }
              })()
            }
          </div>
        </form>

      );
  }
}

export default SearchEngine;