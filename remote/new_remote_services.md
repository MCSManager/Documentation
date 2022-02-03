# 新增远程服务

地址

```
/api/service/remote_service
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String; // API 密钥
```

请求参数（Body）

```json
{
  "apiKey": "123456", //密钥
  "port": 25565,
  "ip": "127.0.0.1",
  "remarks": "Postman 创建测试" // 备注
}
```

响应

```json
{
  "status": 200,
  "data": "1e787acae9ff4b6a8957890cce9328f1", //此 uuid 是新建后的配置文件 uuid
  "time": 1633173550906
}
```
