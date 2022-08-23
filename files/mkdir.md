# 新建目录

地址

```
/api/files/mkdir
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
  "target": "abc" // 创建的目录名
}
// 支持多层文件夹创建，比如abc/test
// 意思就是在文件夹abc里面再创建一个test文件夹
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": true,
  "time": 1633179646866
}
```
