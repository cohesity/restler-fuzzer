const { exec, execSync } = require("child_process");
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

// Avoid long repetitive command
function run_execSync(cmd) {
  execSync(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    }
  });
}

app.post("/run/:process", runProcess);

function runProcess(req, res) {
  var process = req.params["process"];
  var cmd = "";
  var output_dir = "";
  var compile_cmd =
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec uploads/a.json > process_data/compile_process.txt";
  var test_cmd =
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll test --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/restler-dashboard/server/scripts/auth.py' --token_refresh_interval 720 > process_data/test_process.txt";
  var fuzzlean_cmd =
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll fuzz-lean --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/restler-dashboard/server/scripts/auth.py' --token_refresh_interval 720 > process_data/fuzzlean_process.txt";
  var fuzz_cmd =
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll fuzz --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings engine_settings.json --token_refresh_command 'python3 ~/restler-fuzzer/restler-dashboard/server/scripts/auth.py' --token_refresh_interval 720 > process_data/fuzz_process.txt";
  if (process == "all") {
    var cmds = [compile_cmd, test_cmd, fuzzlean_cmd, fuzz_cmd];
    var output_dirs = ["Compile", "Test", "Fuzzlean", "Fuzz"];
    for (let i = 0; i < 4; i++) {
      cmd = cmds[i];
      output_dir = output_dirs[i];
      // console.log(cmd);
      var time = new Date()
        .toLocaleString()
        .replace(/ /g, "_")
        .replace(/\//g, "-")
        .replace(",", "");
      if (fs.existsSync(output_dir)) {
        console.log(
          "mv " + output_dir + " 'history/" + output_dir + "-" + time + "'"
        );
        run_execSync(
          "mv " + output_dir + " 'history/" + output_dir + "-" + time + "'"
        );
      }
      time = time.replace(/ /g, "_").replace("/", "-");
      // var stderr = "";
      run_execSync(cmd);
    }
    res.end();
  } else {
    if (process == "compile") {
      cmd = compile_cmd;
      output_dir = "Compile";
    } else if (process == "test") {
      cmd = test_cmd;
      output_dir = "Test";
    } else if (process == "fuzzlean") {
      cmd = fuzzlean_cmd;
      output_dir = "FuzzLean";
    } else if (process == "fuzz") {
      cmd = fuzz_cmd;
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
      run_execSync(
        "mv " + output_dir + " 'history/" + output_dir + "-" + time + "'"
      );
    }
    time = time.replace(/ /g, "_").replace("/", "-");
    execSync(cmd, (err, stdout, stderr) => {
      res.json({
        // respond to client if the command was done
        stdout: "Process executed.",
        stderr: "" + stderr,
      });
      console.log(stdout);
    });
  }
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

app.post("/upload/:type/:argument", uploadFile);

function onpremUpload(vip, res) {
  // remove coh_api.yaml if it exists
  var onprem_filename = "./scripts/coh_api.yaml";
  var new_filename = "./uploads/coh_api.yaml";
  if (fs.existsSync(new_filename)) {
    run_execSync("rm " + new_filename);
  }
  // add new coh_api.yaml to uploads/
  run_execSync("cp " + onprem_filename + " ./uploads");
  // replace host with the vip
  run_execSync(
    "python3 scripts/host.py " +
      onprem_filename +
      " " +
      new_filename +
      " " +
      vip
  );
  // convert coh_api.yaml to json
  var cmd = "yaml2json " + new_filename + " uploads/coh_api.json";
  run_execSync(cmd);
  res.json({
    // respond to client if the command was done
    stdout: "OnPrem upload executed",
    stderr: "OnPrem upload failed",
  });
}

function includeUpload(json_obj, res) {
  // remove include.json if it exists
  // add include.json to uploads/
  // run split.py on the coh.yaml and endpoints.json
  // the output should be an updated coh.yaml
  var old_filename = "./uploads/include.json";
  fs.writeFile(old_filename, JSON.stringify(json_obj, null, "\t"), (err) => {
    if (err) return next(err);
  });
  console.log("new include.json written");
  run_execSync(
    "python3 scripts/split.py uploads/coh_api.yaml uploads/coh_api.yaml"
  );
  var cmd = "yaml2json uploads/coh_api.yaml uploads/coh_api.json";
  execSync(cmd, (err, stdout, stderr) => {
    res.json({
      // respond to client if the command was done
      stdout: "Process executed.",
      stderr: "" + stderr,
    });
  });
  console.log("coh yaml split");
  return;
}

function uploadFile(req, res) {
  var type = req.params["type"];
  var argument = req.params["argument"];
  if (type == "helios") {
    // TODO:
  } else if (type == "onprem") {
    onpremUpload(argument, res);
  } else if (type == "include") {
    includeUpload(req.body, res);
  } else if (type == "dict") {
    // TODO:
  } else if (type == "limit") {
    // TODO:
  } else {
    console.log("Invalid upload type");
  }
  // res.json({
  //   // respond to client if the command was done
  //   stdout: "Request complete.",
  // });
  console.log("Received a(n) " + type + " upload with type " + argument);
}

app.get("/download/:privateKey", downloadSpec); // DEFUNCT

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

app.get("/convert", convertSpec); // DEFUNCT

function convertSpec(req, res) {
  // TODO: this shouldnt be uploads/coh_api.yaml, should be uploads/spec.yaml
  var cmd = "yaml2json uploads/coh_api_split.yaml uploads/coh_api_convert.json";
  var options = {
    root: path.join(__dirname, "/uploads"),
  };
  execSync(cmd, (err, stdout, stderr) => {
    res.sendFile("coh_api_convert.json", options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", "coh_api_convert.json");
      }
    });
  });
}

app.get("/split", splitSpec); // DEFUNCT

function splitSpec(req, res) {
  // TODO: this shouldnt be uploads/coh_api.yaml, should be uploads/spec.yaml
  var cmd =
    "python3 scripts/split.py uploads/coh_api.yaml uploads/coh_api_split.yaml";
  var options = {
    root: path.join(__dirname, "/uploads"),
  };
  execSync(cmd, (err, stdout, stderr) => {
    res.sendFile("coh_api_split.yaml", options, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", "coh_api_split.yaml");
      }
    });
  });
}

app.listen(80, () => console.log("Server started...\n"));
