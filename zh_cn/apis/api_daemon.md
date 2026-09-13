# 节点 API

## 节点列表(含实例)

```http
GET /api/service/remote_services
```

返回所有节点列表，每个节点附带其实例概览。此路由会向每个节点发起远程请求，因此可能比 `remote_services_list` 更慢。

#### 权限

管理员

#### 返回

```json
{
  "status": 200,
  "data": [
    {
      "uuid": "957c6bddf379445c82bac5edf7684bbc",
      "ip": "s1.example.com",
      "port": 24444,
      "prefix": "",
      "available": true,
      "remarks": "CN-ZJ-DEV-01",
      "instances": []
    }
  ],
  "time": 1718594177859
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | 节点 UUID |
| `ip` | string | 节点 IP / 域名 |
| `port` | number | 节点端口 |
| `prefix` | string | API 路径前缀 |
| `available` | boolean | 节点是否已连接 |
| `remarks` | string | 节点备注 / 显示名称 |
| `instances` | array | 节点通过 `instance/overview` 命令返回的实例概览 |

## 节点列表(仅服务信息)

```http
GET /api/service/remote_services_list
```

返回所有节点的轻量列表，仅包含服务连接信息，不包含任何实例数据。

#### 权限

管理员

#### 返回

```json
{
  "status": 200,
  "data": [
    {
      "uuid": "957c6bddf379445c82bac5edf7684bbc",
      "ip": "s1.example.com",
      "port": 24444,
      "prefix": "",
      "available": true,
      "remarks": "CN-ZJ-DEV-01"
    }
  ],
  "time": 1718594177859
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `uuid` | string | 节点 UUID |
| `ip` | string | 节点 IP / 域名 |
| `port` | number | 节点端口 |
| `prefix` | string | API 路径前缀 |
| `available` | boolean | 节点是否已连接 |
| `remarks` | string | 节点备注 / 显示名称 |

## 节点系统信息

```http
GET /api/service/remote_services_system
```

返回每个已连接节点的系统级信息。此路由会向每个节点发起 `info/overview` 远程请求；无法响应的节点会被静默跳过。

#### 权限

管理员

#### 返回

```json
{
  "status": 200,
  "data": [
    {
      "version": "3.9.0",
      "process": {
        "cpu": 5625000,
        "memory": 132437320,
        "cwd": "/opt/mcsmanager/daemon"
      },
      "instance": {
        "running": 1,
        "total": 6
      },
      "system": {
        "type": "Linux",
        "hostname": "MyComputer",
        "platform": "linux",
        "release": "5.15.0-101-generic",
        "uptime": 410445,
        "cwd": "/opt/mcsmanager/daemon",
        "loadavg": [0, 0, 0],
        "freemem": 5700775936,
        "cpuUsage": 0.0490009222256379,
        "memUsage": 0.6651475749266619,
        "totalmem": 17024741376,
        "processCpu": 0,
        "processMem": 0
      },
      "cpuMemChart": [
        {
          "cpu": 0,
          "mem": 13
        }
      ]
    }
  ],
  "time": 1718594177859
}
```

:::tip
`data` 数组中的每个元素是节点 `info/overview` 命令的原始返回。具体字段可能因节点版本不同而有所差异。
:::

## 全局实例搜索

```http
GET /api/service/remote_services_instances_global
```

跨所有已连接节点并发搜索实例。返回以节点 UUID 为键的映射。

#### 权限

管理员

#### Query 参数

此处的参数为 **URL Query 参数**，为便于展示以 JSON 格式呈现。

```js
{
  page: number;        // 页码，最小 1（默认 1）
  page_size: number;   // 每页数量，最小 1，最大 50（默认 10）
  instance_name: string; // 可选：按实例名称过滤
  status: string;      // 可选：按实例状态过滤
}
```

#### 返回

```json
{
  "status": 200,
  "data": {
    "957c6bddf379445c82bac5edf7684bbc": {
      "instances": [],
      "maxPage": 1,
      "page": 1
    }
  },
  "time": 1718594177859
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `data` | object | 以节点 UUID 为键的映射 |
| `data[uuid].instances` | array | 该节点的实例列表（请求失败则为空数组） |
| `data[uuid].maxPage` | number | 该节点返回的总页数 |
| `data[uuid].page` | number | 该节点返回的当前页码 |

## 实例列表(单个节点)

> 请参考 [实例 API - 实例列表](./api_instance.md#实例列表) 了解 `GET /api/service/remote_service_instances`。

## 添加节点

```http
POST /api/service/remote_service
```

#### 权限

管理员

#### 请求示例

```json
{
  "ip": "10.0.0.16",
  "port": 24446,
  "prefix": "",
  "remarks": "MiPad",
  "apiKey": "db9516063699446bb95fba51f08603"
}
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | string | 是 | 节点 API 密钥 |
| `port` | number | 是 | 节点端口 |
| `ip` | string | 是 | 节点 IP / 域名 |
| `remarks` | string | 是 | 节点备注 / 显示名称 |
| `prefix` | string | 否 | API 路径前缀（默认为 `""`） |

#### 返回示例

```json
{
  "status": 200,
  "data": "499e1012a21443278a7ec63a3a95860b",
  "time": 1718594177859
}
```

`data` 字段为新添加节点的 UUID。

## 删除节点

```http
DELETE /api/service/remote_service
```

#### 权限

管理员

#### Query 参数

此处的参数为 **URL Query 参数**，为便于展示以 JSON 格式呈现。

```js
{
  uuid: string; // 节点 ID
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

## 连接节点

```http
GET /api/service/link_remote_service
```

触发与指定节点的异步连接尝试。成功返回 `true`，失败返回错误对象。

#### 权限

管理员

#### Query 参数

```js
{
  uuid: string; // 节点 ID
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

## 更新节点连接参数

```http
PUT /api/service/remote_service
```

更新现有节点的连接配置。如果节点当前可用且提供了 `setting` 对象，设置也会通过 `info/setting` 远程命令推送到节点。

#### 权限

管理员

#### Query 参数

```js
{
  uuid: string; // 节点 ID
}
```

#### 请求示例

```json
{
  "ip": "162.2.xx.xx",
  "port": 24444,
  "prefix": "",
  "remarks": "My Node",
  "apiKey": "",
  "remoteMappings": [],
  "daemonPort": 24444,
  "setting": {
    "language": "en_us",
    "portRangeStart": 30000,
    "portRangeEnd": 35000
  }
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `ip` | string | 新的节点 IP / 域名 |
| `port` | number | 新的节点端口 |
| `prefix` | string | 新的 API 路径前缀 |
| `remarks` | string | 新的节点备注 |
| `apiKey` | string | 新的节点 API 密钥 |
| `remoteMappings` | array | 节点远程映射规则 |
| `daemonPort` | number | 节点侧端口（当提供 `setting` 时传递给 `info/setting`） |
| `setting` | object | 可选的节点侧设置，通过 `info/setting` 推送 |

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::warning
修改节点身份关键配置(port、ip、prefix、apiKey、remoteMappings)会以 `warning` 级别记录到操作日志。
:::
