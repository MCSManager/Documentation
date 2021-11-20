### 创建计划任务

地址

```
/api/protected_schedule/?uuid={{instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

请求参数
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