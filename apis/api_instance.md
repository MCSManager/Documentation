# Instance API

## Instance List

```http
GET /api/service/remote_service_instances
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;       // required
  page: number;           // required, >= 1
  page_size: number;      // required, 1 ~ 50
  instance_name?: string; // filter by instance nickname (fuzzy match)
  status?: string;        // filter by status code: -1 busy, 0 stopped, 1 stopping, 2 starting, 3 running
  tag?: string;           // JSON-encoded string array, e.g. '["tag1","tag2"]'
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "page": 1,
    "pageSize": 10,
    "maxPage": 1,
    "allTags": ["tag1", "tag2"],
    "data": InstanceDetail[]
  },
  "time": 1718594177859
}
```

> Each item in `data` follows the [InstanceDetail](#type-of-instdetail) shape, but list items do **not** include `processInfo` or `space`.

## Instance Detail

```http
GET /api/instance
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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

> See [Type of InstanceDetail](#type-of-instdetail).

## Create Instance

```http
POST /api/instance
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
}
```

#### Request Body

> [InstanceConfig](#type-of-instanceconfig)

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
    "config": InstanceConfig,
    "nickname": "New Server"
  },
  "time": 1718594177859
}
```

## Upload Instance File

Create a new instance and register an upload passport for cross-end file upload. Used during instance creation when files need to be uploaded to the daemon.

```http
POST /api/instance/upload
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  upload_dir: string;
}
```

#### Request Body

> [InstanceConfig](#type-of-instanceconfig)

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
    "password": "upload-passport-token",
    "addr": "192.168.1.100:24444",
    "remoteMappings": []
  },
  "time": 1718594177859
}
```

## Update Instance Config (Admin)

Update the full configuration of an instance. Requires administrator permission.

```http
PUT /api/instance
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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

## Update Instance Config (User)

Update a restricted subset of instance configuration for normal (low-privilege) users. Sensitive fields are filtered and sanitized server-side. Only a limited set of fields is accepted; all other fields are ignored.

```http
PUT /api/protected_instance/instance_update
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Request Body

The body is a subset of [InstanceConfig](#type-of-instanceconfig). Accepted fields include:

```js
{
  pingConfig?: {
    ip?: string,
    port?: number,
    type?: number
  },
  eventTask?: {
    autoStart: boolean,
    autoRestart: boolean,
    autoRestartMaxTimes: number
  },
  terminalOption?: {
    haveColor: boolean,
    pty: boolean,
    ptyWindowCol: number,
    ptyWindowRow: number
  },
  extraServiceConfig?: {
    openFrpTunnelId: string,
    openFrpToken: string
  },
  crlf?: number,
  oe?: string,
  ie?: string,
  fileCode?: string,
  stopCommand?: string,
  rconIp?: string,
  rconPort?: number,
  rconPassword?: string,
  enableRcon?: boolean,
  tag?: string[],
  // advanced params (admin-only fields are validated server-side)
}
```

:::warning
The `tag` field is only accepted when the caller has top-level (admin) permission. Tags are trimmed, limited to 20 characters each, and a maximum of 6 tags.
:::

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Delete Instance

```http
DELETE /api/instance
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string,
}
```

#### Request Body

```json
{
  "uuids": [
    "50c73059001b436fa85c0d8221c157cf",
    "11c2f4c89b9e4e1da819dc56bf16f151"
  ], // Instance IDs to delete
  "deleteFile": false // Whether to delete instance files on disk
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceUuids": [
      "50c73059001b436fa85c0d8221c157cf",
      "11c2f4c89b9e4e1da819dc56bf16f151"
    ],
    "instances": [
      {
        "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
        "nickname": "Server A"
      },
      {
        "instanceUuid": "11c2f4c89b9e4e1da819dc56bf16f151",
        "nickname": "Server B"
      }
    ]
  },
  "time": 1718594177859
}
```

## Start Instance

:::tip
This route is defined with `router.all(...)`, so it accepts any HTTP method. The frontend uses `GET`.
:::

```http
GET /api/protected_instance/open
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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

## Stop Instance

:::tip
This route is defined with `router.all(...)`, so it accepts any HTTP method. The frontend uses `GET`.
:::

```http
GET /api/protected_instance/stop
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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

## Restart Instance

:::tip
This route is defined with `router.all(...)`, so it accepts any HTTP method. The frontend uses `GET`.
:::

```http
GET /api/protected_instance/restart
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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

## Kill Instance

:::tip
This route is defined with `router.all(...)`, so it accepts any HTTP method. The frontend uses `GET`.
:::

