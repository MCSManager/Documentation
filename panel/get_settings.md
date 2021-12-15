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

查询参数
```js
apikey: String        // API 密钥
```

响应
```json
{
    "status": 200,
    "data": {
        "httpPort": 23333,
        "httpIp": null,
        "crossDomain": false,
        "gzip": false,
        "maxCompress": 1,
        "maxDonwload": 10,
        "zipType": 1
    },
    "time": 1633520231922
}
```