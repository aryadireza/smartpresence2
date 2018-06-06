import paho.mqtt.client as mqttClient
import time
import json
import btmgmt as devices

def on_connect(client, userdata, flags, rc):
 
    if rc == 0:
 
        print("Connected to broker")
 
        global Connected                #Use global variable
        Connected = True                #Signal connection 
 
    else:
 
        print("Connection failed")

def on_publish(client, userdata, result):

	print "Published!"


Connected = False
broker_address= "things.ubidots.com"
port = 1883
user = "A1E-2SRFnNTlgx6nfdScCrfJIotfDVVAOE"
password = ""
topic = "/v1.6/devices/device/rssi"

client = mqttClient.Client()
client.username_pw_set(user, password=password)
client.on_connect = on_connect
client.on_publish = on_publish
client.connect(broker_address, port=port)
client.loop_start()

while Connected != True:    #Wait for connection
    print "Connecting..."
    time.sleep(1)
 
try:
        payload = json.dumps(devices.main())
        print payload
        client.publish(topic, payload)
        time.sleep(1)
 
except KeyboardInterrupt:
 
    client.disconnect()
    client.loop_stop()