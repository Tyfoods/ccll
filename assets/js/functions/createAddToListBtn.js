

module.exports = function createAddToListBtn() {
	var allListsArray = document.querySelectorAll('.link-list-style-1');
	allListsArray.forEach(function(list){
		//append Add To List! button
		var addToListBtn = document.createElement('button');
		addToListBtn.setAttribute('class', "add_to_list_btn");
		addToListBtn.innerHTML = "Add To List +";

		list.parentNode.insertBefore(addToListBtn, list.nextSibling);
	});
};