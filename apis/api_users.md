# Sample API for User Management

## Get User List
```http
GET /api/auth/search
```

#### Query Param
```js
{
  userName?: string
  page: number
  page_size: number
  role?: string      // User permission
                     // 1=User, 10=Admin, -1=Banned user
}
```

#### Response
```json
{
  "status": 200,
  "data": {
    "data": [
      {
        "uuid": "55a8120adb4f4bb3bee672ef305bae62",
        "userName": "Master",
        "passWord": "",
        "passWordType": 1,
        "salt": "",
        "permission": 10,
        "registerTime": "10/28/2023, 5:38:44 PM",
        "loginTime": "10/14/2023, 1:01:58 AM",
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
      "total": 6,
  },
  "time": 1145141918100
}
```

## Create User
```http
POST /api/auth
```

#### Request Body
```json
{
  "username": string,
  "password": string,
  "permission": number  // 1=User, 10=Admin, -1=Banned user
}
```

#### Response
```json
{
  "status": 200,
  "time": 1145141918100,
  "data": true
}
```

## Update User
```http
PUT /api/auth
```

#### Request Body
```json
{
  "uuid": string, // UUID of the target user
  "config": {
    // target user info
    "uuid": string,
    "userName": string,
    "loginTime": string,
    "registerTime": string,
    "instances": InstanceDetail[],  // user instances
                                    // You can assign instances to users here
    "permission": number,  // 1=User, 10=Admin, -1=Banned user
    "apiKey": string,
    "isInit": boolean,
    "secret": string,
    "open2FA": boolean,
  }
}
```
> For information about InstanceDetail, see [this](./api_instance.md#type-of-instancedetail)


#### Response
```json
{
  "status": 200,
  "data": true,
  "time": 1145141918100
}
```

## Delete User
```http
DELETE /api/auth
```

#### Request Body
```js
['user uuid'] // UUID of the target users
```

#### Response
```json
{
  "status": 200,
  "data": true,
  "time": 1145141918100
}
```