# 编辑远程服务

地址

```
/api/service/remote_service
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // UUID
apikey: String; // API 密钥
```

请求体（Body）

```json
{
  "apiKey": "test_Keyyyy",
  "port": 24444,
  "ip": "127.1.1.1",
  "remarks": "测试"
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
