# 删除计划任务

地址

```
/api/protected_schedule/?uuid={{instance_uuid}}&remote_uuid={{service_uuid}}&task_name={{taskName}}&apikey={{apikey}}
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

请求参数

```
taskName：计划任务名称
```

响应

```json
{
    "status": 200,
    "data": true,
    "time": 1633486903384
}
```
