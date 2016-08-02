var requireg = require("/Users/Op/.npm-global/lib/node_modules/requireg/lib/requireg.js");
var traverse = requireg('traverse');
var fs = require('fs');

var data = JSON.stringify(fs.readFileSync('/Volumes/ramdisk/interfaces-domsjon.json', 'utf8'));

// var data = JSON.parse(data);
var tlog = requireg('mod-log').tlog;
var plog = requireg('mod-log').plog;

var scrubbed = traverse(JSON.parse(data)).map(function (x) {
  if (x.circular) x.remove();
});

function traversedomjson(_data, callback) {
  var opts = {
    clean: true
  }
  var acc = [];
  var leaves = traverse(JSON.parse(_data)).map(function (acc, x) {
    if (opts.clean) {
      if (this.circular) this.remove();
      var key = this.key;
      if (this.key !== undefined && typeof this.key === 'string') {
        if (this.key) {
          var j = JSON.stringify(this.key);
          console.log('=========');
          console.log(j)
        }
      }
    }
    if (this.tagName !== undefined) {
      if (x.tagName.toString() === "A" || x.tagName.toString() === "DD") {
        var obj = {};
        if (x.text) obj.name = x.text;
        if (x.title) obj.desc = x.title;
        if (x.href) obj.href = x.href;
        if (Object.keys(obj).length > 0) acc.push(obj);
      }
    }
    return acc;
  }, []);
  // tlog('leaves', leaves);
  callback(leaves);
}

function writefile(object) {
  var data = JSON.stringify(object);
  fs.writeFile('/volumes/ramdisk/mdn.json', data, 'utf8', function (err) {
    if (err) plog(err);
  })
}

traversedomjson(scrubbed, writefile);
