# 实例 API

## 实例列表

```http
GET /api/service/remote_service_instances
```

#### Query 参数

:::tip
注意此处的参数是**Query参数**,使用JSON格式只是为了更好地表达,下文也有相同的方法将不再提醒
:::

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

> 请看[实例详细信息](#实例详细形信息)

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

> 请看[实例详细信息](#实例详细形信息)

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

## 更新实例配置

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
    "50c73059001b436fa85c0d8221c157cf",
    "11c2f4c89b9e4e1da819dc56bf16f151"
  ], // Instance Id
  "deleteFile": false // 是否删除实例文件
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": [
    "50c73059001b436fa85c0d8221c157cf",
    "11c2f4c89b9e4e1da819dc56bf16f151"
  ], // Instance Id
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

operations 可填: `start`, `stop`, `restart`, `kill`

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
POST /api/protected_instance/asynchronous
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
  "nickname": "New Name",             // 实例名称
  "startCommand": "cmd.exe",          // 启动命令
  "stopCommand":  "^C",               // 停止命令
  "cwd": "/workspaces/my_server/",    // 运行目录(主机)
  "ie": "gbk",                        // 输入 encode
  "oe": "gbk",                        // 输出 encode
  "createDatetime": 1709631756708,    // 创建时间
  "lastDatetime": 1709631756708,      // 最后启动时间
  "type": "universal",                // 实例类型
  "tag": [],                          // 实例标签
  "endTime": 1709631756708,           // 到期时间
  "fileCode": "gbk",                  // 文件编码
  "processType": "docker",            // 进程类型
  "updateCommand": "shutdown -s",     // 更新命令
  "actionCommandList": [],
  "crlf": 2,
  "docker": DockerConfig,

  // Steam RCON
  "enableRcon": true,
  "rconPassword": "123456",
  "rconPort": 2557,
  "rconIp": "192.168.1.233",

  // 终端选项
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

## 实例详细形信息

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
  "started": 6, // 启动次数
  "status": 3,  // -1 = 忙碌,
                // 0  = 停止,
                // 1  = 停止中,
                // 2  = 启动中,
                // 3  = 运行中
}
```

## 实例的 docker 配置

```json
{
  "containerName": "",            // 容器名称
  "image": "mcsm-ubuntu:22.04",   // 镜像
  "memory": 1024,                 // 单位使用MB
  "ports": ["25565:25565/tcp"],   // 端口映射
  "extraVolumes": [],             // 挂载卷
  "maxSpace": null,               // 最大可用磁盘空间(暂未开发完成)
  "network": null,                // Docker网络
  "io": null,                     // 暂时无效
  "networkMode": "bridge",        // 网络模式
  "networkAliases": [],           // 网络别名
  "cpusetCpus": "",               // CPU使用偏好
  "cpuUsage": 100,                // CPU限制
  "workingDir": "",               // 工作目录
  "changeWorkdir": false,         // 强制更改工作目录
  "env": []                       // 环境变量
}
```

:::tip
`ports`字段中，使用`{mcsm_port}`可以表示随机端口
:::

## `IUserHaveInstance[]`

```json
{
    "instanceUuid": "********************************", //实例ID
    "daemonId": "********************************"
}
```
