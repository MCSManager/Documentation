# 删除实例

地址
```
/api/instance
```

请求方式
```
DELETE
Content-Type: application/json; charset=utf-8
```

查询参数
```js
remote_uuid: String // 远程服务 UUID
apikey: String      // API 密钥
```

请求参数（Query）
```json
{
    "uuids":["e11b018bc6514c7385bf923a3e048772"],   // 实例UUID
    "deleteFile":false                              // 是否删除文件
}
```

响应
```json
{
    "status":200,
    "data":[
        "e11b018bc6514c7385bf923a3e048772"
    ],
    "time":1633153551078
}
```