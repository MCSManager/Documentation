# 仪表盘 API

## 获取概览数据

```http
GET /api/overview
```

返回面板概览：版本、系统信息、图表，以及所有已连接节点的列表及其系统信息。

#### 权限

管理员(token 不是必须的 — 基于 session 访问)

#### 返回

```json
{
  "status": 200,
  "data": {
    "version": "10.2.1",
    "specifiedDaemonVersion": "4.4.1",
    "process": {
      "cpu": 0,
      "memory": 219439104,
      "cwd": "/opt/mcsmanager/panel"
    },
    "record": {
      "logined": 2,
      "illegalAccess": 2,
      "banips": 0,
      "loginFailed": 0
    },
    "system": {
      "user": {
        "uid": -1,
        "gid": -1,
        "username": "MCSManager",
        "homedir": "/home/mcsmanager",
        "shell": null
      },
      "time": 1718594177859,
      "totalmem": 16577519520,
      "freemem": 10966386688,
      "type": "Linux",
      "version": "#1 SMP",
      "node": "v17.9.1",
      "hostname": "MCSManager-Workstation",
      "loadavg": [0, 0, 0],
      "platform": "linux",
      "release": "5.15.0-101-generic",
      "uptime": 905020.0,
      "cpu": 0.11684482123110951
    },
    "chart": {
      "system": [
        {
          "cpu": 8.1,
          "mem": 64.5
        }
      ],
      "request": [
        {
          "value": 6,
          "totalInstance": 23,
          "runningInstance": 3
        }
      ]
    },
    "remoteCount": {
      "available": 3,
      "total": 3
    },
    "remote": [
      {
        "version": "3.4.0",
        "process": {
          "cpu": 3550442695,
          "memory": 22620272,
          "cwd": "/opt/mcsmanager/daemon"
        },
        "instance": {
          "running": 0,
          "total": 6
        },
        "system": {
          "type": "Linux",
          "hostname": "NYA-Dev-01",
          "platform": "linux",
          "release": "5.15.0-101-generic",
          "uptime": 39.63,
          "cwd": "/opt/mcsmanager/daemon",
          "loadavg": [3.5, 0.85, 0.28],
          "freemem": 7254478848,
          "cpuUsage": 0.002512562814070307,
          "memUsage": 0.12453628345617548,
          "totalmem": 8286441472,
          "processCpu": 0,
          "processMem": 0
        },
        "cpuMemChart": [
          {
            "cpu": 0,
            "mem": 13
          }
        ],
        "uuid": "957c6bddf379445c82bac5edf7684bbc",
        "ip": "s1.example.com",
        "port": 24444,
        "prefix": "",
        "available": true,
        "remarks": "CN-ZJ-DEV-01",
        "remoteMappings": [],
        "config": {
          "language": "en_us",
          "uploadSpeedRate": 0,
          "downloadSpeedRate": 0,
          "maxDownloadFromUrlFileCount": 10,
          "portRangeStart": 30000,
          "portRangeEnd": 35000,
          "portAssignInterval": 1,
          "port": 24444,
          "outputBufferSize": 1024,
          "enableSoftShutdown": false,
          "softShutdownSkipDocker": false,
          "softShutdownWaitSeconds": 30
        },
        "dockerPlatforms": ["docker"]
      }
    ]
  },
  "time": 1718594177859
}
```

:::tip
`remote[]` 遵循 `IPanelOverviewRemoteResponse` 类型。`remoteMappings`、`config` 和 `dockerPlatforms` 字段由节点填充，具体内容可能因节点版本不同而有所差异。
:::

## 操作日志

### 获取最近日志

```http
GET /api/overview/operation_logs
```

返回最近的操作日志记录。

#### 权限

管理员

#### Query 参数

```js
{
  limit: number; // 返回记录数量(1 - 200，默认 20)
}
```

#### 返回

