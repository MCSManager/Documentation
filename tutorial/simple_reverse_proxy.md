# Reverse Proxy

This tutorial uses Nginx for descriptions

**Prerequisites**: Nginx installed, MCSManager installed.

## Notice

You don't necessarily need to do this step, and if you don't, then don't do it.

## Configure reverse proxy

The purpose of a reverse proxy is usually to pass all traffic through Nginx for further optimization, etc.

By default, MCSManager has two programs that need reverse proxy, namely `23333` and `24444` ports.

Edit `/etc/nginx/nginx.conf` configuration file (Linux)

```conf
# These are the default configurations of Nginx, please copy them according to your situation.
# If there is an error or cannot be started after configuration, please restore the original configuration file and only cover the content of the Http{ ... } section.
# Consider deleting all Chinese comments to solve the phenomenon of configuration garbled characters.
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
events {
worker_connections 768;
}

# configuration start
http {
     # Limit file upload size to 10G
     client_max_body_size 10240M;

server {
         # Web-side public network access port
         listen 8081;

         location / {
             # Web side reverse proxy target
             proxy_pass http://localhost:23333/;
             root html;
             index index.html index.htm;
             # Some necessary HTTP Header settings
             proxy_set_header Host localhost;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header REMOTE-HOST $remote_addr;
             # Required Websocket support
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
             add_header X-Cache $upstream_cache_status;
             add_header Cache-Control no-cache;
             expires 12h;
         }
     }

     server {
         # Daemon public network access port
         listen 8082;

         location / {
             # Daemon side reverse proxy target (the configuration is the same as that of the web side)
             proxy_pass http://localhost:24444/;
             root html;
             index index.html index.htm;
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

**Restart Nginx service**

```bash
# possible commands
systemctl restart nginx
systemctl restart http
systemctl restart httpd
```

After the configuration is complete, visit http://{public IP}:8081/ to enjoy the reversed address.

<br />

## Reconnect to daemon

After the reverse generation is established, please use the reversed Daemon port connection again.

The above configuration reverses 8082 to port 24444. Even if you are using a localhost address, it is recommended to use port 8082 for connection.

<br />
