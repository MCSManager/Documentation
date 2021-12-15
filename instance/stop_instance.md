# 关闭实例

地址
```
/api/protected_instance/stop
```

请求方式
```
GET
Content-Type: application/json; charset=utf-8
```

查询参数
```js
uuid: String // UUID
remote_uuid: String // 远程服务 UUID
apikey: String      // API 密钥
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
