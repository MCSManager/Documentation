# 用户 API

本页所有路由均挂载在 `/api/auth` 前缀下，分布在三个 router 中：

- **Manage User Router** — 管理员级别的用户管理（创建 / 删除 / 搜索）。
- **User Overview Router** — 管理员级别的用户更新与概览。
- **General User Router** — 当前用户自助 / 账户会话相关路由（当前用户信息、token、自助更新、API Key、2FA）。

权限等级：`-1` = 被封禁的用户，`0` = 访客，`1` = 用户，`10` = 管理员。

## 获取用户列表

```http
GET /api/auth/search
```

:::tip 权限
仅管理员（`10`）。
:::

#### Query 参数

此处的参数为 **URL Query 参数**，为便于说明以 JSON 格式呈现。

```js
{
  userName?: string,   // 按用户名模糊匹配（LIKE %userName%）
  page: number,        // 页码，默认 1，最小 1
  page_size: number,   // 每页数量，默认 10，最小 1，最大 50
  role?: string         // 按权限值过滤，如 "1"、"10"、"-1"
                        // 1=用户, 10=管理员, -1=被封禁的用户
}
```

#### 返回示例

返回项中的敏感字段会被掩码处理：
- `passWord` 与 `salt` 被清空为 `""`。
- `apiKey` 若已设置则替换为 `"__MCSM_SECRET_DATA__"`，否则为 `""`。

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

## 创建用户

```http
POST /api/auth
```

:::tip 权限
仅管理员（`10`）。
:::

#### 请求正文

```json
{
  "username": "string",
  "password": "string",       // 9-36 位，需同时包含大写字母、小写字母与数字
  "permission": 10             // 1=用户, 10=管理员, -1=被封禁的用户
}
```

#### 返回示例

返回新创建的用户信息。若用户名已存在，则抛出错误。

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

## 更新用户

以管理员身份更新任意用户的配置。

```http
PUT /api/auth
```

:::tip 权限
仅管理员（`10`）。
:::

#### 请求正文

```json
{
  "uuid": "string",          // 目标用户的 UUID
  "config": {
    "userName": "string",
    "permission": 10,        // 1=用户, 10=管理员, -1=被封禁的用户
    "registerTime": "string",
    "loginTime": "string",
    "instances": "IUserHaveInstance[]",  // 用户拥有的实例，可在此分配实例
    "apiKey": "string",
    "isInit": false,
    "secret": "string",
    "open2FA": false,
    "passWord": "string",    // 可选：重置密码（9-36 位，大写 + 小写 + 数字）
    "ssoSub": "string",
    "ssoBound": false
  }
}
```

