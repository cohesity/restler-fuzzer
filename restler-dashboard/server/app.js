const { exec } = require("child_process");
var express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
var app = express();

app.use(express.json());
app.use(cors());

/*
TODO:
- make POST endpoint for each 'Run Process' button (4)
  - should use exec to execute a cli command for each process
  - future: should take config parameters in the request
- make GET endpoint for each process (4), compile config file (3), test summary and logs (2), fuzzlean + fuzz summary graphs and logs (4 x2)
  - should check if each relevant file exists within server dir
  - return file if it exists
  - return not found error otherwise
*/

app.post("/run/:process", runProcess);

function runProcess(req, res) {
  var process = req.params["process"];
  var cmd = "";
  if (process == "compile") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec ../../demo/swagger.json > data/compile_process.txt";
  } else if (process == "test") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll test --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings Compile/engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/auth.py' --token_refresh_interval 720 > data/test_process.txt";
  } else if (process == "fuzzlean") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll fuzz-lean --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings Compile/engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/auth.py' --token_refresh_interval 720 > data/fuzzlean_process.txt";
  } else if (process == "fuzz") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll fuzz --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings Compile/engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/auth.py' --token_refresh_interval 720 > data/fuzz_process.txt";
  }
  exec(cmd, (err, stdout, stderr) => {
    res.json({
      // respond to client if the command was done
      stdout: "Process executed.",
      stderr: "" + stderr,
    });
    console.log(stdout);
  });
}

app.use("/file/:dir/:filename", getFile);

function getFile(req, res) {
  var dir = req.params["dir"];
  var filename = req.params["filename"];

  var options = {
    root: path.join(__dirname, dir),
  };

  res.sendFile(filename, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent:", filename);
    }
  });
}

app.post("/upload/:filename", uploadFile);

function uploadFile(req, res) {
  var filename = req.params["filename"];
  // console.log(res.json({ requestBody: req.body }));
  fs.writeFile(
    "uploads/spec.json",
    JSON.stringify(req.body, null, "\t"),
    (err) => {
      if (err) return next(err);
    }
  );
  console.log("Received " + filename + ".");
}

app.listen(80, () => console.log("Server started..."));

// app.get("/compile_process", (req, res) => {
//   exec(
//     "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec ../../demo/swagger.json",
//     (err, stdout, stderr) => {
//       res.json({
//         // respond to client if the command was done
//         stdout: "" + stdout,
//         stderr: "" + stderr,
//       });
//       console.log(stdout);
//     }
//   );
// });
