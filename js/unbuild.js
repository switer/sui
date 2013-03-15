var fs = require('fs'),
	fileName = './sui.js',
	compSliptReg = /\/\*ui\.[a-z]+\.js\*\//,
	nameMathReg = /\/\*ui\.[a-z]+\.js\*\//g;

function removeEmpty (arr) {
	var newArr = [];
	for (var i = 0; i< arr.length; i++) {
		if (arr[i] && (arr[i].replace(/\r/g, '').replace(/\n/g, '').replace(/\s/g, '').length !== 0)) newArr.push(arr[i])
	}
	return newArr;
}

var content = fs.readFileSync(fileName, 'UTF-8'),
	names = content.match(nameMathReg),
	ctnArr = removeEmpty(content.split(compSliptReg));

console.log(names);
console.log(ctnArr.length);

for (var i = 0; i< names.length; i++) {
	var file = names[i].replace(/^\/\*/, '').replace(/\*\/$/, '');
	fs.writeFileSync(file, ctnArr[i], 'UTF-8');
}

	

