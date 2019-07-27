

module.exports = function removeAllChildFromNodeExceptText(node){

    //var node = document.querySelector(nodeSelector);
    for(var i=0;i<node.childNodes.length;i++){
        if(node.childNodes[i].nodeType==3){         //check if text node
            continue;
        }
        else {
            node.removeChild(node.childNodes[i]);
            i--;
        }
    }
    return node;
}