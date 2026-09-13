# 文件管理 API

## 获取文件列表

```http
GET /api/files/list
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
  target: string; // 文件（名称或目录）路径
  page: number; // 从 0 开始
  page_size: number; // 1 - 100，默认 10
  file_name: string; // 可选，按文件名过滤
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "items": [
      {
        "name": "Genshin Impact",
        "size": 0,    // byte
        "time": "Fri Jun 07 2024 08:53:34 GMT+0800 (中国标准时间)",
        "mode": 777, // Linux 文件权限
        "type": 0 // 0 = 文件夹, 1 = 文件
      },
      {
        "name": "NEKO-MIMI SWEET HOUSEMATES Vol. 1",
        "size": 0,
        "time": "Thu Jun 06 2024 18:25:14 GMT+0800 (中国标准时间)",
        "mode": 777,
        "type": 0
      },
      {
        "name": "Poly Bridge",
        "size": 0,
        "time": "Thu Jun 06 2024 18:25:14 GMT+0800 (中国标准时间)",
        "mode": 777,
        "type": 0
      },
      {
        "name": "Wuthering Waves",
        "size": 0,
        "time": "Fri Jun 07 2024 04:32:58 GMT+0800 (中国标准时间)",
        "mode": 666,
        "type": 0
      },
      {
        "name": "AngryBirdsSeasons",
        "size": 0,
        "time": "Thu Jun 06 2024 18:25:14 GMT+0800 (中国标准时间)",
        "mode": 777,
        "type": 0
      },
      {
        "name": "secret base_君がくれたもの【Covered by Kotoha】.mp4",
        "size": 13253857,
        "time": "Thu Jun 06 2024 19:37:35 GMT+0800 (中国标准时间)",
        "mode": 666,
        "type": 1
      }
    ],
    "page": 0,
    "pageSize": 100,
    "total": 6,
    "absolutePath": "\\"
  },
  "time": 1718594177859
}
```

## 获取文件状态

```http
GET /api/files/status
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "instanceFileTask": 0, // 该实例的文件任务数
    "globalFileTask": 0, // 整个 daemon 的文件任务数
    "downloadFileFromURLTask": 0, // 正在进行的 URL 下载任务数
    "downloadTasks": [
      {
        "taskId": "xxx",
        "path": "/path/to/file",
        "total": 1024,
        "current": 512,
        "status": 0,
        "error": null
      }
    ],
    "platform": "linux", // 操作系统平台
    "isGlobalInstance": false, // 是否为全局实例
    "disks": [] // Windows 磁盘列表
  },
  "time": 1718594177859
}
```

:::tip
`disks` 字段仅在 Windows 系统下有内容。
:::

## 获取文件内容

```http
PUT /api/files/
```

:::tip
此路由与"更新文件"共用同一个端点 `PUT /api/files/`。当请求体仅包含 `target`（不含 `text`）时读取文件内容；当提供 `text` 时写入文件。
:::

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "target": "/eula.txt"
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": "eula=false\n", // 文件内容
  "time": 1718594177859
}
```

## 更新文件

```http
PUT /api/files/
```

:::tip
此路由与"获取文件内容"共用同一个端点 `PUT /api/files/`。当请求体包含 `text` 时写入文件；当仅提供 `target` 时读取文件内容。
:::

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "target": "/eula.txt",
  "text": "eula=true\n" // 文件内容
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 下载文件

```http
ALL /api/files/download
```

#### Query 查询参数

```js
{
  file_name: string; // 路径 + 文件名, 示例: /backup/world.zip
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": {
    "password": "b2d8a6fa3bc8467ebd1563dc4f7179be1718010317889",
    "addr": "localhost:24444", // 节点地址
    "remoteMappings": {} // 远程地址映射
  },
  "time": 1718594177859
}
```

#### 下载文件

```http
GET http(s)://{{Daemon Addr}}/download/{{password}}/{{fileName}}

