""" THIS IS AN AUTOMATICALLY GENERATED FILE!"""
from __future__ import print_function
import json
from engine import primitives
from engine.core import requests
from engine.errors import ResponseParsingException
from engine import dependencies
req_collection = requests.RequestCollection([])
# Endpoint: /active-directories, method: Get
request = requests.Request([
    primitives.restler_static_string("GET "),
    primitives.restler_static_string("/"),
    primitives.restler_static_string("v2"),
    primitives.restler_static_string("/"),
    primitives.restler_static_string("active-directories"),
    primitives.restler_static_string("?"),
    primitives.restler_static_string("domainNames="),
    primitives.restler_fuzzable_string("fuzzstring", quoted=False),
    primitives.restler_static_string("&"),
    primitives.restler_static_string("ids="),
    primitives.restler_fuzzable_int("1"),
    primitives.restler_static_string("&"),
    primitives.restler_static_string("tenantIds="),
    primitives.restler_fuzzable_string("fuzzstring", quoted=False),
    primitives.restler_static_string("&"),
    primitives.restler_static_string("includeTenants="),
    primitives.restler_fuzzable_bool("true"),
    primitives.restler_static_string(" HTTP/1.1\r\n"),
    primitives.restler_static_string("Accept: application/json\r\n"),
    primitives.restler_static_string("Host: \r\n"),
    primitives.restler_refreshable_authentication_token("authentication_token_tag"),
    primitives.restler_static_string("\r\n"),

],
requestId="/active-directories"
)
req_collection.add_request(request)

# Endpoint: /active-directories, method: Post
request = requests.Request([
    primitives.restler_static_string("POST "),
    primitives.restler_static_string("/"),
    primitives.restler_static_string("v2"),
    primitives.restler_static_string("/"),
    primitives.restler_static_string("active-directories"),
    primitives.restler_static_string(" HTTP/1.1\r\n"),
    primitives.restler_static_string("Accept: application/json\r\n"),
    primitives.restler_static_string("Host: \r\n"),
    primitives.restler_static_string("Content-Type: "),
    primitives.restler_static_string("application/json"),
    primitives.restler_static_string("\r\n"),
    primitives.restler_refreshable_authentication_token("authentication_token_tag"),
    primitives.restler_static_string("\r\n"),
    primitives.restler_static_string("{"),
    primitives.restler_static_string("""
    "machineAccounts":
    [
        {
            "name":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
            "dnsHostName":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
            "encryption":
            [
                """),
    primitives.restler_fuzzable_group("", ['DES-CBC-CRC','DES-CBC-MD5','RC4-HMAC','AES128-CTS-HMAC-SHA1-96','AES256-CTS-HMAC-SHA1-96']  ,quoted=True),
    primitives.restler_static_string("""
            ]
        }
    ],
    "id":"""),
    primitives.restler_fuzzable_int("1"),
    primitives.restler_static_string(""",
    "organizationalUnitName":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
    "workGroupName":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
    "preferredDomainControllers":
    [
        {
            "name":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
            "status":"""),
    primitives.restler_fuzzable_group("status", ['Reachable','Unreachable','Incompatible']  ,quoted=True),
    primitives.restler_static_string("""
        }
    ],
    "ldapProviderId":"""),
    primitives.restler_fuzzable_int("1"),
    primitives.restler_static_string(""",
    "trustedDomainParams":
        {
            "enabled":"""),
    primitives.restler_fuzzable_bool("true"),
    primitives.restler_static_string(""",
            "trustedDomains":
            [
                {
                    "domainName":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
                    "preferredDomainControllers":
                    [
                        {
                            "name":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
                            "status":"""),
    primitives.restler_fuzzable_group("status", ['Reachable','Unreachable','Incompatible']  ,quoted=True),
    primitives.restler_static_string("""
                        }
                    ]
                }
            ],
            "blacklistedDomains":
            [
                """),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string("""
            ]
        }
    ,
    "nisProviderDomainName":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
    "connectionId":"""),
    primitives.restler_fuzzable_int("1"),
    primitives.restler_static_string(""",
    "domainName":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
    "activeDirectoryAdminParams":
        {
            "username":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string(""",
            "password":"""),
    primitives.restler_fuzzable_string("fuzzstring", quoted=True),
    primitives.restler_static_string("""
        }
    ,
    "overwriteMachineAccounts":"""),
    primitives.restler_fuzzable_bool("true"),
    primitives.restler_static_string("}"),
    primitives.restler_static_string("\r\n"),

],
requestId="/active-directories"
)
req_collection.add_request(request)

# Endpoint: /alertsSummary, method: Get
request = requests.Request([
    primitives.restler_static_string("GET "),
    primitives.restler_static_string("/"),
    primitives.restler_static_string("v2"),
    primitives.restler_static_string("/"),
    primitives.restler_static_string("alertsSummary"),
    primitives.restler_static_string("?"),
    primitives.restler_static_string("startTimeUsecs="),
    primitives.restler_fuzzable_int("1"),
    primitives.restler_static_string("&"),
    primitives.restler_static_string("endTimeUsecs="),
    primitives.restler_fuzzable_int("1"),
    primitives.restler_static_string("&"),
    primitives.restler_static_string("includeTenants="),
    primitives.restler_fuzzable_bool("true"),
    primitives.restler_static_string("&"),
    primitives.restler_static_string("tenantIds="),
    primitives.restler_fuzzable_string("fuzzstring", quoted=False),
    primitives.restler_static_string("&"),
    primitives.restler_static_string("statesList="),
    primitives.restler_fuzzable_group("", ['kResolved','kOpen','kNote','kSuppressed']  ,quoted=False),
    primitives.restler_static_string(" HTTP/1.1\r\n"),
    primitives.restler_static_string("Accept: application/json\r\n"),
    primitives.restler_static_string("Host: \r\n"),
    primitives.restler_refreshable_authentication_token("authentication_token_tag"),
    primitives.restler_static_string("\r\n"),

],
requestId="/alertsSummary"
)
req_collection.add_request(request)
