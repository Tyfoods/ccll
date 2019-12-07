
let appId = (()=>{
    if(typeof do_api_credentials_exist !== 'undefined'){
      if(do_api_credentials_exist[0] === "false") return;
      if(typeof do_api_credentials_exist[1].length !== 0){

        if(do_api_credentials_exist[1][0]['app_id'] !== null){

          return do_api_credentials_exist[1][0]['app_id'];

        }
      }
    }
    else{
      return "";
    }
  })()
  

window.fbAsyncInit = function() {
    FB.init({
      appId            : `${appId}`,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v4.0'
    });
  };

  