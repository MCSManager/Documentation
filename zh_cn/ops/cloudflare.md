# 使用 Cloudflare 代理

:::tip
**在阅读本章节之前请充分理解[「面板通信原理」](/zh_cn/mcsm_network)和[「使用 HTTPS」](/zh_cn/proxy_https)章节。**
本章节适用人群为 Cloudflare CDN 的使用者
:::

在本章节会讲解，如何在使用 Cloudflare 代理的同时，可以让面板访问到守护进程。

## 生成 SSL 证书

### 使用 Cloudflare 的证书

1. 打开 Cloudflare 面板并打开域名的子面板
2. 在侧边栏的`SSL/TLS`的小菜单中找到`源服务器`选项并打开
3. 点击创建证书，并根据自身情况选择私钥类型、域名、有效期（推荐私钥类型为 ECC，域名栏保持默认，和选择 15 年有效期）
4. 复制证书和密钥并保存

### 使用自签证书

使用自签证书的时候，**需要在 Cloudflare 的面板`SSL/TLS`配置页面把`SSL/TLS的加密模式`改成`完全`。**

## 反向代理与证书配置

MCSManager 不支持直接配置证书和开启 HTTPS，需要依靠反向代理实现，此处以`Nginx`的配置为例子：

:::warning
Cloudflare 的 CDN 只支持以下端口作为 SSL 端口转发：

- 2053
- 2083
- 2087
- 2096
- 8443

请选择以上端口作为守护进程的转发端口
:::

```
# /etc/nginx/nginx.conf
http {

    # 上传大小限制
    client_max_body_size 100g;

    server {
        # 转发面板
        listen 80; # http 端口
        listen 443 ssl; # https 端口
        ssl_certificate /path/to/file; # 证书
        ssl_certificate_key /path/to/file; # 证书密钥

        location / {
            # Web
            proxy_pass http://localhost:23333/; # 面板地址
            root   html;
            index  index.html index.htm;
            proxy_set_header Host localhost;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # Websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-cache;
            expires -1;
        }
    }

    server {
        # 转发守护进程
        listen 8443 ssl; # 配置端口
        ssl_certificate /path/to/file; # 证书
        ssl_certificate_key /path/to/file; # 证书密钥

        location / {
            # 守护进程
            proxy_pass http://localhost:24444/; # 守护进程地址
            root   html;
            index  index.html index.htm;
            proxy_set_header Host localhost;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-cache;
            expires -1;
        }
    }
}
```

修改`/path/to/file`成实际目录。

完成上述配置之后，重载 Nginx 配置。

```bash
systemctl restart nginx
```

## 访问面板和建立 WSS 协议连接

请根据[使用 HTTPS](/zh_cn/proxy_https)访问面板和建立 WSS 连接
