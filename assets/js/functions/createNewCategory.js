module.exports = function createNewCategory(newCategoryValue, deps)
{

	var NewCategoryData = {
		"name": newCategoryValue,
		"slug": newCategoryValue.replace(" ","-")
	}

	//console.log("Submit Button was clicked, now I'll post");
	deps.makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/cll-link-category/v1/cll-link/'+NewCategoryData.name, 'POST')
		.then(function(){
			//console.log("Request for new category has been made successfully");
		})
		.catch(function(error){
			//console.log("Failed to make the new category request");
			//console.log(error);
		});

}