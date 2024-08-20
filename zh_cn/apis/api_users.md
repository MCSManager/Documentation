# 用户 API

## 获取 用户 列表

```http
GET /api/auth/search
```

#### Query 参数

```js
{
  userName?: string
  page: number
  page_size: number
  role?: string      // 用户权限
                     // 1=用户, 10=管理员, -1=被封禁的用户
}
```

#### 返回实例

```json
{
  "status": 200,
  "data": {
    "data": [
      {
        "uuid": "55a8120adb4f4bb3bee672ef305bae62",
        "userName": "Admin",
        "passWord": "",
        "passWordType": 1,
        "salt": "",
        "permission": 10, // 1=用户, 10=管理员, -1=被封禁的用户
        "registerTime": "10/28/2023, 5:38:44 PM",
        "loginTime": "10/14/2023, 1:01:58 AM",
        // List of instances owned by the user
        "instances": [
          {
            "instanceUuid": "82e856fd33424e018fc2c007e1a3c4d3",
            "daemonId": "1fcdacc01eac44a7bf8fe83d34215d05"
          }
        ],
        "apiKey": "",
        "isInit": false,
        "secret": "",
        "open2FA": false
      }
    ],
    "maxPage": 1,
    "page": 1,
    "pageSize": 20,
    "total": 6
  },
  "time": 1718594177859
}
```

## 创建 用户

```http
POST /api/auth
```

#### 请求正文

```json
{
  "username": string,
  "password": string,
  "permission": number  // 1=用户, 10=管理员, -1=被封禁的用户
}
```

#### 返回实例

```json
{
  "status": 200,
  "time": 1718594177859,
  "data": {
    "uuid": "046afc351bfb44a99aa5641c06e70e5a" // 新用户的uuid
  }
}
```

## 更新用户数据

```http
PUT /api/auth
```

#### 请求正文

```json
{
  "uuid": string, //目标用户的UUID
  "config": {
    //目标用户信息
    "uuid": string,
    "userName": string,
    "loginTime": string,
    "registerTime": string,
    "instances": InstanceDetail[],  // 用户拥有的实例
                                    // 您可以在此处为用户分配实例
    "permission": number,  // 1=用户, 10=管理员, -1=被封禁的用户
    "apiKey": string,
    "isInit": boolean,
    "secret": string,
    "open2FA": boolean,
  }
}
```

> 有关InstanceDetail的信息，请参见[这](./api_instance.md#示例详细信息)

#### 返回实例

```json
{
  "status":200 ,
  "data": true,
  "time": 1718594177859
}
```

## 删除用户

```http
DELETE /api/auth
```

#### 请求正文

```js
["user uuid"]; // 目标用户的UUID
```

#### 返回实例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```
