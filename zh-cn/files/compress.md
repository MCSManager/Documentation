# 压缩文件

地址

```
/api/files/compress
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

查询参数

```js
uuid: String; // 实例的 UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

请求体（Body）

```json
{
  "type": 1,
  "source": "testzip.zip", // 压缩后的包名称
  "targets": [
    "eula.txt", // 要压缩的文件，相对目录
    "spigot.yml",
    "world"
  ]
}
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": true,
  "time": 1633180183159
}
```
