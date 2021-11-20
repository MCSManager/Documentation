### 新建目录

地址

```
/api/files/mkdir?uuid={{new_instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

请求参数

```json
{
    "target": "abc" // 创建的目录名 
}
//支持多层文件夹创建，比如abc/test
//意思就是在文件夹abc里面再创建一个test文件夹
```

响应

```json
{
    "status": 200,
    "data": true,
    "time": 1633179646866
}
```