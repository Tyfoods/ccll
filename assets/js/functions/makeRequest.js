module.exports = function makeRequest (url, method, sendData, refresh) {


	var refreshInput = refresh || '';


	////console.log("request made");
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
					////console.log('sendData was present!');
				}

				if(refreshInput === false){

				}
				else if(refreshInput === true){
					document.location.reload(true);
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
		if(typeof sendData === 'undefined'){
			request.send();	
			////console.log("Data is undefined! No data was sent");
		}
		else{
			////console.log(sendData);
			request.send(sendData);
		}

	});
};