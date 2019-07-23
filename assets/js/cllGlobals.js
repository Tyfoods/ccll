module.exports = cllGlobals = {
    add_to_list_btn: document.getElementById("add_to_list_btn"),
    isAddToListBtnClicked: false,
    isSubmitBtnClicked: false,
    isSettingsFormClicked: false,
    currentProtocalDomain: document.location.origin,
    searchEngineRequestSent: false,
    //searchEngineLooping: false,
    currentSearchResultsCollection: document.createElement("div").getElementsByClassName('noClassHere')
}