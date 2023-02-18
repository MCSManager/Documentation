# 查看自身用户信息

地址

```
/api/auth/
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
X-Requested-With: XmlHttpRequest
```

查询参数（Query）

```js
uuid: String; // 可选值，不写则获取自身，写则获取指定用户（需管理权限）
advanced: Boolean; // 是否获取高级信息
apikey: String;
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "uuid": "0ecf6068909845749e5921fafdfd96b0",
    "userName": "test",
    "loginTime": "2022/2/3 下午4:12:56",
    "registerTime": "2022/2/3 下午4:12:51",
    "instances": [
      // 这里包含了用户的实例具体信息，如果守护进程断开或被删除，则会显示 Unknown
      {
        "hostIp": "-- Unknown --",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a",
        "serviceUuid": "0e865f1f14c14906894698cc71f4e574",
        // ↓ 会返回的值及其解释：-1（状态未知）；0（已停止）；1（正在停止）；2（正在启动）；3（正在运行）。下方同理
        "status": -1,
        "nickname": "--",
        "remarks": "--"
      },
      {
        "hostIp": "-- Unknown --",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a",
        "serviceUuid": "07027a72d147487aa0a2ca0616231f22",
        "status": -1,
        "nickname": "--",
        "remarks": "--"
      },
      {
        "hostIp": "-- Unknown --",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a",
        "serviceUuid": "0e865f1f14c14906894698cc71f4e574",
        "status": -1,
        "nickname": "--",
        "remarks": "--"
      }
    ],
    "permission": 10, // 会返回的值及其解释：-1（封禁）；1（普通权限）；10（最高权限）
    "apiKey": "9bacef3559b746c3aa5a6afdc24cf408"
  },
  "time": 1643878890761
}
```
