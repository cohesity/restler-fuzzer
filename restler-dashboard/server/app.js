const { exec, execSync } = require("child_process");
var express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const YAML = require("yaml");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

var settings = {
  dictPath: "default",
  timeLimit: 1,
};

// Avoid long repetitive command
function run_execSync(cmd) {
  execSync(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
    }
  });
}

app.post("/run/:process", runProcess);

function runProcess(req, res) {}

app.post("/upload/:type/:argument", uploadRequest);

// Uploads an OnPrem JSON spec given the VIP provided in the request
function onPremUpload(vip, res) {
  var onprem_filename = "scripts/coh_api.yaml";
  var new_filename = "uploads/spec.yaml";
  var json_filename = "uploads/spec.json";
  // remove spec.yaml if it exists
  if (fs.existsSync(new_filename)) {
    run_execSync("rm " + new_filename);
  }
  // replace host with the vip, and rename to spec.yaml
  run_execSync(
    "python3 scripts/host.py " +
      onprem_filename +
      " " +
      new_filename +
      " " +
      vip
  );
  // convert spec.yaml to json
  var cmd = "yaml2json " + new_filename + " " + json_filename;
  run_execSync(cmd);
  // remove spec.yaml if it exists
  if (fs.existsSync(new_filename)) {
    run_execSync("rm " + new_filename);
  }
}

// Handle requests from upload endpoint
function uploadRequest(req, res) {
  var type = req.params["type"];
  var argument = req.params["argument"];
  if (argument.length > 15) {
    // TODO: throw error
  }
  if (type == "onprem") {
    onPremUpload(argument, res);
  } else if (type == "limit") {
    // TODO:
    var time = 1;
    try {
      var time = parseInt(argument);
      if (time > 0 && time < 48) {
        settings["timeLimit"] = time;
      } else {
        // TODO: throw error, must be a valid time
      }
    } catch (error) {
      // TODO: throw error, must be an int
    }
  } else {
    console.log("ERROR: Invalid upload type\n");
  }
  console.log("Received a(n) " + type + " upload with arg " + argument + "\n");
  // Respond to client
  res.json({
    stdout: type + " upload successful",
    stderr: type + " upload failed",
  });
}

app.post("/file_upload/:type/:argument", upload.single("file"), fileRequest);

// Uploads a Helios JSON spec given the VIP provided in the request
function heliosUpload(file, ip) {
  var upload_filename = file.path;
  var new_filename = "uploads/spec.yaml";
  var json_filename = "uploads/spec.json";
  // remove spec.yaml if it exists
  if (fs.existsSync(new_filename)) {
    run_execSync("rm " + new_filename);
  }
  // replace host with the domain, and rename default file name to spec.yaml
  run_execSync(
    "python3 scripts/host.py " + upload_filename + " " + new_filename + " " + ip
  );
  // convert spec.yaml to json
  var cmd = "yaml2json " + new_filename + " " + json_filename;
  run_execSync(cmd);
  // remove spec.yaml if it exists
  if (fs.existsSync(new_filename)) {
    run_execSync("rm " + new_filename);
  }
  // remove uploaded file if it exists
  if (fs.existsSync(upload_filename)) {
    run_execSync("rm " + upload_filename);
  }
}

// Includes certain endpoints based on an uploaded include.json file
function includeUpload(file) {
  var upload_filename = file.path;
  var yaml_filename = "uploads/spec.yaml";
  var json_filename = "uploads/spec.json";
  var include_filename = "uploads/include.json";

  // remove include.json if it exists
  if (fs.existsSync(include_filename)) {
    run_execSync("rm " + include_filename);
  }

  // rename uploaded file's default name to include.json
  run_execSync("mv " + upload_filename + " " + include_filename);

  // convert spec.json to spec.yaml
  var cmd = "json2yaml " + json_filename + " " + yaml_filename;
  if (fs.existsSync(json_filename)) {
    run_execSync(cmd);
  } else {
    // TODO: throw error, api spec has not been uploaded
  }

  // split spec.yaml according to include.json
  run_execSync(
    "python3 scripts/split.py " + yaml_filename + " " + yaml_filename
  );

  // convert spec.yaml back to spec.json
  var cmd = "yaml2json " + yaml_filename + " " + json_filename;
  run_execSync(cmd);

  // remove spec.yaml file if it exists
  if (fs.existsSync(yaml_filename)) {
    run_execSync("rm " + yaml_filename);
  }

  // remove uploaded file if it exists
  if (fs.existsSync(upload_filename)) {
    run_execSync("rm " + upload_filename);
  }
}

// Uploads a dictionary and tells RESTler a custom dictionary is being used
function dictUpload(file) {
  var upload_filename = file.path;
  var dict_filename = "uploads/dictionary.json";

  // remove dictionary file if it exists
  if (fs.existsSync(dict_filename)) {
    run_execSync("rm " + dict_filename);
  }
  // rename uploaded file's default name to dictionary.json
  run_execSync("mv " + upload_filename + " " + dict_filename);
  // update RESTler settings
  settings["dictPath"] = dict_filename;
}

// Handle requests from file upload endpoint
function fileRequest(req, res) {
  var type = req.params["type"];
  var argument = req.params["argument"];
  if (type == "helios") {
    if (req.file.mimetype != "application/x-yaml") {
      // TODO: throw error
    }
    heliosUpload(req.file, argument);
  } else if (type == "include") {
    if (req.file.mimetype != "application/x-json") {
      // TODO: throw error
    }
    includeUpload(req.file);
  } else if (type == "dict") {
    if (req.file.mimetype != "application/x-json") {
      // TODO: throw error
    }
    dictUpload(req.file);
  } else {
    // TODO: throw error
    console.log("ERROR: Invalid upload type\n");
  }
  console.log("Received a(n) " + type + " file with arg " + argument + "\n");
  // Respond to client
  res.json({
    stdout: type + " file upload successful",
    stderr: type + " file upload failed",
  });
}

app.listen(80, () => console.log("Server started...\n"));
