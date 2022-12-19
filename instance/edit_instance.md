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
    "containerName":"cs",                   #容器名
    "image": "mcsm-openjdk:16",             #环境镜像(直接填写镜像识别名称)
    "ports": ["25565:25565/tcp"],           #开放端口
    "extraVolumes": ["/17H:/warp"],         #额外挂载路径
    "memory":1024,                          #最大内存（单位 MB）
    "networkMode":"bridge",                 #网络模式(可以参考面板给的三个属性)
    "cpusetCpus":"50",                      #指定 CPU 计算核心(可以参考面板给出的填写方式)
    "cpuUsage":2,                           #限制 CPU 使用率（百分比）
    "maxSpace":1024,                        #未知(疑似docker属性)最大磁盘空间
    "io":2035,                              #未知(疑似docker属性)
    "network":256                           #未知
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
    "instanceUuid": "655e068ad14c4df98ceca302b3ae0e41"
  },
  "time": 1633139276831
}
```
