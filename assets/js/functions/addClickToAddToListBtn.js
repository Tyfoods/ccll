module.exports = function addClickToAddToListBtn(deps){
	var add_to_list_btn_array = document.querySelectorAll(".cll-link-list__add-to-list-btn");

	deps.setAttributeOfElementsInArrayIncrementally(add_to_list_btn_array, 'cllId');

	add_to_list_btn_array.forEach(function(currentAddToListBtn){
		currentAddToListBtn.addEventListener("click", function(){
			deps.createAddToListBtnForm(currentAddToListBtn, deps);
		});
	})

	return add_to_list_btn_array;
}
