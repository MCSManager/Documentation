# 创建计划任务

地址
```
/api/protected_schedule
```

请求方式
```
POST
Content-Type: application/json; charset=utf-8
```

查询参数
```js
uuid: String        // UUID
apikey: String      // API 密钥
remote_uuid: String // 远程 UUID
```

请求参数（Query）
```json
{
    "name":"测试计划",
    "count":100,
    "time":"*/3 * * * * *",
    "action":"command",
    "type":1,
    "payload":"ping www.baidu.com"
}
```

响应
```json
{
    "status": 200,
    "data": true,
    "time": 1633486903384
}
```
