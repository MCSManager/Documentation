### 删除实例

地址

```
/api/instance/?remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

请求参数

```json
{
    "uuids":["e11b018bc6514c7385bf923a3e048772"],   // 实例UUID
    "deleteFile":false                              // 是否删除文件
}
```

响应

```json
{
    "status":200,
    "data":[
        "e11b018bc6514c7385bf923a3e048772"
    ],
    "time":1633153551078
}
```