# Sample API for Instance Management

## Instance detail

```http
GET /api/instance?uuid={InstanceId}&remote_uuid={DaemonId}
```

## Delete

```http
DELETE /api/instance?uuid={InstanceId}&remote_uuid={DaemonId}

Request Body:
{
  "uuids": ["e11b018bc6514c7385bf923a3e048772"], // Instance Id
  "deleteFile": false // Delete files?
}
```

## Create

```http
POST /api/instance?remote_uuid={DaemonId}

Request Body:
{
  "nickname": "test name",
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
    "image": "",
    "ports": ["25565:25565/tcp"],
    "memory": "2048",
    "networkMode": "bridge",
    "cpusetCpus": "0,1",
    "cpuUsage": "100",
    "maxSpace": null,
    "io": null,
    "network": null
  },
  "pingConfig": {
    "ip": "",
    "port": 25565,
    "type": 1
  }
}

```

## Update

```http
PUT /api/instance?uuid={InstanceId}&remote_uuid={DaemonId}

Request Body:
{
  "nickname": "New Name",
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
    "containerName":"cs",
    "image": "mcsm-openjdk:16",
    "ports": ["25565:25565/tcp"],
    "extraVolumes": ["/17H:/warp"],
    "memory":1024,
    "networkMode":"bridge",
    "cpusetCpus":"50",
    "cpuUsage":2,
    "maxSpace":1024,
    "io":2035,
    "network":256
  },
  "pingConfig": {
    "ip": "",
    "port": 25565,
    "type": 1
  }
}

```

## Start

```http
GET /api/protected_instance/open?uuid={InstanceId}&remote_uuid={DaemonId}
```

## Stop

```http
GET /api/protected_instance/stop?uuid={InstanceId}&remote_uuid={DaemonId}
```

## Restart

```http
GET /api/protected_instance/restart?uuid={InstanceId}&remote_uuid={DaemonId}
```

## Kill

```http
GET /api/protected_instance/kill?uuid={InstanceId}&remote_uuid={DaemonId}
```

## Send Command

```http
GET /api/protected_instance/command?uuid={InstanceId}&remote_uuid={DaemonId}&command={command}
```

## Get output

```http
GET /api/protected_instance/outputlog?uuid={InstanceId}&remote_uuid={DaemonId}&size={128}

// Size: 1KB ~ 2048KB
```
