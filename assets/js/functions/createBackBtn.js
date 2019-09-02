module.exports = function createBackBtn(makeRequest, addClickToCancelBackBtn, deps){
	var backBtn = document.createElement('button');
	backBtn.setAttribute("class", "back-btn");
	//backBtn.innerHTML = "<-- Back";
	
	//var cll_link_list = document.querySelector('.cll-link-list');

	//cll_link_list.parentElement.insertBefore(backBtn, cll_link_list.parentElement.firstChild);

	let controlBox = document.querySelector('.control-box');
	controlBox.appendChild(backBtn);


	
	backBtn.addEventListener("click", function(){
		
		if(cllGlobals.isBackBtnClicked === false){
			if (confirm("Are you sure you would like to go back?")) {
				//console.log("You pressed YES!");

				let postSlug = window.location.pathname.replace(/[/]link[/]/g, '').replace(/[/]/g, '');
				makeRequest(cllGlobals.currentProtocalDomain+'/wp-json/wp/v2/cll-link?slug='+postSlug, "GET")
					.then(function(request){
						try{
							let mentionObj = JSON.parse( (JSON.parse(request.responseText))[0].meta.mention_record );
							let mentionArray = Object.values(mentionObj);
							console.log(mentionArray);

							let mentionSlugArray = mentionArray.map(function(mention){
								mention = mention.replace(cllGlobals.currentProtocalDomain+'/', '').replace(/link[/]/g, '');
								mention = mention.slice(0, -1);
								return mention;
							});

							console.log(mentionArray);
							console.log(mentionSlugArray);

							
							//later appended
							let backBtn = document.querySelector(".back-btn");
							backBtn.style.cssText = "background-image:none !important;border-radius:10px;border-color:#000;border-style:outset;border-width:3px";


							let cancelBackBtn = document.createElement("button");
							cancelBackBtn.setAttribute("class", "back-btn__cancel-btn");
							

							let dropDownBox = document.createElement('select','dropdownbox');
							dropDownBox.setAttribute('class', 'back-selector');


							let dropDownBoxPlaceHolder = document.createElement("option"); //input element, text
							dropDownBoxPlaceHolder.innerHTML = "Pick where to go back to...";
							dropDownBoxPlaceHolder.value = '';
							dropDownBoxPlaceHolder.disabled = true;
							dropDownBoxPlaceHolder.selected = true;


							mentionSlugArray.forEach(function(mentionSlug){
								let mention = document.createElement("option");
								mention.innerHTML = mentionSlug;
								mention.value = mentionSlug;
					
								dropDownBox.appendChild(mention);
							});
							
							dropDownBox.appendChild(dropDownBoxPlaceHolder);

							backBtn.appendChild(cancelBackBtn);
							backBtn.appendChild(dropDownBox);
							addClickToCancelBackBtn(deps);

							

							dropDownBox.addEventListener("change", function(){
								var currentBackSelection = document.querySelector('.back-selector').value;
								if(currentBackSelection !== ''){
									if(confirm("Would you like to go back to: "+currentBackSelection+'?')){
										mentionArray.forEach(function(mention){
											mention = mention.replace(cllGlobals.currentProtocalDomain+'/', '').replace(/link[/]/g, '');
											mention = mention.slice(0, -1);
											if(mention === currentBackSelection){
												window.location.href = currentBackSelection;
											}
										});
									}
								}
								else{
									alert("Okay");
								}

							})


							cllGlobals.isBackBtnClicked = true;
						}
						catch(error){
							//console.log("Unable to parse, it is likely that there is no mention_record available");
							alert("Sorry, we couldn't find a back route for this page!");
							console.log(error);
						}
					});

				} else {
				//console.log("You pressed NO");
				}
		}
	});
}