
let appId = (()=>{
    if(typeof do_api_credentials_exist[1][0] !== 'undefined'){
      if(typeof do_api_credentials_exist[1][0]['app_id'] !== 'undefined' && do_api_credentials_exist[1][0]['app_id'] !== null){
        return do_api_credentials_exist[1][0]['app_id'];
      }
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

  