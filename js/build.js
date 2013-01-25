var fs = require('fs')
	,comment
	,files = ['ui.button.js','ui.input.js','ui.popbox.js','ui.public.js']
	,content = ""
	, file;

for (var i = files.length - 1; i >= 0; i--) {
	console.log('build:' + files[i]);
	comment = '\n/*' + files[i] + '*/\n'
	file = fs.readFileSync(files[i],'UTF-8');
	content += ( comment  + file );
}
fs.writeFileSync('sui.mini.js', content, 'UTF-8');
	 