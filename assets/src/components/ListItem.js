import React from 'react'
import UpVoteBtn from './UpVoteBtn'
import NeutralVoteBtn from './NeutralVoteBtn'
import DownVoteBtn from './DownVoteBtn'
import makeRequest from '../../js/functions/makeRequest'
import ListItemStyle1 from './ListItemStyle1'
import ListItemStyle2 from './ListItemStyle2'
import slugify from '../../js/functions/slugify'
import updatePostMetaAndRefreshButtonClickStates from '../../js/functions/updatePostMetaAndRefreshButtonClickStates'

class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            meta : props.meta,
            isUpVoteBtnClicked: false,
            isNeutralVoteBtnClicked: false,
            isDownVoteBtnClicked: false,
            linkItemPostId: props.linkItemPostId,
            isDeleted: false,
            //dataIsLoading: true,

        }
        //this.getButtonCounterData = this.getButtonCounterData.bind(this); deprecated

        this.handleUpVoteBtnClick = this.handleUpVoteBtnClick.bind(this);
        this.handleDownVoteBtnClick = this.handleDownVoteBtnClick.bind(this);
        this.handleNeutralVoteBtnClick = this.handleNeutralVoteBtnClick.bind(this);

        this.refreshButtonClickStates = this.refreshButtonClickStates.bind(this);

        this.linkToListURL = this.linkToListURL.bind(this);

        this.setVoteBtnClickedToTrue = this.setVoteBtnClickedToTrue.bind(this);

        this.makeAllButtonsUnclickable = this.makeAllButtonsUnclickable.bind(this);

        this.setIsDeletedTrue = this.setIsDeletedTrue.bind(this);

    }
    

    componentDidMount(){
        //this.getButtonCounterData();
        //Deprecated!
    }

    linkToListURL(){
        window.location.href = this.state.meta.URL;
    }

    /* Deprecated!
    getButtonCounterData(){

        let ThisListItem = this;
        let postSlug = slugify(this.props.title.trim());

        makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link?slug='+postSlug, 'GET')
            .then(function(request){
                let objResponse = JSON.parse(request.responseText);
                let linkItemPostId = objResponse[0].id;
                let metaObj = objResponse[0].meta;
                ////console.log(metaObj);
                ThisListItem.setState((prevState)=>{prevState.meta = metaObj;
                    prevState.linkItemPostId = linkItemPostId;
                    prevState.dataIsLoading = false
                    return prevState;});
            })
            .catch(function(error){
                //console.log(error);
            });
    }
    */

    setIsDeletedTrue(){
        this.setState((prevState)=>{prevState.isDeleted=true; return prevState});
    }

    setVoteBtnClickedToTrue(voteType){
        if(voteType = 'up vote'){
            this.setState((prevState)=>{
                prevState.isUpVoteBtnClicked = true;
                return prevState;
            })
        }
        if(voteType === 'down vote'){
            this.setState((prevState)=>{
                prevState.isDownVoteBtnClicked = true;
                return prevState;
            })
        }
        if(voteType === 'neutral vote'){
            this.setState((prevState)=>{
                prevState.isNeutralVoteBtnClicked = true;
                return prevState;
            })
        }
    }

    makeAllButtonsUnclickable(){
        this.setState((prevState)=>{
            prevState.isUpVoteBtnClicked = true;
            prevState.isNeutralVoteBtnClicked = true;
            prevState.isDownVoteBtnClicked = true;
            return prevState;
        })
    }


    refreshButtonClickStates(){
        this.setState((prevState)=>{
            prevState.isUpVoteBtnClicked = false;
            prevState.isNeutralVoteBtnClicked = false;
            prevState.isDownVoteBtnClicked = false;
            return prevState;
        })
    }

    handleUpVoteBtnClick(){
        if(typeof is_user_logged_in !== 'undefined' && is_user_logged_in[0] === "false"){
            alert("Sorry, only logged in users may vote!");
            return;
        }
        else{
            let metaObj = this.state.meta
            ////console.log(metaObj);
            try {
                var voteRecordObj = JSON.parse(metaObj.voteRecord);
                var currentUserVoteStatus = parseInt(voteRecordObj[ccllUserId[0]]);


                if(this.state.isUpVoteBtnClicked === false){
                    if(typeof voteRecordObj[ccllUserId[0]]  === "undefined"){ //if current user has never voted then...
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();
                        
                        ////console.log("There is no information for this user on record");

                        this.setState((prevState)=>{
                            prevState.meta.up_votes+=1;
                            //setting users vote record equal to one, which stands for "has already upvoted"
                            let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                            voteRecordObj[ccllUserId[0]] = "1";
                            let newVoteRecordData = JSON.stringify(voteRecordObj);
                            prevState.meta.voteRecord = newVoteRecordData;
                            return prevState;}, function(){
                                //increments upvote in server, I will worry about server updating the state of link items later.
                                updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates);
                            });


                        return;
                    }
                    else if(currentUserVoteStatus === 1)
                    {
                        alert("You've already up voted this post!");
                        return;
                    }
                    else if(currentUserVoteStatus === 0)
                    {
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();

                        ////console.log("Voter status was 0, incrementing up vote /removing downvote (visually too), changing status to 1");
                        this.setState((prevState)=>{
                            prevState.meta.up_votes+=1;
                            prevState.meta.down_votes-=1;
                            //setting users vote record equal to one, which stands for "has already upvoted"
                            let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                            voteRecordObj[ccllUserId[0]] = "1";
                            let newVoteRecordData = JSON.stringify(voteRecordObj);
                            prevState.meta.voteRecord = newVoteRecordData;
                            return prevState;}, function(){
                            //increments upvote in server, I will worry about server updating the state of link items later.
                            updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates);
                            });


                        return;
                    }
                    else if(currentUserVoteStatus === 3)
                    {
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();
                        ////console.log("Voter status was 3, incrementing up vote (visually too), changing status to 1");

                        this.setState((prevState)=>{
                            prevState.meta.up_votes+=1;
                            //setting users vote record equal to one, which stands for "has already upvoted"
                            let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                            voteRecordObj[ccllUserId[0]] = "1";
                            let newVoteRecordData = JSON.stringify(voteRecordObj);
                            prevState.meta.voteRecord = newVoteRecordData;
                            return prevState;},
                            function(){
                            //increments upvote in server, I will worry about server updating the state of link items later.
                            updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates)
                            });
                        return;
                    }
                }
            }
            catch(error) {
                if(this.state.isUpVoteBtnClicked === false){
                    //Make other buttons un-clickable, they become clickable again after request below
                    this.makeAllButtonsUnclickable();

                    
                    //console.log(error);
                    //console.log("Could not parse voteRecord");
                    ////console.log("There is no information on record *assertion");

                    //metaObj.voteRecord = '{"'+ccllUserId[0]+'":'+'"1"}';


                    this.setState((prevState)=>{
                        prevState.meta.up_votes+=1;
                        //setting users vote record equal to one, which stands for "has already upvoted"
                        let voteRecordObj = {};
                        voteRecordObj[ccllUserId[0]] = "1"
                        let newVoteRecordData = JSON.stringify(voteRecordObj);
                        prevState.meta.voteRecord = newVoteRecordData;
                        return prevState;
                    }, function(){
                        //increments upvote in server, I will worry about server updating the state of link items later.
                        var newPostMetaData = JSON.stringify({
                            "meta" : this.state.meta

                        });
                        
                        let ThisListItem = this;
                        //console.log(newPostMetaData);
                        if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+this.state.linkItemPostId, 'POST', newPostMetaData)
                                .then(function(request){
                                    //console.log(JSON.parse(request.responseText));
                                    //console.log(this);
                                    ThisListItem.refreshButtonClickStates();
                            
                                })
                                .catch(function(error){
                                    //console.log(error);
                                });
                            return;
                        }
                        else{
                            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-vote/v1/ccll-link/'+ThisListItem.state.linkItemPostId, 'POST', JSON.stringify(ThisListItem.state.meta))
                            .then(function(){
                                ThisListItem.refreshButtonClickStates();
                            })
                            .catch(function(error){
                                //console.log(error);
                            });
                        }
                    });            
                }
            }
        }
    }

    handleDownVoteBtnClick(){
        if(typeof is_user_logged_in !== 'undefined' && is_user_logged_in[0] === "false"){
            alert("Sorry, only logged in users may vote!");
            return;
        }
        else{
            let metaObj = this.state.meta
            ////console.log(metaObj);
            try {
                var voteRecordObj = JSON.parse(metaObj.voteRecord);
                var currentUserVoteStatus = parseInt(voteRecordObj[ccllUserId[0]]);


                if(this.state.isDownVoteBtnClicked === false){
                    if(typeof voteRecordObj[ccllUserId[0]]  === "undefined"){ //if current user has never voted then...
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();
                        
                        ////console.log("There is no information for this user on record");

                        this.setState((prevState)=>{
                            prevState.meta.down_votes+=1;
                            //setting users vote record equal to zero, which stands for "has already downvoted"
                            let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                            voteRecordObj[ccllUserId[0]] = "0";
                            let newVoteRecordData = JSON.stringify(voteRecordObj);
                            prevState.meta.voteRecord = newVoteRecordData;
                            return prevState;}, function(){
                                //increments upvote in server, I will worry about server updating the state of link items later.
                                updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates);
                            });


                        return;
                    }
                    else if(currentUserVoteStatus === 0)
                    {
                        alert("You've already down voted this post!");
                        return;
                    }
                    else if(currentUserVoteStatus === 1)
                    {
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();

                        ////console.log("Voter status was 0, incrementing up vote /removing downvote (visually too), changing status to 1");
                        this.setState((prevState)=>{
                            prevState.meta.down_votes+=1;
                            prevState.meta.up_votes-=1;
                            //setting users vote record equal to zero, which stands for "has already downvoted"
                            let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                            voteRecordObj[ccllUserId[0]] = "0";
                            let newVoteRecordData = JSON.stringify(voteRecordObj);
                            prevState.meta.voteRecord = newVoteRecordData;
                            return prevState;}, function(){
                            //increments upvote in server, I will worry about server updating the state of link items later.
                            updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates);
                            });


                        return;
                    }
                    else if(currentUserVoteStatus === 3)
                    {
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();
                        ////console.log("Voter status was 3, incrementing up vote (visually too), changing status to 1");

                        this.setState((prevState)=>{
                            prevState.meta.down_votes+=1;
                            //setting users vote record equal to zero, which stands for "has already downvoted"
                            let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                            voteRecordObj[ccllUserId[0]] = "0";
                            let newVoteRecordData = JSON.stringify(voteRecordObj);
                            prevState.meta.voteRecord = newVoteRecordData;
                            return prevState;},
                            function(){
                            //increments upvote in server, I will worry about server updating the state of link items later.
                            updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates)
                            });
                        return;
                    }
                }
            }
            catch(error) {
                if(this.state.isDownVoteBtnClicked === false){
                    //Make other buttons un-clickable, they become clickable again after request below
                    this.makeAllButtonsUnclickable();

                    
                    //console.log(error);
                    //console.log("Could not parse voteRecord");
                    ////console.log("There is no information on record *assertion");

                    //metaObj.voteRecord = '{"'+ccllUserId[0]+'":'+'"1"}';


                    this.setState((prevState)=>{
                        prevState.meta.down_votes+=1;
                        //setting users vote record equal to zero, which stands for "has already downvoted"
                        let voteRecordObj = {};
                        voteRecordObj[ccllUserId[0]] = "0"
                        let newVoteRecordData = JSON.stringify(voteRecordObj);
                        prevState.meta.voteRecord = newVoteRecordData;
                        return prevState;
                    }, function(){
                        //increments upvote in server, I will worry about server updating the state of link items later.
                        var newPostMetaData = JSON.stringify({
                            "meta" : this.state.meta

                        });
                        
                        let ThisListItem = this;
                        //console.log(newPostMetaData);
                        if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+this.state.linkItemPostId, 'POST', newPostMetaData)
                                .then(function(request){
                                    //console.log(JSON.parse(request.responseText));
                                    //console.log(this);
                                    ThisListItem.refreshButtonClickStates();
                            
                                })
                                .catch(function(error){
                                    //console.log(error);
                                });
                            return;
                        }
                        else{
                            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-vote/v1/ccll-link/'+ThisListItem.state.linkItemPostId, 'POST', JSON.stringify(ThisListItem.state.meta))
                            .then(function(){
                                ThisListItem.refreshButtonClickStates();
                            })
                            .catch(function(error){
                                //console.log(error);
                            });
                        }
                    });            
                }
            }
        }
    }

    handleNeutralVoteBtnClick(){
        if(typeof is_user_logged_in !== 'undefined' && is_user_logged_in[0] === "false"){
            alert("Sorry, only logged in users may vote!");
            return;
        }
        else{
            let metaObj = this.state.meta
            ////console.log(metaObj);
            try {
                var voteRecordObj = JSON.parse(metaObj.voteRecord);
                var currentUserVoteStatus = parseInt(voteRecordObj[ccllUserId[0]]);

                if(this.state.isDownVoteBtnClicked === false){
                    if(typeof voteRecordObj[ccllUserId[0]]  === "undefined"){ //if current user has never voted then...
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();
                        
                        ////console.log("There is no information for this user on record");

                        this.setState((prevState)=>{
                            //setting users vote record equal to zero, which stands for "has already downvoted"
                            let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                            voteRecordObj[ccllUserId[0]] = "3";
                            let newVoteRecordData = JSON.stringify(voteRecordObj);
                            prevState.meta.voteRecord = newVoteRecordData;
                            return prevState;}, function(){
                                //increments upvote in server, I will worry about server updating the state of link items later.
                                updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates);
                            });


                        return;
                    }
                    else if(currentUserVoteStatus === 3)
                    {
                        alert("You've already voted neutral on this post!");
                        return;
                    }
                    else if(currentUserVoteStatus === 0)
                    {
                    //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                    this.makeAllButtonsUnclickable();

                
                    this.setState((prevState)=>{
                        prevState.meta.down_votes-=1;
                        //setting users vote record equal to three, which stands for "has already voted neutral"
                        let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                        voteRecordObj[ccllUserId[0]] = "3";
                        let newVoteRecordData = JSON.stringify(voteRecordObj);
                        prevState.meta.voteRecord = newVoteRecordData;
                        return prevState;}, function(){
                            //increments upvote in server, I will worry about server updating the state of link items later.
                            updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates);
                        });


                        return;
                    }
                    else if(currentUserVoteStatus === 1)
                    {
                        //Make other buttons un-clickable, they become clickable again after SetVoterStatus... runs
                        this.makeAllButtonsUnclickable();
        

                    this.setState((prevState)=>{
                        prevState.meta.up_votes-=1;
                        //setting users vote record equal to three, which stands for "has already voted neutral"
                        let voteRecordObj = JSON.parse(prevState.meta.voteRecord);
                        voteRecordObj[ccllUserId[0]] = "3";
                        let newVoteRecordData = JSON.stringify(voteRecordObj);
                        prevState.meta.voteRecord = newVoteRecordData;
                        return prevState;},
                        function(){
                            //increments upvote in server, I will worry about server updating the state of link items later.
                            updatePostMetaAndRefreshButtonClickStates(this.state.linkItemPostId, this.state.meta, makeRequest, this.refreshButtonClickStates)
                        });
                        return;
                    }
                }
            }
            catch(error) {
                if(this.state.isDownVoteBtnClicked === false){
                    //Make other buttons un-clickable, they become clickable again after request below
                    this.makeAllButtonsUnclickable();
    
                    
                    //console.log(error);
                    //console.log("Could not parse voteRecord");
                    ////console.log("There is no information on record *assertion");

                    //metaObj.voteRecord = '{"'+ccllUserId[0]+'":'+'"1"}';


                    this.setState((prevState)=>{
                        //setting users vote record equal to three, which stands for "has already voted neutrally"
                        let voteRecordObj = {};
                        voteRecordObj[ccllUserId[0]] = "3"
                        let newVoteRecordData = JSON.stringify(voteRecordObj);
                        prevState.meta.voteRecord = newVoteRecordData;
                        return prevState;
                    }, function(){
                        //increments upvote in server, I will worry about server updating the state of link items later.
                        var newPostMetaData = JSON.stringify({
                            "meta" : this.state.meta
        
                        });
                        
                        let ThisListItem = this;
                        //console.log(newPostMetaData);
                        if(typeof is_user_admin !== 'undefined' && is_user_admin[0] === "true"){
                            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/wp/v2/ccll-link/'+this.state.linkItemPostId, 'POST', newPostMetaData)
                                .then(function(request){
                                    //console.log(JSON.parse(request.responseText));
                                    //console.log(this);
                                    ThisListItem.refreshButtonClickStates();
                        
                                })
                                .catch(function(error){
                                    //console.log(error);
                                });
                            return;
                        }
                        else{
                            makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-vote/v1/ccll-link/'+ThisListItem.state.linkItemPostId, 'POST', JSON.stringify(ThisListItem.state.meta))
                            .then(function(){
                                ThisListItem.refreshButtonClickStates();
                            })
                            .catch(function(error){
                                //console.log(error);
                            });
                        }
                    });            
                }
            }
        }
    }

    render(){
        ////console.log("UpVoteBtn state vote count: "+this.state.meta.up_votes);
        ////console.log(this.state.meta);

        /*
        <ListItem linkToListURL={this.linkToListURL}
                title={this.props.title}
                href={this.state.meta.URL}
                link_type={this.props.link_type}
                dataIsLoading={this.state.dataIsLoading}
                handleUpVoteBtnClick={this.handleUpVoteBtnClick}
                upVotes={this.state.meta.up_votes}
                downVotes={this.state.meta.down_votes}
                setVoteBtnClickedToTrue={this.setVoteBtnClickedToTrue}
                handleDownVoteBtnClick={this.handleDownVoteBtnClick}
                handleNeutralVoteBtnClick={this.handleNeutralVoteBtnClick} />
        */



        if(this.props.style==="2"){
            return(
                <ListItemStyle2 linkToListURL={this.linkToListURL}
                        title={this.props.title}
                        href={this.state.meta.URL}
                        link_type={this.props.link_type}
                        dataIsLoading={this.state.dataIsLoading}
                        handleUpVoteBtnClick={this.handleUpVoteBtnClick}
                        upVotes={this.state.meta.up_votes}
                        downVotes={this.state.meta.down_votes}
                        setVoteBtnClickedToTrue={this.setVoteBtnClickedToTrue}
                        setIsDeletedTrue={this.setIsDeletedTrue}
                        handleDownVoteBtnClick={this.handleDownVoteBtnClick}
                        handleNeutralVoteBtnClick={this.handleNeutralVoteBtnClick}
                        submitted_by={this.state.meta.submitted_by}
                        linkItemPostId={this.props.linkItemPostId} 
                        shortcodeSourceId={this.props.shortcodeSourceId}
                        listId={this.props.listId}
                        isDeleted={this.state.isDeleted} />
            )
        }
        if(this.props.style==="1"){
            return(
                <ListItemStyle1 linkToListURL={this.linkToListURL}
                        submitted_by={this.state.meta.submitted_by}
                        title={this.props.title}
                        href={this.state.meta.URL}
                        link_type={this.props.link_type}
                        dataIsLoading={this.state.dataIsLoading}
                        handleUpVoteBtnClick={this.handleUpVoteBtnClick}
                        upVotes={this.state.meta.up_votes}
                        downVotes={this.state.meta.down_votes}
                        setVoteBtnClickedToTrue={this.setVoteBtnClickedToTrue}
                        setIsDeletedTrue={this.setIsDeletedTrue}
                        handleDownVoteBtnClick={this.handleDownVoteBtnClick}
                        handleNeutralVoteBtnClick={this.handleNeutralVoteBtnClick}
                        linkItemPostId={this.props.linkItemPostId}
                        shortcodeSourceId={this.props.shortcodeSourceId}
                        listId={this.props.listId}
                        isDeleted={this.state.isDeleted} />
            )
        }
    }
}

export default ListItem;