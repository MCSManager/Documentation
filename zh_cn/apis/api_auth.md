# 认证与 SSO API

:::warning
此处的路由是**基于 session** 的登录、安装和 SSO 流程端点。它们**不**适用于 API Key 自动化 — 这些路由依赖 cookie/session 状态和 CSRF 检查，而非 `apikey` header。
:::

## 认证

### 登录

```http
POST /api/auth/login
```

使用用户名和密码(可选 2FA 验证码)进行认证。成功后创建 session 并返回 session token。

如果启用了 SSO-only 模式(`ssoEnabled` + `ssoOnlyMode`)，则禁止密码登录。

#### 权限

公开(无需 token)

#### 请求示例

```json
{
  "username": "admin",
  "password": "your-password",
  "code": ""
}
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `username` | string | 是 | 账号用户名 |
| `password` | string | 是 | 账号密码 |
| `code` | string | 否 | 2FA(TOTP)验证码 — 账号启用 2FA 时必填 |

#### 返回

如果启用了 2FA 但未提供 `code`：

```json
{
  "status": 200,
  "data": "NEED_2FA",
  "time": 1718594177859
}
```

成功时返回登录 session token：

```json
{
  "status": 200,
  "data": "session-uuid-or-token",
  "time": 1718594177859
}
```

如果已经登录：

```json
{
  "status": 200,
  "data": "Logined",
  "time": 1718594177859
}
```

失败时(凭据错误、IP 被封等)，`data` 包含错误信息。

### 登出

```http
GET /api/auth/logout
```

销毁当前 session。

#### 权限

公开(无需 token)

#### 返回

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### 登录页信息

```http
ALL /api/auth/login_info
```

返回管理员配置的自定义登录页文本。

#### 权限

公开(无需 token)

#### 返回

```json
{
  "status": 200,
  "data": {
    "loginInfo": "Welcome to MCSManager"
  },
  "time": 1718594177859
}
```

### 面板状态

```http
ALL /api/auth/status
```

返回面板安装状态和公开设置。当检测到已登录用户时，会返回额外设置。

#### 权限

公开(无需 token)

#### 返回

```json
{
  "status": 200,
  "data": {
    "isInstall": true,
    "language": "en_us",
    "settings": {
      "businessMode": false,
      "businessId": "",
      "canFileManager": true,
      "allowUsePreset": false,
      "allowChangeCmd": false,
      "panelId": "",
      "ssoEnabled": false
    }
  },
  "time": 1718594177859
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `isInstall` | boolean | 至少有一个用户时为 `true`；初始安装时为 `false` |
| `language` | string \| null | 面板显示语言 |
| `settings.businessMode` | boolean | 商业模式是否开启 |
| `settings.businessId` | string | 商业标识 |
| `settings.canFileManager` | boolean | 文件管理器访问权限(仅登录时返回) |
| `settings.allowUsePreset` | boolean | 预设包访问权限(仅登录时返回) |
| `settings.allowChangeCmd` | boolean | 允许修改启动命令(仅登录时返回) |
| `settings.panelId` | string | 面板 ID(仅登录时返回) |
| `settings.ssoEnabled` | boolean | SSO 是否启用(仅登录时返回) |

:::tip
`canFileManager`、`allowUsePreset`、`allowChangeCmd`、`panelId` 和 `ssoEnabled` 仅在检测到已登录用户时才返回。
:::

### 安装

```http
ALL /api/auth/install
```

创建初始管理员账号。仅在尚无用户时可用(首次安装)。创建账号后会自动登录。

#### 权限

公开(仅在未创建任何用户时有效)

#### 请求示例

```json
{
  "username": "admin",
  "password": "your-password"
}
```

#### 返回

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

如果用户已存在，返回错误。

### 代理

```http
ALL /api/auth/proxy
```

向外部目标 URL 发送 HTTP 请求并返回响应体。仅供管理员进行服务端代理(如获取市场数据)。

#### 权限

管理员

#### Query 参数

```js
{
  target: string; // 代理请求的目标 URL
  method: string; // 可选：HTTP 方法(默认使用请求的方法)
}
```

#### 返回

```json
{
  "status": 200,
  "data": "<目标 URL 的响应内容>",
  "time": 1718594177859
}
```

## SSO

SSO(Single Sign-On)路由，用于 OIDC / OAuth 2.0 集成。这些路由基于 session，处理授权码流程(authorization code flow)。

### 获取 SSO 配置

```http
GET /api/auth/sso/config
```

返回公开的 SSO 配置(不含密钥)。如果 SSO 未启用则返回 `null`。

#### 权限

公开(无需 token)

#### 返回

```json
{
  "status": 200,
  "data": {
    "enabled": true,
    "onlyMode": false,
    "autoRedirect": false,
    "providerName": "My IdP",
    "iconUrl": "https://idp.example.com/logo.png"
  },
  "time": 1718594177859
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `enabled` | boolean | SSO 是否启用 |
| `onlyMode` | boolean | SSO-only 模式是否开启(禁用密码登录) |
| `autoRedirect` | boolean | 是否在登录页自动跳转到 IdP |
| `providerName` | string | SSO 提供商显示名称 |
| `iconUrl` | string | SSO 按钮图标 URL |

### 授权

```http
GET /api/auth/sso/authorize
```

发起 SSO 授权流程。生成 state、nonce 和 PKCE code verifier 存入 session，然后将浏览器重定向到 IdP 授权 URL。

#### 权限

公开(无需 token)

#### 返回

`302` 重定向到 IdP 授权 URL。失败时重定向到 `/#/login?sso_error=...`。

:::warning
此路由需要有效的 session(cookie)。它不是 API Key 端点。
:::

### 回调

```http
GET /api/auth/sso/callback
```

处理 IdP 授权后的回调。校验 state/nonce，交换 code 获取 token，获取用户信息，然后：

- 如果 SSO 身份已绑定 MCSManager 用户：登录用户并重定向到 `/#/sso/callback`。
- 如果未绑定：将 SSO subject 存入临时绑定会话并重定向到 `/#/sso/bind`。

#### 权限

公开(无需 token)

#### 返回

`302` 重定向 — 到 `/#/sso/callback`(成功，已登录)、`/#/sso/bind`(需要绑定)或 `/#/login?sso_error=...`(错误)。

:::tip
回调 URL 需在 IdP 中注册。通过面板设置(`ssoCallbackUrl` 或从回调请求自动检测)进行配置。
:::

### 绑定状态

```http
GET /api/auth/sso/bind-status
```

检查是否存在待处理的 SSO 绑定会话(即用户已完成 SSO 授权但尚未绑定账号)。

#### 权限

公开(无需 token)

#### 返回

```json
{
  "status": 200,
  "data": {
    "pending": true
  },
  "time": 1718594177859
}
```

### 绑定 SSO 到已有账号

```http
POST /api/auth/sso/bind
```

通过验证用户名和密码，将待处理的 SSO 身份绑定到已有的 MCSManager 账号。需要从回调流程中获得的待处理 SSO 绑定会话。

#### 权限

公开(无需 token — 但需要包含待处理 SSO 绑定状态的 session)

#### 请求示例

```json
{
  "username": "admin",
  "password": "your-password",
  "code": ""
}
```

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `username` | string | 是 | MCSManager 账号用户名 |
| `password` | string | 是 | MCSManager 账号密码 |
| `code` | string | 否 | 账号启用 2FA 时的 TOTP 验证码 |

#### 返回

如果启用了 2FA 但未提供 `code`：

```json
{
  "status": 200,
  "data": "NEED_2FA",
  "time": 1718594177859
}
```

成功时返回登录 session token：

```json
{
  "status": 200,
  "data": "session-uuid-or-token",
  "time": 1718594177859
}
```

:::warning
SSO 绑定会话在 10 分钟后过期。如果 SSO 身份已绑定到其他账号，或目标账号已绑定到其他 SSO 提供商，请求将失败。
:::

### 绑定 SSO 到当前会话

```http
POST /api/auth/sso/bind-current
```

将待处理的 SSO 身份绑定到当前已登录的用户(无需密码)。需要待处理的 SSO 绑定会话。

#### 权限

User(需已登录 session)

#### 返回

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::warning
SSO 绑定会话在 10 分钟后过期。如果 SSO 身份已绑定到其他账号，或当前账号已绑定到其他 SSO 提供商，请求将失败。
:::

### 解绑 SSO

```http
PUT /api/auth/sso/unbind
```

移除用户账号的 SSO 绑定。仅限管理员操作。

#### 权限

管理员

#### 请求示例

```json
{
  "uuid": "user-uuid-string"
}
```

#### 返回

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::warning
解绑操作会以 `warning` 级别记录到操作日志。用户之后需要使用密码登录并按需重新绑定 SSO。
:::
