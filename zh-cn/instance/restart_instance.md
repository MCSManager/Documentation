# 重启实例

地址

```
/api/protected_instance/restart
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // 守护进程下的实例 UUID
remote_uuid: String; // 守护进程 UUID
apikey: String; // API 密钥
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "instanceUuid": "884cef664bda4c45b9ced960c56be439"
  },
  "time": 1633161747334
}
```
