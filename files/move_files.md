# 移动文件

地址

```
/api/files/move
```

请求方式

```
PUT
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // 实例的 UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

请求参数（Query）

```json
{
  "targets": [
    [
      "eula.txt", //要移动的文件名
      "test/eula.txt" //移动到哪，移动后的文件名
    ],
    [
      "spigot.yml", //同上，支持同时移动多个文件
      "test/b2.txt"
    ]
  ]
}
```

响应

```json
{
  "status": 200,
  "data": true,
  "time": 1633186641559
}
```
