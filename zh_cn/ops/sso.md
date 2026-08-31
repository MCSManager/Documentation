# 使用SSO登录

## 概述
单点登录 (SSO) 允许用户在一地注册，多地使用。
本文表述了在MCSManager上使用SSO的步骤。

## 开始前准备
- 确保你对此MCSManager实例拥有管理权限
- 你必须拥有一个SSO IdP，例如Keycloak或Authentik

:::details 概念解释 - IdP
Identity Provider的缩写。

指在SAML/OIDC中，提供身份认证的一方。
:::

## 示例配置
#### 使用 authentik 作为 SSO IdP
```json
{
    [...]
    "ssoEnabled": true,
    "ssoType": "oidc",
    "ssoOnlyMode": true,
    "ssoAutoRedirect": false,
    "ssoProviderName": "Authentik",
    "ssoIconUrl": "",
    "ssoIssuer": "https://auth.example.com/application/o/mcsm/",
    "ssoAuthorizeUrl": "https://auth.example.com/application/o/authorize/",
    "ssoTokenUrl": "https://auth.example.com/application/o/token/",
    "ssoUserinfoUrl": "https://auth.example.com/application/o/userinfo/",
    "ssoUserIdField": "sub",
    "ssoScopes": "openid profile email",
    "ssoClientId": "CLIENT-ID",
    "ssoClientSecret": "SUPER-SECRET-SECRET",
    "ssoCallbackUrl": "https://mcsm.example.com/api/auth/sso/callback/",
}
```
```
"ssoEnabled"        <-  启用SSO
"ssoType"           <-  SSO种类(OIDC/OAuth2) 
"ssoOnlyMode"       <-  仅使用SSO登录，禁用内置用户登录
"ssoAutoRedirect"   <-  用户访问登录页面时立即重定向至IdP页面 
"ssoProviderName"   <-  IdP在登录页面上的显示名称
"ssoIconUrl"        <-  IdP在登录页面上的图标
"ssoIssuer"         <-  Issuer URL
"ssoAuthorizeUrl"   <-  Authorize URL
"ssoTokenUrl"       <-  Token URL
"ssoUserinfoUrl"    <-  用户信息URL
"ssoUserIdField"    <-  User ID claim (May differ for each SSO Provider)
"ssoScopes"         <-  Scopes
"ssoClientId"       <-  SSO Client ID
"ssoClientSecret"   <-  SSO Client Secret
"ssoCallbackUrl"    <-  回调地址
```

> [!NOTE]
> 部分由于本人能力原因未能完全翻译，您可能需要自行查阅对应IdP/网络文档
> 
> 请注意替换域名

## 测试
尝试使用您的身份验证登录MCSManager

您应当被提示需要绑定一个SSO账户

## 问题解决
- 确保回调地址、重定向地址、允许的Origin等在IdP处配置完好
