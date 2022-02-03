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
  "permission": 11
}
```

响应

```json
{
  "status": 200,
  "data": true,
  "time": 1643878526440
}
```
