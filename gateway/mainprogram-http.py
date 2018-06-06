import time
import json
import requests
import math
import random
#import scan_inquiry as devices
import btmgmt as devices

TOKEN = "A1E-2SRFnNTlgx6nfdScCrfJIotfDVVAOE"  # Put your TOKEN here
DEVICE_LABEL = "Device"  # Put your device label here 
VARIABLE_LABEL_1 = "rssi"  # Put your first variable label here


def build_payload(variable_1):
    payload = {variable_1: devices.main()}
    return payload


def post_request(payload):
    # Creates the headers for the HTTP requests
    url = "http://things.ubidots.com"
    url = "{}/api/v1.6/devices/{}".format(url, DEVICE_LABEL)
    headers = {"X-Auth-Token": TOKEN, "Content-Type": "application/json"}
    status = 400
    print status
    # Makes the HTTP requests
    print payload
    while status >= 400:
         print ("Attempting...")
         #print payload['rssi']
         req = requests.post(url=url, headers=headers, json=payload)
         #print (req)
         status = req.status_code
         print status
         time.sleep(1)
    # Processes results
    print("[INFO] request made properly, your device is updated")
    return True


def main():
    payload = build_payload(VARIABLE_LABEL_1)
    #for rssi in payload:
       # item = payload[rssi]
        #print item
    print("[INFO] Attemping to send data")
    post_request(payload)
    print("[INFO] finished")
    


if __name__ == '__main__':
    
        
        main()
        time.sleep(1)
        