> 有关 `IUserHaveInstance[]` 的结构，[请参考这里](./api_instance.md#iuserhaveinstance)。

:::warning
当传入 `config.passWord`（管理员重置密码）时，服务端会自动清空该用户的 `secret` 并关闭
`open2FA`，要求其重新绑定 2FA。
:::

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 删除用户

按 UUID 删除一个或多个用户。

```http
DELETE /api/auth
```

:::tip 权限
仅管理员（`10`）。
:::

#### 请求正文

请求正文为一个 JSON 数组，元素为目标用户的 UUID。

```js
["046afc351bfb44a99aa5641c06e70e5a", "55a8120adb4f4bb3bee672ef305bae62"]
```

#### 返回示例

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

## 账户 / 自助服务

以下路由属于当前登录用户自身的账户 / 会话管理。除特别说明外，均要求至少用户（`1`）权限。

### 获取当前用户信息

```http
GET /api/auth
```

返回当前用户的数据。必须是 Ajax 请求（需携带 `X-Requested-With: XMLHttpRequest` 请求头），否则服务端会抛出错误。

:::tip 权限
用户（`1`）或以上。此路由关闭 token 与限速校验。
:::

#### Query 参数

```js
{
  advanced?: string | boolean,  // 为 true 时，会解析每个实例的详细信息
  uuid?: string                  // 仅管理员：按 UUID 读取其他用户
}
```

#### 返回示例

当 `advanced` 为假值时，`instances` 为纯 `IUserHaveInstance[]`；当 `advanced` 为真值时，
`instances` 为 `IAdvancedInstanceInfo[]`，包含每个实例的状态 / 配置。

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

### 获取 / 刷新 Token

```http
GET /api/auth/token
```

返回当前会话的 token。必须是 Ajax 请求。

:::tip 权限
用户（`1`）或以上。此路由关闭 token 与限速校验。
:::

#### 返回示例

```json
{
  "status": 200,
  "data": "a1b2c3d4e5f6",
  "time": 1718594177859
}
```

### 自助更新

更新当前用户自身的密码 / 初始化标记。需提供符合策略的有效密码（9-36 位，需同时包含大写字母、小写字母与数字）。更新成功后会登出当前会话（返回 `true`，客户端需重新登录）。

```http
PUT /api/auth/update
```

:::tip 权限
用户（`1`）或以上。
:::

#### 请求正文

```json
{
  "passWord": "string",   // 新密码（9-36 位，大写 + 小写 + 数字）
  "isInit": false
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

### 更新 API Key

开启或关闭当前用户的 API Key。开启时系统会生成一个新的 UUID 样式 key（去除横线）并返回；关闭时返回空字符串。

```http
PUT /api/auth/api
```

:::tip 权限
用户（`1`）或以上。
:::

:::warning
开启 API Key 依赖全局 `enableApiKey` 系统配置：
- 若 `enableApiKey` 为 `false`，开启会抛出错误。
- 若 `enableApiKey` 为 `"ONLY_ADMIN"`，则仅管理员（`10`）可开启 key。
:::

#### 请求正文

```json
{
  "enable": true
}
```

#### 返回示例

```json
{
  "status": 200,
  "data": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "time": 1718594177859
}
```

关闭时，`data` 为 `""`。

### 绑定 2FA

生成 2FA 密钥并返回二维码（`data:` URL 形式）。用户使用验证器 App 扫码后，需调用
[确认 2FA](#确认-2fa) 以完成绑定。

```http
POST /api/auth/bind2fa
```

:::tip 权限
用户（`1`）或以上。
:::

#### 返回示例

```json
{
  "status": 200,
  "data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "time": 1718594177859
}
```

### 确认 2FA

校验验证器 App 中的 TOTP code 后，开启或关闭 2FA。

```http
POST /api/auth/confirm2fa
```

:::tip 权限
用户（`1`）或以上。
:::

#### 请求正文

```json
{
  "enable": true,       // true=开启 2FA, false=关闭 2FA
  "TOTPCode": "123456"   // 验证器 App 中的 6 位 TOTP code
}
```

#### 返回示例

开启且 TOTP code 错误时 `data` 为 `false`，否则为 `true`。

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### 用户概览

返回所有用户的精简列表（用于管理员概览页）。

```http
GET /api/auth/overview
```

:::tip 权限
仅管理员（`10`）。
:::

#### 返回示例

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

## User 类型

用户系统返回的完整 `User` 实体。在列表 / 详情返回中，敏感字段 `passWord`、`salt`、`apiKey` 会被
掩码处理（见[获取用户列表](#获取用户列表)）。

```json
{
  "uuid": "string",                  // 用户唯一 ID
  "userName": "string",               // 用户名
  "passWord": "string",               // 哈希密码（返回中掩码）
  "passWordType": 1,                  // 0=md5, 1=bcrypt
  "salt": "string",                   // 密码盐值（返回中掩码）
  "permission": 10,                   // 1=用户, 10=管理员, -1=被封禁的用户
  "registerTime": "string",           // 注册时间（本地化字符串）
  "loginTime": "string",              // 最近登录时间（本地化字符串）
  "instances": "IUserHaveInstance[]",  // 用户拥有的实例
  "apiKey": "string",                 // API Key（返回中掩码）
  "isInit": false,                    // 是否处于初始状态
  "secret": "string",                 // 2FA TOTP 密钥
  "open2FA": false,                   // 是否已开启 2FA
  "ssoSub": "string",                 // 已绑定的 SSO 主体 ID
  "ssoBound": false                   // 是否已绑定 SSO 账户
}
```

> `instances` 元素使用 [`IUserHaveInstance[]`](./api_instance.md#iuserhaveinstance) 结构。
