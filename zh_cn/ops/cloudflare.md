# 使用 Cloudflare 代理

:::tip
**在阅读本章节之前请充分理解[「网络架构」](./mcsm_network)和[「使用 HTTPS」](./reverse_proxy.md)章节。**
本章节适用人群为 Cloudflare CDN 的使用者
:::

在本章节会讲解如何在使用 Cloudflare 代理的同时，可以让面板访问到守护进程。\
**注意** Cloudflare 仅作为 CDN 存在，并**不提供端口转换**服务。即 Cloudflare 访问源服务器的端口与用户访问 Cloudflare 的端口**一致**。\
如果您有多个节点共享一个端口，可以使用不同域名并配置 Nginx 根据来源转发至不同节点。

:::warning
Cloudflare 的 CDN 只支持以下端口作为 HTTPS 端口转发：

- 443
- 2053
- 2083
- 2087
- 2096
- 8443

请选择以上端口作为守护进程的转发端口
:::

## 1. 设置域名 DNS 解析

1. 登录 Cloudflare 控制台并打开域名的子面板。
2. 在侧边栏的 `DNS` 的小菜单中找到 `记录`，并添加一个新的 A 或 CNAME 记录指向您的主机。
3. 确保 `代理状态` 为 `仅DNS` 并保存。

## 2. 配置 HTTPS 反向代理

在正式配置 Cloudflare CDN 之前，请先参考[「使用 HTTPS」](./reverse_proxy.md)章节，使用**上面之一**的端口为面板和节点启用 HTTPS。
您可以使用自签或来自 Cloudflare 的 SSL 证书。\
配置完成后，请确保可以正确使用域名及证书连接.

### 使用 Cloudflare 的证书

1. 打开 Cloudflare 面板并打开域名的子面板
2. 在侧边栏的`SSL/TLS`的小菜单中找到`源服务器`选项并打开
3. 点击创建证书，并根据自身情况选择私钥类型、域名、有效期（推荐私钥类型为 ECC，域名栏保持默认，和选择 15 年有效期）
4. 复制证书和密钥并保存

### 使用自签证书

```
#Generate a Self-Signed Certificate using OpenSSL
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

## 3. 配置 Cloudflare

打开 Cloudflare 面板并打开域名的子面板， 打开`SSL/TLS`小菜单。

1. 如果您使用自签证书，**把`SSL/TLS的加密模式`改成`完全`**。
2. 如果您使用 Cloudflare 证书，您可以自由选择 **`严格`** 或 **`完全`**。一般情况下 **`完全`** 足够绝大多数用户使用。

在侧边栏的 `DNS` 的小菜单中找到 `记录`

1. 编辑刚刚添加的 A 或 CNAME 记录。
2. 更改 `代理状态` 为 `已代理` 并保存。

## 4. 测试访问

使用第二步中配置的域名，再次使用浏览器测试访问。

如果可以正常显示，恭喜您已成功为您的面板或节点启用了 Cloudflare！\
您现在可以根据[「使用 HTTPS」](./reverse_proxy.md)章节中的步骤添加节点至面板。

如果测试失败，您可能需要手动清除 DNS 解析缓存并重试。
