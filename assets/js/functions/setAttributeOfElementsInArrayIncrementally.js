module.exports = function setAttributeOfElementsInArrayIncrementally(array, attribute_name){
	var incrementer = 0;

	array.forEach(function(item){
		var attribute = document.createAttribute(attribute_name);
		item.setAttributeNode(attribute);
		item.setAttribute(attribute_name, incrementer);
		incrementer+=1;
	});
}