# File Manager API

## Get File List

```http
GET /api/files/list
```

#### Query Param

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

```js
{
  daemonId: string;
  uuid: string; // Instance ID
  target: string; // File(name or directory) Path
  page: number;
  page_size: number;
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

## Get File Contents

```http
PUT /api/files/
```

#### Query Param

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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

#### Query Param

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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
POST /api/files/download
```

#### Query Param

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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
    "addr": "localhost:24444" // Daemon Addr
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

## Upload File

### 1. Get Upload Config

```http
POST /api/files/upload
```

#### Query Param

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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
    "addr": "localhost:24444" // Daemon Addr
  },
  "time": 1718594177859
}
```

### 2. Upload File

```http
POST http(s)://{{Daemon Address}}/upload/{{password}}
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

## Copy

```http
POST /api/files/copy
```

#### Query Param

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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

## Zip

```http
POST /api/files/compress
```

#### Query Param

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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

:::info
The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.
:::

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
