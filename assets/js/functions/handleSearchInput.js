module.exports = function handleSearchInput(){
	var cllSearchFormInput = document.querySelector('.cll_search_form_input');
	var cllSuggestions = document.querySelector('.cll-suggestions');

	if(cllSearchFormInput !== undefined){

		var searchEngineTimeout;

		cllSearchFormInput.onkeydown = function(){
			if (event.keyCode == 13){
				event.preventDefault();
			}
		}

		cllSearchFormInput.onkeyup = function(){

			//clear search results
			cllSuggestions.innerHTML = '';

			//clear search results array with IIFE
			(function (){
				//var cllSuggestions = document.querySelector('.cll-suggestions');
				var loadingElementCollection = document.querySelectorAll('#cll-loading')

					var loadingElement = document.createElement("div");
					loadingElement.setAttribute('id','cll-loading');
					loadingElement.innerHTML = 'LOADING';
					if(loadingElementCollection.length === 0){
						//console.log("Adding Loading Element");
						cllSuggestions.appendChild(loadingElement);
					}

			}());

			//Process searchEngine Input after one second
			searchEngineTimeout = setTimeout( function () {

				clearTimeout(searchEngineTimeout);

				//If the input is nothing then clear search results
				if(cllSearchFormInput.value === ' ' || cllSearchFormInput.value === '')
				{
					//console.log("No value was entered");
					cllSuggestions.innerHTML = '';


				}
				else
				{

					makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?search='+cllSearchFormInput.value,
						'GET',
						false
					)
					.then(function(request){
						cllSuggestions.innerHTML = '';

						var searchResultsObj = JSON.parse(request.responseText);

						searchResultsObj.forEach(function(searchResult){
							if(cllSuggestions.childElementCount < 5)
							{
								//console.log("Search result below!");
								//console.log(searchResult);
								var searchResultElement = document.createElement("div");
								searchResultElement.setAttribute('class','search-result-element');

								searchResultElement.innerHTML = searchResult.title.rendered; //set innerHTML to title

								if(searchResult.meta.link_type.toLowerCase() === "external link"){
									cllSuggestions.appendChild(searchResultElement);
								}

								//make searchResult Clickable
								searchResultElement.addEventListener('click', function(){
									event.preventDefault();
									window.open(searchResult.meta.URL); //Open in link new window
								});
							}

						});

					})
					.catch(function(error){
						console.log(error);
					});
				}	
			}, 1000);
		};
		
	}
}