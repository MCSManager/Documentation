# 编辑实例

地址

```
/api/instance
```

请求方式

```
PUT
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
uuid: String; // UUID
remote_uuid: String; // 远程服务 UUID
apikey: String; // API 密钥
```

请求体（Body）

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
  "status": 200,
  "data": {
    "instanceUuid": "655e068ad14c4df98ceca302b3ae0e41"
  },
  "time": 1633139276831
}
```
