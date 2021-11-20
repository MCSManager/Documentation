### 查看指定实例的文件列表

地址

```
/api/files/list?uuid={{new_instance_uuid}}&remote_uuid={{service_uuid}}&apikey={{apikey}}
```

请求方式

```
GET
Content-Type: x-www-form-urlencoded; charset=utf-8
```

请求参数

```
target:\     // 查看的文件目录
```

响应

```json
{
    "status": 200,
    "data": [
        {
            "name": "test",
            "type": 0,
            "size": 0,
            "time": "Sat Oct 02 2021 22:57:27 GMT+0800 (中国标准时间)"
        },
        {
            "name": "SakuraConsole.cmd",
            "type": 1,
            "size": 1003,
            "time": "Sat Oct 02 2021 22:40:10 GMT+0800 (中国标准时间)"
        },
        {
            "name": "SakuraConsole.jar",
            "type": 1,
            "size": 3694704,
            "time": "Sun Jun 07 2020 17:37:09 GMT+0800 (中国标准时间)"
        },
        {
            "name": "banned-ips.json",
            "type": 1,
            "size": 2,
            "time": "Sat Oct 02 2021 22:41:06 GMT+0800 (中国标准时间)"
        },
        {
            "name": "banned-players.json",
            "type": 1,
            "size": 2,
            "time": "Sat Oct 02 2021 22:41:06 GMT+0800 (中国标准时间)"
        },
        {
            "name": "bukkit.yml",
            "type": 1,
            "size": 1053,
            "time": "Sat Oct 02 2021 22:41:17 GMT+0800 (中国标准时间)"
        },
        {
            "name": "commands.yml",
            "type": 1,
            "size": 598,
            "time": "Sat Oct 02 2021 22:41:06 GMT+0800 (中国标准时间)"
        },
        {
            "name": "eula.txt",
            "type": 1,
            "size": 9,
            "time": "Sat Oct 02 2021 22:57:21 GMT+0800 (中国标准时间)"
        },
        {
            "name": "help.yml",
            "type": 1,
            "size": 2576,
            "time": "Sat Oct 02 2021 22:42:10 GMT+0800 (中国标准时间)"
        },
        {
            "name": "ops.json",
            "type": 1,
            "size": 685,
            "time": "Sat Oct 02 2021 22:41:06 GMT+0800 (中国标准时间)"
        },
        {
            "name": "paper.yml",
            "type": 1,
            "size": 4987,
            "time": "Sat Oct 02 2021 22:41:06 GMT+0800 (中国标准时间)"
        },
        {
            "name": "pass.conf",
            "type": 1,
            "size": 6,
            "time": "Sat Oct 02 2021 22:40:20 GMT+0800 (中国标准时间)"
        },
        {
            "name": "permissions.yml",
            "type": 1,
            "size": 0,
            "time": "Sat Oct 02 2021 22:41:06 GMT+0800 (中国标准时间)"
        },
        {
            "name": "port.conf",
            "type": 1,
            "size": 6,
            "time": "Sun Jun 07 2020 17:37:03 GMT+0800 (中国标准时间)"
        },
        {
            "name": "server.properties",
            "type": 1,
            "size": 1005,
            "time": "Sat Oct 02 2021 22:41:06 GMT+0800 (中国标准时间)"
        },
        {
            "name": "spigot.yml",
            "type": 1,
            "size": 3500,
            "time": "Sat Oct 02 2021 22:57:21 GMT+0800 (中国标准时间)"
        },
        {
            "name": "test.txt",
            "type": 1,
            "size": 8,
            "time": "Sat Oct 02 2021 22:52:34 GMT+0800 (中国标准时间)"
        }
    ],
    "time": 1633187153687
}
```