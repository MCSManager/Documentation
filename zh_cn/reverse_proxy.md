# 配置 HTTPS

<tip>
MCSManager 的分布式架构导致要使用 HTTPS 是极其复杂和繁琐的，需要大量的专业开发知识，如果您没有如此之高的安全性要求，那么请不要尝试配置 HTTPS。

**请确保你已经充分理解「面板通信原理」章节。**
</tip>

## 1. 生成 SSL 证书

可以在免费 SSL 的网站上，为自己的域名生成 90 天免费且可无限续签的证书：

> <a href="https://www.cersign.com/free-ssl-certificate.html" target="_blank">https://www.cersign.com/free-ssl-certificate.html</a>  
> <a href="https://www.mianfeissl.com/" target="_blank">https://www.mianfeissl.com/</a>

如果你没有域名，想直接用 IP 的方式使用 HTTPS，可以在此生成证书：

> <a href="https://zerossl.com/" target="_blank">https://zerossl.com/</a>

你也可以选择使用自签名SSL证书，注意自签名证书默认不被操作系统及浏览器信任，需要手动加入信任链。
```使用OpenSSL生成自签名证书
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

## 2. 定位配置文件位置
本教程以 `Nginx` 配置为例，如果使用`Apache`等其他软件则需要根据实际情况调整配置。

Nginx配置一般位于`/etc/nginx/nginx.conf` 也可能根据发行版不同略有区别。

## 3. 准备证书链文件
如果您使用自签名证书可忽略此步骤

请准备以下文件:
1. 已签发的证书，例如 ***domain.crt***.
2. 签发证书的中级CA，可从签发机构网站下载。例如 ***ca.crt***.
3. 已签发证书对应的私钥，例如 ***domain.key***.

后续示例均将使用 ***domain.crt***, ***ca.crt***, ***domain.key*** 作为示例名。

如果您使用`Nginx`反向代理, 使用任意编辑器打开 ***domain.crt*** 与 ***ca.crt*** , 并将 ***ca.crt*** 的内容复制到 ***domain.crt*** 文件最下方。\

## 4. 准备反向代理配置文件
在开始前请确保以下文件及配置准备完毕:
1. 已配置好的证书链文件及路径: `/etc/nginx/ssl/domain.crt`.
2. 已签发证书对应的私钥及路径: `/etc/nginx/ssl/domain.key`.
3. Nginx配置文件位置: `/etc/nginx/nginx.conf`.
4. 未开启SSL的Daemon地址及端口: `127.0.0.1:24444`.
4. 未开启SSL的Web地址及端口: `127.0.0.1:23333`.
5. 即将开启的Daemon HTTPS端口: `12444`.
6. 即将开启的Web HTTPS端口: `12333`.
7. [***如使用域名***] 域名已正确解析到IP.
8. 防火墙或端口映射已放行端口`12444`与`12333`.

## 5. 为Daemon开启HTTPS反向代理
以下为示例配置，您可根据实际情况更改端口或调整配置。更改完成后保存为`daemon_https.conf`文件并放入`/etc/nginx/sites-enabled`目录.\
您也可以将配置直接放入`nginx.conf`文件末尾(最后一个大括号前).
```Daemon开启HTTPS反向代理
#MCSM Daemon Sample Reverse Proxy HTTPS
server
    {
		# Daemon 端公网HTTPS端口（可用多个listen监听多个端口）
		listen 12333 ssl http2; #IPV4
		listen [::]:12333 ssl http2; #IPv6
		
		# 开启HSTS 开启后将强制使用HTTPS连接 daemon 并在取消此策略后持续一年除非在浏览器手动清楚策略。
		# 默认未开启，可取消注释开启.
		#add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
		
		# DNS服务器，仅在目标daemon需要使用域名连接时需要。
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
				
				#目标Daemon的地址与端口。支持使用域名及https连接。
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
		
		# 传输时会被压缩的类型（应当依据文件压缩效果添加）
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

## 6. 为Web开启HTTPS反向代理
以下为示例配置，您可根据实际情况更改端口或调整配置。更改完成后保存为`web_https.conf`文件并放入`/etc/nginx/sites-enabled`目录.\
您也可以将配置直接放入`nginx.conf`文件末尾(最后一个大括号前).


## 3. 反向代理与证书配置

MCSManager 不支持直接配置证书并开启 HTTPS，需要依靠反向代理实现，这里以 `Nginx` 配置为例。


```nginx
# 此配置以如下场景进行假定，可以自行根据实际需求调整端口或IP
# Daemon 运行在本地地址 127.0.01.1:24444
# Web 运行在本地地址 127.0.01.1:23333
# 代理后 Daemon 端HTTPS端口：124444
# 代理后 Web 端HTTPS端口：123333
# ssl证书目录：/etc/nginx/ssl/domain.com.crt
# ssl证书私钥目录：/etc/nginx/ssl/domain.com_ECC.key
# 需要允许主域名 domain.com 及其所有子域名访问

http {
    # 配置SSL证书。以下监听的ssl端口将默认使用该证书。如果使用非自签证书,请确保crt证书包含有效的证书链
    #SSL-START
    ssl_certificate "/etc/nginx/ssl/domain.com.crt";
    ssl_certificate_key "/etc/nginx/ssl/domain.com_ECC.key";

	# SSL参数 一般无需更改
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_protocols TLSv1.2 TLSv1.3; # 允许使用 TLSv1.2 或 TLSv1.3 建立连接
    ssl_verify_client off; # 不验证客户端的证书
    #SSL-END
	
	# 不限制客户端上传文件大小, 配置可限制最大可上传单文件. https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size
    client_max_body_size 0;
	
	# 压缩策略 一般默认即可. 如需配置可参考进阶教程
    gzip on;
    gzip_types text/plain text/css application/javascript application/xml application/json;
    gzip_proxied any;
    gzip_comp_level 5;
    gzip_min_length 1k;

    
	#Daemon开启HTTPS
    server {
        # Daemon HTTPS端口. 代理完成后需使用此端口连接 Daemon.
        listen 12444 ssl ;

        # 访问时使用的域名或IP
		# 一般情况下 如果12444仅此一个服务, 填错了也不要紧
        server_name domain.com;

		# 解析DNS 仅在使用域名连接目标服务器时有效 一般无需更改
		resolver 8.8.8.8;
        # 开始反向代理
        location / {
            # 填写Daemon端真正监听的端口号
            proxy_pass http://127.0.01.1:24444 ;

            # 一些请求头 无需更改
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # 用于WebSocket的必要请求头 无需更改
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
        }
    }
	#Web开启HTTPS
    server {
        # Web HTTPS端口. 代理完成后需使用此端口连接 Web
        listen 12333 ssl ;
		
        # 访问时使用的域名或IP 
		# 一般情况下 如果12333仅此一个服务, 填错了也不要紧
        server_name domain.com ;

        # HTTP跳转到HTTPS 一般无需更改
        error_page 497 https://$host:$server_port$request_uri;
		
		# 解析DNS 仅在使用域名连接目标服务器时有效 一般无需更改
		resolver 8.8.8.8;
		
        # 开始反向代理 
        location / {
            # 填写Web面板端真正监听的地址,所有的请求将会被转发至此地址
			# 根据实际需求此处可以使用非本机域名或IP,支持http与https协议
            proxy_pass http://127.0.01.1:23333 ;
						
            # 一些请求头 一般无需更改
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # 用于WebSocket的必要请求头 无需更改
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            # 增加响应头 无需更改
            add_header X-Cache $upstream_cache_status;            
        }
    }
}
```

配置完成后，重载 Nginx 配置。

```bash
systemctl reload nginx
```

Windows 系统则需要重启 Nginx 程序或系统服务。

## 访问面板

假如域名是 **_domain.com_** ，反向代理后的端口是 12333，那么浏览器需要使用这个地址访问：

```
https://domain.com:12333/
```

此时如果你访问网页，你会发现你可以登录并且使用面板。

**但是**

如果你进入实例控制台界面，上传文件，下载文件等，就会发现依然**无法正常使用**，这是因为 MCSManager 要求浏览器能够直接连接到远程节点，由于你升级到了 HTTPS，导致浏览器**拒绝**使用 Websocket+HTTP 协议连接远程节点！

> [为什么浏览器要连接远程节点？](mcsm_network)

## 使用 HTTPS 连接节点

进入`节点管理`，你会发现可能是使用 `localhost`，`123.x.x.x` 或其他域名连接到远程节点的，此时你必须要给每一个远程节点**全部配置一次反向代理（如果是同一台机器只需配置一次即可）**，让它们全部支持 HTTPS+Websocket。

接下来，再使用 `wss://localhost`，`wss://123.x.x.x` 或 `wss://domain.com` 连接到你的远程节点，只有这样才能确保整个面板都是 HTTPS 请求，所有功能才能正常工作。
