module.exports = function slugify(string){
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
  }