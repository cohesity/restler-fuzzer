
import json

def split_spec(spec, endpoints):
    with open("coh_api_copy.json", 'r') as f:
        data = json.load(f)
        # print(data)
        for obj in data:
            if obj == "info":
                for subobj in data[obj]:
                    do_something=0
                    # print(subobj)

                # print(obj)

    api_spec = open("coh_api_copy.json", "r").readlines()
        

    # for element in data:
    #     if 'hours' in element:
    #         del element['hours']

    # with open("coh_api_copy.json", 'w') as data_file:
    #     data = json.dump(data, data_file)

    # with open('split.json', 'w') as w:
    #     with open("coh_api_copy.json", 'r') as r:
    #         for line in r:
    #             element = json.loads(line.strip())
    #             if 'schemes' in element:
    #                 del element['schemes']
    #             w.write(json.dumps(element))

    # print(spec)
    # print(endpoints)