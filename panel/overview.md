# 数据监控

地址

```
/api/overview?apikey={{apikey}}
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String; // API 密钥
```

响应

```json
// 此 API 响应数据极有可能会随着版本迭代而变化，内容可能会有些许不同
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "version": "9.2.1", // 面板版本
    "specifiedDaemonVersion": "1.3.0", //面板要求的守护进程版本
    "process": {
      "cpu": 0,
      "memory": 89153536,
      "cwd": "D:\\Workspace\\MCSM\\MCSManager"
    },
    "record": {
      "logined": 1,
      "illegalAccess": 1,
      "banips": 0,
      "loginFailed": 0
    },
    "system": {
      "user": {
        "uid": -1,
        "gid": -1,
        "username": "suwings",
        "homedir": "C:\\Users\\suwings",
        "shell": null
      },
      "time": "2022/2/3 下午5:07:07",
      "totalmem": 17024741376,
      "freemem": 5502345216,
      "type": "Windows_NT",
      "version": "Windows 10 Home China",
      "node": "v14.17.6",
      "hostname": "R9000P-Suwings",
      "loadavg": [0, 0, 0],
      "platform": "win32",
      "release": "10.0.22000",
      "uptime": 413196,
      "cpu": 0.08181704885343966
    },
    "chart": {
      "system": [
        {
          "cpu": 12.2,
          "mem": 68.2
        },
        {
          "cpu": 4.1,
          "mem": 68.3
        },
        {
          "cpu": 4.3,
          "mem": 68.5
        },
        {
          "cpu": 4,
          "mem": 67
        },
        {
          "cpu": 4.6,
          "mem": 67.2
        },
        {
          "cpu": 4.9,
          "mem": 68.1
        },
        {
          "cpu": 13.4,
          "mem": 67.8
        },
        {
          "cpu": 8.1,
          "mem": 68.2
        },
        {
          "cpu": 6.9,
          "mem": 67.8
        },
        {
          "cpu": 2.9,
          "mem": 68.1
        },
        {
          "cpu": 5.8,
          "mem": 68.1
        },
        {
          "cpu": 12.1,
          "mem": 68.4
        },
        {
          "cpu": 6.8,
          "mem": 67.6
        },
        {
          "cpu": 9.2,
          "mem": 67.9
        },
        {
          "cpu": 8.6,
          "mem": 67.8
        },
        {
          "cpu": 6.8,
          "mem": 68
        },
        {
          "cpu": 13.2,
          "mem": 68.9
        },
        {
          "cpu": 4.8,
          "mem": 68.3
        },
        {
          "cpu": 7.2,
          "mem": 68.4
        },
        {
          "cpu": 10.8,
          "mem": 67.8
        },
        {
          "cpu": 5.8,
          "mem": 68
        },
        {
          "cpu": 6.3,
          "mem": 68
        },
        {
          "cpu": 6.5,
          "mem": 68.1
        },
        {
          "cpu": 6.4,
          "mem": 68.1
        },
        {
          "cpu": 6.3,
          "mem": 68.1
        },
        {
          "cpu": 7.5,
          "mem": 68.2
        },
        {
          "cpu": 6.2,
          "mem": 69.3
        },
        {
          "cpu": 16.6,
          "mem": 69.1
        },
        {
          "cpu": 5.5,
          "mem": 68.7
        },
        {
          "cpu": 6.3,
          "mem": 68.7
        },
        {
          "cpu": 5.4,
          "mem": 68.7
        },
        {
          "cpu": 2.2,
          "mem": 67.7
        },
        {
          "cpu": 4.7,
          "mem": 68.4
        },
        {
          "cpu": 5.1,
          "mem": 67.9
        },
        {
          "cpu": 8.3,
          "mem": 66.8
        },
        {
          "cpu": 12,
          "mem": 66.8
        },
        {
          "cpu": 13.8,
          "mem": 67.2
        },
        {
          "cpu": 4.8,
          "mem": 66.7
        },
        {
          "cpu": 5.6,
          "mem": 66.6
        },
        {
          "cpu": 4.5,
          "mem": 66.6
        },
        {
          "cpu": 6.6,
          "mem": 66.8
        },
        {
          "cpu": 4.1,
          "mem": 66.7
        },
        {
          "cpu": 8.6,
          "mem": 67.6
        },
        {
          "cpu": 3.7,
          "mem": 67.1
        },
        {
          "cpu": 9.7,
          "mem": 66.6
        },
        {
          "cpu": 11.4,
          "mem": 67.5
        },
        {
          "cpu": 2.4,
          "mem": 67.1
        },
        {
          "cpu": 5.2,
          "mem": 67.2
        },
        {
          "cpu": 4.2,
          "mem": 67.3
        },
        {
          "cpu": 8.1,
          "mem": 67.4
        },
        {
          "cpu": 7.9,
          "mem": 66.6
        },
        {
          "cpu": 20.5,
          "mem": 67.6
        },
        {
          "cpu": 1.7,
          "mem": 67.1
        },
        {
          "cpu": 4.6,
          "mem": 67.1
        },
        {
          "cpu": 5.4,
          "mem": 67.2
        },
        {
          "cpu": 10.1,
          "mem": 67.3
        },
        {
          "cpu": 4.3,
          "mem": 67.5
        },
        {
          "cpu": 11.7,
          "mem": 66.9
        },
        {
          "cpu": 17.3,
          "mem": 67.5
        },
        {
          "cpu": 10.1,
          "mem": 68.4
        }
      ],
      "request": [
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 1,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 1,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 1,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 1,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        },
        {
          "value": 0,
          "totalInstance": 6,
          "runningInstance": 1
        }
      ]
    },
    "remoteCount": {
      "available": 1,
      "total": 1
    },
    "remote": [
      {
        "version": "1.3.0",
        "process": {
          "cpu": 4703000,
          "memory": 131895536,
          "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon"
        },
        "instance": {
          "running": 1,
          "total": 6
        },
        "system": {
          "type": "Windows_NT",
          "hostname": "R9000P-Suwings",
          "platform": "win32",
          "release": "10.0.22000",
          "uptime": 410445,
          "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon",
          "loadavg": [0, 0, 0],
          "freemem": 5414744064,
          "cpuUsage": 0.027310793075432827,
          "memUsage": 0.6819485274746532,
          "totalmem": 17024741376,
          "processCpu": 0,
          "processMem": 0
        },
        "uuid": "1647bf1a527e411894861e7c44899185",
        "ip": "localhost",
        "port": 24444,
        "available": true,
        "remarks": "Remote Host"
      }
    ]
  },
  "time": 1643879227310
}
```
