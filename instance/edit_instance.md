# 编辑实例

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
uuid: String // UUID
remote_uuid: String // 远程服务 UUID
apikey: String      // API 密钥
```

请求参数（Query）
```json
{
    "nickname": "TestServerName",	// 实例名称
    "startCommand": "cmd.exe",		// 启动命令
    "stopCommand": "^c",			// 关闭动作时执行的关闭命令
    "cwd": "D:/Workspace/Project2104-Daemon/data/InstanceData/test", // 工作目录
    "ie": "GBK",	// 输入编码
    "oe": "GBK",	// 输出编码
    "type": "universal",	// 实例类型
    "tag": [],				// 实例标签（暂时）
    "maxSpace": null,		// 实例磁盘最大占用空间（暂无）
    "endTime": null,		// 到期时间，格式 2021/10/1
    "docker": {				// Docker 相关配置
        "image": "12",		// Docker 使用的镜像
        "xmx": "1222",		// 最大内存限制，单位MB、
        "ports": [],		// 开放的端口，格式 ["25565:25565/tcp"]
        "cpu": ""			// CPU 使用权重（暂无）
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
