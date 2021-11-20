### 查看各个守护进程简报

地址

```
/api/service/remote_services_system?apikey={{apikey}}
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
    "data": [
        {
            "process": {
                "cpu": 1060437000,
                "memory": 14948432,
                "cwd": "G:\\Daemon"
            },
            "instance": {
                "running": 0,
                "total": 1
            },
            "system": {
                "cpuUsage": 0.2213702283713952,
                "totalmem": 17178755072,
                "freemem": 6533304320,
                "type": "Windows_NT",
                "hostname": "WIN-1I6KBEGFPR3",
                "loadavg": [
                    0,
                    0,
                    0
                ],
                "platform": "win32",
                "release": "10.0.14393",
                "uptime": 1355183
            }
        }
    ],
    "time": 1633514009018
}
```