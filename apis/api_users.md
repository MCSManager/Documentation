# Users API

All routes in this page are mounted under the `/api/auth` prefix and are split across three routers:

- **Manage User Router** — admin-level user management (create / delete / search).
- **User Overview Router** — admin-level user update + overview.
- **General User Router** — self-service / account session routes (current user, token, self update, API Key, 2FA).

Permission levels: `-1` = Banned user, `0` = Guest, `1` = User, `10` = Admin.

## Get User List

```http
GET /api/auth/search
```

:::tip Permission
Admin (`10`) only.
:::

#### Query Param

The parameters here are **URL Query parameters**, which are presented in JSON format for better illustration.

```js
{
  userName?: string,   // Fuzzy match by username (LIKE %userName%)
  page: number,        // Page number, default 1, minimum 1
  page_size: number,   // Page size, default 10, minimum 1, maximum 50
  role?: string         // Filter by permission value, e.g. "1", "10", "-1"
                        // 1=User, 10=Admin, -1=Banned user
}
```

#### Response

Sensitive fields are masked in the returned items:
- `passWord` and `salt` are cleared to `""`.
- `apiKey` is replaced with `"__MCSM_SECRET_DATA__"` when set, otherwise `""`.

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
        "permission": 10,
        "registerTime": "10/28/2023, 5:38:44 PM",
        "loginTime": "10/14/2023, 1:01:58 AM",
        "instances": [
          {
            "instanceUuid": "82e856fd33424e018fc2c007e1a3c4d3",
            "daemonId": "1fcdacc01eac44a7bf8fe83d34215d05"
          }
        ],
        "apiKey": "__MCSM_SECRET_DATA__",
        "isInit": false,
        "secret": "",
        "open2FA": false,
        "ssoSub": "",
        "ssoBound": false
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

## Create User

```http
POST /api/auth
```

:::tip Permission
Admin (`10`) only.
:::

#### Request Body

```json
{
  "username": "string",
  "password": "string",       // 9-36 chars, must contain upper + lower + digit
  "permission": 10             // 1=User, 10=Admin, -1=Banned user
}
```

#### Response

Returns the newly created user info. If the username already exists, the request throws an error.

```json
{
  "status": 200,
  "time": 1718594177859,
  "data": {
    "uuid": "046afc351bfb44a99aa5641c06e70e5a",
    "userName": "Admin",
    "permission": 1
  }
}
```

## Update User

Updates an arbitrary user's configuration as an administrator.

```http
PUT /api/auth
```

:::tip Permission
Admin (`10`) only.
:::

#### Request Body

```json
{
  "uuid": "string",          // UUID of the target user
  "config": {
    "userName": "string",
    "permission": 10,        // 1=User, 10=Admin, -1=Banned user
    "registerTime": "string",
    "loginTime": "string",
    "instances": "IUserHaveInstance[]",  // User instances; assign instances here
    "apiKey": "string",
    "isInit": false,
    "secret": "string",
    "open2FA": false,
    "passWord": "string",    // Optional: reset password (9-36 chars, upper + lower + digit)
    "ssoSub": "string",
    "ssoBound": false
  }
}
```

