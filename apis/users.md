# User API

## Create User

```http
POST /api/auth

Request Body:
{
  "username": "{{register_username}}",
  "password": "123456",
  "permission": 10  // 1=User, 10=Admin, -1=Banned user
}
```

## Update User

```http
PUT /api/auth

Request Body:
{
  "uuid": "{{uuid}}", // 目标用户的 UUID
  "config": {
    "permission": 10, // 1=User, 10=Admin, -1=Banned user
    "instances": [
      {
        "daemonId": "0e865f1f14c14906894698cc71f4e574",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a"
      },
      {
        "serviceUuid": "07027a72d147487aa0a2ca0616231f22",
        "instanceUuid": "11e2f159b43f447eacb213b2cdc6df2a"
      }
    ]
  }
}
```
