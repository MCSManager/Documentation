### 获取某实例详情信息

地址

```
/api/instance/?uuid={{new_instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
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
        "instanceUuid": "884cef664bda4c45b9ced960c56be439",
        "started": 0,
        "status": 0,
        "config": {
            "nickname": "b1.5_02",
            "startCommand": "\"C:\\Program Files\\Java\\jre1.8.0_281\\bin\\javaw.exe\" -Xmx1G -Xms256m -jar b1.5_02.jar -nogui",
            "stopCommand": "stop",
            "cwd": "E:\\[25016]b1.5_02",
            "ie": "GBK",
            "oe": "GBK",
            "createDatetime": "2021-8-24",
            "lastDatetime": "--",
            "type": "minecraft/java",
            "tag": [],
            "maxSpace": null,
            "endTime": null,
            "docker": {
                "image": "",
                "xmx": "",
                "ports": [
                    ""
                ],
                "cpu": ""
            }
        },
        "info": {
            "player": -1,
            "maxPlayer": -1
        },
        "space": 809631,
        "processInfo": {
            "cpu": 0,
            "memory": 0,
            "ppid": 0,
            "pid": 0,
            "ctime": 0,
            "elapsed": 0,
            "timestamp": 0
        }
    },
    "time": 1633160013105
}
```