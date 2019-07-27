module.exports = function createDownVoteBtn(){
	var allListItemsArray = document.querySelectorAll('.link-list-item');
	
	var incrementer = 0;

	allListItemsArray.forEach(function(listItem){
		var downVoteBtn = document.createElement("button");
		downVoteBtn.setAttribute('class','down_vote_button');

		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		downVoteBtn.setAttributeNode(cllId);
		downVoteBtn.setAttribute('cllid', incrementer);

		listItem.appendChild(downVoteBtn);//append to inner html
		incrementer +=1;
	});
}