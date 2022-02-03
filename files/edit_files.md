# 编辑/查看文件

地址

```
/api/files?uuid={{new_instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
PUT
Content-Type: application/json; charset=utf-8
```

请求参数（Body）

```json
{
  // 目标文件
  "target": "eula.txt",
  // 如果是编辑文件，则需加入 text 参数，如果无此参数，则返回内容
  "text": "TEXT"
}
```

响应

_查看文件_

```json
{
  "status": 200,
  "data": "eula=true", // 文件内容
  "time": 1633185763950
}
```

_编辑文件_

```json
{
  "status": 200,
  "data": true,
  "time": 1633220390638
}
```
