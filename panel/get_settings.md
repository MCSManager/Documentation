# 获取面板设置

地址

```
/api/overview/setting/?apikey={{apikey}}
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String; // API 密钥
```

响应

```json
// 响应数据极有可能会随着版本迭代而变化，内容可能会有些许不同
{
  // ↓ 会返回的值：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "httpPort": 23333,
    "httpIp": null,
    "dataPort": 23334,
    "forwardType": 1,
    "crossDomain": false,
    "gzip": true,
    "maxCompress": 666,
    "maxDonwload": 100,
    "zipType": 1,
    "loginCheckIp": true
  },
  "time": 1643879317070
}
```
