# 删除文件

地址

```
/api/files/?uuid={{new_instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
DELETE
Content-Type: application/json; charset=utf-8
```

请求参数

```json
{
    "targets":[
        [
            "eula.txt",     //要删除的文件名或者目录
            "test/eula.txt" ,
            "text/abc"
        ],
    ]
}
```

响应

```json
{
    "status": 200,
    "data": true,
    "time": 1633186641559
}
```
