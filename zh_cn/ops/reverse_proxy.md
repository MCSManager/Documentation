# 配置 HTTPS

:::tip
MCSManager 的分布式架构导致要使用 HTTPS 是极其复杂和繁琐的，需要大量的专业开发知识，如果你没有如此之高的安全性要求，那么请不要尝试配置 HTTPS。

**请确保你已经充分理解「面板通信原理」章节。**
:::

## 1. 生成 SSL 证书

可以在免费 SSL 的网站上，为自己的域名生成 90 天免费且可无限续签的证书：

> <a href="https://www.cersign.com/free-ssl-certificate.html" target="_blank">https://www.cersign.com/free-ssl-certificate.html</a>  
> <a href="https://www.mianfeissl.com/" target="_blank">https://www.mianfeissl.com/</a>

如果你没有域名，想直接用 IP 的方式使用 HTTPS，可以在此生成证书：

> <a href="https://zerossl.com/" target="_blank">https://zerossl.com/</a>

你也可以选择使用`Let's Encrypt`、`其他CA`或`自签名SSL证书`。注意自签名证书默认不被操作系统及浏览器信任，需要手动加入信任链。

```使用OpenSSL生成自签名证书
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

## 2. 定位配置文件位置

本教程以 `Nginx` 配置为例，如果使用`Apache`等其他软件则需要根据实际情况调整配置。

Nginx 配置一般位于`/etc/nginx/nginx.conf` 也可能根据发行版不同略有区别。

## 3. 准备证书链文件

如果你使用自签名证书可忽略此步骤。

请准备以下文件:

1. 已签发的证书，例如 **_domain.crt_**。
2. 签发证书的中级 CA，可从签发机构网站下载。例如 **_ca.crt_**。
3. 已签发证书对应的私钥，例如 **_domain.key_**。

后续示例均将使用 **_domain.crt_**, **_ca.crt_**, **_domain.key_** 作为示例名。

如果你使用`Nginx`反向代理, 使用任意编辑器打开 **_domain.crt_** 与 **_ca.crt_** , 并将 **_ca.crt_** 的内容复制到 **_domain.crt_** 文件最下方。

## 4. 准备反向代理配置文件

在开始前请确保以下文件及配置准备完毕，可根据实际情况调整:

1. 已配置好的证书链文件及路径: `/etc/nginx/ssl/domain.crt`。
2. 已签发证书对应的私钥及路径: `/etc/nginx/ssl/domain.key`。
3. Nginx 配置文件位置: `/etc/nginx/nginx.conf`。
4. 未开启 SSL 的节点地址及端口: `127.0.0.1:24444`。
5. 未开启 SSL 的面板地址及端口: `127.0.0.1:23333`。
6. 即将开启的节点 HTTPS 端口: `12444`。
7. 即将开启的面板 HTTPS 端口: `12333`。
8. [***如使用域名***] 域名已正确解析到 IP。
9. 防火墙或端口映射已放行端口`12444`与`12333`。

## 5. 为节点开启反向代理

以下为示例配置，你可根据实际情况更改端口或调整配置。\
更改完成后保存为`daemon_https.conf`文件并放入`/etc/nginx/sites-enabled`目录.\
你也可以将配置直接放入`nginx.conf`文件末尾(最后一个大括号前)。\
如果你有多个节点，只需以不同的端口与地址重复添加下列配置即可。

```节点开启HTTPS反向代理
# MCSM节点端开启HTTPS反向代理
server
    {
		# 节点 公网HTTPS端口(可用多个listen监听多个端口)
		listen 12333 ssl http2; #IPV4
		listen [::]:12333 ssl http2; #IPv6

		# 开启HSTS 开启后将强制使用HTTPS连接节点并在取消此策略后持续一年除非在浏览器手动清楚策略。
		# 默认未开启，可取消注释开启.
		#add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

		# DNS服务器，仅在目标节点需要使用域名连接时需要。
		resolver 8.8.8.8;

		# 自动重定向HTTP连接至HTTPS
		error_page 497 https://$host:$server_port$request_uri;

		proxy_hide_header Upgrade;
		location / {
				# 请求头 一般无需更改
				proxy_set_header Host $host;
				proxy_set_header X-Real-Ip $remote_addr;
				proxy_set_header X-Forwarded-For $remote_addr;
				proxy_set_header REMOTE-HOST $remote_addr;

				#目标节点的地址与端口。支持使用域名及https连接。
				proxy_pass http://127.0.0.1:24444;

				# 支持反代 WebSocket
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection "upgrade";

				# 最大文件上传大小限制。设置0为不限制
				client_max_body_size 0;

				# 关闭缓存
				proxy_request_buffering off;
				proxy_buffering off;
				  }
		# HTTPS 证书与私钥位置
		ssl_certificate /etc/nginx/ssl/domain.crt;
		ssl_certificate_key /etc/nginx/ssl/domain.key;

		# 传输时默认开启gzip压缩
		gzip on;

		# 传输时会被压缩的类型(应当依据文件压缩效果添加)
		gzip_types text/plain text/css application/javascript application/xml application/json;

		# 反向代理时，启用压缩
		gzip_proxied any;

		# 传输时压缩等级，等级越高压缩消耗CPU越多，最高9级，通常5级就够了
		gzip_comp_level 5;

		# 传输时大小达到1k才压缩，压缩小内容无意义
		gzip_min_length 1k;

		# 支持协议、算法与超时时间等 一般无需更改
		ssl_session_timeout 5m;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
		ssl_prefer_server_ciphers on;
    }
