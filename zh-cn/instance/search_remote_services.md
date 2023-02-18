# 根据条件查询应用实例

地址

```
/api/service/remote_service_instances
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数（Query）

```js
remote_uuid: String; // 守护进程 GUID
apikey: String; // API 密钥
page: Number; // 页码
page_size: Number; // 每页显示几个实例
instance_name: String; // 要搜索的实例名称，查询所有请为空
```

响应

```json
{
  // ↓ 会返回的值及其解释：200（正常，并返回相应内容）；400（请求参数不正确）；403（无权限）；500（服务器内部错误）
  "status": 200,
  "data": {
    "page": 1,
    "pageSize": 20,
    "maxPage": 1,
    "data": [
      {
        "instanceUuid": "63284fafeb644b519947604ba91e112b",
        "started": 1,
        // ↓ 会返回的值及其解释：-1（状态未知）；0（已停止）；1（正在停止）；2（正在启动）；3（正在运行）。下方同理
        "status": 3,
        "config": {
          "nickname": "cmd.exe",
          "startCommand": "cmd.exe",
          "stopCommand": "^c",
          "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon\\data\\InstanceData\\63284fafeb644b519947604ba91e112b",
          "ie": "gbk",
          "oe": "gbk",
          "createDatetime": "2022/2/3",
          "lastDatetime": "2022/2/3 16:24",
          "type": "universal",
          "tag": [],
          "endTime": "",
          "fileCode": "gbk",
          "processType": "general",
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
            "ports": [],
            "memory": null,
            "networkMode": "bridge",
            "cpusetCpus": "",
            "cpuUsage": null,
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
        }
      },
      {
        "instanceUuid": "668985e57be14889afe3ecfa75475edd",
        "started": 1,
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
        }
      },
      {
        "instanceUuid": "91aeae17648a44f481c770a009070860",
        "started": 0,
        "status": 0,
        "config": {
          "nickname": "Postman 文件管理测试",
          "startCommand": "cmd.exe",
          "stopCommand": "^C",
          "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon\\data\\InstanceData\\91aeae17648a44f481c770a009070860",
          "ie": "gbk",
          "oe": "gbk",
          "createDatetime": "2022/2/3",
          "lastDatetime": "--",
          "type": "universal",
          "tag": [],
          "endTime": "",
          "fileCode": "gbk",
          "processType": "general",
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
            "ports": [],
            "memory": null,
            "networkMode": "bridge",
            "cpusetCpus": "",
            "cpuUsage": null,
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
        }
      },
      {
        "instanceUuid": "eb02608807e84b9e93490f18c94a475a",
        "started": 0,
        "status": 0,
        "config": {
          "nickname": "Postman 文件管理测试",
          "startCommand": "cmd.exe",
          "stopCommand": "^C",
          "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon\\data\\InstanceData\\eb02608807e84b9e93490f18c94a475a",
          "ie": "gbk",
          "oe": "gbk",
          "createDatetime": "2022/2/3",
          "lastDatetime": "--",
          "type": "universal",
          "tag": [],
          "endTime": "",
          "fileCode": "gbk",
          "processType": "general",
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
            "ports": [],
            "memory": null,
            "networkMode": "bridge",
            "cpusetCpus": "",
            "cpuUsage": null,
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
        }
      },
      {
        "instanceUuid": "449d1f7742b24992b503dc902a031b6f",
        "started": 0,
        "status": 0,
        "config": {
          "nickname": "昵称representative_concrete_deposit.vst",
          "startCommand": "",
          "stopCommand": "stop",
          "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon\\data\\InstanceData\\449d1f7742b24992b503dc902a031b6f",
          "ie": "gbk",
          "oe": "gbk",
          "createDatetime": "2022/2/3",
          "lastDatetime": "--",
          "type": "universal",
          "tag": [],
          "endTime": "",
          "fileCode": "gbk",
          "processType": "general",
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
            "ports": [],
            "memory": null,
            "networkMode": "bridge",
            "cpusetCpus": "",
            "cpuUsage": null,
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
        }
      },
      {
        "instanceUuid": "d9062be8397844fb84fa2053bfefd92b",
        "started": 0,
        "status": 0,
        "config": {
          "nickname": "昵称somoni.dgc",
          "startCommand": "",
          "stopCommand": "stop",
          "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon\\data\\InstanceData\\d9062be8397844fb84fa2053bfefd92b",
          "ie": "gbk",
          "oe": "gbk",
          "createDatetime": "2022/2/3",
          "lastDatetime": "--",
          "type": "universal",
          "tag": [],
          "endTime": "",
          "fileCode": "gbk",
          "processType": "general",
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
            "ports": [],
            "memory": null,
            "networkMode": "bridge",
            "cpusetCpus": "",
            "cpuUsage": null,
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
        }
      }
    ]
  },
  "time": 1643881498915
}
```
