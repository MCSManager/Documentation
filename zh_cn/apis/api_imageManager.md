# dockers 镜像管理 API

## 获取镜像列表

```http
GET /api/environment/image
```

#### Query 参数

```js
{
  daemonId: string;
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": DockerImageList,
  "time": 1718594177859
}
```

>  DockerImageList详见: https://docs.docker.com/engine/api/v1.37/#tag/Image/operation/ImageList

## 获取容器列表

```http
GET /api/environment/containers
```

#### Query 参数

```js
{
  daemonId: string;
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": DockerContainerList,
  "time": 1718594177859
}
```

> DockerContainerList详见: https://docs.docker.com/engine/api/v1.37/#tag/Container/operation/ContainerList

## 获取网络接口列表

```http
GET /api/environment/network
```

#### Query 参数

```js
{
  daemonId: string;
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": DockerNetworkList,
  "time": 1718594177859
}
```

> DockerNetworkList详见: https://docs.docker.com/engine/api/v1.37/#tag/Network/operation/NetworkList

## 新增镜像

```http
POST /api/environment/image
```

#### Query 参数

```js
{
  daemonId: string,
}
```

#### 请求正文

```json
{
  "dockerFile": "...", // DockerFile Config
  "name": "mcsm-custom", // Image Name
  "tag": "latest" // Version
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

## 构建进度

```http
GET /api/environment/progress
```

#### Query 参数

```js
{
  daemonId: string,
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "mcsm-custom:latest": -1 // -1 = Failed, 1 = Building, 2 = Complete
    // ...more...
  },
  "time": 1718594177859
}
```
