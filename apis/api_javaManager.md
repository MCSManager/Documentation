# Java Manager API

All routes in this page are mounted under the `/api/java_manager` prefix. They manage the Java
runtimes installed on a remote daemon and bind a runtime to a specific instance.

:::tip Access Check
Every route under this prefix passes through a router-level middleware that reads `daemonId` and
`instanceId` from the **query string** and verifies that the caller owns/has access to that
instance. Both `daemonId` and `instanceId` must therefore be present in the query for every call,
even for the `add` / `delete` routes whose body validator does not list `instanceId`.
:::

## Get Java Runtime List

Lists the Java runtimes available on a remote daemon.

```http
GET /api/java_manager/list
```

:::tip Permission
User (`1`) or above.
:::

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  instanceId: string   // Instance UUID (used by the access middleware)
}
```

#### Response

Returns an array of `IJavaRuntime` (see [Types](#types)). The response is proxied from the remote
daemon's `java_manager/list` channel.

```json
{
  "status": 200,
  "data": [
    {
      "info": {
        "fullname": "Java 17.0.10",
        "path": "/opt/java/jdk-17/bin/java",
        "installTime": 1718594177859,
        "downloading": false
      },
      "path": "/opt/java/jdk-17/bin/java",
      "usingInstances": ["50c73059001b436fa85c0d8221c157cf"]
    }
  ],
  "time": 1718594177859
}
```

## Add Java Runtime

Registers an existing Java runtime located at a custom path on the remote daemon.

```http
POST /api/java_manager/add
```

:::tip Permission
Admin (`10`) only.
:::

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  instanceId: string   // Instance UUID (used by the access middleware)
}
```

#### Request Body

```json
{
  "name": "Java 17",          // Display name of the runtime
  "path": "/opt/java/jdk-17/bin/java"  // Absolute path to the java executable
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

## Download Java Runtime

Downloads and installs a Java runtime of the specified version onto the remote daemon.

```http
POST /api/java_manager/download
```

:::tip Permission
Admin (`10`) only.
:::

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  instanceId: string   // Instance UUID (used by the access middleware)
}
```

#### Request Body

```json
{
  "name": "Java 17",     // Display name of the runtime
  "version": "17"        // Major Java version to download
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

## Set Instance Java Runtime

Binds a Java runtime (by its runtime `id`) to a specific instance.

```http
POST /api/java_manager/using
```

:::tip Permission
User (`1`) or above.
:::

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  instanceId: string   // Instance UUID to bind the runtime to
}
```

#### Request Body

```json
{
  "id": "string"   // ID of the Java runtime on the daemon
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

## Delete Java Runtime

Deletes a Java runtime from the remote daemon.

```http
DELETE /api/java_manager/delete
```

:::tip Permission
Admin (`10`) only.
:::

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  instanceId: string   // Instance UUID (used by the access middleware)
}
```

#### Request Body

```json
{
  "id": "string"   // ID of the Java runtime to delete
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

## Types

### `IJavaInfo`

Describes a single installed Java runtime.

```json
{
  "fullname": "string",     // Full version string, e.g. "Java 17.0.10"
  "path": "string",          // Optional. Absolute path to the java executable
  "installTime": 1718594177859, // Unix timestamp (ms) when installed
  "downloading": false       // Whether the runtime is currently being downloaded
}
```

### `IJavaRuntime`

Wraps an `IJavaInfo` together with its used path and the instances currently bound to it.

```json
{
  "info": "IJavaInfo",        // The runtime descriptor (see above)
  "path": "string",          // Resolved executable path used to launch Java
  "usingInstances": ["string"] // List of instance UUIDs currently using this runtime
}
```

### `IInstanceJavaConfig`

The Java configuration embedded in an instance's config, referencing a runtime by id.

```json
{
  "id": "string"   // ID of the Java runtime bound to the instance
}
```
