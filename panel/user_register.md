# 创建用户

地址

```
/api/auth
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String;
```

请求参数（Body）

```json
{
  "username": "{{register_username}}",
  "password": "123456",
  "permission": 10
}
```

响应

```json
{
  "status": 200,
  "data": true,
  "time": 1638932842100
}
```
