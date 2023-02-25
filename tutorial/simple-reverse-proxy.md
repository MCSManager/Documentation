# Reverse Proxy

This tutorial demonstrate how to use Nginx as a reverse proxy.

**Prerequisites**: Nginx installed, MCSManager installed.

## Notice

Reverse proxies are for advanced users. This is not required for MCSM to work.
If you do not know what you are doing, DO NOT PROCEED.

## Configure reverse proxy

We use Nginx in this example.

By default, MCSManager listens on two ports `23333`(web) and `24444`(daemon). (In most cases) you need to reverse proxy both ports for it to work.

Edit the nginx configurations. (Default `/etc/nginx/nginx.conf`). The actual location may vary based on your distributions.
Sample configurations:

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
         # Web panel public access port
         listen 8081;

         location / {
             # Local address of web panel
             proxy_pass http://localhost:23333/;
             root html;
             index index.html index.htm;
             # Some necessary HTTP Header settings
             proxy_set_header Host localhost;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header REMOTE-HOST $remote_addr;
             # Required for Websocket support
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "upgrade";
             add_header X-Cache $upstream_cache_status;
             add_header Cache-Control no-cache;
             expires 12h;
         }
     }

     server {
         # Daemon public access port
         listen 8082;

         location / {
             # Local address for Daemon(s)(the configuration is the same as that of the web side)
			 # You can repeat this block for different address & port for multiple daemons.
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
#These are just sample commands that were used to restart nginx in most distributions.
systemctl restart nginx
systemctl restart http
systemctl restart httpd
```

visit http://{public IP}:8081/ to have access your new port! 
Note: usually, once reverse proxy configured, you may want to block access to the original port.

<br />

## Update Daemon information

Once reverse proxies configured, you need to update the Daemon(s) connection address in the web panel.

The above configuration exposes port 8082 on public IP and forward to port 24444 of localhost. Even if you are using a localhost address, it is recommended to use the public address for connection.

<br />
