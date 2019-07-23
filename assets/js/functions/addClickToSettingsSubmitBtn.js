module.exports = //Function for creating on-click functionality and information to UPDATE page
function addClickToSettingsSubmitBtn(cllSettingsForm, updateCllListRequest, createNewCategoryRequest, makeRequest, replaceOccurrence)
{
	var settingsSubmitBtnArray = document.querySelectorAll('.settingsSubmitBtn');
	settingsSubmitBtnArray.forEach(function(settingsSubmitBtn)
	{
		if (typeof settingsSubmitBtn !== 'undefined')
		{

			//console.log("Settings Submit Button Existance Verified");

			var isCategoryInputCreated = false;

			settingsSubmitBtn.addEventListener("click", function(event)
			{
				event.preventDefault();
				var x = document.querySelector(".listCategorySelector").selectedIndex;
				var selectedCategory = document.getElementsByTagName("option")[x].value;

				if(selectedCategory === 'new category')
				{
					if(isCategoryInputCreated === false)
					{
					alert('You are making a New Category Request!');
					var newCategoryRequestElement = document.createElement("input"); //input element, text
					newCategoryRequestElement.setAttribute('type',"text");
					newCategoryRequestElement.setAttribute('name',"newCategoryRequestElement");
					newCategoryRequestElement.setAttribute('placeholder',"New category here");

					cllSettingsForm.appendChild(newCategoryRequestElement);

					isCategoryInputCreated = true;
					}

					else if(isCategoryInputCreated === true)
					{
						var newCategoryValue = document.querySelector('[name="newCategoryRequestElement"]').value
						//console.log(newCategoryValue);
						createNewCategoryRequest(newCategoryValue.toLowerCase(), makeRequest);
						//create new category with this value and change page to this category
						var cllRequestData = {
							"selectedCategory":newCategoryValue.toLowerCase(),
							"currentCllId":cllSettingsForm.getAttribute('cllid')
						}
						updateCllListRequest(cllRequestData, makeRequest, replaceOccurrence);
					}
				}
				else
				{
					for (var {} of existing_category_names_array) {
						if(selectedCategory === '')
						{
							alert("You must select a link category!");
							break;
						}
						else if(selectedCategory !== '')
						{
							//console.log("Successfully adding "+selectedCategory);
							//HTTP Request to update page FUNCTION
							var cllRequestData = {
								"selectedCategory":selectedCategory,
								"currentCllId":cllSettingsForm.getAttribute('cllid')
							}
							updateCllListRequest(cllRequestData, makeRequest, replaceOccurrence);
							break;
						}
					}
				}
			});
		}
	});
}