# Instance API

## Instance List

```http
GET /api/service/remote_service_instances
```

#### Query Param

```js
{
  daemonId: string;
  page: number;
  page_size: number;
  instance_name?: string;
  status: string;
}
```

#### Response

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

## Instance Detail

```http
GET /api/instance
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Response

```json
{
  "status": 200,
  "data": InstanceDetail,
  "time": 1718594177859
}
```

## Create

```http
POST /api/instance
```

##### Query Param

```js
{
  daemonId: string;
}
```

##### Request Body

> [InstanceDetail](#type-of-instancedetail)

#### Response

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

## Update Config

```http
PUT /api/instance
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Request Body

> [InstanceConfig](#type-of-instanceconfig)

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## Delete

```http
DELETE /api/instance
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Request Body

```json
{
  "uuids": ["50c73059001b436fa85c0d8221c157cf"], // Instance Id
  "deleteFile": false // Delete instance files
}
```

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Start

```http
GET /api/protected_instance/open
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## Stop

```http
GET /api/protected_instance/stop
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## Restart

```http
GET /api/protected_instance/restart
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## Kill

```http
GET /api/protected_instance/kill
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## Update Instance

```http
GET /api/protected_instance/asynchronous
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  task_name: "update"
}
```

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Send Command

```http
GET /api/protected_instance/command
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  command: string
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf"
  },
  "time": 1718594177859
}
```

## Get output

```http
GET /api/protected_instance/outputlog
```

#### Query Param

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  size?: number      // Log size: 1KB ~ 2048KB
                     // if not set, return all logs
}
```

#### Response

```json
{
  "status": 200,
  "data": "[INFO]: Done (12.138s)! For help, type \"help\"\n",
  "time": 1718594177859
}
```

## Reinstall

```http
POST /api/protected_instance/install_instance
```

#### Query Param

```js
{
  daemonId: string,
  uuid: string      // Instance ID
}
```

#### Request Body

```json
{
  "targetUrl": "https://files.example.com/Paper-1.20.4.zip",
  "title": "Minecraft 1.20.4 Java",
  "description": "[Paper] Low hardware configuration machine use, Fast setup."
}
```

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Type of InstanceConfig

```json
{
  "nickname": "New Name",
  "startCommand": "cmd.exe",
  "stopCommand":  "^C",
  "cwd": "/workspaces/my_server/",
  "ie": "gbk",                        // input encode
  "oe": "gbk",                        // output encode
  "createDatetime": "2022/2/3",
  "lastDatetime": "2022/2/3 16:02",
  "type": "universal",                // instance type
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

  // Old fields
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

## Type of InstanceDetail

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
  "started": 6, // start count
  "status": 3,  // -1 = busy,
                // 0  = stopped,
                // 1  = stopping,
                // 2  = starting,
                // 3  = running
}
```

## Type of Instance DockerConfig

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
