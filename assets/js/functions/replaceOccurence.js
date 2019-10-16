module.exports = function replaceOccurrence (string, regex, n, replace) {
	var i = 0; //set up incrementer
	return string.replace(regex, function(match) {
		//i+=1;
		if(i===n){
			////console.log(replace);
			i+=1;
			return replace;
		}
		i+=1;
		////console.log(match);
		return match;
	});
};