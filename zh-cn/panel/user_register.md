# 创建用户

地址

```
/api/auth
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String;
```

请求体（Body）

```json
{
  "username": "{{register_username}}",
  "password": "123456",
  "permission": 10  // 可用的值及其解释：-1（封禁）；1（普通权限）；10（最高权限）
}
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": true,
  "time": 1638932842100
}
```
