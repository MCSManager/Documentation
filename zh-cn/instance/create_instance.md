# 创建实例

地址

```
/api/instance
```

请求方式

```
POST
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
remote_uuid: String; // 守护进程 UUID
apikey: String; // API 密钥
```

查询参数（Body）

```json
{
  "nickname": "Postman测试服务",
  "startCommand": "cmd.exe",
  "stopCommand": "^C",
  "cwd": "/workspaces/myserver/",
  "ie": "gbk",
  "oe": "gbk",
  "createDatetime": "2022/2/3",
  "lastDatetime": "2022/2/3 16:0",
  "type": "universal",
  "tag": [],
  "endTime": "2022/2/28",
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
    "memory": "2048",
    "networkMode": "bridge",
    "cpusetCpus": "0,1",
    "cpuUsage": "100",
    "maxSpace": null,
    "io": null,
    "network": null
  },
  "pingConfig": {
    "ip": "",
    "port": 25565,
    "type": 1
  }
}
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "instanceUuid": "655e068ad14c4df98ceca302b3ae0e41",
    "config": {
      "nickname": "昵称orchestrate_consultant.m3u",
      "startCommand": "",
      "stopCommand": "stop",
      "cwd": "D:\\Workspace\\Project2104-Daemon\\data\\InstanceData/655e068ad14c4df98ceca302b3ae0e41",
      "ie": "GBK",
      "oe": "utf-8",
      "createDatetime": "2021/10/2",
      "lastDatetime": "--",
      "type": "universal",
      "tag": [],
      "endTime": null,
      "processType": "general",
      "eventTask": {
        "autoStart": false,
        "autoRestart": false,
        "ignore": false
      },
      "docker": {
        "image": "",
        "memory": 1024,
        "ports": [],
        "cpu": 1,
        "maxSpace": 0,
        "cpusetCpus": "",
        "io": 0,
        "network": 0,
        "networkMode": "bridge"
      },
      "pingConfig": {
        "ip": "",
        "port": 25565,
        "type": 1
      }
    }
  },
  "time": 1633138931709
}
```
