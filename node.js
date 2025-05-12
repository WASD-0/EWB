[
    {
        "id": "70ba6a22ff0ef9c7",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "e96ccee433f37498",
        "type": "inject",
        "z": "70ba6a22ff0ef9c7",
        "name": "Read CSV every 60s",
        "props": [],
        "repeat": "60",
        "once": true,
        "onceDelay": "1",
        "x": 1380,
        "y": 720,
        "wires": [
            [
                "a63d191a15526053"
            ]
        ]
    },
    {
        "id": "a63d191a15526053",
        "type": "file in",
        "z": "70ba6a22ff0ef9c7",
        "name": "Read sensor_data.csv",
        "filename": "/Users/baileyshepherd/Documents/EWB/ewb/sensor_data.csv",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "x": 1560,
        "y": 720,
        "wires": [
            [
                "26ed1c5ec0b6b3be"
            ]
        ]
    },
    {
        "id": "26ed1c5ec0b6b3be",
        "type": "csv",
        "z": "70ba6a22ff0ef9c7",
        "name": "Parse CSV",
        "sep": ",",
        "hdrin": true,
        "hdrout": "object",
        "multi": "one",
        "ret": "\\n",
        "skip": "0",
        "x": 1740,
        "y": 720,
        "wires": [
            [
                "d15846888b31beb7"
            ]
        ]
    },
    {
        "id": "d15846888b31beb7",
        "type": "function",
        "z": "70ba6a22ff0ef9c7",
        "name": "Compute Stations & Averages",
        "func": "let rows = Array.isArray(msg.payload) ? msg.payload : [msg.payload];\nlet sums = {temp:0, wind:0, rain:0}, count = rows.length;\nlet stationsData = {};\nrows.forEach(r => {\n    sums.temp += +r.temperature;\n    sums.wind += +r.wind;\n    sums.rain += +r.rain;\n    let id = r.station;\n    if (!stationsData[id]) stationsData[id] = {temp:0, wind:0, rain:0, count:0};\n    stationsData[id].temp += +r.temperature;\n    stationsData[id].wind += +r.wind;\n    stationsData[id].rain += +r.rain;\n    stationsData[id].count++;\n});\nlet stationArray = Object.entries(stationsData).map(([id, vals]) => ({\n    station: id,\n    temp: (vals.temp/vals.count).toFixed(1),\n    wind: (vals.wind/vals.count).toFixed(1),\n    rain: (vals.rain/vals.count).toFixed(1)\n}));\nlet avg = {\n    temp: (sums.temp/count).toFixed(1),\n    wind: (sums.wind/count).toFixed(1),\n    rain: (sums.rain/count).toFixed(1)\n};\nmsg.payload = {stations: stationArray, avg: avg};\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1960,
        "y": 720,
        "wires": [
            [
                "ecd0bac240d2b6f9"
            ]
        ]
    },
    {
        "id": "ecd0bac240d2b6f9",
        "type": "split",
        "z": "70ba6a22ff0ef9c7",
        "name": "Split Stations",
        "splt": "payload.stations",
        "spltType": "msg",
        "arraySplt": "1",
        "arraySpltType": "len",
        "stream": true,
        "addname": "station",
        "property": "payload",
        "x": 2180,
        "y": 720,
        "wires": [
            [
                "85097c6dabeb633b",
                "44eeb485a70c0a9b",
                "2baa203dd3bdb051"
            ]
        ]
    },
    {
        "id": "85097c6dabeb633b",
        "type": "ui_gauge",
        "z": "70ba6a22ff0ef9c7",
        "name": "Station {{station}} Temp",
        "group": "group1",
        "order": 1,
        "width": 3,
        "height": 2,
        "gtype": "gage",
        "title": "Station {{station}} Temp (°C)",
        "label": "°C",
        "format": "{{msg.payload.temp}}",
        "min": "0",
        "max": "50",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 2380,
        "y": 680,
        "wires": []
    },
    {
        "id": "44eeb485a70c0a9b",
        "type": "ui_gauge",
        "z": "70ba6a22ff0ef9c7",
        "name": "Station {{station}} Wind",
        "group": "group1",
        "order": 2,
        "width": 3,
        "height": 2,
        "gtype": "gage",
        "title": "Station {{station}} Wind (km/h)",
        "label": "km/h",
        "format": "{{msg.payload.wind}}",
        "min": "0",
        "max": "150",
        "x": 2380,
        "y": 740,
        "wires": []
    },
    {
        "id": "2baa203dd3bdb051",
        "type": "ui_gauge",
        "z": "70ba6a22ff0ef9c7",
        "name": "Station {{station}} Rain",
        "group": "group1",
        "order": 3,
        "width": 3,
        "height": 2,
        "gtype": "gage",
        "title": "Station {{station}} Rain (mm)",
        "label": "mm",
        "format": "{{msg.payload.rain}}",
        "min": "0",
        "max": "100",
        "x": 2380,
        "y": 800,
        "wires": []
    },
    {
        "id": "2adcb3f544e58b75",
        "type": "ui_gauge",
        "z": "70ba6a22ff0ef9c7",
        "name": "Avg Temperature",
        "group": "group1",
        "order": 4,
        "width": 4,
        "height": 3,
        "gtype": "gage",
        "title": "Average Temp (°C)",
        "label": "°C",
        "format": "{{msg.payload.avg.temp}}",
        "min": "0",
        "max": "50",
        "colors": [
            "#00b500",
            "#e6e600",
            "#ca3838"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 2380,
        "y": 880,
        "wires": []
    },
    {
        "id": "cf94f0be432dfed8",
        "type": "ui_gauge",
        "z": "70ba6a22ff0ef9c7",
        "name": "Avg Wind",
        "group": "group1",
        "order": 5,
        "width": 4,
        "height": 3,
        "gtype": "gage",
        "title": "Average Wind (km/h)",
        "label": "km/h",
        "format": "{{msg.payload.avg.wind}}",
        "min": "0",
        "max": "150",
        "x": 2380,
        "y": 960,
        "wires": []
    },
    {
        "id": "ea37166a5eda90a8",
        "type": "ui_gauge",
        "z": "70ba6a22ff0ef9c7",
        "name": "Avg Rain",
        "group": "group1",
        "order": 6,
        "width": 4,
        "height": 3,
        "gtype": "gage",
        "title": "Average Rain (mm)",
        "label": "mm",
        "format": "{{msg.payload.avg.rain}}",
        "min": "0",
        "max": "100",
        "x": 2380,
        "y": 1040,
        "wires": []
    },
    {
        "id": "69bd8eb0783feb79",
        "type": "function",
        "z": "70ba6a22ff0ef9c7",
        "name": "function 1",
        "func": "return [\n  { payload: msg.payload.avg.temp },\n  { payload: msg.payload.avg.wind },\n  { payload: msg.payload.avg.rain }\n];\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2140,
        "y": 960,
        "wires": [
            [
                "2adcb3f544e58b75",
                "cf94f0be432dfed8",
                "ea37166a5eda90a8",
                "37a399fbbbdeeaee"
            ]
        ]
    },
    {
        "id": "37a399fbbbdeeaee",
        "type": "debug",
        "z": "70ba6a22ff0ef9c7",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "msg.payload.avg",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 2160,
        "y": 1040,
        "wires": []
    },
    {
        "id": "group1",
        "type": "ui_group",
        "name": "Station 1",
        "tab": "tab1",
        "order": 1,
        "disp": true,
        "width": "12",
        "collapse": false,
        "className": ""
    },
    {
        "id": "tab1",
        "type": "ui_tab",
        "name": "Weather Monitoring",
        "icon": "dashboard",
        "order": 1
    }
]