// 示例:
GET http://localhost:24444/download/db8271f526...49468abd74/world.zip
```

:::tip
`password` 为一次性凭据，下载请求完成后即失效。
:::

## 上传文件

### 1. 获取上传配置

```http
ALL /api/files/upload
```

#### Query 查询参数

```js
{
  upload_dir: string;
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": {
    "password": "b2d8a6fa3bc8467ebd1563dc4f7179be1718010317889",
    "addr": "localhost:24444", // 节点地址
    "remoteMappings": {} // 远程地址映射
  },
  "time": 1718594177859
}
```

### 2. 上传文件

```http
POST http(s)://{{Daemon Address}}/upload/{{password}}
```

#### Query 查询参数（可选）

```js
{
  unzip: boolean; // 可选，为 true 时上传后自动解压
  code: string; // 可选，解压编码（如 utf-8、gbk、big5）
  overwrite: string; // 可选，"false" 时保留已有文件并自动重命名
}
```

#### Request Headers 请求头

```http
Content-Type: multipart/form-data
```

#### Form Data 表单数据（请求体）

```http
file: (二进制数据)
```

#### Response 响应体

```
OK
```

:::tip
daemon 还支持通过 `POST /upload-new/:key` 和 `POST /upload-piece/:id` 端点进行断点续传，适用于大文件分块上传。
:::

## 从 URL 下载

```http
POST /api/files/download_from_url
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "url": "https://example.com/file.zip", // 下载链接
  "file_name": "/backup/file.zip" // 保存路径 + 文件名
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": "a1b2c3d4e5f6...", // 下载任务 ID
  "time": 1718594177859
}
```

:::tip
下载在 daemon 后台异步执行。使用"获取文件状态"端点可查看下载进度，并获取实际任务 ID（`downloadTasks[].taskId`）用于停止下载。
:::

## 停止 URL 下载

```http
POST /api/files/download_from_url_stop
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "taskId": "a1b2c3d4e5f6..." // 下载任务 ID（来自"获取文件状态"）
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": true, // true = 停止成功, false = 任务不存在
  "time": 1718594177859
}
```

## 复制文件

```http
POST /api/files/copy
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "targets": [
    [
      "/server.jar", // 源
      "/cache/server.jar" // 目标
    ]
    // ... 更多
  ]
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 移动或重命名

```http
PUT /api/files/move
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "targets": [
    [
      "/server.jar", // 原来
      "/cache/server.jar" // 现在
    ],

    // 支持重命名
    [
      "/ops.json", // 原来
      "/ops.txt" // 现在
    ]
    // ... 更多
  ]
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 修改权限

```http
PUT /api/files/chmod
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "target": "/server.jar", // 文件或目录路径
  "chmod": 755, // 权限数字
  "deep": false // 是否递归应用到子目录
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::warning
`chmod` 仅在 Linux 系统上支持。
:::

## 批量修改权限

```http
PUT /api/files/chmod_batch
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "targets": [
    "/server.jar",
    "/config.json"
  ], // 文件/目录路径数组
  "chmod": 755, // 权限数字
  "deep": false // 是否递归应用
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": {
    "success": 2, // 成功修改的数量
    "failed": 0, // 失败的数量
    "total": 2, // 总数
    "results": [
      {
        "target": "/server.jar",
        "success": true
      },
      {
        "target": "/config.json",
        "success": true
      }
    ]
  },
  "time": 1718594177859
}
```

:::warning
`chmod` 仅在 Linux 系统上支持。
:::

## 压缩文件

```http
POST /api/files/compress
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "type": 1,
  "code": "utf-8", // only utf-8
  "source": "/test.zip", // zip 文件路径
  "targets": [
    "/world", // 支持文件夹
    "/config.json",
    "/server.jar"
  ]
}
```

#### Response 响应体

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 解压文件

```http
POST /api/files/compress
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "type": 2,
  "code": "utf-8", // 压缩文件的编码
  // 可选: utf-8, gbk, big5
  "source": "/test.zip", // 压缩文件路径
  "targets": "/cache" // 解压到什么地方
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

## 删除文件

```http
DELETE /api/files
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "targets": [
    "/world", // 支持删除文件夹
    "/cache/config.json",
    "/server.jar"
  ]
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

## Touch File 新建文件

```http
POST /api/files/touch
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "target": "/test" // 文件名
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

## 新建文件夹

```http
POST /api/files/mkdir
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Body 请求体

```json
{
  "target": "/backup" // 文件夹名字
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
