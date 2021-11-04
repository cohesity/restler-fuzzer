// import {DataTable} from "simple-datatables"

// window.addEventListener('DOMContentLoaded', event => {
//     // Simple-DataTables
//     // https://github.com/fiduswriter/Simple-DataTables/wiki

//     const myTable = document.getElementById('myTable');
//     let test_data = require("../../demo/Test/RestlerResults/experiment77870/logs/speccov.json")

//     if (myTable) {
//         new simpleDatatables.DataTable(myTable);
//     }
// });

// import {DataTable} from "simple-datatables"

// let test_data = require("../../demo/Test/RestlerResults/experiment77870/logs/speccov.json")

// let dataTable = new DataTable("#myTable", {
//     data: test_data
// });

window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    // let test_data = require("../../demo/Test/RestlerResults/experiment77870/logs/speccov.json")
    // import test_data from "../../demo/Test/RestlerResults/experiment77870/logs/speccov.json";
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

    console.log(test_data)
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple, {
            data: test_data
        });
    }
});