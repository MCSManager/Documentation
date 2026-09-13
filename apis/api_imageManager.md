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
GET /api/environment/networkModes
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

:::tip
The image build runs asynchronously. The response returns `true` immediately before the build completes. Use the `Build Progress` endpoint to track the build status.
:::

## Delete Image

```http
DELETE /api/environment/image
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
  imageId: string; // Docker image ID
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

## Get Image Platforms

```http
POST /api/environment/image_platforms
```

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  daemonId: string;
}
```

#### Request Body

```json
{
  "imageName": "nginx:latest" // Image name (supports image:tag, namespace/image:tag, registry/repo/image:tag)
}
```

#### Response

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
This endpoint queries supported platforms via the daemon's Docker service. Returns an empty array if platforms cannot be determined.
:::

## Get Docker Hub Image Platforms

```http
POST /api/environment/dockerhub_image_platforms
```

:::tip
This endpoint fetches platform information directly from Docker Hub (or a custom registry) via the Docker Registry HTTP API V2, bypassing the daemon. Useful for querying available platforms before pulling an image.
:::

#### Request Body

```json
{
  "imageName": "nginx:latest" // Image name (supports image:tag, namespace/image:tag, registry/repo/image:tag)
}
```

#### Response

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
If the request fails (e.g. network timeout, private repository without authentication), an empty array `[]` is returned as a graceful fallback.
:::
