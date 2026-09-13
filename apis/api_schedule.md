# Schedule API

All routes in this page are mounted under the `/api/protected_schedule` prefix. They manage the
scheduled tasks attached to a specific instance on a remote daemon.

:::tip Access Check
A router-level middleware reads `uuid` (instance UUID) and `daemonId` from the **query string**
and verifies that the caller owns/has access to that instance. If access is denied the server
returns `403`. Both `uuid` and `daemonId` must therefore be present in every call.
:::

## Get Schedule List

Lists the scheduled tasks of an instance.

```http
GET /api/protected_schedule
```

:::tip Permission
User (`1`) or above.
:::

#### Query Param

```js
{
  daemonId: string,   // Remote daemon ID
  uuid: string         // Instance UUID
}
```

#### Response

The response is proxied from the remote daemon's `schedule/list` channel, so the exact shape
depends on the daemon version, but is typically an array of task descriptors.

```json
{
  "status": 200,
  "data": [
    {
      "name": "auto-restart",
      "count": -1,
      "time": "0 0 * * *",
      "actions": ["restart"],
      "type": 1
    }
  ],
  "time": 1718594177859
}
```

## Create Schedule Task

Creates a new scheduled task for an instance.

```http
POST /api/protected_schedule
```

:::tip Permission
User (`1`) or above.
:::

#### Query Param

```js
{
  daemonId: string,   // Remote daemon ID
  uuid: string         // Instance UUID
}
```

#### Request Body

```json
{
  "name": "auto-restart",   // Task name. Must NOT contain any filename-blacklisted characters.
  "count": -1,              // Execution count. -1 = repeat forever, 0 = disabled, N>0 = run N times
  "time": "0 0 * * *",      // Schedule expression / time string (meaning depends on task type)
  "actions": ["restart"],   // Action list to execute when the task triggers
  "type": 1                 // Task type (e.g. 1=cron-like, 2=interval, etc., defined by the daemon)
}
```

:::warning
The task `name` is validated against the `FILENAME_BLACKLIST` — names containing forbidden
characters (such as `/`, `\`, `:`, `*`, `?`, `"`, `<`, `>`, `|`) cause the request to error out.
:::

#### Response

The response is proxied from the remote daemon's `schedule/register` channel.

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Delete Schedule Task

Deletes a scheduled task by its name.

```http
DELETE /api/protected_schedule
```

:::tip Permission
User (`1`) or above.
:::

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  uuid: string,         // Instance UUID
  task_name: string     // Name of the scheduled task to delete
}
```

#### Response

The response is proxied from the remote daemon's `schedule/delete` channel.

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```
