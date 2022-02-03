# 删除计划任务

地址

```
/api/protected_schedule
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

查询参数

```js
uuid: String; // UUID
apikey: String; // API 密钥
remote_uuid: String; // 远程 UUID
task_name: String; // 要删除的计划任务名称
```

响应

```json
{
  "status": 200,
  "data": true,
  "time": 1633486903384
}
```
