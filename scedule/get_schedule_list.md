# 获取计划任务列表

地址
```
/api/protected_schedule
```

请求方式
```
GET
Content-Type: x-www-form-urlencoded; charset=utf-8
```

查询参数
```js
uuid: String        // UUID
apikey: String      // API 密钥
remote_uuid: String // 远程 UUID
```

响应
```json
{
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
