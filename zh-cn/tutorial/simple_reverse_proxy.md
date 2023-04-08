# 配置 HTTP 反向代理

若您需要 HTTPS 反向代理，请参考 [配置HTTPS反向代理](reverse_proxy+ssl.md) 。  
若您需要合并端口，请参考 [配置HTTP反向代理且合并端口](http_proxy_merge_ports.md) 。

此教程使用 Nginx 进行演示。  
您应当 充分理解 本文的内容，便于依据自己的需求进行更改。  
> 本地回环地址：在本文是指域名 `localhost` 以及IPv4 `127.0.0.1` 。  
> 守护进程：意思同Daemon节点、Daemon进程、Daemon端。  
> Web面板后台：指Web面板的程序，不是守护进程，不是浏览器。  

### 警告：

使用HTTP协议可能会在毫不知情的情况下遭到网页内容篡改、窃取连接内容，若想要确保连接安全，请 [配置HTTPS反向代理](reverse_proxy+ssl.md) 。  
若您未理解本文的主要内容，则不建议配置HTTP反向代理。  

<br />

## 需要安装的

> [Nginx](https://nginx.org/)  
> [MCSManager](https://mcsmanager.com/)  

<br />

## 配置反向代理

以下示范环境是`CentOS`操作系统内使用`yum install nginx`安装的Nginx`1.20.1`，配置文件目录`/etc/nginx/nginx.conf`，Web面板版本`9.8.0`，守护进程版本`3.3.0`。  
仅供参考，请依据自己的需求以及运行环境进行更改。  
假设：  
> 只需监听IPv4的端口  
> Daemon端真正监听的端口：24444  
> Daemon端代理后端口：12444  
> Web面板端真正监听的端口：23333  
> Web面板端代理后端口：12333  
> 需要允许主域名 domain.com 及其所有子域名访问  

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
# 假设：
#    只需监听IPv4的端口
#    Daemon端真正监听的端口：24444
#    Daemon端代理后端口：12444
#    Web面板端真正监听的端口：23333
#    Web面板端代理后端口：12333
#    需要允许主域名 domain.com 及其所有子域名访问

http {
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
            listen 12444 default;
        # 可以通过多个listen监听多个地址与端口。

        # Web面板访问端口
            listen 12333 default;
        # 可以通过多个listen监听多个地址与端口。

        server_name _; #若使用的域名在其它server{}中都无法匹配，则会匹配这里。
        return 444; # 断开连接。
    }
    server {
        # Daemon 端代理后的localhost访问HTTP协议端口
            listen 12444;
        # 可以通过多个listen监听多个地址与端口。

        server_name localhost;

        # 仅允许127.0.0.1通过localhost访问，其它IP会返回403
        allow 127.0.0.1;
        deny all;

        gzip off; # 本地回环地址不需要压缩传输

        # 开始反向代理
        location / {
            # 填写Daemon进程真正监听的端口号，别漏后面的斜杠！
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
        # Daemon 端代理后的HTTP协议端口
            listen 12444;
        # 可以通过多个listen监听多个地址与端口。

        # 你访问时使用的域名（支持通配符，但通配符不能用于根域名）
        # 您不应该加上localhost
            server_name domain.com *.domain.com;

        deny 127.0.0.1; # 禁止来源127.0.0.1的IP访问，这块主要是测试的时候为了确保localhost真的不是访问这里。

        # 绝对防止搜索引擎收录
        location =/robots.txt{
            default_type text/plain;
            return 200 "User-agent: *\nDisallow: /";
        }

        # 开始反向代理
        location / {
            # 填写Daemon进程真正监听的端口号，别漏后面的斜杠！
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
        # Web 端代理后的HTTP端口
            listen 12333;
        # 可以通过多个listen监听多个地址与端口。

        # 你访问时使用的域名（支持通配符，但通配符不能用于根域名）
            server_name domain.com *.domain.com;
        
        # 绝对防止搜索引擎收录
        location =/robots.txt{
            default_type text/plain;
            return 200 "User-agent: *\nDisallow: /";
        }

        # 开始反向代理
        location / {
            # 填写Web面板端真正监听的端口号，别漏后面的斜杠！
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

## 客户端访问Web面板时，需要注意的

假设域名是`domain.com`，反向代理后的端口是`12333`，那么浏览器需要使用这个地址访问面板：
```
http://domain.com:12333/
```

请确保反向代理后的端口都通过了服务器的防火墙，否则您是无法正常访问的。  

<br />

## Web面板后台使用 WS 协议连接守护进程

假设Web面板后台通过 `localhost` 连接节点，那么在[守护进程管理](connect_daemon.md)里，填写地址为 `localhost` ，端口填写反向代理后的端口号（例如12444），然后单击右侧的 `连接` 或 `更新` 即可。  
也可以将地址填写为 `ws://localhost` 。  
假设需要填远程地址 `domain.com` ，那么将 `localhost` 改为 `domain.com` 即可。

![图片1](images/default_ws_daemon.png)

<br />

## 大功告成

依据以上步骤，您的面板以及守护进程的http协议访问应该正常工作。  
为了安全，您应当在防火墙中，禁止公网设备通过以下端口访问：
> Web面板端真正监听的端口（例如23333）  
> Daemon端真正监听的端口（例如24444） 
 
<br />