```http
GET /api/protected_instance/kill
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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

## Send Command

Send a command to the instance's terminal via HTTP. The route is defined with `router.all(...)` and accepts any HTTP method.

:::warning
The frontend uses WebSocket (`stream/input` event) for command input instead of this HTTP API. This HTTP route is reserved as an API interface for programmatic access.
:::

```http
GET /api/protected_instance/command
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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
  "data": true,
  "time": 1718594177859
}
```

## Batch Operations

Perform operations on multiple instances across daemons. Each route accepts an array of `{ instanceUuid, daemonId }` objects in the request body.

| Route | Operation |
|---|---|
| `POST /api/instance/multi_open` | Start instances |
| `POST /api/instance/multi_stop` | Stop instances |
| `POST /api/instance/multi_restart` | Restart instances |
| `POST /api/instance/multi_kill` | Kill instances |

#### Request Body

```json
[
  { "instanceUuid": "50c73059001b436fa85c0d8221c157cf", "daemonId": "dc3a3f..." },
  { "instanceUuid": "11c2f4c89b9e4e1da819dc56bf16f151", "daemonId": "dc3a3f..." }
]
```

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::tip
These routes do not wait for each operation to complete. They fire-and-forget in the background and immediately return `true`.
:::

## Get Output Log

```http
GET /api/protected_instance/outputlog
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  size?: string     // Truncate the log to the specified size.
                    // Accepts a plain number (bytes) or a number
                    // suffixed with "KB" (e.g. "10KB").
                    // Returns the last N bytes of the log.
                    // If not set, returns all logs.
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

## Asynchronous Task

Start an asynchronous task on the instance. The `task_name` query parameter determines the task type and the required request body.

```http
POST /api/protected_instance/asynchronous
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,        // Instance ID
  daemonId: string,
  task_name: string    // Task type, e.g. "update", "quick_install"
}
```

#### Request Body

The body depends on `task_name`:

| `task_name` | Body | Description |
|---|---|---|
| `"update"` | `{ time: number }` | Update the instance software using its configured update command |
| `"quick_install"` | `{ time: number, newInstanceName: string, targetLink: string, setupInfo?: any }` | Quick-install a new instance (admin only) |

#### Response (for `task_name: "update"`)

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

#### Response (for `task_name: "quick_install"`)

```json
{
  "status": 200,
  "data": {
    "instanceConfig": InstanceConfig,
    "instanceStatus": 0,
    "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
    "status": 0,
    "taskId": "task-uuid"
  },
  "time": 1718594177859
}
```

## Query Asynchronous Task

Query the status of an asynchronous task. The route is defined with `router.all(...)`. The frontend uses `POST`.

```http
POST /api/protected_instance/query_asynchronous
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,        // Instance ID
  daemonId: string,
  task_name: string    // Task type to query, e.g. "quick_install"
}
```

#### Request Body

```json
{
  "taskId": "task-uuid"  // Optional. If omitted, lists all tasks of this type (admin only).
}
```

#### Response (single task)

```json
{
  "status": 200,
  "data": {
    "taskId": "task-uuid",
    "status": 0,
    "detail": {
      "instanceConfig": InstanceConfig,
      "instanceStatus": 0,
      "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
      "status": 0,
      "taskId": "task-uuid"
    }
  },
  "time": 1718594177859
}
```

When `taskId` is omitted, `data` is an array of the above objects.

## Stop Asynchronous Task

Stop a running asynchronous task. The route is defined with `router.all(...)` and accepts any HTTP method.

