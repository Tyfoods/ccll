
import makeRequest from '../functions/makeRequest'

function createNewCategoryRequest(newCategoryValue)
{

	var NewCategoryData = {
		"name": newCategoryValue,
		"slug": newCategoryValue.replace(" ","-")
	}

	//console.log("Submit Button was clicked, now I'll post");
	
	
	makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-link-category/v1/cll-link/'+NewCategoryData.name, 'POST')
		.then(function(request){
			console.log("Request for new category has been made successfully");
			console.log(request.responseText);
		})
		.catch(function(error){
			//console.log("Failed to make the new category request");
			console.log(error);
		});


}

export default createNewCategoryRequest;