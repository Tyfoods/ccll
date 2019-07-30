

module.exports = function createAddToListBtn() {
	var allListsArray = document.querySelectorAll('.cll-link-list__link-list--style-1');
	allListsArray.forEach(function(list){
		//append Add To List! button
		var addToListBtn = document.createElement('button');
		addToListBtn.setAttribute('class', "cll-link-list__add-to-list-btn");
		addToListBtn.innerHTML = "Add To List +";

		list.parentNode.insertBefore(addToListBtn, list.nextSibling);
	});
};