# 新增远程服务

地址

```
/api/service/remote_service/?apikey={{apikey}}
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

请求参数

```json
{
    "apiKey":"test_key",    //连接密钥
    "port":24444,           //远程服务端口
    "ip":"127.0.0.1",       //远程服务IP
    "remarks":"xxxx"        //备注
}
```

响应

```json
{
    "status":200,
    "data":"1e787acae9ff4b6a8957890cce9328f1",
    "time":1633173550906
}
```
