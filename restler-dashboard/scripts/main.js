// Format test summary
function json_to_txt(path, filename) {
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

// Compile Page
var dict_path = "Compile/dict.json"; 
var dict_filename = "compile_dict.txt"
json_to_txt(dict_path, dict_filename);

// Compile Page
var config_path = "Compile/config.json"; 
var config_filename = "compile_config.txt"
json_to_txt(config_path, config_filename);

// Compile Page
var settings_path = "Compile/engine_settings.json"; 
var settings_filename = "compile_settings.txt"
json_to_txt(settings_path, settings_filename);

// Test Page
var test_path = "Test/RestlerResults/experiment77870/logs/testing_summary.json";
var test_filename = "test_summary.txt"
json_to_txt(test_path, test_filename);

// Fuzz-lean page
var fuzzlean_path = "FuzzLean/RestlerResults/experiment77894/logs/testing_summary.json"; 
var fuzzlean_filename = "fuzzlean_summary.txt"
json_to_txt(fuzzlean_path, fuzzlean_filename);

// Fuzz page
var fuzz_path = "Fuzz/RestlerResults/experiment81109/logs/testing_summary.json"; 
var fuzz_filename = "fuzz_summary.txt"
json_to_txt(fuzz_path, fuzz_filename);

// let filePath = "../../demo/Test/RestlerResults/experiment77870/logs/speccov.json";
// let test_data = require(filePath)
// console.log(test_data)

// Format test speccov data