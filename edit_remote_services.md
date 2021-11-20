### 编辑远程服务

地址

```
/api/service/remote_service/?uuid={{newServiceId}}&apikey={{apikey}}
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

请求参数

```json
{
    "apiKey":"test_Keyyyy",
    "port":24444,
    "ip":"127.1.1.1",
    "remarks":"测试"
}
```

响应
```json
{
    "status": 200,
    "data": true,
    "time": 1633174845653
}
```