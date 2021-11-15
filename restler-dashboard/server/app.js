const { exec } = require("child_process");
const app = require("express")(); // "npm install express" to install this dependency
const cors = require("cors");

app.use(cors());

app.get("/compile_process", (req, res) => {
  exec(
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec ../../demo/swagger.json",
    (err, stdout, stderr) => {
      res.json({
        // respond to client if the command was done
        stdout: "" + stdout,
        stderr: "" + stderr,
      });
      console.log(stdout);
    }
  );
});

// TODO:
app.get("/test_process", (req, res) => {
  exec(
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec ../../demo/swagger.json",
    (err, stdout, stderr) => {
      res.json({
        // respond to client if the command was done
        stdout: "" + stdout,
        stderr: "" + stderr,
      });
      console.log(stdout);
    }
  );
});

// TODO:
app.get("/fuzzlean_process", (req, res) => {
  exec(
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec ../../demo/swagger.json",
    (err, stdout, stderr) => {
      res.json({
        // respond to client if the command was done
        stdout: "" + stdout,
        stderr: "" + stderr,
      });
      console.log(stdout);
    }
  );
});

// TODO:
app.get("/fuzz_process", (req, res) => {
  exec(
    "dotnet ~/restler-fuzzer/restler_bin/restler/Restler.dll compile --api_spec ../../demo/swagger.json",
    (err, stdout, stderr) => {
      res.json({
        // respond to client if the command was done
        stdout: "" + stdout,
        stderr: "" + stderr,
      });
      console.log(stdout);
    }
  );
});

app.listen(80, () => console.log("Server started..."));
