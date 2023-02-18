# 解压文件

地址

```
/api/files/compress
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // 实例的 UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

请求体（Body）

```json
{
  "type": 2,
  "source": "testzip.zip", //要解压的文件
  "targets": "解压目录_testzip.zip", //解压后的目录名，文件将全部在此目录中
  "code":"utf-8" //解压后的文件编码格式：可选utf-8,gbk,big5
}
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": true,
  "time": 1643882564419
}
```
