# Daemon API

## Daemon List (with Instances)

```http
GET /api/service/remote_services
```

Returns the list of all daemons, each with an overview of its instances. This route makes a remote request to every daemon, so it may be slower than `remote_services_list`.

#### Permission

Admin

#### Response

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

| Field | Type | Description |
| --- | --- | --- |
| `uuid` | string | Daemon UUID |
| `ip` | string | Daemon IP / domain |
| `port` | number | Daemon port |
| `prefix` | string | API path prefix |
| `available` | boolean | Whether the daemon is connected |
| `remarks` | string | Daemon remarks / display name |
| `instances` | array | Instance overview returned by the daemon's `instance/overview` command |

## Daemon List (Service Info Only)

```http
GET /api/service/remote_services_list
```

Returns a lightweight list of all daemons containing only service connection information, without any instance data.

#### Permission

Admin

#### Response

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

| Field | Type | Description |
| --- | --- | --- |
| `uuid` | string | Daemon UUID |
| `ip` | string | Daemon IP / domain |
| `port` | number | Daemon port |
| `prefix` | string | API path prefix |
| `available` | boolean | Whether the daemon is connected |
| `remarks` | string | Daemon remarks / display name |

## Daemon System Info

```http
GET /api/service/remote_services_system
```

Returns system-level information for every connected daemon. This route issues an `info/overview` remote request to each daemon; daemons that fail to respond are silently skipped.

#### Permission

Admin

#### Response

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
Each element in the `data` array is the raw `info/overview` response from a daemon. The exact fields may vary by daemon version.
:::

## Global Instance Search

```http
GET /api/service/remote_services_instances_global
```

Searches instances across all connected daemons concurrently. Returns a map keyed by daemon UUID.

#### Permission

Admin

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  page: number;        // Page number, minimum 1 (default 1)
  page_size: number;   // Page size, minimum 1, maximum 50 (default 10)
  instance_name: string; // Optional: filter by instance name
  status: string;      // Optional: filter by instance status
}
```

#### Response

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

| Field | Type | Description |
| --- | --- | --- |
| `data` | object | Map keyed by daemon UUID |
| `data[uuid].instances` | array | Instance list for that daemon (empty if request failed) |
| `data[uuid].maxPage` | number | Total pages returned by that daemon |
| `data[uuid].page` | number | Current page returned by that daemon |

## Instance List (Per Daemon)

> See [Instance API - Instance List](./api_instance.md#instance-list) for `GET /api/service/remote_service_instances`.

## Add

```http
POST /api/service/remote_service
```

#### Permission

Admin

#### Request Body

```json
{
  "ip": "10.0.0.16",
  "port": 24446,
  "prefix": "",
  "remarks": "MiPad",
  "apiKey": "db9516063699446bb95fba51f08603"
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apiKey` | string | Yes | Daemon API key |
| `port` | number | Yes | Daemon port |
| `ip` | string | Yes | Daemon IP / domain |
| `remarks` | string | Yes | Daemon remarks / display name |
| `prefix` | string | No | API path prefix (defaults to `""`) |

#### Response

```json
{
  "status": 200,
  "data": "499e1012a21443278a7ec63a3a95860b",
  "time": 1718594177859
}
```

The `data` field is the UUID of the newly added daemon.

## Delete

```http
DELETE /api/service/remote_service
```

#### Permission

Admin

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  uuid: string; // Daemon ID
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

## Try Connect Daemon

```http
GET /api/service/link_remote_service
```

Triggers an asynchronous connection attempt to the specified daemon. Returns `true` on success, or the error object on failure.

#### Permission

Admin

#### Query Param

```js
{
  uuid: string; // Daemon ID
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

## Update Daemon Connect Config

```http
PUT /api/service/remote_service
```

Updates the connection configuration of an existing daemon. If the daemon is currently available and a `setting` object is provided, the settings are also pushed to the daemon via the `info/setting` remote command.

#### Permission

Admin

#### Query Param

```js
{
  uuid: string; // Daemon ID
}
```

#### Request Body

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

| Field | Type | Description |
| --- | --- | --- |
| `ip` | string | New daemon IP / domain |
| `port` | number | New daemon port |
| `prefix` | string | New API path prefix |
| `remarks` | string | New daemon remarks |
| `apiKey` | string | New daemon API key |
| `remoteMappings` | array | Daemon remote mapping rules |
| `daemonPort` | number | Daemon-side port (passed to `info/setting` when `setting` is provided) |
| `setting` | object | Optional daemon-side settings pushed via `info/setting` |

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::warning
Changing identity-critical daemon configuration (port, IP, prefix, apiKey, remoteMappings) is recorded in the operation log at `warning` level.
:::
