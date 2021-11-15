const { exec }  = require('child_process');
const app = require("express")(); // "npm install express" to install this dependency

app.get("/address", (req, res) => { // server this path
//  exec('scrapy crawl address', (err, stdout, stderr) => {

//    res.json({ // respond to client if the command was done
//      stdout: "" + stdout,
//      stderr: "" + stderr
//    });
    res.json({ // respond to client if the command was done
        stdout: "Fuzzing process ran!",
        stderr: "Oh no! an error"
    });
    console.log('hiii');
});

app.listen(80,() => console.log("server started"));