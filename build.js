var fs = require('fs'),
    UglifyJS = require("uglify-js"),
    comment, files = ['ui.button.js', 'ui.input.js', 'ui.popbox.js', 'ui.base.js', 'ui.extension.js'],
    content = "",
    file, cmbFilename = 'sui.js',
    miniFilename = 'sui.min.js',
    path = './js/',
    builddir = './js/build/',
    componentPath = './js/component/';

for (var i = files.length - 1; i >= 0; i--) {
    console.log('Build : ' + componentPath + files[i]);
    comment = '\n/*' + files[i] + '*/\n'
    file = fs.readFileSync(componentPath + files[i], 'UTF-8');
    content += (comment + file);
}
fs.writeFileSync(builddir + cmbFilename, content, 'UTF-8');
console.log('\nCombind File : ' + path + cmbFilename);
var result = UglifyJS.minify(path + cmbFilename);
console.log('Minify File  : ' + path + miniFilename);
fs.writeFileSync(builddir + miniFilename, result.code, 'UTF-8');

