# 删除远程服务

地址
```
/api/service/remote_service
```

请求方式
```
DELETE
Content-Type: application/json; charset=utf-8
```

查询参数
```js
uuid: String        // UUID
apikey: String      // API 密钥
```

请求参数（Query）
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
