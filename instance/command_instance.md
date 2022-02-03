# 发送命令到应用实例

地址

```
/api/protected_instance/command
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // 守护进程下的实例 UUID
remote_uuid: String; // 守护进程 UUID
apikey: String; // API 密钥
command: String; //要执行的命令 如：ping www.baidu.com
```

响应

```json
{
  "status": 200,
  "time": 1633161747334
}
```
