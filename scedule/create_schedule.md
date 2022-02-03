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
uuid: String; // UUID
apikey: String; // API 密钥
remote_uuid: String; // 远程 UUID
```

请求参数（Query）

```json
// 此接口请求较为复杂，其他更多计划类型以后介绍。
{
  "name": "Postman 注册的计划任务",
  "action": "command",
  "count": -1,
  "type": 1,
  "payload": "echo test from postman", //执行命令
  "weekend": [],
  "cycle": ["5", "0", 0], //每间隔 秒 分 时 执行一次
  "time": 5,
  "objTime": null
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
