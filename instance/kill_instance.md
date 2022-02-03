# 关闭实例

地址

```
/api/protected_instance/kill
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
  "status": 200,
  "data": {
    "instanceUuid": "884cef664bda4c45b9ced960c56be439"
  },
  "time": 1633161747334
}
```
