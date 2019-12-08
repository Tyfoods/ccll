import makeRequest from '../functions/makeRequest'

export default async function slugify(string){
  /*
    let stringArray = [];
    
    for (var i = 0; i < string.length; i++){
      stringArray[i] = string.charAt(i);
    }
    
    var i = 0;
    stringArray.forEach(function(character){
      if(character === '.' ||character === ' '){
        if(typeof prevCharacter != undefined){
          if(stringArray[i-1] === '-'){
            stringArray[i] = '';
          }
          else{
            stringArray[i] = '-';
            
          }
        }
      }
      i+=1;
    });
    let slugString = stringArray.toString().replace(/[,]/g,'').toLowerCase();
    return slugString;
  */
    let wpSlug = '';
    await makeRequest(ccllGlobals.currentProtocalDomain+'/wp-json/ccll-link/v1/generate-wp-post-slug/', 'POST', JSON.stringify({'pre_slug_name': string}))
        .then(function(request){
            //console.log("wp slug result: "+request.responseText);
            wpSlug = request.responseText;
        })
        .catch(function(error){
            console.log(error);
        });
    return wpSlug.slice(1,-1);
  }