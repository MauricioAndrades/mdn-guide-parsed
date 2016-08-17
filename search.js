var fs = require('fs');
var path = require('path');
var fullpath = path.resolve('./guides')
var innerdata = [];
var guides = [];
var arr = [];
var alldata = []

// function getinnerdata(array) {
//   var paths = [];
//   array.forEach(function(el) {
//     var pathtoguide = (path.join(fullpath + '/' + el))

//   })
// }

// function mdnsearch() {
//   fs.readdir(fullpath, 'utf8', function(err, data) {
//     if (err) console.log(err);
//     return getinnerdata(data)
//   })
// }

// mdnsearch('node')

var jsonglob = require('json-glob');

jsonglob('./guides/**/*.json').then(function(data) {
  console.log(data)
})
