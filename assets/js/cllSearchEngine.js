var cllGlobals = {
			currentProtocalDomain: document.location.origin	
}



var makeRequest = function (url, method, sendData) {

	console.log("request made");
	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {

		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);
				if(typeof sendData !== 'undefined')
				{
					//document.location.reload(true);
					console.log('sendData was not equal to undefined');
				}
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

		// Setup our HTTP request
		request.open(method || 'GET', url, true);
		request.setRequestHeader("X-WP-Nonce", magicalData.nonce);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

		// Send the request
		//console.log(sendData);
		if(typeof sendData === 'undefined'){
			request.send();	
			//console.log("Data is undefined! No data was sent");
		}
		else{
			//console.log(sendData);
			request.send(sendData);
		}

	});
};



function handleSearchInput(){
	var cllSearchFormInput = document.querySelector('.cll_search_form_input');
	//console.log(cllSearchFormInput);
	cllSearchFormInput.oninput = function(){

		console.log(cllSearchFormInput.value);

		makeRequest(cllGlobals.currentProtocalDomain+'/wp-content/plugins/curation-link-library/cll-core/cll-search-engine.php',
			'POST',
			JSON.stringify(cllSearchFormInput.value)
		)
		.then(function(request){
			console.log(request.responseText);
		})
		.catch(function(error){
			console.log(error);
		});

	};
}

window.onload=function()
{
	console.log("window loaded");
	handleSearchInput();

}