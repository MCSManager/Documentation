# 使用反向代理配置 HTTPS

本文主要参考[配置HTTP反向代理](simple_reverse_proxy.md)进行编写。  

此教程使用 Nginx 进行演示。  
您应当 充分理解 本文的内容，便于依据自己的需求进行更改。  
> 本地回环地址：指域名 `localhost` 以及IPv4 `127.0.0.1` 。  
> 非本地回环地址：指不是 `本地回环地址` 。  
> WS协议：基于HTTP协议的WebSocket协议。  
> WSS协议：基于HTTPS协议的WebSocketSecure协议。  
> 守护进程：意思同Daemon节点、Daemon进程。  
> Web面板后台：指Web面板的程序，不是守护进程，不是浏览器。  

### 警告：

当浏览器使用HTTPS访问Web面板时，浏览器访问守护进程也需要使用HTTPS。  
若为守护进程的`非本地回环地址`配置了HTTPS，并且Web面板后台也使用`非本地回环地址`访问守护进程，则需要确保`SSL证书有效`、访问的地址正确。否则Web面板后台会因为`SSL证书无效`而无法连接节点，会显示节点离线。  
若您未理解本文的主要内容，则不建议配置HTTPS。  
内容仅供参考，不绝对确保稳定性，不确保时效性，不确保内容绝对准确。  

<br />

## 需要安装的

