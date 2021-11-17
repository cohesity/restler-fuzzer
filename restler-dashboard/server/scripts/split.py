# Copyright 2021 Cohesity Inc.
# Author: Anvesh Myla, Ivan Mudarth
# This script is used to remove endpoints not specified in an json file from an API spec yaml.
import argparse
import yaml
import yamlordereddictloader
import pprint
import json
def load_yaml(file_path):
    '''
    convert yaml document to python object
    :param file_path:
    :return:
    '''
    try:
        with open(file_path, 'r') as yaml_file:
            yaml_object = yaml.load(yaml_file,
                             Loader=yamlordereddictloader.Loader)
            return yaml_object
    except Exception as e:
        raise Exception("Error while loading yaml file: %s" % e)
def dump_yaml(yaml_object, output_yaml):
    '''
    writes python yaml object data to a yaml file
    :param yaml_object:
    :param output_yaml:
    :return:
    '''
    try:
        with open(output_yaml, 'w') as new_yaml_file:
            yaml.dump(yaml_object, new_yaml_file,
                      Dumper=yamlordereddictloader.Dumper,
                      default_flow_style=False)
    except Exception as e:
        raise Exception("Error in writing the processed yaml"
              " to output file: %s" % e)
def remove_internal_api(args):
    '''
    removes api's not specified in endpoints.json
    :param args:
    :return:
    '''
    try:
        yaml_object = load_yaml(args.input_yaml)
        with open('uploads/endpoints.json') as f: # path is relative to where split.py is called from
            endpoints = json.load(f)
        for path in list(yaml_object['paths']):
            found = False
            for endpoint in endpoints['include']:
                if path == endpoint:
                    found = True
                    break
            if not found or len(yaml_object['paths'][path]) == 0:
               del yaml_object['paths'][path] 
            else:
                print("Include " + path)
        dump_yaml(yaml_object, args.output_yaml)
    except Exception as e:
        print(str(e))
if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Arguments needed to remove internal APIs from yaml")
    parser.add_argument("input_yaml", help="Path of input yaml file")
    parser.add_argument("output_yaml", help="Path of output yaml file")
    args = parser.parse_args()
    remove_internal_api(args)





