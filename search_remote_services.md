### 根据条件查询远程服务实例

地址

```
/api/service/remote_service_instances/?remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
GET
Content-Type: x-www-form-urlencoded; charset=utf-8
```

请求参数

```
page：页码
page_size：每页显示几个实例
instance_name：要搜索的实例名称
service_uuid：远程服务GUID
apikey：密钥
```

响应

```json
{
    "status": 200,
    "data": {
        "page": 1,
        "pageSize": 2,
        "maxPage": 1,
        "data": [
            {
                "instanceUuid": "061906151145148b9c38877780cb13f1",
                "started": 0,
                "status": 0,
                "config": {
                    "nickname": "雫-OS",
                    "startCommand": "java -jar mcl.jar",
                    "stopCommand": "stop",
                    "cwd": "O:\\mirai-2.4.0\\",
                    "ie": "GBK",
                    "oe": "GBK",
                    "createDatetime": "2021-8-18",
                    "lastDatetime": "2021-9-2 17:13",
                    "type": "TYPE_MIRAI",
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
                }
            }
        ]
    },
    "time": 1633172906417
}
```