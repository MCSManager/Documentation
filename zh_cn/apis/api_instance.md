# 实例 API

## 实例列表

```http
GET /api/service/remote_service_instances
```

#### Query 参数

:::tip
注意此处的参数是 **URL Query 参数**，使用 JSON 格式只是为了更好地表达，下文有相同方法将不再提醒。
:::

```js
{
  daemonId: string;       // 必填
  page: number;           // 必填，>= 1
  page_size: number;      // 必填，1 ~ 50
  instance_name?: string; // 按实例昵称过滤（模糊匹配）
  status?: string;        // 按状态码过滤：-1 忙碌，0 停止，1 停止中，2 启动中，3 运行中
  tag?: string;           // JSON 编码的字符串数组，如 '["tag1","tag2"]'
}
```

#### 返回示例

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

> `data` 数组中的每一项遵循 [InstanceDetail](#type-of-instdetail) 的结构，但列表项**不包含** `processInfo` 和 `space`。

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

> 请看 [InstanceDetail 类型](#type-of-instdetail)。

## 创建实例

```http
POST /api/instance
```

#### Query 参数

```js
{
  daemonId: string;
}
```

#### 请求正文

> [InstanceConfig](#type-of-instanceconfig)

#### 返回示例

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

## 上传实例文件

创建新实例并注册跨端文件上传的 passport。用于创建实例时需要向 daemon 上传文件的场景。

```http
POST /api/instance/upload
```

#### Query 参数

```js
{
  daemonId: string;
  upload_dir: string;
}
```

#### 请求正文

> [InstanceConfig](#type-of-instanceconfig)

#### 返回示例

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

## 更新实例配置（管理员）

更新实例的完整配置。需要管理员权限。

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

#### 请求正文

> [InstanceConfig](#type-of-instanceconfig)

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

## 更新实例配置（普通用户）

为普通（低权限）用户更新实例配置的限制子集。敏感字段会在服务端过滤和清洗。仅接受有限字段，其余字段会被忽略。

```http
PUT /api/protected_instance/instance_update
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 请求正文

请求正文是 [InstanceConfig](#type-of-instanceconfig) 的子集。可接受的字段包括：

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
  // 高级参数（仅管理员的字段会在服务端校验）
}
```

:::warning
`tag` 字段仅在调用者拥有最高（管理员）权限时才被接受。标签会被去除首尾空格，每个标签限制 20 个字符，最多 6 个标签。
:::

#### 返回示例

```json
{
  "status": 200,
  "data": true,
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

#### 请求正文

```json
{
  "uuids": [
    "50c73059001b436fa85c0d8221c157cf",
    "11c2f4c89b9e4e1da819dc56bf16f151"
  ], // 要删除的 Instance ID
  "deleteFile": false // 是否删除磁盘上的实例文件
}
```

#### 返回示例

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

## 启动实例

:::tip
此路由使用 `router.all(...)` 定义，接受任意 HTTP 方法。前端使用 `GET`。
:::

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

:::tip
此路由使用 `router.all(...)` 定义，接受任意 HTTP 方法。前端使用 `GET`。
:::

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

:::tip
此路由使用 `router.all(...)` 定义，接受任意 HTTP 方法。前端使用 `GET`。
:::

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

:::tip
此路由使用 `router.all(...)` 定义，接受任意 HTTP 方法。前端使用 `GET`。
:::

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

## 发送命令

通过 HTTP 向实例终端发送命令。此路由使用 `router.all(...)` 定义，接受任意 HTTP 方法。

:::warning
前端使用 WebSocket（`stream/input` 事件）进行命令输入，而非此 HTTP API。此 HTTP 路由保留为编程式访问的 API 接口。
:::

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
  "data": true,
  "time": 1718594177859
}
```

## 批量操作

对跨 daemon 的多个实例执行操作。每个路由接受一个 `{ instanceUuid, daemonId }` 对象数组作为请求正文。

| 路由 | 操作 |
|---|---|
| `POST /api/instance/multi_open` | 启动实例 |
| `POST /api/instance/multi_stop` | 停止实例 |
| `POST /api/instance/multi_restart` | 重启实例 |
| `POST /api/instance/multi_kill` | 强制结束实例 |

#### 请求正文

```json
[
  { "instanceUuid": "50c73059001b436fa85c0d8221c157cf", "daemonId": "dc3a3f..." },
  { "instanceUuid": "11c2f4c89b9e4e1da819dc56bf16f151", "daemonId": "dc3a3f..." }
]
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::tip
这些路由不会等待每个操作完成。它们在后台异步执行并立即返回 `true`。
:::

## 获取输出日志

```http
GET /api/protected_instance/outputlog
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  size?: string     // 截取日志到指定大小。
                    // 接受纯数字（字节）或以 "KB" 为后缀的
                    // 数字（如 "10KB"）。返回日志的最后 N
                    // 个字节。未设置时返回全部日志。
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

## 异步任务

在实例上启动异步任务。`task_name` Query 参数决定任务类型和所需的请求正文。

```http
POST /api/protected_instance/asynchronous
```

#### Query 参数

```js
{
  uuid: string,        // Instance ID
  daemonId: string,
  task_name: string    // 任务类型，如 "update"、"quick_install"
}
```

#### 请求正文

请求正文取决于 `task_name`：

| `task_name` | 请求正文 | 说明 |
|---|---|---|
| `"update"` | `{ time: number }` | 使用配置的更新命令更新实例软件 |
| `"quick_install"` | `{ time: number, newInstanceName: string, targetLink: string, setupInfo?: any }` | 快速安装新实例（仅管理员） |

#### 返回示例（`task_name: "update"`）

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

#### 返回示例（`task_name: "quick_install"`）

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

## 查询异步任务

查询异步任务的状态。此路由使用 `router.all(...)` 定义，前端使用 `POST`。

```http
POST /api/protected_instance/query_asynchronous
```

#### Query 参数

```js
{
  uuid: string,        // Instance ID
  daemonId: string,
  task_name: string    // 要查询的任务类型，如 "quick_install"
}
```

#### 请求正文

```json
{
  "taskId": "task-uuid"  // 可选。省略时列出该类型的所有任务（仅管理员）。
}
```

#### 返回示例（单个任务）

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

当 `taskId` 省略时，`data` 为上述对象的数组。

## 停止异步任务

停止正在运行的异步任务。此路由使用 `router.all(...)` 定义，接受任意 HTTP 方法。

```http
ALL /api/protected_instance/stop_asynchronous
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 请求正文

```json
{
  "taskId": "task-uuid"  // 可选。提供时停止指定任务；
                         // 否则停止实例当前的异步任务。
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

## 数据流通道

请求与 daemon 建立专用数据流通道。返回用于建立 WebSocket 连接到 daemon 的凭据，用于终端 I/O。

```http
POST /api/protected_instance/stream_channel
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
    "password": "stream-passport-token",
    "addr": "192.168.1.100:24444",
    "prefix": "/socket.io/",
    "remoteMappings": []
  },
  "time": 1718594177859
}
```

## 配置文件列表

检查实例目录中哪些文件被识别为配置文件。

```http
POST /api/protected_instance/process_config/list
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
}
```

#### 请求正文

```json
{
  "files": ["server.properties", "config.yml"]
}
```

#### 返回示例

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

## 获取配置文件内容

读取指定配置文件的内容。

```http
GET /api/protected_instance/process_config/file
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  fileName: string,  // 相对于实例工作目录的文件路径
  type?: string      // 配置文件类型提示
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {},  // 解析后的配置文件内容
  "time": 1718594177859
}
```

## 更新配置文件内容

向指定配置文件写入新内容。

```http
PUT /api/protected_instance/process_config/file
```

#### Query 参数

```js
{
  uuid: string,     // Instance ID
  daemonId: string,
  fileName: string,  // 相对于实例工作目录的文件路径
  type?: string      // 配置文件类型提示
}
```

#### 请求正文

新的配置内容（要写入的对象）。

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 重新安装实例

使用预设安装包重新安装实例。预设安装包通过精确匹配 `title` 和 `description` 来标识。

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

#### 请求正文

```json
{
  "title": "Minecraft 1.20.4 Java",
  "description": "[Paper] Low hardware configuration machine use, Fast setup."
}
```

:::warning
`title` 和 `description` 必须与管理员配置的预设安装包列表中的条目完全匹配。为安全起见，请求正文中的其他字段（如 `targetUrl`）会被忽略。
:::

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 快速安装列表

获取可用的预设安装包列表。数据来源由 `systemConfig.presetPackAddr` 配置。

```http
GET /api/instance/quick_install_list
```

#### Query 参数

无。

#### 返回示例

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
如果预设包地址不可用或请求失败，返回空数组 `[]`。
:::

## 转发请求

将 HTTP 请求代理转发到任意目标 URL。请求的方法和正文会被原样转发。用于内部或高级用途。

```http
ALL /api/instance/forward
```

#### Query 参数

```js
{
  target: string  // 要转发请求的完整目标 URL
}
```

#### 请求正文

任意正文——原样转发到目标 URL。

#### 返回示例

```json
{
  "status": 200,
  "data": {},  // 转发目标的响应；出错时为空数组 []
  "time": 1718594177859
}
```

## Exchange（商业模式）

这些路由用于 MCSManager 的商业/兑换模式。它们是 SSO、实例购买和续费的内部路由。

### 兑换请求

通用兑换接口。`request_action` 字段决定要执行的操作。

```http
POST /api/exchange
```

#### 请求正文

```js
{
  request_action: string,  // "ping" | "buy" | "renew" | "query_instance" | "sso_token"
  data?: any               // 根据操作而定的参数
}
```

| `request_action` | `data` | 说明 |
|---|---|---|
| `"ping"` | 节点信息 | 返回 daemon 节点状态 |
| `"buy"` | 实例参数 | 购买新实例 |
| `"renew"` | 实例参数 | 续费现有实例 |
| `"query_instance"` | `{ username }` | 按用户 ID 查询实例 |
| `"sso_token"` | `{ username }` | 为用户生成 SSO token |

#### 返回示例

返回内容取决于 `request_action`。出错时 `data` 为错误对象。

### Exchange SSO

SSO 登录重定向。无需认证。

```http
GET /api/exchange/sso
```

#### Query 参数

```js
{
  username: string,
  token: string,
  instanceId: string,
  daemonId: string,
  origin: string       // 面板基础 URL，用于重定向
}
```

#### 返回示例

成功时，服务端发出 HTTP 重定向（302）到：

```
{origin}/#/instances/terminal?daemonId={daemonId}&instanceId={instanceId}&from=sso
```

失败时抛出错误。

### Exchange 购买实例

使用兑换码购买或续费实例。无需认证（兑换码本身即为凭证）。

```http
POST /api/exchange/request_buy_instance
```

#### 请求正文

```json
{
  "productId": 1,
  "daemonId": "dc3a3f............",
  "code": "redeem-code",
  "instanceId": "",        // 可选。提供时续费现有实例；否则购买新实例。
  "username": ""           // 可选。分配实例的用户名。
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {},  // 购买/续费操作的结果
  "time": 1718594177859
}
```

## InstanceConfig 类型

<a id="type-of-instanceconfig"></a>

```json
{
  "nickname": "New Name",
  "startCommand": "cmd.exe",
  "stopCommand": "^C",
  "stopTimeout": 0,
  "cwd": "/workspaces/my_server/",
  "ie": "gbk",                        // 输入 encode
  "oe": "gbk",                        // 输出 encode
  "createDatetime": 1709631756708,
  "lastDatetime": 1709631756708,
  "type": "universal",                // 实例类型
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

  // 终端选项
  "terminalOption": {
    "haveColor": false,
    "pty": true,
    "ptyWindowCol": 164,
    "ptyWindowRow": 40
  },

  // 事件任务
  "eventTask": {
    "autoStart": false,
    "autoRestart": true,
    "autoRestartMaxTimes": -1,
    "ignore": false
  },

  // Docker 配置
  "docker": DockerConfig,

  // Ping 协议配置（所有字段可选）
  "pingConfig": {
    "ip": "",
    "port": 25565,
    "type": 1
  },

  // 额外服务配置
  "extraServiceConfig": {
    "openFrpTunnelId": "",
    "openFrpToken": ""
  }
}
```

## InstanceDetail 类型

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
  "started": 6,               // 启动次数
  "autoRestarted": 0,          // 自动重启次数
  "status": 3,                 // -1 = 忙碌,
                               // 0  = 停止,
                               // 1  = 停止中,
                               // 2  = 启动中,
                               // 3  = 运行中
  "space": 0,                  // 已用磁盘空间（字节）
  "processInfo": {
    "cpu": 0,                  // 百分比（0 ~ 100*核心数）
    "memory": 0,               // 字节
    "ppid": 0,                 // 父进程 PID
    "pid": 0,                  // PID
    "ctime": 0,                // 毫秒（用户 + 系统时间）
    "elapsed": 0,              // 进程启动以来的毫秒数
    "timestamp": 0             // 自 epoch 以来的毫秒数
  }
}
```

:::tip
从**实例列表**接口返回时，列表项不包含 `processInfo` 和 `space`，仅包含 `instanceUuid`、`started`、`autoRestarted`、`status`、`config` 和 `info`。
:::

## DockerConfig 类型

```json
{
  "updateCommandImage": "HOST",  // 更新命令使用的 Docker 镜像；空 = 不使用
  "containerName": "",            // 容器名称
  "image": "mcsm-ubuntu:22.04",   // Docker 镜像
  "memory": 1024,                 // 单位 MB
  "memorySwap": null,             // swap 限制（MB）
  "memorySwappiness": null,       // swappiness（0-100）
  "ports": ["25565:25565/tcp"],   // 端口映射
  "extraVolumes": [],             // 额外挂载卷
  "maxSpace": null,               // 最大磁盘空间（暂未完全实现）
  "network": null,                // Docker 网络（暂未完全实现）
  "io": null,                     // IO 限制（未实现）
  "networkMode": "bridge",        // 网络模式
  "networkAliases": [],           // 网络别名
  "cpusetCpus": "",               // CPU 使用偏好
  "cpuUsage": 100,                // CPU 限制（百分比）
  "workingDir": "",               // 容器内工作目录
  "changeWorkdir": false,         // 强制更改工作目录
  "env": [],                      // 环境变量
  "labels": [],                   // Docker 标签
  "capAdd": [],                   // 要添加的 Linux capabilities
  "capDrop": [],                  // 要移除的 Linux capabilities
  "devices": [],                  // 设备映射，如 ["/dev/sda:/dev/sda"]
  "privileged": false,            // 以特权模式运行
  "uploadSpeedLimit": 0,          // 上传速度限制（KB/s）
  "downloadSpeedLimit": 0,        // 下载速度限制（KB/s）
  "gpuEnabled": false,            // 启用 GPU 直通
  "gpuCount": -1,                 // GPU 数量：-1 = 全部，0 = 无，N = 指定数量
  "gpuDeviceIds": [],            // 指定 GPU 设备 ID（与 gpuCount 互斥）
  "gpuDriver": "nvidia",         // GPU 驱动名称
  "deviceReadBps": [],            // 设备读取 BPS，格式：["/dev/sda:10MB"]
  "deviceWriteBps": []            // 设备写入 BPS，格式：["/dev/sda:10MB"]
}
```

:::tip
`ports` 字段中，使用 `{mcsm_port}` 可以表示随机端口。
:::

## `IUserHaveInstance[]`

```json
{
    "instanceUuid": "********************************",
    "daemonId": "********************************"
}
```
