# Dashboard API

## Get Overview Data

```http
GET /api/overview
```

#### Response

```json
{
  "status": 200,
  "data": {
    "version": "10.2.1",
    "specifiedDaemonVersion": "4.4.1",
    "process": {
      "cpu": 0,
      "memory": 219439104, // Panel Memory Usage
      "cwd": "Z:\\Workspace\\MCSManager\\panel"
    },
    "record": {
      "logined": 2,
      "illegalAccess": 2,
      "banips": 0,
      "loginFailed": 0
    },
    "system": {
      "user": {
        "uid": -1,
        "gid": -1,
        "username": "MCSManager",
        "homedir": "X:\\Users\\MCSManager",
        "shell": null
      },
      // Memory usage on the panel
      "time": 1718594177859,
      "totalmem": 16577519520,
      "freemem": 10966386688,
      "type": "Windows_NT",
      "version": "Windows 10 Pro for Workstations",
      "node": "v17.9.1",
      "hostname": "MCSManager-Workstation",

      // Linux only
      "loadavg": [0, 0, 0],

      "platform": "win32",
      "release": "10.0.22631",
      "uptime": 905020.0,
      "cpu": 0.11684482123110951
    },

    // Memory&CPU usage on the panel (statistical chart)
    "chart": {
      "system": [
        {
          "cpu": 8.1,
          "mem": 64.5
        }
      ],
      "request": [
        {
          "value": 6,
          "totalInstance": 23,
          "runningInstance": 3
        }
      ]
    },
    "remoteCount": {
      "available": 3,
      "total": 3
    },

    // Daemon List
    "remote": [
      {
        "version": "3.4.0",
        "process": {
          "cpu": 3550442695,
          "memory": 22620272,
          "cwd": "/opt/mcsmanager/daemon"
        },
        "instance": {
          "running": 0,
          "total": 6
        },

        // CPU and memory usage on the Daemon.
        "system": {
          "type": "Linux",
          "hostname": "NYA-Dev-01",
          "platform": "linux",
          "release": "5.15.0-101-generic",
          "uptime": 39.63,
          "cwd": "/opt/mcsmanager/daemon",
          "loadavg": [3.5, 0.85, 0.28],
          "freemem": 7254478848,
          "cpuUsage": 0.002512562814070307,
          "memUsage": 0.12453628345617548,
          "totalmem": 8286441472,
          "processCpu": 0,
          "processMem": 0
        },

        // CPU and memory usage on the Daemon (Chart).
        "cpuMemChart": [
          {
            "cpu": 0,
            "mem": 13
          }
        ],

        // Daemon UUID
        "uuid": "957c6bddf379445c82bac5edf7684bbc",
        "ip": "s1.example.com",
        "port": 24444,
        "prefix": "",
        "available": true,
        "remarks": "CN-ZJ-DEV-01"
      }
    ]
  },
  "time": 1718594177859
}
```
