function addNewListItemJS(jsDataArray){

	var newListItemTitle = jsDataArray.newListItemTitle;
	var currentAddToListBtn = jsDataArray.currentAddToListBtn;

  	var li = document.createElement("li");
  	li.innerHTML = newListItemTitle;

 	currentAddToListBtn.parentNode.insertBefore(li, currentAddToListBtn);

 
}