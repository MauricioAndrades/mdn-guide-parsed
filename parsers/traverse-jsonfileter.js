var requireg = require("requireg");
var traverse = requireg('traverse');
var fs = require('fs');
var path_to_data = "/Users/Op/Documents/dev/projects/mdn-guide/guides/tealium-glossary.json"
var data = JSON.stringify(fs.readFileSync(path_to_data, 'utf8'));

// var data = JSON.parse(data);
var tlog = requireg('mod-log').tlog;
var plog = requireg('mod-log').plog;


var scrubbed = traverse(JSON.parse(data)).map(function(x) {
  if (x.circular) x.remove();
});

var acc = [];

function traversedomjson(_data, callback) {
  var opts = {
    clean: true
  }
  traverse(JSON.parse(_data)).forEach(function(x) {
    if (this.keys && this.keys.includes('tagName')) {

      if (this.node.tagName.toString().toLowerCase() === "a") {
        var obj = {};
        var n = this.node;
        if (n.text) obj.name = n.text;
        if (n.title) obj.desc = n.title;
        if (n.href) obj.href = n.href;
        acc.push(obj);
      }
    }
  });
  // tlog('leaves', leaves);
  callback(acc);
}

function writefile(arr) {
  var data = JSON.stringify(arr);
  fs.writeFile('/Users/Op/Desktop/file.json', data, 'utf8', function(err) {
    if (err) plog(err);
  })
}

traversedomjson(scrubbed, writefile);