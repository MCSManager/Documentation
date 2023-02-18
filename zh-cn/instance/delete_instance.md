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

查询参数（Query）

```js
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

请求体（Body）

```json
{
  "uuids": ["e11b018bc6514c7385bf923a3e048772"], // 实例UUID
  "deleteFile": false // 是否删除文件
}
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": ["0ecf6068909845749e5921fafdfd96b0"],
  "time": 1643880369409
}
```
