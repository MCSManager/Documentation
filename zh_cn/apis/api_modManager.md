# Mod 管理器 API

本页所有路由均挂载在 `/api/mod` 前缀下，涵盖 Minecraft Mod 的浏览、搜索、安装、启用 / 禁用、删除以及配置文件获取。

:::tip 权限
所有路由均要求至少用户（`1`）权限。针对具体实例操作的路由（`daemonId` + `uuid`）还会额外校验调用者是否拥有该实例的访问权限。
:::

:::warning 全局开关
针对实例操作的路由，若全局系统配置 `canFileManager` 为 `false` 且调用者权限低于管理员（`10`），服务端会返回 `403` 及错误信息。
:::

## 获取 Minecraft 版本

返回受支持的 Minecraft 游戏版本列表，数据来自 Modrinth（失败时回退到 Mojang 官方 manifest），并在服务端缓存 24 小时。

```http
GET /api/mod/mc_versions
```

#### 返回示例

```json
{
  "status": 200,
  "data": ["1.21", "1.20.6", "1.20.4", "1.20.1", "1.19.4", "1.19.2"],
  "time": 1718594177859
}
```

## 获取 Mod 列表

列出远程 daemon 上某实例目录下的 mod 文件。

```http
GET /api/mod/list
```

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  uuid: string,        // 实例 UUID
  page?: number,       // 页码，默认 1，最小 1
  pageSize?: number,   // 每页数量，默认 50，最小 1，最大 50
  folder?: string       // 要列出的子目录（可选）
}
```

#### 返回示例

响应由远程 daemon 的 `instance/mods/list` 通道透传，具体结构取决于 daemon 版本，通常为分页的 mod 文件列表。

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

## 按 Hash 获取 Mod 信息

通过文件的 SHA-1 hash 从 Modrinth 获取 mod 元数据（版本 + 项目信息）。

```http
GET /api/mod/info
```

#### Query 参数

```js
{
  hash: string   // mod 文件的 SHA-1 hash
}
```

#### 返回示例

未匹配时返回 `null`，否则返回包含 Modrinth `version` 与 `project` 数据的对象。

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

## 搜索 Mod

在一个或多个来源（Modrinth、CurseForge、SpigotMC）中搜索 mod 项目。

```http
GET /api/mod/search
```

#### Query 参数

```js
{
  query?: string,      // 搜索关键词（默认 ""）
  offset?: number,     // 结果偏移量，默认 0（0 - 100000）
  limit?: number,      // 每页数量，默认 20（1 - 50）
  source?: string,      // "all" | "modrinth" | "curseforge" | "spigotmc"，默认 "all"
  version?: string,     // Minecraft 版本过滤，如 "1.20.1"
  type?: string,        // "all" | "mod" | ... 项目类型过滤，默认 "all"
  loader?: string,      // 加载器过滤，如 "fabric"、"forge"，默认 "all"
  environment?: string   // "all" | "client" | "server"，默认 "all"
}
```

#### 返回示例

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

## 获取项目版本列表

从指定来源（默认 Modrinth）列出某 mod 项目的可用版本。

```http
GET /api/mod/versions
```

#### Query 参数

```js
{
  projectId: string,  // 来源平台上的项目 ID
  source?: string      // 来源平台，默认 "Modrinth"
}
```

#### 返回示例

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

## 下载 / 安装 Mod

通过给定 URL 在远程 daemon 上下载 mod 文件并安装到指定实例。

```http
POST /api/mod/download
```

#### 请求正文

```json
{
  "daemonId": "string",       // 远程 daemon ID
  "uuid": "string",           // 实例 UUID
  "url": "string",            // 下载 URL（会进行 SSRF 安全校验）
  "fileName": "string",       // 保存的目标文件名
  "projectType": "string",    // 项目类型标识
  "fallbackUrl?": "string",   // 可选的回退下载 URL
  "extraInfo?": "object"       // 可选的附加元数据，会透传给 daemon
}
```

:::warning
`url`（以及若提供的 `fallbackUrl`）会经 `checkSafeUrl` 校验；不安全或不在白名单内的 URL 会返回 `400 Bad Request`。
:::

#### 返回示例

响应由远程 daemon 的 `instance/mods/install` 通道透传。

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 停止传输

停止某实例正在进行的 mod 下载或上传传输。

```http
POST /api/mod/stop_transfer
```

#### 请求正文

```js
{
  daemonId: string,    // 远程 daemon ID
  uuid: string,        // 实例 UUID
  fileName: string,    // 目标文件名
  type: string,        // "download" = 停止下载；其他值 = 停止上传（会删除目标文件）
  uploadId?: string     // 可选的上传任务 ID
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

## 获取配置文件

获取某实例中与某 mod 关联的配置文件。

```http
GET /api/mod/config_files
```

#### Query 参数

```js
{
  daemonId: string,    // 远程 daemon ID
  uuid: string,        // 实例 UUID
  modId: string,       // Mod 标识
  type: string,        // Mod 类型
  fileName: string     // Mod 文件名
}
```

#### 返回示例

响应由远程 daemon 的 `instance/mods/config_files` 通道透传。

```json
{
  "status": 200,
  "data": [
    { "name": "config.yml", "path": "config/example-mod/", "content": "" }
  ],
  "time": 1718594177859
}
```

## 启用 / 禁用 Mod

启用或禁用某 mod 文件（例如将 `.jar` 重命名为 `.jar.disabled` 或反向）。

```http
POST /api/mod/toggle
```

#### 请求正文

```json
{
  "daemonId": "string",   // 远程 daemon ID
  "uuid": "string",       // 实例 UUID
  "fileName": "string"    // 要切换的 mod 文件名
}
```

#### 返回示例

响应由远程 daemon 的 `instance/mods/toggle` 通道透传。

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 删除 Mod

从某实例中删除 mod 文件。

```http
POST /api/mod/delete
```

#### 请求正文

```json
{
  "daemonId": "string",   // 远程 daemon ID
  "uuid": "string",       // 实例 UUID
  "fileName": "string"    // 要删除的 mod 文件名
}
```

#### 返回示例

响应由远程 daemon 的 `instance/mods/delete` 通道透传。

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 批量获取 Mod 信息

单次请求获取多个 SHA-1 hash 对应的 mod 元数据。每次最多 50 个 hash。

```http
POST /api/mod/batch_info
```

#### 请求正文

```json
{
  "hashes": ["sha1hash1", "sha1hash2"]
}
```

#### 返回示例

返回一个对象，键为 hash，值为对应的 `{ version, project }` 信息
（结构同[按 Hash 获取 Mod 信息](#按-hash-获取-mod-信息)）。未匹配的 hash 不会出现在返回中。

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
