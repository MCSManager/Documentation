# 反向代理

此教程使用 Nginx 进行描述

**先决条件**：Nginx 已安装，MCSManager 已安装。

<br />

## 配置反向代理

反向代理的目的通常是将所有流量全部经过 Nginx ，以便于进一步优化等。

MCSManager 在默认情况下有两个程序需要反向代理，分别是 `23333` 与 `24444` 端口。

编辑 `/etc/nginx/nginx.conf` 配置文件（Linux）

```conf
# 这些是 Nginx 默认配置，请您依照情况复制。
# 如果配置后有报错或无法启动，请恢复原有配置文件并且只覆盖 Http{ ... } 段的内容即可。
# 可考虑删除所有中文注释以解决出现配置乱码现象。
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
events {
	worker_connections 768;
}

# 配置开始
http {
    # 限制文件上传大小为 10G
    client_max_body_size 10240M;

	server {
        # Web 端公网访问端口
        listen 8081;

        location / {
            # Web 端反向代理目标
            proxy_pass http://localhost:23333/;
            root   html;
            index  index.html index.htm;
            # 一些必要的 HTTP Header 设置
            proxy_set_header Host localhost;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # 必须的 Websocket 支持
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-cache;
            expires 12h;
        }
    }

    server {
        # Daemon 端公网访问端口
        listen 8082;

        location / {
            # Daemon 端反向代理目标（配置与 Web 端处同理）
            proxy_pass http://localhost:24444/;
            root   html;
            index  index.html index.htm;
            proxy_set_header Host localhost;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-cache;
            expires 12h;
        }
    }

}
```

**重启 Nginx 服务**

```bash
# 可能的命令
systemctl restart nginx
systemctl restart http
systemctl restart httpd
```

配置完毕后，访问 http://{公网 IP}:8081/ 即可享受反代之后的地址。

<br />

## 重新连接到守护进程

反代建立完毕后，请重新使用反代后的 Daemon 端口连接。

列如上述配置将 8082 反代到了 24444 端口，纵使你是 localhost 地址也建议使用 8082 端口进行连接。

![示例图](images/fandai8082.png)

<br />