> For the structure of `IUserHaveInstance[]`, see [this section](./api_instance.md#iuserhaveinstance).

:::warning
When `config.passWord` is provided (the admin resets the password), the server automatically clears
`secret` and disables `open2FA` for that user, forcing them to re-bind 2FA.
:::

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Delete User

Deletes one or more users by UUID.

```http
DELETE /api/auth
```

:::tip Permission
Admin (`10`) only.
:::

#### Request Body

The request body is a JSON array of target user UUIDs.

```js
["046afc351bfb44a99aa5641c06e70e5a", "55a8120adb4f4bb3bee672ef305bae62"]
```

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## Account / Self-Service

The following routes belong to the current logged-in user's own account / session management.
Unless noted otherwise they require at least User (`1`) permission.

### Get Current User

```http
GET /api/auth
```

Returns the data of the current user. Must be an Ajax request (the `X-Requested-With: XMLHttpRequest`
header is required), otherwise the server throws an error.

:::tip Permission
User (`1`) or above. Token and speed-limit checks are disabled for this route.
:::

#### Query Param

```js
{
  advanced?: string | boolean,  // If true, resolve detailed info for each instance
  uuid?: string                  // Admin-only: read another user by their UUID
}
```

#### Response

When `advanced` is falsy, `instances` is the plain `IUserHaveInstance[]`; when `advanced` is truthy,
`instances` is an `IAdvancedInstanceInfo[]` containing per-instance status/config.

```json
{
  "status": 200,
  "data": {
    "uuid": "55a8120adb4f4bb3bee672ef305bae62",
    "userName": "Admin",
    "loginTime": "10/14/2023, 1:01:58 AM",
    "registerTime": "10/28/2023, 5:38:44 PM",
    "instances": [
      {
        "instanceUuid": "82e856fd33424e018fc2c007e1a3c4d3",
        "daemonId": "1fcdacc01eac44a7bf8fe83d34215d05"
      }
    ],
    "permission": 10,
    "apiKey": "__MCSM_SECRET_DATA__",
    "isInit": false,
    "open2FA": false,
    "token": "" 
  },
  "time": 1718594177859
}
```

### Get / Refresh Token

```http
GET /api/auth/token
```

Returns the current session token. Must be an Ajax request.

:::tip Permission
User (`1`) or above. Token and speed-limit checks are disabled for this route.
:::

#### Response

```json
{
  "status": 200,
  "data": "a1b2c3d4e5f6",
  "time": 1718594177859
}
```

### Self Update

Updates the current user's own password / init flag. A valid password satisfying the policy is
required (9-36 chars, must contain upper + lower + digit). After a successful update the current
session is logged out (the response is `true` and the client should re-authenticate).

```http
PUT /api/auth/update
```

:::tip Permission
User (`1`) or above.
:::

#### Request Body

```json
{
  "passWord": "string",   // New password (9-36 chars, upper + lower + digit)
  "isInit": false
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

### Update API Key

Enables or disables the current user's API Key. When enabling, the system generates a new UUID-style
key (dashes removed) and returns it; when disabling, an empty string is returned.

```http
PUT /api/auth/api
```

:::tip Permission
User (`1`) or above.
:::

:::warning
Enabling the API Key depends on the global `enableApiKey` system configuration:
- If `enableApiKey` is `false`, enabling throws an error.
- If `enableApiKey` is `"ONLY_ADMIN"`, only Admin (`10`) users may enable a key.
:::

#### Request Body

```json
{
  "enable": true
}
```

#### Response

```json
{
  "status": 200,
  "data": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "time": 1718594177859
}
```

When disabling, `data` is `""`.

### Bind 2FA

Generates a 2FA secret and returns a QR code (as a `data:` URL). The user scans it with an
authenticator app, then calls [Confirm 2FA](#confirm-2fa) to finalize.

```http
POST /api/auth/bind2fa
```

:::tip Permission
User (`1`) or above.
:::

#### Response

```json
{
  "status": 200,
  "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "time": 1718594177859
}
```

### Confirm 2FA

Enables or disables 2FA after verifying the TOTP code from the authenticator app.

```http
POST /api/auth/confirm2fa
```

:::tip Permission
User (`1`) or above.
:::

#### Request Body

```json
{
  "enable": true,       // true=enable 2FA, false=disable 2FA
  "TOTPCode": "123456"   // 6-digit TOTP code from the authenticator app
}
```

#### Response

When enabling and the TOTP code is wrong, `data` is `false`; otherwise `true`.

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### User Overview

Returns a compact list of all users (used by the admin overview page).

```http
GET /api/auth/overview
```

:::tip Permission
Admin (`10`) only.
:::

#### Response

```json
{
  "status": 200,
  "data": [
    {
      "uuid": "55a8120adb4f4bb3bee672ef305bae62",
      "userName": "Admin",
      "permission": 10,
      "instances": [
        {
          "instanceUuid": "82e856fd33424e018fc2c007e1a3c4d3",
          "daemonId": "1fcdacc01eac44a7bf8fe83d34215d05"
        }
      ],
      "loginTime": "10/14/2023, 1:01:58 AM",
      "registerTime": "10/14/2023, 1:01:58 AM"
    }
  ],
  "time": 1718594177859
}
```

## Type of User

Full `User` entity returned by the user system. In list/detail responses the sensitive fields
`passWord`, `salt` and `apiKey` are masked (see [Get User List](#get-user-list)).

```json
{
  "uuid": "string",                  // Unique user ID
  "userName": "string",               // Username
  "passWord": "string",               // Hashed password (masked in responses)
  "passWordType": 1,                  // 0=md5, 1=bcrypt
  "salt": "string",                   // Password salt (masked in responses)
  "permission": 10,                   // 1=User, 10=Admin, -1=Banned user
  "registerTime": "string",           // Registration time (locale string)
  "loginTime": "string",              // Last login time (locale string)
  "instances": "IUserHaveInstance[]",  // Instances owned by the user
  "apiKey": "string",                 // API Key (masked in responses)
  "isInit": false,                    // Whether the user is in initial state
  "secret": "string",                 // 2FA TOTP secret
  "open2FA": false,                   // Whether 2FA is enabled
  "ssoSub": "string",                 // Bound SSO subject ID
  "ssoBound": false                   // Whether an SSO account is bound
}
```

> Field `instances` items use the [`IUserHaveInstance[]`](./api_instance.md#iuserhaveinstance) structure.
