/*

Below is pseudo code on what it would take to render the entire Library via JS only.
This would effectively get rid of the "cll-list-style-1.php" file in the template folder.
At this time, i'm not sure why I would want to render the library skeleton via JS rather than PHP

*/


module.exports = function renderLibrary(){
    let cllLinkList = document.createElement("div");
    cllLinkList.setAttribute("class", "cll-link-list");

    //create basic children
    let listTitle = document.createElement("h4");

    //logic to determine what link list style is loaded
    let linkListUL = document.createElement("ul");
    linkListUL.setAttribute("class", "cll-link-list__link-list--style-1");
    cllLinkList.appendChild(linkListUl);
    //get all posts in the category specified by shortcode

    //makeRequest to get postArray


    //If postsArray is not empty
    postsArray.forEach(function(post){
        let linkListUL = document.querySelector("cll-link-list__link-list--style-1");
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "link-list--style-1__link-list-item");

        //postUrl = post.meta.URL;
        //postTitle = post.meta.title;
        let postURL = "";
        let postTitle = "";

        let listItemTitle = document.createElement("a");
        listItemTitle.href = postURL;
        listItemTitle.innerHTML = postTitle;


        listItem.appendChild(listItemTitle);


        linkListUL.appendChild(listItem);
    });
    //else postArray empty
    /*
        let noPostsMsg = document.createElement("p");
        noPostsMsg.setAttribute('class', link-list--style-1__no-links-text);
        noPostsMsg.innerHTML = "Sorry, there are no links to display";
        linkListUL.appendChild(noPostsMsg);
    */
}