# 更新用户数据

地址

```
/api/auth/update
```

请求方式

```
PUT
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String;
```

请求体（Body）

```json
// 修改的用户就是 apikey 自身的用户
{
  "userName": "test", // 注意区分大小写
  "passWord": "1231234",
  "permission": 10  // 可用的值及其解释：-1（封禁）；1（普通权限）；10（最高权限）
}
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": true,
  "time": 1643878526440
}
```
