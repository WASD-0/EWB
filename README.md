# EWB Early Warning System – Software Side

This project supports an automated weather monitoring and early warning system for Saibai Island and similar remote communities. The system receives environmental data from multiple ESP32-based stations and can incorporate satellite data to enhance reliability.

## 📌 Project Structure

### 1. Node-RED Monitoring Dashboard

**Purpose:**  
Provide a simple, local, web-based interface to visualize weather data from all 5 remote stations.

**Features:**
- Realtime display of temperature, rainfall, wind speed, and pressure.
- Configurable thresholds for alerts.
- Interactive UI hosted locally on the Raspberry Pi.

**Setup:**
- Install Node-RED:  
  `sudo apt install nodered`
- Start Node-RED:  
  `node-red`
- Access the dashboard:  
  `http://<raspberrypi_local_ip>:1880/ui`

### 2. Application Logic (Node-RED / Python)

**Purpose:**  
Process incoming LoRa data packets from weather stations and check against thresholds.

**Functionality:**
- Parse serial input from SX1278 LoRa module.
- Convert data to readable JSON (e.g., `{ "station": "1", "temp": 29.3, "wind": 12.1 }`).
- Publish to Node-RED Dashboard and/or store in database.

Optional: Python script using `pyserial` can be used for pre-processing if not handled in Node-RED.

### 3. Data Logging

**InfluxDB (Optional):**
- Store time-series data for historical trends.
- Integrates with Grafana for advanced visual analytics.

**Installation:**
```bash
sudo apt install influxdb
sudo systemctl start influxdb



back up flow multi channel delivery 
[Sensors → ESP32] --LoRa--> [Raspberry Pi (Central Server)]
     |
     |---> SMS Alert via SIM800L
     |---> Push Notification via Firebase
     |---> Audio Alert via Speaker
     |---> Node-RED Dashboard Visualization
