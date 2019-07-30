module.exports = function createUpVoteBtn(){
	var allListItemsArray = document.querySelectorAll('.link-list--style-1__link-list-item');
	
	var incrementer = 0;
	allListItemsArray.forEach(function(listItem){
		var upVoteBtn = document.createElement("button");
		upVoteBtn.setAttribute('class','link-list-item__up-vote-button');


		var cllId = document.createAttribute("cllId");       // Create a "class" attribute
		upVoteBtn.setAttributeNode(cllId);
		upVoteBtn.setAttribute('cllid', incrementer);

		listItem.appendChild(upVoteBtn);//append to inner html
		incrementer +=1;
	});

}