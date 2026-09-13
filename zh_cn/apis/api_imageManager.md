# Docker 镜像管理 API

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

>  DockerImageList 详见: https://docs.docker.com/engine/api/v1.37/#tag/Image/operation/ImageList

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

> DockerContainerList 详见: https://docs.docker.com/engine/api/v1.37/#tag/Container/operation/ContainerList

## 获取网络模式列表

```http
GET /api/environment/networkModes
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

> DockerNetworkList 详见: https://docs.docker.com/engine/api/v1.37/#tag/Network/operation/NetworkList

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
  "dockerFile": "...", // DockerFile 配置
  "name": "mcsm-custom", // 镜像名称
  "tag": "latest" // 版本
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

:::tip
镜像构建为异步执行，响应在构建完成前即返回 `true`。使用"构建进度"端点跟踪构建状态。
:::

## 删除镜像

```http
DELETE /api/environment/image
```

#### Query 参数

```js
{
  daemonId: string;
  imageId: string; // Docker 镜像 ID
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
    "mcsm-custom:latest": -1 // -1 = 失败, 1 = 构建中, 2 = 完成
    // ...更多...
  },
  "time": 1718594177859
}
```

## 获取镜像平台

```http
POST /api/environment/image_platforms
```

#### Query 参数

```js
{
  daemonId: string;
}
```

#### 请求正文

```json
{
  "imageName": "nginx:latest" // 镜像名称（支持 image:tag、namespace/image:tag、registry/repo/image:tag）
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": [
    "linux/amd64",
    "linux/arm64",
    "linux/arm/v7"
  ],
  "time": 1718594177859
}
```

:::tip
此端点通过 daemon 的 Docker 服务查询支持的架构平台。如果无法获取平台信息，则返回空数组。
:::

## 获取 Docker Hub 镜像平台

```http
POST /api/environment/dockerhub_image_platforms
```

:::tip
此端点通过 Docker Registry HTTP API V2 直接从 Docker Hub（或自定义 registry）查询平台信息，不经过 daemon。适用于在拉取镜像前查询可用平台。
:::

#### 请求正文

```json
{
  "imageName": "nginx:latest" // 镜像名称（支持 image:tag、namespace/image:tag、registry/repo/image:tag）
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": [
    "linux/amd64",
    "linux/arm64",
    "linux/arm/v7"
  ],
  "time": 1718594177859
}
```

:::warning
如果请求失败（如网络超时、私有仓库未认证等），将返回空数组 `[]` 作为优雅降级。
:::