```json
{
  "status": 200,
  "data": [
    {
      "operation_id": "550e8400-e29b-41d4-a716-446655440000",
      "operation_time": "2026-09-12",
      "operation_level": "info",
      "type": "user_login",
      "operator_ip": "127.0.0.1",
      "operator_name": "admin",
      "login_result": true
    }
  ],
  "time": 1718594177859
}
```

`data` 是日志中最后 `limit` 条记录的数组（按时间升序）。

### 搜索日志

```http
GET /api/overview/operation_logs/search
```

搜索操作日志，支持分页和过滤。

#### 权限

管理员

#### Query 参数

此处的参数为 **URL Query 参数**，为便于展示以 JSON 格式呈现。

```js
{
  page: number;       // 页码，最小 1（默认 1）
  page_size: number;  // 每页数量，最小 1，最大 100（默认 20）
  type: string;       // 可选：按日志类型过滤，如 "user_login"、"daemon_create"
  level: string;      // 可选：按级别过滤："info" | "warning" | "error"
  operator_name: string; // 可选：操作人名称模糊匹配
  start_time: number;    // 可选：起始时间戳(ms)
  end_time: number;      // 可选：结束时间戳(ms)
  keyword: string;       // 可选：全文关键词搜索
}
```

#### 返回

```json
{
  "status": 200,
  "data": {
    "page": 1,
    "pageSize": 20,
    "maxPage": 5,
    "total": 100,
    "data": [
      {
        "operation_id": "550e8400-e29b-41d4-a716-446655440000",
        "operation_time": "2026-09-12",
        "operation_level": "info",
        "type": "user_login",
        "operator_ip": "127.0.0.1",
        "operator_name": "admin",
        "login_result": true
      }
    ]
  },
  "time": 1718594177859
}
```

## 设置与布局

以下路由共享 `/api/overview` 前缀，但属于面板配置和前端布局子系统(`settings_router.ts`)。

### 获取面板设置

```http
GET /api/overview/setting
```

返回完整的面板配置。出于安全考虑，`ssoClientSecret` 字段始终被屏蔽为空字符串。

#### 权限

管理员

#### 返回

```json
{
  "status": 200,
  "data": {
    "httpPort": 23333,
    "httpIp": "",
    "prefix": "",
    "reverseProxyMode": false,
    "reverseProxyHeader": "",
    "crossDomain": false,
    "gzip": false,
    "maxCompress": 1,
    "maxDownload": 10,
    "zipType": 1,
    "totpDriftToleranceSteps": 0,
    "loginCheckIp": true,
    "forwardType": 1,
    "dataPort": 23334,
    "loginInfo": "",
    "canFileManager": true,
    "allowUsePreset": false,
    "language": "en_us",
    "presetPackAddr": "https://script.mcsmanager.com/market.json",
    "allowChangeCmd": false,
    "enableApiKey": false,
    "operationLogEnabled": true,
    "operationLogMaxLinesPerFile": 200,
    "operationLogKeepDays": 30,
    "operationLogMaxTotalLines": 20000,
    "operationLogRecordLogin": true,
    "operationLogRecordInstance": true,
    "operationLogRecordFile": true,
    "operationLogRecordUser": true,
    "operationLogRecordSystem": true,
    "businessMode": false,
    "businessId": "",
    "panelId": "",
    "registerCode": "",
    "ssoEnabled": false,
    "ssoType": "oidc",
    "ssoOnlyMode": false,
    "ssoAutoRedirect": false,
    "ssoProviderName": "",
    "ssoIconUrl": "",
    "ssoIssuer": "",
    "ssoAuthorizeUrl": "",
    "ssoTokenUrl": "",
    "ssoUserinfoUrl": "",
    "ssoUserIdField": "id",
    "ssoScopes": "",
    "ssoClientId": "",
    "ssoClientSecret": "",
    "ssoTokenAuthMethod": "auto",
    "ssoCallbackUrl": ""
  },
  "time": 1718594177859
}
```

### 更新面板设置

```http
PUT /api/overview/setting
```

