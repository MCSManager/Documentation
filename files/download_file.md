# 从实例下载指定文件

## 1. 请求下载文件

此 API 实现需要守护进程与面板端互相配合，较为复杂，建议认真阅读后再进行实验。

地址

```
/api/files/download
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
file_name: String; // 要下载的命令，如 test.zip
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "password": "084d14e78f4a4fbdb8075f28f56c60d41643885930663", // 临时密码
    "addr": "localhost:24444" // 守护进程目标地址
  },
  "time": 1643885930664
}
```

<br />

## 2. 开始下载文件

地址（此处地址即“守护进程目标地址”）

文件上传并不经过面板，而是直接连接守护进程。

```
http://localhost:24444/download/{{临时密码}}/test.zip
```

请求方式

```
GET
Content-Type: multipart/form-data
```

响应

```
文件
```
