# Sample API for Daemon

## Daemon List
> see [Dashboard API](./api_dashboard.md#get-overview-info)

## Add
```http
POST /api/service/remote_service
```

#### Request Body
```json
{
  "ip": "10.0.0.16",
  "port": 24446,
  "prefix": "",
  "remarks": "MiPad",
  "apiKey": "db9516063699446bb95fba51f08603"
}
```

#### Response
```json
{
  "status": 200,
  "data": "499e1012a21443278a7ec63a3a95860b", // Added Daemon ID
  "time": 1145141918100
}
```

## Delete
```http
DELETE /api/service/remote_service
```

#### Query Param
```js
{
  uuid: string  // Daemon ID
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

## Link
```http
GET /api/service/link_remote_service
```

#### Query Param
```js
{
  uuid: string  // Daemon ID
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

## Update Info
```http
PUT /api/service/remote_service
```

#### Request Body
```json
{
  "uuid": "e31986e43c254107951dea97026a3741",
  "ip": "10.0.0.16",
  "port": 24446,
  "prefix": "",
  "available": false,
  "remarks": "MiPad",
  "apiKey": ""
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