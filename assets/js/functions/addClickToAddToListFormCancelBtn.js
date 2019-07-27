module.exports = function addClickToAddToListBtnFormCancelBtn()
{
	var cancelBtnArray = document.querySelectorAll(".cancelBtn");
	cancelBtnArray.forEach(function(cancelBtn)
	{

		if (typeof cancelBtn !== 'undefined')
		{
			cancelBtn.addEventListener("click", function()
			{
				var addToListForm = document.getElementById("addToListForm");
				addToListForm.parentNode.removeChild(addToListForm);
				event.stopPropagation(); //prevent parent element from being clicked
				cllGlobals.isAddToListBtnClicked = false;
			});
		}
		else
		{
			//console.log('cancelBtn is not defined');
		}
	});
}
