const { exec } = require("child_process");
var express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const YAML = require("yaml");
var app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

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
  var output_dir = "";
  if (process == "compile") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec uploads/spec.json > process_data/compile_process.txt";
    output_dir = "Compile";
  } else if (process == "test") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll test --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings Compile/engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/auth.py' --token_refresh_interval 720 > process_data/test_process.txt";
    output_dir = "Test";
  } else if (process == "fuzzlean") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll fuzz-lean --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings Compile/engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/auth.py' --token_refresh_interval 720 > process_data/fuzzlean_process.txt";
    output_dir = "FuzzLean";
  } else if (process == "fuzz") {
    cmd =
      "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll fuzz --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings Compile/engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/auth.py' --token_refresh_interval 720 > process_data/fuzz_process.txt";
    output_dir = "Fuzz";
  }
  var time = new Date()
    .toLocaleString()
    .replace(/ /g, "_")
    .replace(/\//g, "-")
    .replace(",", "");
  if (fs.existsSync(output_dir)) {
    console.log(
      "mv " + output_dir + " 'history/" + output_dir + "-" + time + "'"
    );
    exec(
      "mv " + output_dir + " 'history/" + output_dir + "-" + time + "'",
      (err, stdout, stderr) => {
        console.log(err);
      }
    );
  }
  time = time.replace(/ /g, "_").replace("/", "-");
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
  var ext = filename.split(".").pop();
  console.log("uploads/spec." + ext);
  if (ext == "json") {
    // console.log(req.body);
    fs.writeFile(
      "uploads/spec." + ext,
      JSON.stringify(req.body, null, "\t"),
      (err) => {
        if (err) return next(err);
      }
    );
  } else if (ext == "yaml") {
    console.log(req.body);
    console.log(YAML.stringify(req.body, null, "\t"));
    fs.writeFile(
      "uploads/spec." + ext,
      YAML.stringify(req.body, null, "\t"),
      (err) => {
        if (err) return next(err);
      }
    );
  }

  console.log("Received " + filename + ".");
}

app.get("/download/:privateKey", downloadSpec);

function downloadSpec(req, res) {
  var privateKey = req.params["privateKey"];
  var cmd =
    "curl -v -k https://" +
    privateKey +
    "/config/yaml/post_processed_v2_on_prem_api.yaml --output uploads/coh_api.yaml";
  var options = {
    root: path.join(__dirname, "/uploads"),
  };
  exec(cmd, (err, stdout, stderr) => {
    res.sendFile("coh_api.yaml", options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", "coh_api.yaml");
      }
    });
  });
}

app.get("/convert", convertSpec);

function convertSpec(req, res) {
  // TODO: this shouldnt be uploads/coh_api.yaml, should be uploads/spec.yaml
  var cmd = "yaml2json uploads/coh_api_split.yaml uploads/coh_api_convert.json";
  var options = {
    root: path.join(__dirname, "/uploads"),
  };
  exec(cmd, (err, stdout, stderr) => {
    res.sendFile("coh_api_convert.json", options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", "coh_api_convert.json");
      }
    });
  });
}

app.get("/split", splitSpec);

function splitSpec(req, res) {
  // TODO: this shouldnt be uploads/coh_api.yaml, should be uploads/spec.yaml
  var cmd =
    "python3 scripts/split.py uploads/coh_api.yaml uploads/coh_api_split.yaml";
  var options = {
    root: path.join(__dirname, "/uploads"),
  };
  exec(cmd, (err, stdout, stderr) => {
    res.sendFile("coh_api_split.yaml", options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", "coh_api_split.yaml");
      }
    });
  });
}

app.listen(80, () => console.log("Server started..."));
