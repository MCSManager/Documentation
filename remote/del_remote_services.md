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

查询参数（Query）

```js
uuid: String; // 守护进程的 UUID
apikey: String; // API 密钥
```

请求体（Body）

```json
{
  "apiKey": "test_key",
  "port": 24444,
  "ip": "127.0.0.2",
  "remarks": "Postman 创建测试"
}
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": true,
  "time": 1643879588980
}
```
