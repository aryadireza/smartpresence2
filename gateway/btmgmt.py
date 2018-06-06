import string
import subprocess
import string
import re

class BluetoothDevice(object):
    """__init__() functions as the class constructor"""
    def __init__(self, name=None, mac_address=None, value=None):
        self.name = name
        self.mac_address = mac_address
        self.value = value
        
def findWholeWord(w):
    return re.compile(r'\b({0})\b'.format(w), flags=re.IGNORECASE).search

def getDiscoveredDevices():
    rawoutput = subprocess.check_output("sudo btmgmt find class major", stderr=subprocess.STDOUT, shell=True)
    output = rawoutput[45:-28]
    output = output.replace('\n','')
    output = output.split('hci0')
    output = filter(None, output)
    BluetoothDeviceList = []
    for i in range(len(output)):
        if findWholeWord('eir_len')(output[i]):
            output[i] = ''  
        else:
            BluetoothDeviceList.append(BluetoothDevice(output[i][69:],output[i][12:29],output[i][47:50]))
    return BluetoothDeviceList

def main() :
    BluetoothDeviceList = getDiscoveredDevices()
    outputfinal = []
    for BluetoothDevice in BluetoothDeviceList:
        outputfinal.append({"value":int(BluetoothDevice.value), "context":{"mac_address":BluetoothDevice.mac_address,"name":BluetoothDevice.name}})
    return outputfinal
    
if __name__ == "__main__":
	main()


