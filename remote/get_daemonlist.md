# 获取所有守护进程列表

地址

```
/api/service/remote_services
```

请求方式

```
GET
Content-Type: x-www-form-urlencoded; charset=utf-8
```

查询参数

```js
apikey: String; // API 密钥
```

响应

```json
{
  "status": 200,
  "data": [
    {
      "uuid": "0d227ef3138a465594054fbf4ckbcec3",
      "ip": "s1.mcsmanager.com",
      "port": 10086,
      "available": true,
      "instances": [
        {
          "instanceUuid": "d8797036faf845s5aeb3bc3ftb824d9a",
          "started": 1,
          "status": 0,
          "config": {
            "nickname": "TestServerName",
            "startCommand": "bash",
            "stopCommand": "^c",
            "cwd": "/",
            "ie": "utf-8",
            "oe": "utf-8",
            "createDatetime": "8/23/2021",
            "lastDatetime": "8/23/2021 16:53",
            "type": "universal/web_shell",
            "tag": [],
            "endTime": null,
            "processType": "general",
            "docker": {
              "image": "",
              "memory": 1024,
              "ports": [""],
              "cpu": 1,
              "maxSpace": 0,
              "cpusetCpus": "",
              "io": 0,
              "network": 0,
              "networkMode": "bridge"
            }
          },
          "info": {
            "player": -1,
            "maxPlayer": -1
          }
        }
      ]
    },
    {
      "uuid": "655e068ad14c4df98ceca302b3ae0e41",
      "ip": "s2.mcsmanager.com",
      "port": 10000,
      "available": false,
      "instances": []
    }
  ],
  "time": 1633139276831
}
```
