var fs = require('fs')
	, UglifyJS = require("uglify-js")
	, comment
	, files = ['ui.extension.js','ui.base.js','ui.button.js','ui.input.js','ui.popbox.js']
	, content = ""
	, file
	, cmbFilename = 'sui.js'
	, miniFilename = 'sui.min.js'
	, path = './js/'
	, builddir = './js/build/'
	, componentPath = './js/component/';

for (var i = files.length - 1; i >= 0; i--) {
	console.log('Build : ' + componentPath + files[i]);
	comment = '\n/*' + files[i] + '*/\n'
	file = fs.readFileSync(componentPath + files[i],'UTF-8');
	content += ( comment  + file );
}
fs.writeFileSync(builddir + cmbFilename, content, 'UTF-8');
console.log('\nCombind File : ' + path + cmbFilename);
var result = UglifyJS.minify(path + cmbFilename);
console.log('Minify File  : ' + path + miniFilename);
fs.writeFileSync(builddir + miniFilename, result.code, 'UTF-8');

// var indexHtml = fs.readFileSync('index.html','UTF-8')
// 	, layoutHtml = fs.readFileSync('layout.html','UTF-8')
// 	, indexArray = indexHtml.split('<!--header-->')
// 	, layoutHeader = layoutHtml.split('<!--header-->')[0];

// indexArray[0] = layoutHeader;
// console.log('Override html : ' + 'index.html');
// fs.writeFileSync('index.html', indexArray.join('<!--header-->'), 'UTF-8');
	 