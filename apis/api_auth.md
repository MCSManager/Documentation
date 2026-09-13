# Auth & SSO API

:::warning
The routes documented here are **session-based** login, installation, and SSO flow endpoints. They are **not** designed for API Key automation — they rely on cookies/session state and CSRF checks rather than `apikey` headers.
:::

## Authentication

### Login

```http
POST /api/auth/login
```

Authenticates a user with username and password (optionally with a 2FA code). On success, a session is created and a session token is returned.

If SSO-only mode is enabled (`ssoEnabled` + `ssoOnlyMode`), password login is disabled.

#### Permission

Public (no token required)

#### Request Body

```json
{
  "username": "admin",
  "password": "your-password",
  "code": ""
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | string | Yes | Account username |
| `password` | string | Yes | Account password |
| `code` | string | No | 2FA (TOTP) code — required if the account has 2FA enabled |

#### Response

If 2FA is enabled but no `code` is provided:

```json
{
  "status": 200,
  "data": "NEED_2FA",
  "time": 1718594177859
}
```

On success, returns the login session token:

```json
{
  "status": 200,
  "data": "session-uuid-or-token",
  "time": 1718594177859
}
```

If already logged in:

```json
{
  "status": 200,
  "data": "Logined",
  "time": 1718594177859
}
```

On failure (wrong credentials, IP banned, etc.), `data` contains the error.

### Logout

```http
GET /api/auth/logout
```

Destroys the current session.

#### Permission

Public (no token required)

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

### Login Info

```http
ALL /api/auth/login_info
```

Returns the custom login page text configured by the administrator.

#### Permission

Public (no token required)

#### Response

```json
{
  "status": 200,
  "data": {
    "loginInfo": "Welcome to MCSManager"
  },
  "time": 1718594177859
}
```

### Panel Status

```http
ALL /api/auth/status
```

Returns panel installation status and public-facing settings. When a logged-in user is detected, additional settings are exposed.

#### Permission

Public (no token required)

#### Response

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

| Field | Type | Description |
| --- | --- | --- |
| `isInstall` | boolean | `true` if at least one user exists; `false` during initial install |
| `language` | string \| null | Panel display language |
| `settings.businessMode` | boolean | Whether business mode is on |
| `settings.businessId` | string | Business identifier |
| `settings.canFileManager` | boolean | File manager access (only when logged in) |
| `settings.allowUsePreset` | boolean | Pres pack access (only when logged in) |
| `settings.allowChangeCmd` | boolean | Allow changing start commands (only when logged in) |
| `settings.panelId` | string | Panel ID (only when logged in) |
| `settings.ssoEnabled` | boolean | Whether SSO is enabled (only when logged in) |

:::tip
`canFileManager`, `allowUsePreset`, `allowChangeCmd`, `panelId`, and `ssoEnabled` are only included when a logged-in user is detected.
:::

### Install

```http
ALL /api/auth/install
```

Creates the initial administrator account. Only available when no users exist yet (first-time setup). After creating the account, the user is automatically logged in.

#### Permission

Public (only works before any user is created)

#### Request Body

```json
{
  "username": "admin",
  "password": "your-password"
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

If users already exist, returns an error.

### Proxy

```http
ALL /api/auth/proxy
```

Sends an HTTP request to an external target URL and returns the response body. Intended for admin-only server-side proxying (e.g., fetching market data).

#### Permission

Admin

#### Query Param

```js
{
  target: string; // The URL to proxy the request to
  method: string; // Optional: HTTP method (defaults to the incoming request method)
}
```

#### Response

```json
{
  "status": 200,
  "data": "<response body from target URL>",
  "time": 1718594177859
}
```

## SSO

SSO (Single Sign-On) routes for OIDC / OAuth 2.0 integration. These routes are session-based and handle the authorization code flow.

### Get SSO Config

```http
GET /api/auth/sso/config
```

Returns the public SSO configuration (no secrets). Returns `null` if SSO is not enabled.

#### Permission

Public (no token required)

#### Response

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

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | boolean | Whether SSO is enabled |
| `onlyMode` | boolean | Whether SSO-only mode is on (password login disabled) |
| `autoRedirect` | boolean | Whether to auto-redirect to IdP on login page |
| `providerName` | string | Display name of the SSO provider |
| `iconUrl` | string | Icon URL for the SSO button |

### Authorize

```http
GET /api/auth/sso/authorize
```

Initiates the SSO authorization flow. Generates state, nonce, and PKCE code verifier, stores them in the session, then redirects the browser to the IdP authorization URL.

#### Permission

Public (no token required)

#### Response

A `302` redirect to the IdP authorization URL. On failure, redirects to `/#/login?sso_error=...`.

:::warning
This route requires a valid session (cookie). It is not an API Key endpoint.
:::

### Callback

```http
GET /api/auth/sso/callback
```

Handles the IdP callback after authorization. Validates state/nonce, exchanges the code for a token, retrieves user info, and:

- If the SSO identity is already bound to a MCSManager user: logs the user in and redirects to `/#/sso/callback`.
- If not bound: stores the SSO subject in a temporary bind session and redirects to `/#/sso/bind`.

#### Permission

Public (no token required)

#### Response

A `302` redirect — either to `/#/sso/callback` (success, logged in), `/#/sso/bind` (needs binding), or `/#/login?sso_error=...` (error).

:::tip
The callback URL must be registered with your IdP. Configure it via the panel settings (`ssoCallbackUrl` or auto-detected from the callback request).
:::

### Bind Status

```http
GET /api/auth/sso/bind-status
```

Checks whether there is a pending SSO binding session (i.e., the user completed SSO authorization but has not yet bound their account).

#### Permission

Public (no token required)

#### Response

```json
{
  "status": 200,
  "data": {
    "pending": true
  },
  "time": 1718594177859
}
```

### Bind SSO to Existing Account

```http
POST /api/auth/sso/bind
```

Binds the pending SSO identity to an existing MCSManager account by verifying username and password. A pending SSO bind session (from the callback flow) is required.

#### Permission

Public (no token required — but requires a session with pending SSO bind state)

#### Request Body

```json
{
  "username": "admin",
  "password": "your-password",
  "code": ""
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | string | Yes | MCSManager account username |
| `password` | string | Yes | MCSManager account password |
| `code` | string | No | 2FA (TOTP) code if the account has 2FA enabled |

#### Response

If 2FA is enabled but no `code` is provided:

```json
{
  "status": 200,
  "data": "NEED_2FA",
  "time": 1718594177859
}
```

On success, returns the login session token:

```json
{
  "status": 200,
  "data": "session-uuid-or-token",
  "time": 1718594177859
}
```

:::warning
The SSO bind session expires after 10 minutes. If the SSO identity is already bound to another account, or the target account is already bound to another SSO provider, the request will fail.
:::

### Bind SSO to Current Session

```http
POST /api/auth/sso/bind-current
```

Binds the pending SSO identity to the currently logged-in user (no password needed). Requires a pending SSO bind session.

#### Permission

User (logged-in session required)

#### Response

```json
{
  "status": 200,
  "data": true,
  "time": 1718594177859
}
```

:::warning
The SSO bind session expires after 10 minutes. If the SSO identity is already bound to another account, or the current account is already bound to another SSO provider, the request will fail.
:::

### Unbind SSO

```http
PUT /api/auth/sso/unbind
```

Removes SSO binding from a user account. Admin-only operation.

#### Permission

Admin

#### Request Body

```json
{
  "uuid": "user-uuid-string"
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

:::warning
Unbinding is recorded in the operation log at `warning` level. The user will need to log in with a password and re-bind SSO if desired.
:::
