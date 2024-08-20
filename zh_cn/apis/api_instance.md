# 实例 API

## 示例列表

```http
GET /api/service/remote_service_instances
```

#### Query 参数

```js
{
  daemonId: string;
  page: number;
  page_size: number;
  instance_name?: string;
  status: string;
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "maxPage": 1,
    "pageSize": 10,
    "data": InstanceDetail[]
  },
  "time": 1718594177859
}
```
> 请看[示例详细信息](#示例详细形信息)
## 实例详情

```http
GET /api/instance
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": InstanceDetail,
  "time": 1718594177859
}
```
> 请看[示例详细信息](#示例详细形信息)
## 创建实例

```http
POST /api/instance
```

##### Query 参数

```js
{
  daemonId: string;
}
```

##### 请求正文示例

> 请看[实例配置示例](#实例配置示例)

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
    "config": InstanceConfig
  },
  "time": 1718594177859
}
```

## 更新示例配置

```http
PUT /api/instance
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 请求正文示例

> 请看[实例配置示例](#实例配置示例)

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## 删除实例

```http
DELETE /api/instance
```

#### Query 参数

```js
{
  daemonId: string,
}
```

#### 请求正文示例

```json
{
  "uuids": [
    "50c73059001b436fa85c0d8221c157cf"
    "11c2f4c89b9e4e1da819dc56bf16f151"
  ], // Instance Id
  "deleteFile": false // Delete instance files
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 启动实例

```http
GET /api/protected_instance/open
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## 停止实例

```http
GET /api/protected_instance/stop
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## 重启实例

```http
GET /api/protected_instance/restart
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## 强制结束实例进程

```http
GET /api/protected_instance/kill
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## 批量操作
operations可填: `start`, `stop`, `restart`, `kill`

```http
POST /api/instance/multi_{{operations}}
```

#### Query 参数

```js
{
  instanceUuid: string,
  daemonId: string,
}[]
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```


## 更新实例

```http
GET /api/protected_instance/asynchronous
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  task_name: "update"
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 发送命令

```http
GET /api/protected_instance/command
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  command: string
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## 获取输出

```http
GET /api/protected_instance/outputlog
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  size?: number      // 获取的日志大小: 1KB ~ 2048KB
                     // 如果未设置，则返回所有日志
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": "[INFO]: Done (12.138s)! For help, type \"help\"\n",
  "time": 1718594177859
}
```

## 重新安装

```http
POST /api/protected_instance/install_instance
```

#### Query 参数

```js
{
  daemonId: string,
  uuid: string      // Instance ID
}
```

#### 请求正文示例

```json
{
  "targetUrl": "https://files.example.com/Paper-1.20.4.zip",
  "title": "Minecraft 1.20.4 Java",
  "description": "[Paper] Low hardware configuration machine use, Fast setup."
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 实例配置示例

```json
{
  "nickname": "New Name",
  "startCommand": "cmd.exe",
  "stopCommand":  "^C",
  "cwd": "/workspaces/my_server/",
  "ie": "gbk",                        // 输入 encode
  "oe": "gbk",                        // 输出 encode
  "createDatetime": "2022/2/3",
  "lastDatetime": "2022/2/3 16:02",
  "type": "universal",                // 实例类型
  "tag": [],
  "endTime": "2022/2/28",
  "fileCode": "gbk",
  "processType": "docker",
  "updateCommand": "shutdown -s",
  "actionCommandList": [],
  "crlf": 2,
  "docker": DockerConfig,

  // Steam RCON
  "enableRcon": true,
  "rconPassword": "123456",
  "rconPort": 2557,
  "rconIp": "192.168.1.233",

  //终端选项
  "terminalOption": {
    "haveColor": false,
    "pty": true,
  },
  "eventTask": {
    "autoStart": false,
    "autoRestart": true,
    "ignore": false,
  },
  "pingConfig": {
    "ip": "",
    "port": 25565,
    "type": 1,
  }
}
```

## 示例详细形信息

```json
{
  "config": InstanceConfig,
  "info": {
    "currentPlayers": -1,
    "fileLock": 0,
    "maxPlayers": -1,
    "openFrpStatus": false,
    "playersChart": [],
    "version": "",
  },
  "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
  "processInfo": {
    "cpu": 0,
    "memory": 0,
    "ppid": 0,
    "pid": 0,
    "ctime": 0,
    "elapsed": 0,
    "timestamp": 0
  },
  "space": 0,
  "started": 6, // 开始计数
  "status": 3,  // -1 = 忙碌,
                // 0  = 停止,
                // 1  = 停止中,
                // 2  = 启动中,
                // 3  = 运行中
}
```

## 实例的docker配置

```json
{
  "containerName": "",
  "image": "mcsm-ubuntu:22.04",
  "memory": 1024, // MB
  "ports": ["25565:25565/tcp"],
  "extraVolumes": [],
  "maxSpace": null,
  "network": null,
  "io": null,
  "networkMode": "bridge",
  "networkAliases": [],
  "cpusetCpus": "",
  "cpuUsage": 100,
  "workingDir": "",
  "env": []
}
```
