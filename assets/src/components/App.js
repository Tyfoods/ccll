import React from 'react';
import ReactDOM from 'react-dom';
import SearchEngine from './SearchEngine';

class CCLL extends React.Component {
    constructor(props) {
      super(props);
      this.state = { SearchEngineOn: false,
                     
      };
    }
  
    render() {
      /*
      if (this.state.liked) {
        return 'You liked this thing NOW!';
      }
      */
  
      return (
        <div>
          <SearchEngine />
          Testing my react code
        </div>
      );
      
    }
  }

let root = document.getElementById('root');
ReactDOM.render(<CCLL />, root);