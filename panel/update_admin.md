# 更新用户数据（管理）

地址

```
/api/auth
```

请求方式

```
PUT
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String;
```

请求体（Body）

```json
{
  "uuid": "{{uuid}}", // 目标用户的 UUID
  "config": {
    "permission": 10,
    "instances": [
      // 目标用户能管理的实例，分别是守护进程UUID，实例UUID
      {
        "serviceUuid": "0e865f1f14c14906894698cc71f4e574",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a"
      },
      {
        "serviceUuid": "07027a72d147487aa0a2ca0616231f22",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a"
      },
      {
        "serviceUuid": "0e865f1f14c14906894698cc71f4e574",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a"
      }
    ]
  }
}
```

响应

```json

```
