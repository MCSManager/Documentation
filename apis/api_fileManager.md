# File Manager API

## Get File List

```http
GET /api/files/list
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
  target: string; // File(name or directory) Path
  page: number; // Starts from 0
  page_size: number; // 1 - 100, default 10
  file_name: string; // Optional, filter by file name
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "items": [
      {
        "name": "Genshin Impact",
        "size": 0,    // byte
        "time": "Fri Jun 07 2024 08:53:34 GMT+0800 (中国标准时间)",
        "mode": 777, // Linux file permission
        "type": 0 // 0 = Folder, 1 = File
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

## Get File Status

```http
GET /api/files/status
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "instanceFileTask": 0, // Number of file tasks for this instance
    "globalFileTask": 0, // Number of file tasks across the daemon
    "downloadFileFromURLTask": 0, // Number of active URL download tasks
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
    "platform": "linux", // OS platform
    "isGlobalInstance": false, // Whether the instance is the global instance
    "disks": [] // Windows disk list
  },
  "time": 1718594177859
}
```

:::tip
The `disks` field is only populated on Windows systems.
:::

## Get File Contents

```http
PUT /api/files/
```

:::tip
This route shares the same endpoint `PUT /api/files/` with "Update File". When the request body contains only `target` (without `text`), the file contents are read. When `text` is provided, the file is written.
:::

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "target": "/eula.txt"
}
```

#### Response

```json
{
  "status": 200,
  "data": "eula=false\n", // file content
  "time": 1718594177859
}
```

## Update File

```http
PUT /api/files/
```

:::tip
This route shares the same endpoint `PUT /api/files/` with "Get File Contents". When the request body contains `text`, the file is written. When only `target` is provided, the file contents are read.
:::

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "target": "/eula.txt",
  "text": "eula=true\n" // file content
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

## Download File

```http
ALL /api/files/download
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  file_name: string; // Path + FileName, Example: /backup/world.zip
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "password": "b2d8a6fa3bc8467ebd1563dc4f7179be1718010317889",
    "addr": "localhost:24444", // Daemon Addr
    "remoteMappings": {} // Remote address mappings
  },
  "time": 1718594177859
}
```

#### Usage

```http
GET http(s)://{{Daemon Addr}}/download/{{password}}/{{fileName}}

// For example:
GET http://localhost:24444/download/db8271f526...49468abd74/world.zip
```

:::tip
The `password` is a one-time credential. After the download request completes, the credential is invalidated.
:::

## Upload File

### 1. Get Upload Config

```http
ALL /api/files/upload
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  upload_dir: string;
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "password": "b2d8a6fa3bc8467ebd1563dc4f7179be1718010317889",
    "addr": "localhost:24444", // Daemon Addr
    "remoteMappings": {} // Remote address mappings
  },
  "time": 1718594177859
}
```

### 2. Upload File

```http
POST http(s)://{{Daemon Address}}/upload/{{password}}
```

#### Query Param (optional)

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  unzip: boolean; // Optional, if true, unzip the uploaded file after upload
  code: string; // Optional, encoding for unzip (e.g. utf-8, gbk, big5)
  overwrite: string; // Optional, "false" to keep the existing file with auto-rename
}
```

#### Request Headers

```http
Content-Type: multipart/form-data
```

#### Request FormData

```http
file: (Binary Data)
```

#### Response

```
OK
```

:::tip
The daemon also supports resumable uploads via `POST /upload-new/:key` and `POST /upload-piece/:id` endpoints, suitable for uploading large files in chunks.
:::

## Download From URL

```http
POST /api/files/download_from_url
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "url": "https://example.com/file.zip", // URL to download from
  "file_name": "/backup/file.zip" // Save path + file name
}
```

#### Response

```json
{
  "status": 200,
  "data": "a1b2c3d4e5f6...", // Download task ID
  "time": 1718594177859
}
```

:::tip
The download runs in the background on the daemon. Use the `Get File Status` endpoint to track download progress and obtain the actual task ID (`downloadTasks[].taskId`) for stopping.
:::

## Stop Download From URL

```http
POST /api/files/download_from_url_stop
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "taskId": "a1b2c3d4e5f6..." // Download task ID (from Get File Status)
}
```

#### Response

```json
{
  "status": 200,
  "data": true, // true = stopped successfully, false = task not found
  "time": 1718594177859
}
```

## Copy

```http
POST /api/files/copy
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "targets": [
    [
      "/server.jar", // source
      "/cache/server.jar" // target
    ]
    // ... more
  ]
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

## Move or Rename

```http
PUT /api/files/move
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "targets": [
    [
      "/server.jar", // source
      "/cache/server.jar" // target
    ],

    // support rename
    [
      "/ops.json", // source
      "/ops.txt" // target
    ]
    // ... more
  ]
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

## Chmod

```http
PUT /api/files/chmod
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "target": "/server.jar", // File or directory path
  "chmod": 755, // Permission number
  "deep": false // Whether to apply recursively to directories
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

:::warning
`chmod` is only supported on Linux systems.
:::

## Chmod Batch

```http
PUT /api/files/chmod_batch
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "targets": [
    "/server.jar",
    "/config.json"
  ], // Array of file/directory paths
  "chmod": 755, // Permission number
  "deep": false // Whether to apply recursively
}
```

#### Response

```json
{
  "status": 200,
  "data": {
    "success": 2, // Number of successfully chmod'd items
    "failed": 0, // Number of failed items
    "total": 2, // Total number of items
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
`chmod` is only supported on Linux systems.
:::

## Zip

```http
POST /api/files/compress
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "type": 1,
  "code": "utf-8", // only utf-8
  "source": "/test.zip", // zip file path
  "targets": [
    "/world", // support folder
    "/config.json",
    "/server.jar"
  ]
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

## Unzip

```http
POST /api/files/compress
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "type": 2,
  "code": "utf-8", // format of the compressed file
  // support: utf-8, gbk, big5
  "source": "/test.zip", // zip file path
  "targets": "/cache" // unzip to
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

## Delete

```http
DELETE /api/files
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "targets": [
    "/world", // support folder
    "/cache/config.json",
    "/server.jar"
  ]
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

## Touch File

```http
POST /api/files/touch
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "target": "/test" // File name
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

## Create Folder

```http
POST /api/files/mkdir
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  uuid: string; // Instance ID
}
```

#### Request Body

```json
{
  "target": "/backup" // Folder name
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
