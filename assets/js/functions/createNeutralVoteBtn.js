module.exports = function createNeutralVoteBtn(){
	var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');
	
	var incrementer = 0;

	allListItemsArray.forEach(function(listItem){
		var neutralVoteBtn = document.createElement("button");
		neutralVoteBtn.setAttribute('class','link-list-item__neutral-vote-button');

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		neutralVoteBtn.setAttributeNode(cllId);
		neutralVoteBtn.setAttribute('cllid', incrementer);

		listItem.appendChild(neutralVoteBtn);//append to inner html
		incrementer +=1;
	});
}