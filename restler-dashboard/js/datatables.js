function loadJSON(filePath) { 
    console.log("here")
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = function() { 
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) { 
                    if (success) 
                        console.log(JSON.parse(xhr.responseText)); 
            } else { 
                console.log("error")
            } 
        }; 
        xhr.open("GET", filePath, true); 
        xhr.send(); 
    }
} 

window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    
    // const fs = require('fs');
    let filePath = "../../demo/Test/RestlerResults/experiment77870/logs/speccov.json";
    // var mydata = JSON.parse(speccov);
    // console.log(mydata);
    // let test_data = require(filePath);
    // const test_data = require("../../demo/Test/RestlerResults/experiment77870/logs/speccov.json");
    // import test_data from filePath;
    // fetch(filePath) 
	// .then(response => response.json()) 
	// .then(parsed => console.log(parsed/* parsed contains the parsed json object */)); 
    loadJSON(filePath);

    // var test_data = JSON.parse(fs.readFileSync("../../demo/Test/RestlerResults/experiment77870/logs/speccov.json"));
    // import test_data from "../../demo/Test/RestlerResults/experiment77870/logs/speccov.json";

    let test_data = [
        {
            "prop1": "value1",
            "prop2": "value2",
            "prop3": "value3"
        },
        {
            "prop1": "value4",
            "prop2": "value5",
            "prop3": "value6"
        }
    ];
    
    let obj = {
        // Quickly get the headings
        headings: Object.keys(test_data[0]),
        // data array
        data: []
    };
    
    // Loop over the objects to get the values
    for ( let i = 0; i < test_data.length; i++ ) {
        obj.data[i] = [];
        for (let p in test_data[i]) {
            if( test_data[i].hasOwnProperty(p) ) {
                obj.data[i].push(test_data[i][p]);
            }
        }
    }

    console.log(obj)
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple, {
            data: obj
        });
    }
});


let test_data = {
    "headings": [
        "HTTP Method",
        "Endpoint",
        "Status Code",
        "Request URI",
    ],
    "data": [
        [
            "GET",
            "/blog/posts",
            "200",
            "/api/blog/posts?per_page=2&page=1",
        ],
        [
            "POST",
            "/blog/posts",
            "201",
            "/api/blog/posts",
        ], 
        [
            "GET",
            "/doc",
            "200",
            "/api/doc"
        ],
        [
            "DELETE",
            "/blog/posts/{postId}",
            "200",
            "/api/blog/posts/5874"
        ],
        [
            "PUT",
            "/blog/posts/{postId}",
            "200",
            "/api/blog/posts/5875"
        ],
        [
            "GET",
            "/blog/posts/{postId}",
            "200",
            "/api/blog/posts/5880"
        ]
    ]};