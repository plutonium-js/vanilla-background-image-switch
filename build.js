const fs = require('fs');
const {minify} = require('uglify-es');
const pkg = require('./package');
const date = new Date();

const banner = `/*
 * Plutonium Vanilla-Background-Image-Switch v${pkg.version}
 * (c) ${date.getFullYear()} Jesse Dalessio - https://plutonium.dev
 * Released under the MIT license
*/`;

//src file data
const fData = [
	{
		src:"src/index.js",
		name:"bundle"
	}
]

//get the code and write the files
_get_all_code((code)=>{
	fs.writeFile('dist/bundle.js', `${banner}\n${code.vanilla}`, 'utf8', err => {
		if (err) return console.error(err);
	});
});

//recusively combine the code files
function _get_all_code(callback) {
	let index = 0;
	let code = {vanilla:''};
	let keys = Object.keys(fData);
	_recurse();
		
	function _recurse() {
		var fItem = fData[keys[index]];
		fs.readFile(fItem.src, 'utf8', (err, content) => {
			if (err) {return console.error(err);}
			else {
				let minResult = minify(content);
				if (minResult.error) return console.error(minResult.error);
				code.vanilla += minResult.code;
				index++; if (index<keys.length) _recurse();
				else callback(code);
			}
		});
	}
};



















