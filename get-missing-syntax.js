var requireg = require('requireg');
var tlog = requireg('mod-log').tlog;
var plog = requireg('mod-log').plog;
var Promise = requireg('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(requireg('request'));
var cheerio = requireg('cheerio');
var traverse = Promise.promisifyAll(requireg('traverse'));
var jsondata = JSON.parse(fs.readFileSync('./guides/Array.json', 'utf8'));
var arr = [];
var promise_limit = require('promise-limit');
var PromiseThrottle = require('promise-throttle');

promise_limit(2);

function loadXHR(url) {
	return new Promise(load)

	function load(success, reject) {
		function onReadyStateChanged() {
			if (xhr.readyState !== XMLHttpRequest.DONE)
				return
			if (xhr.status !== 200) {
				xhr.onreadystatechange = null
				reject(new Error(xhr.status))
				return
			}
			xhr.onreadystatechange = null
			success(xhr.responseText)
		}
		var xhr = new XMLHttpRequest()
		xhr.withCredentials = false
		xhr.open('GET', url, true)
		xhr.onreadystatechange = onReadyStateChanged
		xhr.send(null)
	}
}

function job(name) {
	var text = loadXHR()
	console.log('started', text)

	return new Promise(function(resolve) {
		setTimeout(() => {
			console.log('       ', text, 'finished')
			resolve(text)
		}, 100)
	})
}

var traverseAsync = function(data) {
	return new Promise(function(resolve, reject) {
		try {
			traverse(data).forEach(function(entry) {
				if (typeof(entry.syntax) === "undefined" && entry.href) {
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
	.then(function(data) {
		var promises = [];
		data.forEach(function(el, i) {
			promises.push(request.getAsync(el.node.href))
		});
		return Promise.all(promises);
	})
	.then(function(data) {
		var $;
		var syntax = [];
		data.forEach(function(el, i) {
			return Promise.try(function() {
				$ = cheerio.load(el.body);
				var syntax_text = $("#Syntax").next().text().trim();
				if(syntax_text) {
					syntax.push(syntax_text);
				} else {
					syntax.push("");
				}
			})
		})
		return syntax;
	})
	.then(function(data) {
		data.forEach(function(el, i) {
			arr[i].node.syntax = data[i];
		})
		arr.forEach(function(el, i) {
			var key = eval(el.key);
			jsondata[key] = el.node;
		})
		plog(JSON.stringify(jsondata))
		fs.writeFileSync('test.js', JSON.stringify(jsondata));
	})
	.catch(function(e) {
		console.log(e);
	});

var file = fs.readFileSync('./guides/object.json', 'utf8')
