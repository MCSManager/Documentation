### 开启实例

地址

```
/api/protected_instance/open/?uuid={{new_instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

响应

```json
{
    "status": 200,
    "data": {
        "instanceUuid": "884cef664bda4c45b9ced960c56be439"
    },
    "time": 1633160304677
}
```