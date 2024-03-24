# Use HTTPS

<tip>

MCSManager distributed of daemon and web makes it difficult to enable HTTPS, it requires a lot of professional knowledge. If you don't have high security requirements, you don't need to enable HTTPS.

**Before start reading this page, please make sure you understand [「Panel Network Principle」](/ops/mcsm_network) and [「Use HTTPS」](/ops/proxy_https).**
</tip>

## Generate SSL Certificate

You can get a free 90-day SSL Certificate from these sites:

> <a href="https://www.cersign.com/free-ssl-certificate.html" target="_blank">https://www.cersign.com/free-ssl-certificate.html</a>  
> <a href="https://www.mianfeissl.com/" target="_blank">https://www.mianfeissl.com/</a>

If you don't have a domain and want to use an IP address with HTTPS, you can generate an SSL certificate from these sites:

> <a href="https://zerossl.com/" target="_blank">https://zerossl.com/</a>

## Reserve Proxy & Certifcate config

You need to use reserve proxy to enable HTTPS for MCSManager Panel, the panel doesn't provide HTTPS. Here is an example for `Nginx`:

```nginx
# Imagine this situation:
# Daemon listening port: 24444
# Web listening port: 23333
# Proxied Daemon port: 124444
# Proxied Web port: 123333
# SSL Certificate path：/etc/nginx/ssl/domain.com.crt
# SSL Key path：/etc/nginx/ssl/domain.com_ECC.key
# Allow root domain 'domain.com' and all sub-domain

http {
  	# Configure the SSL certificate and make it the default certificate.
    #SSL-START
    ssl_certificate "/etc/nginx/ssl/domain.com.crt";
    ssl_certificate_key "/etc/nginx/ssl/domain.com_ECC.key";

    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_protocols TLSv1.2 TLSv1.3; # Allow TLSv1.2 or TLSv1.3
    ssl_verify_client off; # Don't verify client certificate
    #SSL-END

    # Start gzip compression
    gzip on;
    # Files will be compressed
    gzip_types text/plain text/css application/javascript application/xml application/json;
    # Enable gzip while using reserve proxy
    gzip_proxied any;
    # Compression level, maximum is 9, high level will use more CPU, recommand 5.
    gzip_comp_level 5;
    # Only compress files that are over 1k in size, compressing small files is pointless.
    gzip_min_length 1k;

    # No limit for uploads
    client_max_body_size 0;

    server {
        # Daemon listening port ( Proxied )
        listen 127.0.0.1:12444 ;
        listen [::1]:12444 ; #IPv6

        # Domain ( '_' & 'localhost' for no domain)
        server_name localhost ;

        # Local transfer does not use bandwidth, pointless for gzip.
        gzip off;

        # Start proxy
        location / {
            # Daemon listening port and IP ( Origin )
            proxy_pass http://localhost:24444 ;

            # Proxy Headers
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # Enable Websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
      			# Add Cache Header
            add_header X-Cache $upstream_cache_status;
        }
    }
    server {
        # Daemon SSL listening port ( Proxied )
        listen 12444 ssl ;
        listen [::]:12444 ssl ; #IPv6

				# Your Domain ( If you don't have an domain then use IP address )
        server_name domain.com *.domain.com ;

        # Start Proxy
        location / {
            # Daemon listening port and IP ( Origin )
            proxy_pass http://localhost:24444 ;

            # Proxy Headers
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # Enable Websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            add_header X-Cache $upstream_cache_status;
        }
    }
    server {
        # Web listening port ( Proxied )
        listen 12333 ssl ;
        listen [::]:12333 ssl ; #IPv6

        # Your Domain ( If you don't have an domain then use IP address )
        server_name domain.com *.domain.com ;

        # Rewrite HTTP to HTTPS
        error_page 497 https://$host:$server_port$request_uri;

        # Start proxy
        location / {
            # Website listening port & IP ( Origin )
            proxy_pass http://localhost:23333 ;

            # Proxied Header
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header REMOTE-HOST $remote_addr;
            # Enable Websocket
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            # Add Cache Header
            add_header X-Cache $upstream_cache_status;
            # Only allow cookie while using HTTPS
            proxy_cookie_flags ~ secure;
            add_header Strict-Transport-Security "max-age=31536000";
        }
    }
}
```

After configure the nginx, reload it:

```bash
systemctl reload nginx
```

For Windows, you need restart nginx program or service.

## Visite panel

If your domain is **_domain.com_** ，proxied port is 12333 then use following address to visit your panel:

```
https://domain.com:12333/
```

After you visited, you can register and login to your panel.

**BUT**

When you try to upload and download files or use other functions. You'll find that they are not usable. Because MCSManager doesn't allow websocket + HTTP connection, you need HTTPS + websocket.

> [Why browser need connect daemon?](mcsm_network)

You need use `wss://` to connect daemon(s).

## Use websocket to connect daemon.

Open `nodes` page, you will see it is using `localhost` or `x.x.x.x` or `yourdomain.com` connect with daemons, you have to configure reserve proxy for **ALL OF DAEMONS** to enable HTTPS + Websocket.

Next, use `wss://x.x.x.x` ( x.x.x.x refer to your IP address ) or `wss://yourdomain.com` to connect your daemon, only this way can ensure HTTPS requests and enable all functions.