```

## 6. 为面板开启反向代理

以下为示例配置，你可根据实际情况更改端口或调整配置。\
更改完成后保存为`web_https.conf`文件并放入`/etc/nginx/sites-enabled`目录。\
你也可以将配置直接放入`nginx.conf`文件末尾(最后一个大括号前)。

```面板开启HTTPS反向代理
# MCSM面板端开启HTTPS反向代理
server
    {
		# 面板端公网HTTPS端口(可用多个listen监听多个端口)
		listen 12444 ssl http2; #IPV4
		listen [::]:12444 ssl http2; #IPv6

		# 开启HSTS 开启后将强制使用HTTPS连接面板并在取消此策略后持续一年除非在浏览器手动清楚策略。
		# 默认未开启，可取消注释开启.
		#add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

		# DNS服务器，仅在目标面板需要使用域名连接时需要。
		resolver 8.8.8.8;

		# 自动重定向HTTP连接至HTTPS
		error_page 497 https://$host:$server_port$request_uri;

		proxy_hide_header Upgrade;
		location / {
				# 请求头 一般无需更改
				proxy_set_header Host $host;
				proxy_set_header X-Real-Ip $remote_addr;
				proxy_set_header X-Forwarded-For $remote_addr;
				proxy_set_header REMOTE-HOST $remote_addr;

				#目标面板的地址与端口。支持使用域名及https连接。
				proxy_pass http://127.0.0.1:23333;

				# 支持反代 WebSocket
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection "upgrade";

				# 最大文件上传大小限制。设置0为不限制
				client_max_body_size 0;

				# 关闭缓存
				proxy_request_buffering off;
				proxy_buffering off;
				  }

		# HTTPS 证书与私钥位置
		ssl_certificate /etc/nginx/ssl/domain.crt;
		ssl_certificate_key /etc/nginx/ssl/domain.key;

		# 传输时默认开启gzip压缩
		gzip on;

		# 传输时会被压缩的类型(应当依据文件压缩效果添加)
		gzip_types text/plain text/css application/javascript application/xml application/json;

		# 反向代理时，启用压缩
		gzip_proxied any;

		# 传输时压缩等级，等级越高压缩消耗CPU越多，最高9级，通常5级就够了
		gzip_comp_level 5;

		# 传输时大小达到1k才压缩，压缩小内容无意义
		gzip_min_length 1k;

		# 支持协议、算法与超时时间等 一般无需更改
		ssl_session_timeout 5m;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
		ssl_prefer_server_ciphers on;
    }
```

## 7. 确认反向代理生效

当你完成上述配置添加后，可以使用命令`sudo nginx -t`来测试配置是否存在问题。

```示例输出
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

测试成功后使用命令`sudo nginx -s reload` 来使 Nginx 配置生效。

```示例输出
2024/01/27 22:57:17 [notice] 4826#4826: signal process started
```

假如域名是 **_domain.com_** ，反向代理后的端口是`12333`与`12444`，那么浏览器需要使用这个地址访问：

```
面板地址: https://domain.com:12333/
节点地址: https://domain.com:12444/
```

使用节点地址通过浏览器访问。如果你看到网页显示下列内容，则节点反代已正确配置。

> [MCSManager Daemon] Status: OK | reference: https://mcsmanager.com/

使用面板地址通过浏览器访问。如果你看到网页显示出 MCSM 登陆页面，则面板反代已正确配置。

## 8. 配置 MCSM 使用 HTTPS 连接

此时如果你访问网页，你会发现你可以登录并且使用面板。

**但是**

如果你进入实例控制台界面，上传文件，下载文件等，就会发现依然**无法正常使用**，这是因为 MCSManager 要求浏览器能够直接连接到远程节点，由于你升级到了 HTTPS，导致浏览器**拒绝**使用 Websocket+HTTP 协议连接远程节点！

> [为什么浏览器要连接远程节点？](mcsm_network)

进入`节点管理`，你会发现可能是使用 `localhost`，`123.x.x.x` 或其他域名连接到远程节点的，此时你必须要给每一个远程节点**分别配置一次反向代理**，让它们全部使用 HTTPS+Websocket 连接。

配置完成后，使用 `wss://localhost`，`wss://123.x.x.x` 或 `wss://domain.com` 替换原有的`localhost`，`123.x.x.x` 或 `domain.com`即可。

恭喜，至此你已成功为你的面板启用了 HTTPS。
