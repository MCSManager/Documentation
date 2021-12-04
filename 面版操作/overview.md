# 数据监控

地址

```
/api/overview?apikey={{apikey}}
```

请求方式

```
GET
Content-Type: x-www-form-urlencoded; charset=utf-8
```

响应

```json
{
    "status": 200,
    "data": {
        "version": "9.0.0",
        "process": {
            "cpu": 343250000,
            "memory": 43294720,
            "cwd": "G:\\Web"
        },
        "record": {
            "logined": 2,
            "illegalAccess": 5,
            "banips": 0,
            "loginFailed": 0
        },
        "system": {
            "user": {
                "uid": -1,
                "gid": -1,
                "username": "admin",
                "homedir": "C:\\Users\\admin",
                "shell": null
            },
            "time": "2021/10/6 下午5:34:57",
            "totalmem": 17178755072,
            "freemem": 6605983744,
            "type": "Windows_NT",
            "version": "Windows Server 2016 Essentials",
            "node": "v14.15.1",
            "hostname": "WIN-1I6KBEGFPR3",
            "loadavg": [
                0,
                0,
                0
            ],
            "platform": "win32",
            "release": "10.0.14393",
            "uptime": 1354073,
            "cpu": 0.23906899418121363
        },
        "chart": {
            "system": [
                {
                    "cpu": 20.3,
                    "mem": 61.3
                }
            ],
            "request": [
                {
                    "value": 0,
                    "totalInstance": 1,
                    "runningInstance": 0
                }
            ]
        },
        "remoteCount": {
            "available": 1,
            "total": 1
        },
        "remote": [
            {
                "process": {
                    "cpu": 1055734000,
                    "memory": 14462448,
                    "cwd": "G:\\Daemon"
                },
                "instance": {
                    "running": 0,
                    "total": 1
                },
                "system": {
                    "cpuUsage": 0.23894246757565685,
                    "totalmem": 17178755072,
                    "freemem": 6606012416,
                    "type": "Windows_NT",
                    "hostname": "WIN-1I6KBEGFPR3",
                    "loadavg": [
                        0,
                        0,
                        0
                    ],
                    "platform": "win32",
                    "release": "10.0.14393",
                    "uptime": 1354073
                },
                "uuid": "95b6b6344758407387d2b387d01270b9",
                "ip": "localhost",
                "port": 24444,
                "available": true,
                "remarks": ""
            }
        ]
    },
    "time": 1633512897876
}
```