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

请求参数（Query）
```json
{
  "uuid": "{{uuid}}",
  "config": {
    "permission": 10,
    "instances": [
      {
        "uuid": "0e865f1f14c14906894698cc71f4e574",
        "region": "11e2f159b43f447eacb213b2cdc6df2a"
      },
      {
        "uuid": "07027a72d147487aa0a2ca0616231f22",
        "region": "11e2f159b43f447eacb213b2cdc6df2a"
      },
      {
        "uuid": "0e865f1f14c14906894698cc71f4e574",
        "region": "11e2f159b43f447eacb213b2cdc6df2a"
      }
    ]
  }
}
```

响应
```json

```