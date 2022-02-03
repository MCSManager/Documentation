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

查询参数

```js
uuid: String; // 实例的 UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

请求参数（Query）

```json
{
  "type": 2,
  "source": "testzip.zip", //要解压的文件
  "targets": "解压目录_testzip.zip" //解压后的目录名，文件将全部在此目录中
}
```

响应

```json
{
  "status": 200,
  "data": true,
  "time": 1643882564419
}
```
