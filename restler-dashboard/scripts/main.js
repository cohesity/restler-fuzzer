var json2plain = require('json2plain');

var json = require('../../demo/Test/RestlerResults/experiment77870/logs/testing_summary.json');
var plain = json2plain(json);
while (plain[0] == "\n") 
    plain = plain.substring(1 , plain.length - 1);

var fs = require('fs');
fs.writeFile('../data/test_summary.txt', plain, function(err, result) {
    if(err) console.log('error', err);
});