```http
ALL /api/protected_instance/stop_asynchronous
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Request Body

```json
{
  "taskId": "task-uuid"  // Optional. If provided, stops the specific task;
                         // otherwise stops the instance's current async task.
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

## Stream Channel

Request a dedicated data-stream channel with the daemon. Returns connection credentials for establishing a WebSocket connection to the daemon for terminal I/O.

```http
POST /api/protected_instance/stream_channel
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

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
    "password": "stream-passport-token",
    "addr": "192.168.1.100:24444",
    "prefix": "/socket.io/",
    "remoteMappings": []
  },
  "time": 1718594177859
}
```

## Process Config List

Check which files in the instance directory are recognized as configuration files.

```http
POST /api/protected_instance/process_config/list
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### Request Body

```json
{
  "files": ["server.properties", "config.yml"]
}
```

#### Response

```json
{
  "status": 200,
  "data": [
    {
      "file": "server.properties",
      "check": true
    },
    {
      "file": "config.yml",
      "check": true
    }
  ],
  "time": 1718594177859
}
```

## Get Process Config File

Read the content of a specific configuration file.

```http
GET /api/protected_instance/process_config/file
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  fileName: string,  // File path relative to the instance working directory
  type?: string      // Config file type hint
}
```

#### Response

```json
{
  "status": 200,
  "data": {},  // Parsed config file content
  "time": 1718594177859
}
```

## Update Process Config File

Write new content to a specific configuration file.

```http
PUT /api/protected_instance/process_config/file
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  fileName: string,  // File path relative to the instance working directory
  type?: string      // Config file type hint
}
```

#### Request Body

The new configuration content (object to write).

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Reinstall Instance

Reinstall the instance using a preset package. The preset package is identified by matching `title` and `description` from the quick install list.

```http
POST /api/protected_instance/install_instance
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string,
  uuid: string      // Instance ID
}
```

#### Request Body

```json
{
  "title": "Minecraft 1.20.4 Java",
  "description": "[Paper] Low hardware configuration machine use, Fast setup."
}
```

:::warning
The `title` and `description` must exactly match an entry in the preset package list configured by the administrator. Other fields in the body (such as `targetUrl`) are ignored for security reasons.
:::

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Quick Install List

Get the list of available preset packages for quick installation. The source is configured via `systemConfig.presetPackAddr`.

```http
GET /api/instance/quick_install_list
```

#### Query Param

None.

#### Response

```json
{
  "status": 200,
  "data": {
    "languages": [
      { "label": "English", "value": "en" }
    ],
    "packages": [
      {
        "language": "en",
        "description": "Fast setup.",
        "title": "Minecraft 1.20.4 Java",
        "category": "Minecraft",
        "runtime": "java",
        "size": "50MB",
        "hardware": "Low",
        "remark": "Low hardware configuration machine use",
        "targetLink": "https://example.com/Paper-1.20.4.zip",
        "author": "MCSManager",
        "setupInfo": InstanceConfig,
        "gameType": "Minecraft",
        "image": "",
        "platform": ""
      }
    ]
  },
  "time": 1718594177859
}
```

:::tip
If the preset pack address is unavailable or the request fails, an empty array `[]` is returned.
:::

## Forward Request

Proxy an HTTP request to an arbitrary target URL. The method and body of the incoming request are forwarded as-is. Intended for internal/advanced usage.

```http
ALL /api/instance/forward
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  target: string  // The full target URL to forward the request to
}
```

#### Request Body

Any body — forwarded to the target URL as-is.

#### Response

```json
{
  "status": 200,
  "data": {},  // Response from the forwarded target; empty array [] on error
  "time": 1718594177859
}
```

## Exchange (Business Mode)

These routes are for the business/exchange mode of MCSManager. They are internal routes for SSO, instance purchasing, and renewal.

### Exchange Request

General exchange endpoint. The `request_action` field determines the action to perform.

```http
POST /api/exchange
```

#### Request Body

```js
{
  request_action: string,  // "ping" | "buy" | "renew" | "query_instance" | "sso_token"
  data?: any               // Action-specific parameters
}
```

| `request_action` | `data` | Description |
|---|---|---|
| `"ping"` | node info | Returns daemon node status |
| `"buy"` | instance params | Buy a new instance |
| `"renew"` | instance params | Renew an existing instance |
| `"query_instance"` | `{ username }` | Query instances by user ID |
| `"sso_token"` | `{ username }` | Generate an SSO token for the user |

#### Response

The response depends on the `request_action`. On error, `data` is the error object.

### Exchange SSO

SSO login redirect. No authentication required.

```http
GET /api/exchange/sso
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  username: string,
  token: string,
  instanceId: string,
  daemonId: string,
  origin: string       // The panel base URL for redirect
}
```

#### Response

On success, the server issues an HTTP redirect (302) to:

```
{origin}/#/instances/terminal?daemonId={daemonId}&instanceId={instanceId}&from=sso
```

On failure, an error is thrown.

### Exchange Buy Instance

Buy or renew an instance using a redeem code. No authentication required (the redeem code serves as the credential).

```http
POST /api/exchange/request_buy_instance
```

#### Request Body

```json
{
  "productId": 1,
  "daemonId": "dc3a3f............",
  "code": "redeem-code",
  "instanceId": "",        // Optional. If provided, renews the existing instance; otherwise buys a new one.
  "username": ""           // Optional. The username to assign the instance to.
}
```

#### Response

```json
{
  "status": 200,
  "data": {},  // Result of the buy/renew operation
  "time": 1718594177859
}
```

## Type of InstanceConfig

```json
{
  "nickname": "New Name",
  "startCommand": "cmd.exe",
  "stopCommand": "^C",
  "stopTimeout": 0,
  "cwd": "/workspaces/my_server/",
  "ie": "gbk",                        // input encode
  "oe": "gbk",                        // output encode
  "createDatetime": 1709631756708,
  "lastDatetime": 1709631756708,
  "type": "universal",                // instance type
  "tag": [],
  "endTime": 1729631756708,
  "fileCode": "gbk",
  "processType": "docker",            // "general" | "docker"
  "updateCommand": "shutdown -s",
  "runAs": "",
  "actionCommandList": [],
  "crlf": 2,
  "category": 0,
  "basePort": 0,

  // Steam RCON
  "enableRcon": true,
  "rconPassword": "123456",
  "rconPort": 2557,
  "rconIp": "192.168.1.233",

  // Java
  "java": {
    "id": "java-17"
  },

  // Terminal options
  "terminalOption": {
    "haveColor": false,
    "pty": true,
    "ptyWindowCol": 164,
    "ptyWindowRow": 40
  },

  // Event task
  "eventTask": {
    "autoStart": false,
    "autoRestart": true,
    "autoRestartMaxTimes": -1,
    "ignore": false
  },

  // Docker config
  "docker": DockerConfig,

  // Ping protocol config (all fields optional)
  "pingConfig": {
    "ip": "",
    "port": 25565,
    "type": 1
  },

  // Extra service config
  "extraServiceConfig": {
    "openFrpTunnelId": "",
    "openFrpToken": ""
  }
}
```

## Type of InstanceDetail

<a id="type-of-instdetail"></a>

```json
{
  "config": InstanceConfig,
  "info": {
    "mcPingOnline": false,
    "currentPlayers": -1,
    "fileLock": 0,
    "maxPlayers": -1,
    "openFrpStatus": false,
    "playersChart": [{ "value": "0" }],
    "version": "",
    "latency": 0,
    "allocatedPorts": [
      { "host": "25565", "container": 25565, "protocol": "tcp" }
    ]
  },
  "instanceUuid": "50c73059001b436fa85c0d8221c157cf",
  "started": 6,               // start count
  "autoRestarted": 0,          // auto-restart count
  "status": 3,                 // -1 = busy,
                               // 0  = stopped,
                               // 1  = stopping,
                               // 2  = starting,
                               // 3  = running
  "space": 0,                  // disk space used (bytes)
  "processInfo": {
    "cpu": 0,                  // percentage (0 ~ 100*vcore)
    "memory": 0,               // bytes
    "ppid": 0,                 // parent PID
    "pid": 0,                  // PID
    "ctime": 0,                // ms (user + system time)
    "elapsed": 0,              // ms since process start
    "timestamp": 0             // ms since epoch
  }
}
```

:::tip
When returned from the **Instance List** endpoint, items do not include `processInfo` or `space` — only `instanceUuid`, `started`, `autoRestarted`, `status`, `config`, and `info`.
:::

## Type of Instance DockerConfig

```json
{
  "updateCommandImage": "HOST",  // Docker image used for the update command; empty = not used
  "containerName": "",            // container name
  "image": "mcsm-ubuntu:22.04",   // Docker image
  "memory": 1024,                 // MB
  "memorySwap": null,             // swap limit (MB)
  "memorySwappiness": null,       // swappiness (0-100)
  "ports": ["25565:25565/tcp"],   // port mappings
  "extraVolumes": [],             // extra volume mounts
  "maxSpace": null,               // max disk space (not fully implemented)
  "network": null,                // Docker network (not fully implemented)
  "io": null,                     // IO limit (not implemented)
  "networkMode": "bridge",        // network mode
  "networkAliases": [],           // network aliases
  "cpusetCpus": "",               // CPU set preference
  "cpuUsage": 100,                // CPU limit (percentage)
  "workingDir": "",               // working directory inside container
  "changeWorkdir": false,         // force change working directory
  "env": [],                      // environment variables
  "labels": [],                   // Docker labels
  "capAdd": [],                   // Linux capabilities to add
  "capDrop": [],                  // Linux capabilities to drop
  "devices": [],                  // device mappings, e.g. ["/dev/sda:/dev/sda"]
  "privileged": false,            // run in privileged mode
  "uploadSpeedLimit": 0,          // upload speed limit (KB/s)
  "downloadSpeedLimit": 0,        // download speed limit (KB/s)
  "gpuEnabled": false,            // enable GPU passthrough
  "gpuCount": -1,                 // GPU count: -1 = all, 0 = none, N = specific count
  "gpuDeviceIds": [],            // specific GPU device IDs (mutually exclusive with gpuCount)
  "gpuDriver": "nvidia",         // GPU driver name
  "deviceReadBps": [],            // device read BPS, format: ["/dev/sda:10MB"]
  "deviceWriteBps": []            // device write BPS, format: ["/dev/sda:10MB"]
}
```

:::tip
You can use `{mcsm_port}` to assign a random port in the `ports` field.
:::

## `IUserHaveInstance[]`

```json
{
    "instanceUuid": "********************************",
    "daemonId": "********************************"
}
```
