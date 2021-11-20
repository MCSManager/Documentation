### 查询实例配置文件列表

地址

```
/api/protected_instance/process_config/list?uuid={{new_instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

响应

```json
{
    "status":200,
    "data":[
        {
            "file":"server.properties",
            "check":true
        },
        {
            "file":"spigot.yml",
            "check":true
        },
        {
            "file":"bukkit.yml",
            "check":true
        }
    ],
    "time":1633155076081
}
```