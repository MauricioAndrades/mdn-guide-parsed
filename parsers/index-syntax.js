var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var readFile = Promise.promisify(require('fs').readFile);
var writeFile = Promise.promisify(require('fs').writeFile);
var cheerio = require('cheerio');
var toMarkdown = require('to-markdown');

var md = toMarkdown('<h1>Hello world!</h1>');
var mdn_node = require('./guides/Node.js');
var urls = [];
var bin = [];

for (var i = 0; i < mdn_node.length; i++) {
    urls.push(mdn_node[i]['href']);
}
console.log(urls)

for (var i = 0; i < urls.length; i++) {
    urls.push(request.getAsync(urls[i]));
}

Promise.all(urls).then(function (data) {
    for (var j = 0; j < parsed.length; j++) {
        var parsed = JSON.parse(JSON.stringify(data));
        var $ = cheerio.load(parsed[j]['body']);
        var _syntaxbox = $('pre.syntaxbox').text().trim();
        bin.push(_syntaxbox);
    }
}).catch(function (err) {
    if (err) console.log(err);
});
