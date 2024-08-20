# 节点 API

## 节点列表

> 请参考 [仪表盘 API](./api_dashboard.md#get-overview-info)

## 添加节点

```http
POST /api/service/remote_service
```

#### 请求示例

```json
{
  "ip": "10.0.0.16",
  "port": 24446,
  "prefix": "",
  "remarks": "MiPad",
  "apiKey": "db9516063699446bb95fba51f08603"
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": "499e1012a21443278a7ec63a3a95860b", // 新增节点的节点 ID
  "time": 1718594177859
}
```

## 删除节点

```http
DELETE /api/service/remote_service
```

#### Query 参数

```js
{
  uuid: string; // 节点 ID
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

## 链接节点

```http
GET /api/service/link_remote_service
```

#### Query 参数

```js
{
  uuid: string; //节点 ID
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

## 更新节点连接参数

```http
PUT /api/service/remote_service
```

#### 请求示例

```json
{
  "uuid": "e31986e43c254107951dea97026a3741",
  "ip": "162.2.xx.xx",
  "port": 24444,
  "prefix": "",
  "available": false,
  "remarks": "My Node",
  "apiKey": ""
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
