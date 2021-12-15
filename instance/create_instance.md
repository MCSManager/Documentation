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

查询参数
```js
remote_uuid: String // 远程服务 UUID
apikey: String      // API 密钥
```

请求参数（Query）
```js
command: cmd.exe	// 启动命令
cwd: .			// 工作目录
stopCommand: stop	// 停止命令
nickname: 昵称{{$randomFileName}} // 实例昵称
ie: GBK	// 输入编码
io: GBK  // 输出编码
```

响应
```json
{
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
