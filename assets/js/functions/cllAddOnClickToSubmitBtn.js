module.exports = function cllAddOnClickToSubmitBtn(currentAddToListBtn, isUrl, endLinkRequest, throughLinkRequest, makeRequest){

	var submitBtn = document.querySelector('button.submitBtn');


	if (typeof submitBtn !== 'undefined')
	{
		//console.log("Submit Button Existance Verified");
		submitBtn.addEventListener("click", function()
		{
			var x = document.getElementById("linkTypeSelecter").selectedIndex;
			var linkType = document.getElementsByTagName("option")[x].value;

			//console.log(document.querySelector('[name="newListItemUrl"].add_to_list_input'));

			if(document.querySelector('[name="newListItemTitle"].add_to_list_input').value === ''){
				alert("You must submit a title!");
			}
			else if(linkType.toLowerCase() === 'external link')
			{
				if(document.querySelector('[name="newListItemUrl"].add_to_list_input').value === ''){
					alert("You must submit a URL!");
				}
				else if(!isUrl(document.querySelector('[name="newListItemUrl"].add_to_list_input').value))
				{
					alert("Please enter a valid URL!");
				}
				else
				{
					endLinkRequest(currentAddToListBtn, makeRequest);
				}
			}
			else if(linkType.toLowerCase() === 'internal link')
			{
				throughLinkRequest(currentAddToListBtn, makeRequest);
			}
			else if(linkType.toLowerCase() !== 'internal link' && linkType.toLowerCase() !== 'external link')
			{
				alert("You must select a Link Type!");
			}
		});
	return;
	}
}