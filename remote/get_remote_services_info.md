# 查看面板数据简报

地址

```
/api/service/remote_services_system
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
{
  "status": 200,
  "data": [
    {
      "version": "1.3.0",
      "process": {
        "cpu": 5625000,
        "memory": 132437320,
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
        "freemem": 5700775936,
        "cpuUsage": 0.0490009222256379,
        "memUsage": 0.6651475749266619,
        "totalmem": 17024741376,
        "processCpu": 0,
        "processMem": 0
      }
    }
  ],
  "time": 1643879914006
}
```
