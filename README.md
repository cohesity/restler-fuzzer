# Cohesity RESTler Fuzzer

The Confluence page can be found [here](https://confluence.cohesity.com/pages/viewpage.action?spaceKey=IRIST&title=Restler+Fuzzer)

Original RESTler README can be found [here](https://github.com/microsoft/restler-fuzzer)

## About:

RESTler is a library developed by Microsoft Research that performs stateful API fuzzing. Stateful fuzzing is a more sophisticated method of automatic test generation for REST APIs. Given a YAML specification, a sequence of requests are sent to the appropriate endpoints using inferred parameters. This repo contains a dashboard allows the RESTler library to be run and the results visualized.

## Getting Started:

1. Ensure you have the following:

- Python 3.8.2
- .NET 5.0 [download here](https://dotnet.microsoft.com/en-us/download/dotnet/5.0)

2. After cloning, run the following command from the repo's root:

```
python3 ./build-restler.py --dest_dir restler_bin
```

3. Download the following dependencies:

```
pip3 install json2yaml
npm install http-server -g
npm install multer -g

```

4. Host the frontend locally by running the following from the directory `restler-dashboard/`:

```
http-server
```

5. Host the backend locally by running the following from the directory `restler-dashboard/server/`:

```
node app.js
```

## How To Use:

This UI allows the library to be run in the following steps:
- **Upload**: Input a valid API spec by uploading a YAML file or Cluster VIP
- **Configure**: Specify multiple configuration options such as the maximum fuzzing time
- **Execute**: Start each/all of the 4 RESTler processes (described below)

Then, the results of the run can be visualized. RESTler has 4 separate processes:
- **Compile**: Generates a RESTler grammar from a Swagger YAML specification
- **Test**: Computes what parts of the Swagger spec are covered by RESTler
- **Fuzz-lean**: Executes every endpoint+method once to see if bugs can be found quickly
- **Fuzz**: The full fuzzing process is run, executing any number of requests to endpoints

## Future Work / Todo

Input validation:
- Currently this is little to no input validation for the options on the dashboard that allow the user to upload their own input/files
- In the `restler-dashboard/server/app.js` there are a number of "TODO" comments that indicate in what cases input be validated

Data visualization:
- A number of bugs have been found in the tables/charts that are generated from the fuzzing results
- The commented out portions of the `restler-dashboard/html` files indicate where these tables are located. They need to be connected to the backend. 

Other:
- Canvas selective endpoints: add a text box where users can simply type in their selective endpoints rather than uploading a JSON file
- Display history on the site: RESTler results from past runs are stored in the `restler-dashboard/server/history` directory. These results should be downloadable from the UI 
- Download log files from site: the speccov.json file is important for debugging and the full file should be downloadable from the Test, Fuzzlean, and Fuzz pages on the UI


