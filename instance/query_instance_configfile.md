# 检查实例配置文件存在

地址

```
/api/protected_instance/process_config/list
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // 新实例 UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

请求体（Body）

```json
{
  "files": ["server.properties", "spigot.yml", "bukkit.yml"]
}
```

响应

```json
{
  "status": 200,
  "data": [
    {
      "file": "server.properties",
      "check": true
    },
    {
      "file": "spigot.yml",
      "check": true
    },
    {
      "file": "bukkit.yml",
      "check": true
    }
  ],
  "time": 1633155076081
}
```
