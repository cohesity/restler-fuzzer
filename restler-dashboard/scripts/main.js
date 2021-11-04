// Format test summary
function format_test_summary(path, filename) {
    var json2plain = require('json2plain');

    var json = require('../../demo/' + path);
    var plain = json2plain(json);
    while (plain[0] == "\n") 
        plain = plain.substring(1 , plain.length - 1);

    var fs = require('fs');
    fs.writeFile('../data/' + filename, plain, function(err, result) {
        if(err) console.log('error', err);
    });
}

var test_path = "Test/RestlerResults/experiment77870/logs/testing_summary.json";
var test_filename = "test_summary.txt"
format_test_summary(test_path, test_filename);

var fuzzlean_path = "FuzzLean/RestlerResults/experiment77894/logs/testing_summary.json"; 
var fuzzlean_filename = "fuzzlean_summary.txt"
format_test_summary(fuzzlean_path, fuzzlean_filename);

var fuzz_path = "Fuzz/RestlerResults/experiment81109/logs/testing_summary.json"; 
var fuzz_filename = "fuzz_summary.txt"
format_test_summary(fuzz_path, fuzz_filename);

// Format test speccov data