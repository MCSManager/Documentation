# 用户总览（管理）

地址

```
/api/auth/overview
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
apikey: String;
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": [
    {
      "uuid": "0ecf6068909845749e5921fafdfd96b0",
      "userName": "test",
      "permission": 10, // 会返回的值及其解释：-1（封禁）；1（普通权限）；10（最高权限）。下方同理
      "instances": [
        {
          "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a",
          "serviceUuid": "0e865f1f14c14906894698cc71f4e574"
        },
        {
          "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a",
          "serviceUuid": "07027a72d147487aa0a2ca0616231f22"
        },
        {
          "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a",
          "serviceUuid": "0e865f1f14c14906894698cc71f4e574"
        }
      ],
      "loginTime": "2022/2/3 下午4:12:56",
      "registerTime": "2022/2/3 下午4:12:56"
    },
    {
      "uuid": "8b09b68932064befa737fbfff6abc4b9",
      "userName": "RUser_Gerhold",
      "permission": 10,
      "instances": [],
      "loginTime": "",
      "registerTime": ""
    },
    {
      "uuid": "115776721940439598a9d3821035a10d",
      "userName": "RUser_Flatley",
      "permission": 10,
      "instances": [],
      "loginTime": "",
      "registerTime": ""
    }
  ],
  "time": 1643878683900
}
```
