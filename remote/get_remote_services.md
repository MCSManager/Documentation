# 获取远程服务列表

地址

```
/api/service/remote_services_list/?apikey={{apikey}}
```

请求方式

```
GET
Content-Type: x-www-form-urlencoded; charset=utf-8
```

响应

```json
{
    "status":200,
    "data":[
        {
            "uuid":"0d227ef3138a465594054fbf4ckbcec3",
            "ip":"s1.mcsmanager.com",
            "port":10086,
            "available":true,
            "remarks":"测试用的"
        },
        {
            "uuid":"655e068ad14c4df98ceca302b3ae0e41",
            "ip":"s2.mcsmanager.com",
            "port":10000,
            "available":false,
            "remarks":"白嫖来的"
        },
    ],
    "time":1633162829928
}
```