更新面板配置项。仅请求体中包含的字段会被更新，其他字段保持不变。配置变更以 `warning` 级别记录到操作日志。

#### 权限

管理员

#### 请求示例

[获取面板设置](#获取面板设置) 中所示字段的任意子集，常用字段如下：

```json
{
  "httpPort": 23333,
  "httpIp": "",
  "prefix": "",
  "language": "en_us",
  "loginInfo": "Welcome to MCSManager",
  "canFileManager": true,
  "allowUsePreset": false,
  "businessMode": false,
  "enableApiKey": false,
  "ssoEnabled": false,
  "ssoType": "oidc",
  "ssoIssuer": "",
  "ssoClientId": "",
  "ssoClientSecret": "",
  "operationLogEnabled": true
}
```

:::warning
启用 SSO(OIDC) 时，`ssoIssuer`、`ssoClientId` 和 `ssoClientSecret` 均为必填。`ssoIssuer` URL 必须使用 `https://` 协议。修改身份关键 SSO 字段(`ssoType`、`ssoIssuer`、`ssoUserinfoUrl`、`ssoUserIdField`)会自动解绑所有已存在的 SSO 用户。
:::

:::warning
OAuth 2.0 模式(`ssoType: "oauth2"`)下，启用时需要提供 `ssoAuthorizeUrl`、`ssoTokenUrl`、`ssoUserinfoUrl`、`ssoClientId` 和 `ssoClientSecret`。
:::

#### 返回

```json
{
  "status": 200,
  "data": "OK",
  "time": 1718594177859
}
```

### 安装(初始配置)

```http
PUT /api/overview/install
```

设置初始面板语言配置。仅在尚无用户时可用(首次安装时)。

#### 权限

公开(仅在未创建任何用户时有效)

#### 请求示例

```json
{
  "language": "en_us"
}
```

#### 返回

```json
{
  "status": 200,
  "data": "OK",
  "time": 1718594177859
}
```

### 获取前端布局

```http
GET /api/overview/layout
```

返回前端布局配置(页面、卡片、主题)。

#### 权限

公开

#### 返回

```json
{
  "status": 200,
  "data": [
    {
      "page": "home",
      "items": [
        {
          "id": "overview",
          "type": "OverviewChartCard",
          "title": "Overview",
          "width": 12,
          "height": "auto",
          "meta": {}
        }
      ],
      "theme": {
        "pageTitle": "MCSManager",
        "logoImage": "",
        "backgroundImage": "",
        "sidebarPosition": "left"
      }
    }
  ],
  "time": 1718594177859
}
```

### 设置前端布局

```http
POST /api/overview/layout
```

设置前端布局配置。

#### 权限

管理员

#### 请求示例

完整的布局配置数组(与[获取前端布局](#获取前端布局)返回的 `data` 结构相同)。

```json
[
  {
    "page": "home",
    "items": [],
    "theme": {
      "pageTitle": "MCSManager"
    }
  }
]
```

#### 返回

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### 重置前端布局

```http
DELETE /api/overview/layout
```

将前端布局重置为默认值。

#### 权限

管理员

#### 返回

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### 上传资源文件

```http
POST /api/overview/upload_assets
```

上传文件到面板的 assets 目录。文件会被重命名为基于 UUID 的名称并保留原始扩展名。仅接受 `multipart/form-data` 上传。

#### 权限

管理员

#### 请求示例

`multipart/form-data`，包含 `file` 字段上传文件。

#### 返回

```json
{
  "status": 200,
  "data": "a1b2c3d4-e5f6-7890-abcd-ef1234567890.png",
  "time": 1718594177859
}
```

`data` 字段为新文件名(UUID + 原始扩展名)。

### 刷新商业模式

```http
POST /api/overview/refresh_business_mode
```

刷新面板的商业模式状态。限速为每 5 秒 1 次请求。

#### 权限

管理员

#### 返回

```json
{
  "status": 200,
  "data": "OK",
  "time": 1718594177859
}
```
