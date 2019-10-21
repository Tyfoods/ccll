
let appId = (()=>{
    if(typeof do_api_credentials_exist !== 'undefined'){
      if(typeof do_api_credentials_exist[1][0]['app_id'] !== 'undefined' && do_api_credentials_exist[1][0]['app_id'] !== null){
        return do_api_credentials_exist[1][0]['app_id'];
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

  