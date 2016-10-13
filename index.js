var fs = require('fs');
var jsstr = require('javascript-stringify');
var requireg = require("/Users/Op/.npm-global/lib/node_modules/requireg/lib/requireg.js")
var utf8 = requireg('utf8');
var odata;

var arr = [];
var obj = {};

var odata = fs.readFileSync('./guides/Document.json', 'utf8');
var clean_data = utf8.encode(odata);
var parsed_data = JSON.parse(clean_data);

function format_data(somedata) {
    for (var i = 0; i < parsed_data.length; i++) {
        var name, href, type;
        var entry = parsed_data[i];
        if (entry['name']) {name = 'document' + entry["name"];}
        if (entry['href']) {href = entry["href"];}
        if (entry['type']) {type = entry["type"];}
        if (name && href) {
            obj[name] = [href];
        };
        arr.push(obj);
    }
}

format_data(parsed_data);

fs.writeFile('./docs-lookup.json', JSON.stringify(arr), 'utf8', function write(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log('done')
    }
})

function syntax(prop, arr) {

}
