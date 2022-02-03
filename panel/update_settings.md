# 更新面板设置

地址

```
/api/overview/setting
```

请求方式

```
PUT
Content-Type: application/json; charset=utf-8
```

查询参数

```js
apikey: String; // API 密钥
```

请求参数（Query）

```json
// 此处极有可能会随着版本迭代而变化，内容可能会有些许不同
{
  "httpPort": 23333,
  "httpIp": null,
  "dataPort": 23335,
  "forwardType": 1,
  "crossDomain": false,
  "gzip": true,
  "maxCompress": 777,
  "maxDonwload": 100,
  "zipType": 1,
  "loginCheckIp": true
}
```

响应

```json
{
  "status": 200,
  "data": "OK",
  "time": 1643879408073
}
```
