# Cohesity RESTler Fuzzer

The Confluence page can be found [here](https://confluence.cohesity.com/pages/viewpage.action?spaceKey=IRIST&title=Restler+Fuzzer)

Original RESTler README can be found [here](https://github.com/microsoft/restler-fuzzer)

## Getting Started:

1. After cloning, run the following command from the repo's root:

```
python3 ./build-restler.py --dest_dir restler_bin
```

2. Download the following dependencies:

```
pip3 install json2yaml
npm install http-server -g
npm install multer -g

```

3. Host the frontend locally by running the following from the directory `restler-dashboard/`:

```
http-server
```

4. Host the backend locally by running the following from the directory `restler-dashboard/server/`:

```
node app.js
```
