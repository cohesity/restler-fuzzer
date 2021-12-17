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
  } else {
    console.log("ERROR: Invalid upload type\n");
  }
  console.log("Received a(n) " + type + " upload with type " + argument + "\n");
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

// Handle requests from file upload endpoint
function fileRequest(req, res) {
  var type = req.params["type"];
  var argument = req.params["argument"];
  if (type == "helios") {
    // req.file is the api spec
    if (req.file.mimetype != "application/x-yaml") {
      // TODO: throw error
    }
    heliosUpload(req.file, argument);
  } else if (type == "include") {
    // TODO:
  } else if (type == "dict") {
    // TODO:
  } else {
    // TODO: throw error
    console.log("ERROR: Invalid upload type\n");
  }
  console.log("Received a(n) " + type + " file with type " + argument + "\n");
  // Respond to client
  res.json({
    stdout: type + " file upload successful",
    stderr: type + " file upload failed",
  });
}

app.listen(80, () => console.log("Server started...\n"));
