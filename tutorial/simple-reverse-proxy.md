# Reverse Proxy

This tutorial demonstrates how to use Nginx as a reverse proxy.

**Prerequisites**: Nginx and MCSManager.

## Before you start

> Reverse proxies are for advanced users. This is NOT REQUIRED for MCSM to work.
If you do not know what you are doing, DO NOT PROCEED.

## Configure reverse proxy

We use Nginx in this example.

By default, MCSManager listens on two ports `23333`(web) and `24444`(daemon). (In most cases) you need to reverse proxy both ports for it to work.

Edit the Nginx configurations. (Default `/etc/nginx/nginx.conf`). The actual location may vary based on your distributions.
Sample configurations:

```conf
# These are the default configurations of Nginx, please copy them accordingly.
# If the new configuration failed to start later, remove the two newly-added server block.

user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
events {
worker_connections 768;
}

# configuration start
http {
     # Limit file upload size to 100G
     client_max_body_size 100g;

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
             expires -1;
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
             expires -1;
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

Once you finished configuring the reverse proxy, Daemon's connection address in the web panel will need to be updated.

The above configuration exposes port 8082 on public IP and forwards to port 24444 on localhost. Even if you are using a localhost address, it is still recommended to use the public address for connections.

<br />
