# 更新面板设置

地址

```
/api/overview/setting/?apikey={{apikey}}
```

请求方式

```
PUT
Content-Type: application/json; charset=utf-8
```

请求参数
```json
{
    "maxDonwload": 100,
    "maxCompress":2,         // 最大 压缩/解压 量
    "gzip":true             // 是否启用gzip压缩
}
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