# 配置 HTTPS

<tip>
MCSManager 的分布式架构导致要使用 HTTPS 是极其复杂和繁琐的，需要大量的专业开发知识，如果您没有如此之高的安全性要求，那么请不要尝试配置 HTTPS。

**请确保你已经充分理解「面板通信原理」章节。**
</tip>

## 生成 SSL 证书

可以在免费 SSL 的网站上，为自己的域名生成 90 天免费且可无限续签的证书：

> <a href="https://www.cersign.com/free-ssl-certificate.html" target="_blank">https://www.cersign.com/free-ssl-certificate.html</a>  
> <a href="https://www.mianfeissl.com/" target="_blank">https://www.mianfeissl.com/</a>

如果你没有域名，想直接用 IP 的方式使用 HTTPS，可以在此生成证书：

> <a href="https://zerossl.com/" target="_blank">https://zerossl.com/</a>

## Nginx 反向代理与证书配置

MCSManager 不支持直接配置证书并开启 HTTPS，需要依靠反向代理实现，这里以 `Nginx` 配置为例，你也可以使用 `Apache` 或其他工具。

```nginx
# 此配置以如下场景进行假定：
# Daemon 端真实端口：24444
# Web 端真实端口：23333
# 代理后 Daemon 端端口：124444
# 代理后 Web 端端口：123333
# ssl证书目录：/etc/nginx/ssl/domain.com.crt
# ssl证书私钥目录：/etc/nginx/ssl/domain.com_ECC.key
# 需要允许主域名 domain.com 及其所有子域名访问

http {
    # 配置SSL证书。以下监听的ssl端口将默认使用该证书。
    #SSL-START
    ssl_certificate "/etc/nginx/ssl/domain.com.crt";
    ssl_certificate_key "/etc/nginx/ssl/domain.com_ECC.key";

    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_protocols TLSv1.2 TLSv1.3; # 允许使用 TLSv1.2 或 TLSv1.3 建立连接
    ssl_verify_client off; # 不验证客户端的证书
    #SSL-END

    # 传输时默认开启gzip压缩
    gzip on;
    # 传输时会被压缩的类型（应当依据文件压缩效果添加）
    gzip_types text/plain text/css application/javascript application/xml application/json;
    # 反向代理时，启用压缩
    gzip_proxied any;
    # 传输时压缩等级，等级越高压缩消耗CPU越多，最高9级，通常5级就够了
    gzip_comp_level 5;
    # 传输时大小达到1k才压缩，压缩小内容无意义
    gzip_min_length 1k;

    # 不限制客户端上传文件大小
    client_max_body_size 0;

    server {
        # Daemon 端localhost访问HTTP协议端口（可用多个listen监听多个端口）
        listen 127.0.0.1:12444 ;
        listen [::1]:12444 ; #IPv6

        # 本地回环域名
        server_name localhost ;

        # 本地回环地址不占宽带，无需压缩。
        gzip off;

        # 开始反向代理
        location / {
            # 填写Daemon端真正监听的端口号
            proxy_pass http://localhost:24444 ;

            # 一些请求头
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # 用于WebSocket的必要请求头
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            # 增加响应头
            add_header X-Cache $upstream_cache_status;
        }
    }
    server {
        # Daemon 端公网HTTPS端口（可用多个listen监听多个端口）
        listen 12444 ssl ;
        listen [::]:12444 ssl ; #IPv6

        # 你访问时使用的域名（支持通配符，但通配符不能用于根域名）
        # 如果你访问时的链接直接使用公网IP，那么此处填写公网IP。
        server_name domain.com *.domain.com ;

        # 开始反向代理
        location / {
            # 填写Daemon端真正监听的端口号
            proxy_pass http://localhost:24444 ;

            # 一些请求头
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # 用于WebSocket的必要请求头
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
        }
    }
    server {
        # Web 端公网HTTPS端口（可用多个listen监听多个端口）
        listen 12333 ssl ;
        listen [::]:12333 ssl ; #IPv6

        # 你访问时使用的域名（支持通配符，但通配符不能用于根域名）
        # 如果你访问时的链接直接使用公网IP，那么此处填写公网IP。
        server_name domain.com *.domain.com ;

        # HTTP跳转到HTTPS
        error_page 497 https://$host:$server_port$request_uri;

        # 开始反向代理
        location / {
            # 填写Web面板端真正监听的端口号
            proxy_pass http://localhost:23333 ;

            # 一些请求头
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # 用于WebSocket的必要请求头
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            # 增加响应头
            add_header X-Cache $upstream_cache_status;
            # 仅允许客户端使用HTTPS发送Cookie
            proxy_cookie_flags ~ secure;
            # 客户端访问后1年内HTTP自动跳转HTTPS（清浏览器缓存后失效）
            add_header Strict-Transport-Security "max-age=31536000";
        }
    }
}
```

**配置完成后，重载 Nginx 配置（以下命令用于 Linux 操作系统）**

```bash
systemctl reload nginx
```

## 访问面板

假如域名是 **_domain.com_** ，反向代理后的端口是 12333，那么浏览器需要使用这个地址访问：

```
https://domain.com:12333/
```

此时如果你访问网页，你会发现你可以登录并且使用面板。

**但是**

如果你进入实例控制台界面，文件管理界面等，就会发现依然**无法正常使用**，这是因为 MCSManager 要求浏览器能够直接连接到 Daemon 节点，由于你升级到了 HTTPS，导致浏览器**拒绝**使用 Websocket+HTTP 协议连接 Daemon 节点！

## 使用 HTTPS 连接节点

进入`节点管理`，你会发现可能是使用 `localhost`，`123.x.x.x` 或其他域名连接到 Daemon 节点的，此时你必须要给每一个 Daemon 节点**全部配置一次反向代理（如果是同一台机器只需配置一次即可）**，让它们全部支持 HTTPS+Websocket。

接下来，再使用 `wss://localhost`，`wss://123.x.x.x` 或 `wss://domain.com` 连接到你的 Daemon 节点，只有这样才能确保整个面板都是 HTTPS 请求，所有功能才能正常工作。
