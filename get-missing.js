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
			traverse(data).forEach(function(x) {
				if (x.desc && (x.desc === 'Editorial review completed.' || x.desc === 'Technical review completed.')) {
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
		var descriptions = [];
		data.forEach(function(el, i) {
			return Promise.try(function() {
				$ = cheerio.load(el.body);
				var description = $('#wikiArticle > p').text();
				descriptions.push(description);
			})
		})
		return descriptions;
	})
	.then(function(data) {
		data.forEach(function(el, i) {
			arr[i].node.desc = data[i];
		})
		arr.forEach(function(el, i) {
			var key = eval(el.key);
			jsondata[key] = el.node;
		})
		plog(JSON.stringify(jsondata))
	})
	.catch(function(e) {
		console.log(e);
	});

var file = fs.readFileSync('path', 'utf8')
