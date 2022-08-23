# 获取远程实例详情信息

地址

```
/api/instance
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

响应

```json
// 可能变动
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "instanceUuid": "668985e57be14889afe3ecfa75475edd",
    "started": 0,
    // ↓ 会返回的值及其解释：-1（状态未知）；0（已停止）；1（正在停止）；2（正在启动）；3（正在运行）
    "status": 0,
    "config": {
      "nickname": "Postman测试服务",
      "startCommand": "cmd.exe",
      "stopCommand": "^C",
      "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon\\data\\InstanceData\\668985e57be14889afe3ecfa75475edd",
      "ie": "utf-8",
      "oe": "utf-8",
      "createDatetime": "2022/2/3",
      "lastDatetime": "2022/2/3 16:0",
      "type": "universal",
      "tag": [],
      "endTime": "",
      "fileCode": "gbk",
      "processType": "docker",
      "terminalOption": {
        "haveColor": true
      },
      "eventTask": {
        "autoStart": false,
        "autoRestart": false,
        "ignore": false
      },
      "docker": {
        "image": "",
        "ports": ["25565:25565/tcp"],
        "memory": 2048,
        "networkMode": "bridge",
        "cpusetCpus": "0,1",
        "cpuUsage": 100,
        "maxSpace": null,
        "io": null,
        "network": null
      },
      "pingConfig": {
        "ip": "",
        "port": 25565,
        "type": 1
      }
    },
    "info": {
      "currentPlayers": -1,
      "maxPlayers": -1,
      "version": ""
    },
    "space": 0,
    "processInfo": {
      "cpu": 0,
      "memory": 0,
      "ppid": 0,
      "pid": 0,
      "ctime": 0,
      "elapsed": 0,
      "timestamp": 0
    }
  },
  "time": 1643880530062
}
```
