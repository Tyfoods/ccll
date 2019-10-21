module.exports = ccllGlobals = {
    isAddToListBtnClicked: false,
    isSubmitBtnClicked: false,
    isEditCategoryFormCreated: false,
    isCategoryInputCreated: false,
    isUpVoteBtnClicked: false,
    isNeutralVoteBtnClicked: false,
    isDownVoteBtnClicked: false,
    isBackBtnClicked: false,

    add_to_list_btn: document.getElementById("add_to_list_btn"),
    currentProtocalDomain: document.location.origin,
    searchEngineRequestSent: false,
    //searchEngineLooping: false,
    currentSearchResultsCollection: document.createElement("div").getElementsByClassName('noClassHere')
}