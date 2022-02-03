# 获取所有守护进程列表

地址

```
/api/service/remote_services
```

请求方式

```
GET
Content-Type: application/json; charset=utf-8
```

查询参数

```js
apikey: String; // API 密钥
```

响应

```json
// 此处极有可能会随着版本迭代而变化，内容可能会有些许不同
{
  "status": 200,
  "data": [
    {
      "uuid": "1647bf1a527e411894861e7c44899185",
      "ip": "localhost",
      "port": 24444,
      "available": true,
      "instances": [
        {
          "instanceUuid": "63284fafeb644b519947604ba91e112b",
          "started": 1,
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
          "started": 0,
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
    {
      "uuid": "07e5c805bea646238b4b3af847eb637c",
      "ip": "127.0.0.2",
      "port": 24444,
      "available": false,
      "instances": []
    }
  ],
  "time": 1643879681578
}
```
