import React from "react";

class SearchEngine extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    };

  render() {
      return (
          
        <form className = 'cll_search_form'>
	      <input type="text" className = 'cll_search_form_input' placeholder = 'Search here!'></input>
	    <div className = "cll-suggestions">
	    </div>
        </form>

      );
  }
}

export default SearchEngine;