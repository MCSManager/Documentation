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

## 2. 定位nginx.conf配置

一般位于/etc/nginx/nginx.conf
也可能根据发行版不同略有区别

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
