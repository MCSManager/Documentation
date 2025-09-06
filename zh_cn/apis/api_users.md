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

#### 返回示例

```json
{
  "status": 200,
  "data": {
    "data": [
      {
        "uuid": "********************************",
        "userName": "Admin",
        "passWord": "",
        "passWordType": 1,
        "salt": "",
        "permission": 10, // 1=用户, 10=管理员, -1=被封禁的用户
        "registerTime": 1718594128408,
        "loginTime": 1718594138590,
        // 用户拥有的实例列表
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

#### 返回示例

```json
{
  "status": 200,
  "time": 1718594177859,
  "data": {
    "uuid": "046afc351bfb44a99aa5641c06e70e5a", // 新用户的 UUID
    "userName": "Admin", // 新用户的用户名
    "permission": 1 //新用户的权限
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
  "uuid": string, //目标用户的 UUID
  "config": {
    // 目标用户信息
    "uuid": string,
    "userName": string,
    "loginTime": string,
    "registerTime": string,
    "instances": IUserHaveInstance[],  // 用户拥有的实例
                                    // 您可以在此处为用户分配实例
    "permission": number,  // 1=用户, 10=管理员, -1=被封禁的用户
    "apiKey": string,
    "isInit": boolean,
    "secret": string,
    "open2FA": boolean,
  }
}
```

> 有关`IUserHaveInstance[]`的信息，[这请参考这里](./api_instance.md#iuserhaveinstance)

#### 返回示例

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

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```
