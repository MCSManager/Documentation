# Sample API for Daemon

## Get Daemon List
> see [Dashboard API](./api_dashboard.md#get-overview-info)

## Add Daemon
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

## Delete Daemon
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