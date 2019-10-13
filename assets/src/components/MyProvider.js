import React from 'react'
//import DataStorageContext from './DataStorageContext'

const DataStorageContext = React.createContext({});

class MyProvider extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <DataStorageContext.Provider value={this.props.dataStorage}>
                {this.props.children}
            </DataStorageContext.Provider>
        )
    }
}

export {DataStorageContext};

export default MyProvider;


