	
import cllGlobals from '../js/cllGlobals';
import makeRequest from '../js/functions/makeRequest';
import createNewCategory from '../js/functions/createNewCategory';
import deletePendingListRequest from '../js/functions/deletePendingListRequest';
//import deletePendingLinkRequest from '../js/functions/deletePendingLinkRequest';
import addClickToListApproveBtn from '../js/functions/addClickToListApproveBtn';
import addClickToListDeclineBtn from '../js/functions/addClickToListDeclineBtn';

import handleListApproveBtnClick from '../js/functions/handleListApproveBtnClick';
import handleListDeclineBtnClick from '../js/functions/handleListDeclineBtnClick';

import addClickToLinkDeclineBtn from '../js/functions/addClickToLinkDeclineBtn';
import addClickToLinkApproveBtn from '../js/functions/addClickToLinkApproveBtn';

import handleLinkDeclineBtnClick from '../js/functions/handleLinkDeclineBtnClick';
import handleLinkApproveBtnClick from '../js/functions/handleLinkApproveBtnClick';












window.onload=function()
{
    const dependencies = {
        'createNewCategory': createNewCategory,
        'handleListApproveBtnClick': handleListApproveBtnClick,
        'handleListDeclineBtnClick': handleListDeclineBtnClick,
        'handleLinkDeclineBtnClick': handleLinkDeclineBtnClick,
        'handleLinkApproveBtnClick': handleLinkApproveBtnClick,
        'deletePendingListRequest': deletePendingListRequest,
        'makeRequest': makeRequest,
    }
    
    //addOnClickToApproveBtn();
    addClickToLinkApproveBtn(dependencies);
    //addOnClickToDeclineBtn();
    addClickToLinkDeclineBtn(dependencies);
    //addOnClickToListApproveBtn();
    addClickToListApproveBtn(dependencies);
    //addOnClickToListDeclineBtn();
    addClickToListDeclineBtn(dependencies);
}