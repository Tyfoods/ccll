module.exports = function deletePendingListRequest(newListItemData){
	var deletePendingListRequest = new XMLHttpRequest();
	deletePendingListRequest.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				//Nothing below gets called :O ready state is NEVER 4!!!
				////console.log('Successful Pending List Deletion - Hello');
				////console.log(deletePendingListRequest.responseText);
			}
				//if request fails...?
		}
	deletePendingListRequest.open("POST", ccllGlobals.currentProtocalDomain+'/wp-json/ccll-link/v1/list-declined-request/'+newListItemData['listId']);
	deletePendingListRequest.setRequestHeader("X-WP-Nonce", magicalData.nonce);
	deletePendingListRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	deletePendingListRequest.send(JSON.stringify(newListItemData));
}