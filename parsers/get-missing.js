var requireg = require('requireg');
// var tlog = requireg('mod-log').tlog;
// var plog = requireg('mod-log').plog;
var Promise = requireg('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(requireg('request'));
var cheerio = requireg('cheerio');
var traverse = Promise.promisifyAll(requireg('traverse'));
var jsondata = JSON.parse(fs.readFileSync('/Users/Op/Documents/gschool/proj/mdn-guide/guides/glossary.json', 'utf8'));
var arr = [];

var traverseAsync = function (data) {
	return new Promise(function (resolve, reject) {
		try {
			traverse(data).forEach(function (x) {
				if (x.desc && (x.desc === 'Editorial review completed.' || x.desc === 'Technical review completed.' || 'Technical review completed. Editorial review completed.')) {
					arr.push({
						key: this.key,
						node: this.node
					});
				}
			})
			resolve(arr);
		} catch (e) {
			reject(e);
		}
	});
};

traverseAsync(jsondata)
	.then(function (data) {
		var promises = [];
		data.forEach(function (el, i) {
			promises.push(request.getAsync(el.node.href))
		});
		return Promise.all(promises);
	})
	.then(function (data) {
		var $;
		var descriptions = [];
		data.forEach(function (el, i) {
			return Promise.try(function () {
				$ = cheerio.load(el.body);
				var description = $('#wikiArticle > p').text();
				descriptions.push(description);
			})
		})
		return descriptions;
	})
	.then(function (data) {
		data.forEach(function (el, i) {
			arr[i].node.desc = data[i];
		})
		arr.forEach(function (el, i) {
			var key = eval(el.key);
			jsondata[key] = el.node;
		})
		console.log(JSON.stringify(jsondata))
	})
	.catch(function (e) {
		console.log(e);
	});

// var file = fs.readFileSync('path', 'utf8')
