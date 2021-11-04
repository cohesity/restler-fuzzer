var json2plain = require('json2plain');

var json = require('../../demo/Test/RestlerResults/experiment77870/logs/testing_summary.json');
var plain = json2plain(json);

console.log(plain);