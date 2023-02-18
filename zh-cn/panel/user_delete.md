# 删除用户（管理）

地址

```
/api/auth
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String;
```

请求体（Body）

```json
["{{uuid}}"] // uuid 指用户的 uuid，可以多个
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
