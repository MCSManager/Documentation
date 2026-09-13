# Dashboard API

## Get Overview Data

```http
GET /api/overview
```

Returns the panel overview: version, system info, charts, and the list of all connected daemons with their system info.

#### Permission

Admin (token not required — session-based access)

#### Response

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
`remote[]` follows the `IPanelOverviewRemoteResponse` type. The `remoteMappings`, `config`, and `dockerPlatforms` fields are populated by the daemon and may vary by daemon version.
:::

## Operation Logs

### Get Recent Logs

```http
GET /api/overview/operation_logs
```

Returns the most recent operation log entries.

#### Permission

Admin

#### Query Param

```js
{
  limit: number; // Number of entries to return (1 - 200, default 20)
}
```

#### Response

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

`data` is an array of the latest `limit` log entries, oldest-first (the last `limit` entries from the log).

### Search Logs

```http
GET /api/overview/operation_logs/search
```

Searches operation logs with pagination and filters.

#### Permission

Admin

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  page: number;       // Page number, minimum 1 (default 1)
  page_size: number;  // Page size, min 1, max 100 (default 20)
  type: string;       // Optional: filter by log type, e.g. "user_login", "daemon_create"
  level: string;      // Optional: filter by level: "info" | "warning" | "error"
  operator_name: string; // Optional: partial match on operator name
  start_time: number;    // Optional: start timestamp (ms)
  end_time: number;      // Optional: end timestamp (ms)
  keyword: string;       // Optional: full-text keyword search
}
```

#### Response

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

## Settings & Layout

The following routes share the `/api/overview` prefix but belong to the panel configuration and frontend layout subsystem (`settings_router.ts`).

### Get Panel Settings

```http
GET /api/overview/setting
```

Returns the full panel configuration. The `ssoClientSecret` field is always masked as an empty string for security.

#### Permission

Admin

#### Response

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

### Update Panel Settings

```http
PUT /api/overview/setting
```

Updates panel configuration items. Only fields present in the request body are applied; all other fields remain unchanged. Configuration changes are recorded in the operation log at `warning` level.

#### Permission

Admin

#### Request Body

A partial `SystemConfig` object — any subset of the fields shown in [Get Panel Settings](#get-panel-settings). Common fields include:

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
When enabling SSO (OIDC), `ssoIssuer`, `ssoClientId`, and `ssoClientSecret` are all required. The `ssoIssuer` URL must use the `https://` protocol. Changing identity-critical SSO fields (`ssoType`, `ssoIssuer`, `ssoUserinfoUrl`, `ssoUserIdField`) will automatically unbind all existing SSO users.
:::

:::warning
For OAuth 2.0 mode (`ssoType: "oauth2"`), `ssoAuthorizeUrl`, `ssoTokenUrl`, `ssoUserinfoUrl`, `ssoClientId`, and `ssoClientSecret` are all required to enable.
:::

#### Response

```json
{
  "status": 200,
  "data": "OK",
  "time": 1718594177859
}
```

### Install (Initial Config)

```http
PUT /api/overview/install
```

Sets the initial panel language configuration. Only available when no users exist yet (during first-time installation).

#### Permission

Public (only works before any user is created)

#### Request Body

```json
{
  "language": "en_us"
}
```

#### Response

```json
{
  "status": 200,
  "data": "OK",
  "time": 1718594177859
}
```

### Get Frontend Layout

```http
GET /api/overview/layout
```

Returns the frontend layout configuration (pages, cards, theme).

#### Permission

Public

#### Response

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

### Set Frontend Layout

```http
POST /api/overview/layout
```

Sets the frontend layout configuration.

#### Permission

Admin

#### Request Body

The full layout configuration array (same shape as [Get Frontend Layout](#get-frontend-layout) response `data`).

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

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### Reset Frontend Layout

```http
DELETE /api/overview/layout
```

Resets the frontend layout to defaults.

#### Permission

Admin

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### Upload Assets

```http
POST /api/overview/upload_assets
```

Uploads a file to the panel's assets directory. Files are renamed to a UUID-based name with the original extension. Only accepts `multipart/form-data` uploads.

#### Permission

Admin

#### Request Body

`multipart/form-data` with a `file` field containing the uploaded file.

#### Response

```json
{
  "status": 200,
  "data": "a1b2c3d4-e5f6-7890-abcd-ef1234567890.png",
  "time": 1718594177859
}
```

The `data` field is the new filename (UUID + original extension).

### Refresh Business Mode

```http
POST /api/overview/refresh_business_mode
```

Refreshes the panel's business mode status. Rate-limited to 1 request per 5 seconds.

#### Permission

Admin

#### Response

```json
{
  "status": 200,
  "data": "OK",
  "time": 1718594177859
}
```
