# Image Manager API

## Get Image List

```http
GET /api/environment/image
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
}
```

#### Response

```json
{
  "status": 200,
  "data": DockerImageList,
  "time": 1718594177859
}
```

> DockerImageList: https://docs.docker.com/engine/api/v1.37/#tag/Image/operation/ImageList

## Get Container List

```http
GET /api/environment/containers
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
}
```

#### Response

```json
{
  "status": 200,
  "data": DockerContainerList,
  "time": 1718594177859
}
```

> DockerContainerList: https://docs.docker.com/engine/api/v1.37/#tag/Container/operation/ContainerList

## Get Network Mode List

```http
GET /api/environment/network
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
}
```

#### Response

```json
{
  "status": 200,
  "data": DockerNetworkList,
  "time": 1718594177859
}
```

> DockerNetworkList: https://docs.docker.com/engine/api/v1.37/#tag/Network/operation/NetworkList

## Create Image

```http
POST /api/environment/image
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string,
}
```

#### Request Body

```json
{
  "dockerFile": "...", // DockerFile Config
  "name": "mcsm-custom", // Image Name
  "tag": "latest" // Version
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

## Build Progress

```http
GET /api/environment/progress
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string,
}
```

#### Response

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
