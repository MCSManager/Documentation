# Setup SSO for MCSManager

> [!NOTE]
> Chinese Translation not yet available.

## Overview
Single Sign-On (SSO) allows users to authenticate once and gain access to multiple applications.
This outlines the steps to set up SSO for MCSManager.

## Prerequisites
- Ensure you have administrative access to the MCSManager instance.
- You must have a valid SSO provider account (e.g., Authentik, Keycloak).

## Example Configuration
#### Example uses authentik as SSO Provider
```json
{
    [...]
    "ssoEnabled": true,
    "ssoType": "oidc",
    "ssoOnlyMode": true,
    "ssoAutoRedirect": false,
    "ssoProviderName": "Authentik",
    "ssoIconUrl": "",
    "ssoIssuer": "https://auth.example.de/application/o/mcsm/",
    "ssoAuthorizeUrl": "https://auth.example.de/application/o/authorize/",
    "ssoTokenUrl": "https://auth.example.de/application/o/token/",
    "ssoUserinfoUrl": "https://auth.example.de/application/o/userinfo/",
    "ssoUserIdField": "sub",
    "ssoScopes": "openid profile email",
    "ssoClientId": "CLIENT-ID",
    "ssoClientSecret": "SUPER-SECRET-SECRET",
    "ssoCallbackUrl": "https://mcsm.example.com/api/auth/sso/callback/",
}
```
```
"ssoEnabled"        <-  Enable SSO
"ssoType"           <-  Type must (oidc, oauth2) 
"ssoOnlyMode"       <-  Disables Login Form
"ssoAutoRedirect"   <-  Skips Login Page and 
"ssoProviderName"   <-  Name on Login Prompt
"ssoIconUrl"        <-  Icon URL on Login Prompt
"ssoIssuer"         <-  Issuer URL
"ssoAuthorizeUrl"   <-  Authorize URL
"ssoTokenUrl"       <-  Token URL
"ssoUserinfoUrl"    <-  User Info URL
"ssoUserIdField"    <-  User ID claim (May differ for each SSO Provider)
"ssoScopes"         <-  Scopes
"ssoClientId"       <-  Client ID
"ssoClientSecret"   <-  Client Secret
"ssoCallbackUrl"    <-  Callback URL
```

## Testing
To test the SSO setup, attempt to log in to MCSManager using your SSO provider credentials.

You should be prompted to bind your Account to SSO.

## Troubleshooting
- Ensure that the redirect URIs are correctly configured in your SSO provider.

