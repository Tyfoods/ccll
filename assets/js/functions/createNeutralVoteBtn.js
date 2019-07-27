module.exports = function createNeutralVoteBtn(){
	var allListItemsCollection = document.getElementsByClassName('link-list-item');
	var allListItemsArray = Array.prototype.slice.call( allListItemsCollection, 0 );
	
	var incrementer = 0;

	allListItemsArray.forEach(function(listItem){
		var neutralVoteBtn = document.createElement("button");
		neutralVoteBtn.setAttribute('class','neutral_vote_button');

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		neutralVoteBtn.setAttributeNode(cllId);
		neutralVoteBtn.setAttribute('cllid', incrementer);

		listItem.appendChild(neutralVoteBtn);//append to inner html
		incrementer +=1;
	});
}