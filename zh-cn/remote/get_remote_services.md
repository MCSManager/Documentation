# 获取远程服务列表

地址

```
/api/service/remote_services_list
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String; // API 密钥
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": [
    {
      "uuid": "1647bf1a527e411894861e7c44899185",
      "ip": "localhost",
      "port": 24444,
      "available": true,
      "remarks": "Remote Host"
    },
    {
      "uuid": "07e5c805bea646238b4b3af847eb637c",
      "ip": "127.0.0.2",
      "port": 24444,
      "available": false,
      "remarks": "Postman 创建测试"
    }
  ],
  "time": 1643879848204
}
```
