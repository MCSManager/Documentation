# Use CloudFlare CDN

:::warning
**Before start reading this page, please make sure you understand [「Panel Network Principle」](/ops/mcsm_network) and [「Use HTTPS」](/ops/proxy_https).**
This page is for Cloudflare users.
:::

In this page, you will learn how to configure your Panel while using Cloudflare CDN.

## Generate SSL Certificate

### Cloudflare certificate (Recommand)

1. Open Cloudflare dashboard and click your domain.
2. Select `Origin` in `SSL/TLS` section at sidebar.
3. Click Generate Certificate and configure the fields to suit your own situation. (Recommand ECC, default for domain, 15 years)
4. Save certificate and key.

### Use other certificate

If you are using another certificate not issued by Cloudflare, you will need to change your `SSL/TLS encryption mode` to `full`.

## Reserve proxy and certificate config

You will need to use `Nginx` or another web server to proxy your request to the Panel to enable SSL.

We use `nginx` as an example:

:::warning
Cloudflare only support these ports for SSL

- 2053
- 2083
- 2087
- 2096
- 8443

:::

```
# /etc/nginx/nginx.conf
# /etc/nginx/nginx.conf
http {

    # limit upload size
    client_max_body_size 100g;

    server {
        # Web to public
        listen 80;
        listen 443 ssl;
        ssl_certificate /path/to/file;
        ssl_certificate_key /path/to/file;

        location / {
            # Web
            proxy_pass http://localhost:23333/;
            root   html;
            index  index.html index.htm;
            proxy_set_header Host localhost;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # Websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-cache;
            expires -1;
        }
    }

    server {
        # Daemon to public
        listen 8443 ssl;
        ssl_certificate /path/to/file;
        ssl_certificate_key /path/to/file;

        location / {
            # daemon
            proxy_pass http://localhost:24444/;
            root   html;
            index  index.html index.htm;
            proxy_set_header Host localhost;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
            add_header Cache-Control no-cache;
            expires -1;
        }
    }
}

```

Change `/path/to/file` to the real path.

Restart nginx after configure `nginx.conf` by using this command:

```bash
systemctl restart nginx
```

## Start WSS connection and login to web UI

Check the last section at [Use HTTPS](/ops/proxy_https.md) to configure the setting on panel.
