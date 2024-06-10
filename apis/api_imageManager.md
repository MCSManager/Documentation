# Sample API for File Manager

## Get Image List
```http
GET /api/environment/image
```

#### Query Param
```js
{
  daemonId: string
}
```

#### Response
```json
{
  "status": 200,
  "data": DockerImageList,
  "time": 1145141918100
}
```
> DockerImageList: https://docs.docker.com/engine/api/v1.37/#tag/Image/operation/ImageList

## Get Container List
```http
GET /api/environment/containers
```

#### Query Param
```js
{
  daemonId: string
}
```

#### Response
```json
{
  "status": 200,
  "data": DockerContainerList,
  "time": 1145141918100
}
```
> DockerContainerList: https://docs.docker.com/engine/api/v1.37/#tag/Container/operation/ContainerList

## Get Network Mode List
```http
GET /api/environment/network
```

#### Query Param
```js
{
  daemonId: string
}
```

#### Response
```json
{
  "status": 200,
  "data": DockerNetworkList,
  "time": 1145141918100
}
```
> DockerNetworkList: https://docs.docker.com/engine/api/v1.37/#tag/Network/operation/NetworkList
  
## Create Image
```http
POST /api/environment/image
```

#### Query Param
```js
{
  daemonId: string,
}
```

#### Request Body
```json
{
  "dockerFile": "",       // DockerFile Content
  "name": "mcsm-custom",  // Image Name
  "tag": "latest"         // Version
}
```

#### Response
```json
{
  "status": 200,
  "data": true,
  "time": 1145141918100
}
```

## Build Progress
```http
GET /api/environment/progress
```

#### Query Param
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
    "mcsm-custom:latest": -1 // -1 = Failed
    // ...                   //  1 = Building
                             //  2 = Complete
  },
  "time": 1145141918100
}
```