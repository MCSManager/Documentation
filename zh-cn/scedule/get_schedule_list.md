# 获取计划任务列表

地址

```
/api/protected_schedule
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // UUID
apikey: String; // API 密钥
remote_uuid: String; // 远程 UUID
```

响应

```json
// 计划任务接口较为复杂，这里暂且无更多介绍。
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": [
    {
      "instanceUuid": "edaa5c64b9f1402bb60970e0785d6c34",
      "name": "测试任务",
      "count": 1,
      "time": "86400",
      "action": "command",
      "payload": "ping www.baidu.com",
      "type": 1
    }
  ],
  "time": 1633504774265
}
```
