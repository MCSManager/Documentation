# Mod Manager API

All routes in this page are mounted under the `/api/mod` prefix. They cover Minecraft mod
browsing, searching, installing, toggling, deleting and configuration-file fetching.

:::tip Permission
All routes require at least User (`1`) permission. Routes that operate on a specific instance
(`daemonId` + `uuid`) additionally verify that the caller has access to that instance.
:::

:::warning Global Switch
For routes that operate on instances, if the global system setting `canFileManager` is `false`
and the caller's permission is below Admin (`10`), the server returns `403` and an error.
:::

## Get Minecraft Versions

Returns a list of supported Minecraft game versions, fetched from Modrinth (with a Mojang
manifest fallback) and cached on the server for 24 hours.

```http
GET /api/mod/mc_versions
```

#### Response

```json
{
  "status": 200,
  "data": ["1.21", "1.20.6", "1.20.4", "1.20.1", "1.19.4", "1.19.2"],
  "time": 1718594177859
}
```

## List Mods

Lists the mod files inside a specific instance directory on the remote daemon.

```http
GET /api/mod/list
```

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  uuid: string,        // Instance UUID
  page?: number,       // Page number, default 1, minimum 1
  pageSize?: number,   // Page size, default 50, minimum 1, maximum 50
  folder?: string       // Sub-folder to list (optional)
}
```

#### Response

The response is proxied from the remote daemon's `instance/mods/list` channel, so the exact
shape depends on the daemon version, but is typically a paginated list of mod file entries.

```json
{
  "status": 200,
  "data": {
    "page": 1,
    "pageSize": 50,
    "total": 12,
    "data": [
      {
        "name": "example-mod.jar",
        "size": 102400,
        "hash": "sha1...",
        "enabled": true
      }
    ]
  },
  "time": 1718594177859
}
```

## Get Mod Info by Hash

Fetches mod metadata (version + project info) from Modrinth by the file SHA-1 hash.

```http
GET /api/mod/info
```

#### Query Param

```js
{
  hash: string   // SHA-1 hash of the mod file
}
```

#### Response

Returns `null` when no match is found; otherwise an object containing the Modrinth `version`
and `project` payloads.

```json
{
  "status": 200,
  "data": {
    "version": { "name": "1.0.0", "project_id": "xxxx", "files": [] },
    "project": { "id": "xxxx", "title": "Example Mod", "icon_url": "" }
  },
  "time": 1718594177859
}
```

## Search Mods

Searches mod projects across one or more sources (Modrinth, CurseForge, SpigotMC).

```http
GET /api/mod/search
```

#### Query Param

```js
{
  query?: string,      // Search keyword (default "")
  offset?: number,     // Result offset, default 0 (0 - 100000)
  limit?: number,      // Page size, default 20 (1 - 50)
  source?: string,      // "all" | "modrinth" | "curseforge" | "spigotmc", default "all"
  version?: string,     // Minecraft version filter, e.g. "1.20.1"
  type?: string,        // "all" | "mod" | ... project type filter, default "all"
  loader?: string,      // Loader filter, e.g. "fabric", "forge", default "all"
  environment?: string   // "all" | "client" | "server", default "all"
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "hits": [
      {
        "project_id": "xxxx",
        "title": "Example Mod",
        "description": "...",
        "icon_url": "",
        "downloads": 12345,
        "versions": ["1.20.1"]
      }
    ],
    "total_hits": 234
  },
  "time": 1718594177859
}
```

## Get Project Versions

Lists the available versions of a mod project from a given source (defaults to Modrinth).

```http
GET /api/mod/versions
```

#### Query Param

```js
{
  projectId: string,  // Project ID on the source platform
  source?: string      // Source platform, default "Modrinth"
}
```

#### Response

```json
{
  "status": 200,
  "data": [
    {
      "name": "1.0.0",
      "version_number": "1.0.0",
      "game_versions": ["1.20.1"],
      "loaders": ["fabric"],
      "files": [{ "url": "https://...", "filename": "example.jar" }]
    }
  ],
  "time": 1718594177859
}
```

## Download / Install Mod

Installs a mod file into an instance by downloading from the given URL on the remote daemon.

```http
POST /api/mod/download
```

#### Request Body

```json
{
  "daemonId": "string",       // Remote daemon ID
  "uuid": "string",           // Instance UUID
  "url": "string",            // Download URL (validated against SSRF allowlist)
  "fileName": "string",       // Target file name to save as
  "projectType": "string",    // Project type identifier
  "fallbackUrl?": "string",   // Optional fallback download URL
  "extraInfo?": "object"       // Optional extra metadata forwarded to the daemon
}
```

:::warning
The `url` (and `fallbackUrl` if provided) is validated by `checkSafeUrl`; unsafe or non-allowlisted
URLs result in `400 Bad Request`.
:::

#### Response

The response is proxied from the remote daemon's `instance/mods/install` channel.

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Stop Transfer

Stops an in-progress mod download or upload transfer for an instance.

```http
POST /api/mod/stop_transfer
```

#### Request Body

```js
{
  daemonId: string,    // Remote daemon ID
  uuid: string,        // Instance UUID
  fileName: string,    // Target file name
  type: string,        // "download" = stop a download; any other value = stop an upload (deletes the target file)
  uploadId?: string     // Optional upload task ID
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

## Get Config Files

Fetches configuration files associated with a mod for a given instance.

```http
GET /api/mod/config_files
```

#### Query Param

```js
{
  daemonId: string,    // Remote daemon ID
  uuid: string,        // Instance UUID
  modId: string,       // Mod identifier
  type: string,        // Mod type
  fileName: string     // Mod file name
}
```

#### Response

The response is proxied from the remote daemon's `instance/mods/config_files` channel.

```json
{
  "status": 200,
  "data": [
    { "name": "config.yml", "path": "config/example-mod/", "content": "" }
  ],
  "time": 1718594177859
}
```

## Toggle Mod

Enables or disables a mod file (e.g. rename `.jar` to `.jar.disabled` and back).

```http
POST /api/mod/toggle
```

#### Request Body

```json
{
  "daemonId": "string",   // Remote daemon ID
  "uuid": "string",       // Instance UUID
  "fileName": "string"    // Mod file name to toggle
}
```

#### Response

The response is proxied from the remote daemon's `instance/mods/toggle` channel.

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Delete Mod

Deletes a mod file from an instance.

```http
POST /api/mod/delete
```

#### Request Body

```json
{
  "daemonId": "string",   // Remote daemon ID
  "uuid": "string",       // Instance UUID
  "fileName": "string"    // Mod file name to delete
}
```

#### Response

The response is proxied from the remote daemon's `instance/mods/delete` channel.

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Batch Get Mod Info

Fetches mod metadata for multiple SHA-1 hashes in a single request. Maximum 50 hashes per call.

```http
POST /api/mod/batch_info
```

#### Request Body

```json
{
  "hashes": ["sha1hash1", "sha1hash2"]
}
```

#### Response

Returns an object mapping each hash to its `{ version, project }` info
(same structure as [Get Mod Info by Hash](#get-mod-info-by-hash)). Missing hashes are absent
from the map.

```json
{
  "status": 200,
  "data": {
    "sha1hash1": {
      "version": { "name": "1.0.0", "project_id": "xxxx" },
      "project": { "id": "xxxx", "title": "Example Mod" }
    }
  },
  "time": 1718594177859
}
```
