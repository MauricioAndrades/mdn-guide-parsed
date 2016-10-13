'use strict';
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var readFile = Promise.promisify(require('fs').readFile);
var writeFile = Promise.promisify(require('fs').writeFile);
var cheerio = require('cheerio');
var toMarkdown = require('to-markdown');

// console.log(toMarkdown(html[0], {
// 	converters: [
// 		{filter: 'code', replacement: function (contents) {return contents + '`';}},
// 		// {filter: function (node) {return node.className === 'brush: html';} ,replacement: function (content) {return '```html' + '\n' + content + '```';}},
// 		{filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], replacement: function (innerHTML, node) {var hLevel = node.tagName.charAt(1); var hPrefix = ''; for (var i = 0; i < hLevel; i++) {hPrefix += '#';} return '\n' + hPrefix + ' ' + innerHTML + '\n\n';} }, {
// 		// filter: function (node) {return node.className === 'note'; },
// 		// replacement: function (contents) {return '' + contents; }
// 	}],
// 	gfm: true
// }));

// return;
var fs = require('fs');
var data = fs.readFileSync('/Volumes/ramdisk/index.html', 'utf8');
var $ = cheerio.load(data);

var html = $('body').html()

toMarkdown(html, {
	converters: [
		{filter: 'code', replacement: function (contents) {return contents + '`';}},
		// {filter: function (node) {return node.className === 'brush: html';} ,replacement: function (content) {return '```html' + '\n' + content + '```';}},
		{filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], replacement: function (innerHTML, node) {var hLevel = node.tagName.charAt(1); var hPrefix = ''; for (var i = 0; i < hLevel; i++) {hPrefix += '#';} return '\n' + hPrefix + ' ' + innerHTML + '\n\n';} }, {
		filter: function (node) {return node.textContent > 0; },
		replacement: function (contents) {return '' + contents; }
	}],
	gfm: true
});


// 	$("lia-message-template-content-zone").contents().each(function () {
// 		var text = ($(this).text().trim());
// 	});
// }).catch(function (err) {
// 	if (err) console.log(err);
// });
