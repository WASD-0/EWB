# EWB
EWB Project

Welcome to our EWB project 

This will be done through node-red 
json dashboard will be displied at the council office so they have access to the data coming in from weathor relay stations.







back up flow multi channel delivery 
[Sensors → ESP32] --LoRa--> [Raspberry Pi (Central Server)]
     |
     |---> SMS Alert via SIM800L
     |---> Push Notification via Firebase
     |---> Audio Alert via Speaker
     |---> Node-RED Dashboard Visualization