> [Nginx](https://nginx.org/)  
> [MCSManager](https://mcsmanager.com/)  

<br />

## 生成SSL证书

为自己的域名生成SSL证书，用于建立安全的HTTPS链接。  
可以在免费SSL的网站上，为自己的域名生成90天免费证书（可无限续签）。  
这里提供两个可以免费申请90天SSL证书的地址：
> https://www.cersign.com/free-ssl-certificate.html  
> https://www.mianfeissl.com/  

<br />

## 配置反向代理

以下示范环境是`CentOS`操作系统内使用`yum install nginx`安装的Nginx`1.20.1`，配置文件目录`/etc/nginx/nginx.conf`，Web面板版本`9.8.0`，守护进程版本`3.3.0`。  
仅供参考，请理解主要内容，并依据自己的需求以及运行环境进行更改。  
假设：  
> 只需监听IPv4的端口  
> Daemon端真正监听的端口：24444  
> Daemon端代理后端口：12444  
> Web面板端真正监听的端口：23333  
> Web面板端代理后端口：12333  
> ssl证书目录：/etc/nginx/ssl/domain.com.crt  
> ssl证书私钥目录：/etc/nginx/ssl/domain.com_rsa.key  

```nginx
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

# 以上内容可能已经包含在nginx.conf里，确保目录正确无误即可。
#========================================================
# 以下才是需要理解并修改的内容。
# 仅供参考，请理解主要内容，并依据自己的需求以及运行环境进行更改。
# 文中假设：
#    只需监听IPv4的端口
#    Daemon端真正监听的端口：24444
#    Daemon端代理后端口：12444
#    Web面板端真正监听的端口：23333
#    Web面板端代理后端口：12333
#    ssl证书目录：/etc/nginx/ssl/domain.com.crt
#    ssl证书私钥目录：/etc/nginx/ssl/domain.com_rsa.key

http {
    # 配置SSL证书。以下监听的ssl端口将默认使用该证书。
    # 你的域名证书crt文件所在目录
        ssl_certificate /etc/nginx/ssl/domain.com.crt;
    # 你的域名证书私钥key文件所在目录
        ssl_certificate_key /etc/nginx/ssl/domain.com_rsa.key;

    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_protocols TLSv1.2; # 仅允许使用TLSv1.2建立连接
    ssl_verify_client off; # 关闭客户端证书验证

    # 这块是在传输时默认开启gzip压缩
    gzip on;
    # 传输时需要被压缩的类型
    gzip_types text/plain text/css application/javascript application/xml application/json image/png;
    # 反向代理时，启用压缩
    gzip_proxied any;
    # 传输时压缩等级，最高9级
    gzip_comp_level 5;
    # 传输时大小达到1k才压缩
    gzip_min_length 1k;

    # 响应头中的server仅返回nginx，不返回版本号。
    server_tokens  off;

    server {
        # 这块是用于阻止跨域访问的。

        # Daemon 端访问端口
            listen 12444 ssl;
        # 可以通过多个listen监听多个地址与端口。

        # Web面板访问端口
            listen 12333 ssl;
        # 可以通过多个listen监听多个地址与端口。

        server_name _; #若使用的域名在其它server{}中都无法匹配，则会匹配这里。

        ssl_reject_handshake on; # 使用https访问时，直接断开连接，不返回证书。

        # 使用HTTP访问时，断开连接。
        error_page 497 =200 /;
        location / {
            return 444;
        }
    }
    server {
        # Daemon 端localhost访问HTTP协议端口
            listen 127.0.0.1:12444;
        # 可以通过多个listen监听多个地址与端口。

        # 本地回环域名
        server_name localhost;
        
        gzip off; # 本地回环地址不占用宽带，不需要压缩。

        # 开始反向代理
        location / {
            # 填写Daemon进程真正监听的端口号，不要漏掉后面的斜杠！
                proxy_pass http://localhost:24444/;

            # 一些必要的请求头
            proxy_set_header Host $host:$server_port;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            # 增加响应头
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-store; # 禁止客户端缓存，防止更新不及时
        }
    }
    server {
        # Daemon 端公网HTTPS端口
            listen 12444 ssl;
        # 可以通过多个listen监听多个地址与端口。

        # 你访问时使用的域名（支持通配符，但通配符不能用于根域名）
            server_name domain.com *.domain.com;

        deny 127.0.0.1; # 禁止来源127.0.0.1的IP访问，这块主要是测试的时候为了确保localhost真的不是访问这里。

        # 在示范内容之前已经填了ssl证书相关配置，因此这里并没有ssl配置。您也可以在此处单独配置ssl。

        # 使用HTTP访问时，断开连接。
        error_page 497 =200 /444nginx;
        location =/444nginx {
            return 444;
        }
        
        # 绝对防止搜索引擎收录
        location =/robots.txt{
            default_type text/plain;
            return 200 "User-agent: *\nDisallow: /";
        }

        # 开始反向代理
        location / {
            # 填写Daemon进程真正监听的端口号，不要漏掉后面的斜杠！
                proxy_pass http://localhost:24444/;

            # 一些必要的请求头
            proxy_set_header Host $host:$server_port;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            # 增加响应头
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-store; # 禁止客户端缓存，防止更新不及时
        }
    }
    server {
        # Web 端公网HTTPS端口
            listen 12333 ssl;
        # 可以通过多个listen监听多个地址与端口。

        # 你访问时使用的域名（支持通配符，但通配符不能用于根域名）
            server_name domain.com *.domain.com;
        
        # 在示范内容之前已经填了ssl证书相关配置，因此这里并没有ssl配置。您也可以在此处单独配置ssl。

        # 使用HTTP访问时，断开连接。
        error_page 497 =200 /444nginx;
        location =/444nginx {
            return 444;
        }

        # 绝对防止搜索引擎收录
        location =/robots.txt{
            default_type text/plain;
            return 200 "User-agent: *\nDisallow: /";
        }

        # 开始反向代理
        location / {
            # 填写Web面板端真正监听的端口号，不要漏掉后面的斜杠！
                proxy_pass http://localhost:23333/;

            # 一些必要的请求头
            proxy_set_header Host $host:$server_port;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            # 增加响应头
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-stone; # 禁止客户端缓存，防止更新不及时
        }
    }

}
```
配置完成后，重启 Nginx 服务（以下命令用于Linux操作系统）
```bash
systemctl restart nginx
```

<br />

## 客户端访问时，需要注意的

请不要使用IE浏览器或其它版本过旧的浏览器访问，建议使用以下版本较新的浏览器：
> [Google Chrome](https://www.google.cn/chrome/)  
> [Microsoft Edge](https://www.microsoft.com/edge/download)  
> [Mozilla FireFox](https://www.firefox.com.cn/)  

依据示范的配置内容，需要在系统内开启`TLSv1.2`（通常默认开启），且直接使用 `https://` 协议访问，而不要使用 `http://` 协议。  
假设域名是`domain.com`，反向代理后的端口是`12333`，那么浏览器需要使用这个地址访问面板：
```
https://domain.com:12333/
```

请确保反向代理后的面板端口与节点端口都通过了防火墙，否则您是无法正常访问的。  

<br />

## Web面板后台使用 WS 协议连接`本地回环地址`的守护进程

在[守护进程管理](connect_daemon.md)里，填写地址为 `localhost` ，端口填写反向代理后的端口号（例如12444），然后单击右侧的 `连接` 或 `更新` 即可。  
请注意：不能将地址填写为 `ws://localhost` ！这会导致浏览器尝试使用HTTP协议连接！  

![图片1](images/default_ws_daemon.png)

<br />

## Web面板后台使用 WSS 协议连接`非本地回环地址`的守护进程

由于您为守护进程的 `非本地回环地址` 配置了HTTPS访问，且Web面板后台使用 `非本地回环地址` 连接守护进程，此时守护进程管理界面中，该节点状态可能是离线的。  

在[守护进程管理](connect_daemon.md)里，将原有的地址前面添加 `wss://` 协议头，端口填写反向代理后的端口号（例如12444），然后单击右侧的 `连接` 或 `更新` 即可。

例如以下两种原地址：
> domain.com  
> ws://domain.com  

修改后：
> wss://domain.com  

![图片](images/wss_daemon.png)

<br />

## 大功告成

依据以上步骤，您的面板以及守护进程的https访问应该正常工作。  
为了安全，您应当在防火墙中，禁止公网设备通过以下端口访问：
> Web面板端真正监听的端口（例如23333）  
> Daemon端真正监听的端口（例如24444） 
 
（部分VPS可能是用共享IP，这俩端口在公网中可能默认就无法访问）  

<br />
