# 删除远程服务

地址

```
/api/service/remote_service/?uuid={{newServiceId}}&apikey={{apikey}}
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

参数

```json
{
    "apiKey":"test_key2",
    "port":24444,
    "ip":"127.0.0.1"
}
```

响应

```json
{
    "status": 200,
    "data": true,
    "time": 1633174378076
}
```
