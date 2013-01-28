var fs = require('fs')
	, UglifyJS = require("uglify-js")
	, comment
	, files = ['ui.button.js','ui.input.js','ui.popbox.js','ui.public.js']
	, content = ""
	, file
	, cmbFilename = 'sui.js'
	, miniFilename = 'sui.min.js'
	, path = './js/';

for (var i = files.length - 1; i >= 0; i--) {
	console.log('Build : ' + files[i]);
	comment = '\n/*' + files[i] + '*/\n'
	file = fs.readFileSync(path + files[i],'UTF-8');
	content += ( comment  + file );
}
fs.writeFileSync(path + cmbFilename, content, 'UTF-8');
console.log('Combind File : ' + cmbFilename);
var result = UglifyJS.minify(path + cmbFilename);
console.log('Minify File : ' + miniFilename);
fs.writeFileSync(path + miniFilename, result.code, 'UTF-8');

var indexHtml = fs.readFileSync('index.html','UTF-8')
	, layoutHtml = fs.readFileSync('layout.html','UTF-8')
	, indexArray = indexHtml.split('<!--header-->')
	, layoutHeader = layoutHtml.split('<!--header-->')[0];

indexArray[0] = layoutHeader;
console.log('Override html : ' + 'index.html');
fs.writeFileSync('index_min.html', indexArray.join('<!--header-->'), 'UTF-8');
	 