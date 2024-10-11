# 文件管理api

## 获取文库列表

```http
GET /api/files/list
```

#### Query 查询参数

```js
{
  daemonId: string;
  uuid: string; // 你的 Instance ID
  target: string; // 文件（名称或目录）路径
  page: number;
  page_size: number;
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

## 获取文件内容

```http
PUT /api/files/
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
  "text": "eula=true\n" // file content
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

需要先获取下载配置，然后通过获取到的下载配置下载文件。

```http
POST /api/files/download
```

#### Query 查询参数

```js
{
  file_name: string; // 路径+名字, 示例: /backup/world.zip
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
    "addr": "localhost:24444" // 节点地址
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

## 上传文件

### 1.获得上传配置

```http
POST /api/files/upload
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
    "addr": "localhost:24444" // 节点地址
  },
  "time": 1718594177859
}
```

### 2. 上传文件

```http
POST http(s)://{{Daemon Address}}/upload/{{password}}
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
      "/server.jar", // source
      "/cache/server.jar" // target
    ]
    // ... more
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

    // support rename
    [
      "/ops.json", // 原来
      "/ops.txt" // 现在
    ]
    // ... more
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

#### Request Body 请求体

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

#### Request Body 请求体

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

#### Request Body 请求体
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

#### Request Body 请求体

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
