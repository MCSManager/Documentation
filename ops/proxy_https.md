# Reverse Proxy for HTTPS

:::tip
Given MCSManager's distrbuted architecture, it is complex to configure HTTPS, and it requries some level of professional network knowledge. It is **STRONGLY** advised for general users to **NOT** configure HTTPS.

**Make sure you FULLY understand the [Network Architecture](/ops/mcsm_network.md) before continue.**\
**The following steps will assume the reader has basic network knowledge (e.g. SSL certificate).**
:::

## Generate SSL Certificate

The following websites provide free 90-days SSL certificate for your domain. You can also choose other providers.

> <a href="https://www.cersign.com/free-ssl-certificate.html" target="_blank">https://www.cersign.com/free-ssl-certificate.html</a>  
> <a href="https://www.mianfeissl.com/" target="_blank">https://www.mianfeissl.com/</a>

If you don't have a domain, and want to use HTTPS with IP address, a certificate can be obtained here:

> <a href="https://zerossl.com/" target="_blank">https://zerossl.com/</a>

You can also choose to get a certificate from `Let's Encrypt`, `Other CA`, or `Self-Signed Certificate`. Note, that a self-signed certificate is not trusted by OS and browser by default, it has to be added to the certificate store manually.

```
#Generate a Self-Signed Certificate using OpenSSL
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

## Locate the Config Location

We use `Nginx` as an example, as it is the most prevalent reverse proxy on the field. For `Apache` or `Caddy`, feel free to come up with your own configuration.

By default, Nginx stores configurations in `/etc/nginx/nginx.conf`. For different Linux distributions, the location might be slightly different.

## Prepare the Certificate Chain

Ignore this step if a self-signed certificate is being used.

**Prepare the following files**:

1. Issued certificate, e.g. **_domain.crt_**。
2. Certificate of CA, can be downloaded from their website. e.g. **_ca.crt_**.
3. Private key of issued certificate, e.g. **_domain.key_**。

We will use **_domain.crt_**, **_ca.crt_**, **_domain.key_** as examples in this tutorial.

If you are using `Nginx` as the reverse proxy, open **_domain.crt_** and **_ca.crt_** with any editor, and copy the content of **_ca.crt_** to the bottom of **_domain.crt_**.

## Prepare the Reverse Proxy

Please ensure that the following files and configurations are ready before starting. You may adjust them according to your need.

1. Configured cert chain and path: `/etc/nginx/ssl/domain.crt`.
2. Private key of the cert and path: `/etc/nginx/ssl/domain.key`.
3. Nginx main config location: `/etc/nginx/nginx.conf`.
4. Current (non-SSL) local address and port for the daemon: `127.0.0.1:24444`.
5. Current (non-SSL) local address and port for the panel: `127.0.0.1:23333`.
6. HTTPS port for the daemon: `12444`.
7. HTTPS port for the panel: `12333`.
8. [***If use domain***] Domain correctly resolved to the public IP.
9. Firewall allowed or port forwarded `12444` and `12333`.

## Reverse Proxy for the Daemon

Below is a sample configuration, you can change the port or adjust the settings according to your actual situation.\
Save as `daemon_https.conf` and put it in the `/etc/nginx/sites-enabled`directory\
You can also place the configuration directly at the end of the `nginx.conf` file (before the last curly brace).\
In case of multiple daemons, simple add the following configuration repeatedly with different ports and addresses.

```
# Sample HTTPS reverse proxy for MCSManager Daemon
server
    {
		# Public HTTPS port for the daemon (use multiple `listen` directive for multiple ports)
		listen 12333 ssl http2; #IPV4
		listen [::]:12333 ssl http2; #IPv6

		# Enable HSTS. Once enabled, it will enforce the use of HTTPS to connect to daemons and will continue for a year after this policy is cancelled, unless manually cleared in the browser.
		# Disable by default, uncomment to enable.
		#add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

		# DNS resolver, only required when the traffic will be forwarded to a remote daemon connected via a domain.
		resolver 8.8.8.8;

		# Automatically redirect HTTP to HTTPS
		error_page 497 https://$host:$server_port$request_uri;

		proxy_hide_header Upgrade;
		location / {
				# Request Headers. No need to change in general
				proxy_set_header Host $host;
				proxy_set_header X-Real-Ip $remote_addr;
				proxy_set_header X-Forwarded-For $remote_addr;
				proxy_set_header REMOTE-HOST $remote_addr;

				# Target daemon address and port. Support domain and HTTPS.
				proxy_pass http://127.0.0.1:24444;

				# Support WebSocket
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection "upgrade";

				# Max size for a single file being transferred. 0 for unlimited.
				client_max_body_size 0;

				# Disable cache
				proxy_request_buffering off;
				proxy_buffering off;
				  }
		# Path to HTTPS certificate and key
		ssl_certificate /etc/nginx/ssl/domain.crt;
		ssl_certificate_key /etc/nginx/ssl/domain.key;

		# Enable gzip by default
		gzip on;

		# File that will be compressed during transfer
		gzip_types text/plain text/css application/javascript application/xml application/json;

		# Enable compression with reverse proxy
		gzip_proxied any;

		# Compression level during transmission; the higher the level, the more CPU is used for compression.
		# The maximum level is 9, but usually, level 5 is sufficient
		gzip_comp_level 5;

		# Only compress when the size during transmission reaches 1k, as compressing smaller content is pointless.
		gzip_min_length 1k;

		# Supported protocols, algorithms, and timeout settings, etc. Generally, there's no need to change these.
		ssl_session_timeout 5m;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
		ssl_prefer_server_ciphers on;
    }
```

## Reverse Proxy for the Panel

Below is a sample configuration, you can change the port or adjust the settings according to your actual situation.\
Save as `web_https.conf` and put it in the `/etc/nginx/sites-enabled`directory\
You can also place the configuration directly at the end of the `nginx.conf` file (before the last curly brace).

```
# Sample HTTPS reverse proxy for MCSManager Web Panel
server
    {
		# Public HTTPS port for the panel (use multiple `listen` directive for multiple ports)
		listen 12444 ssl http2; #IPV4
		listen [::]:12444 ssl http2; #IPv6

		# Enable HSTS. Once enabled, it will enforce the use of HTTPS to connect to the panel and will continue for a year after this policy is cancelled, unless manually cleared in the browser.
		# Disable by default, uncomment to enable.
		#add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

		# DNS resolver, only required when the traffic will be forwarded to a remote panel connected via a domain.
		resolver 8.8.8.8;

		# Automatically redirect HTTP to HTTPS
		error_page 497 https://$host:$server_port$request_uri;

		proxy_hide_header Upgrade;
		location / {
				# Request Headers. No need to change in general
				proxy_set_header Host $host;
				proxy_set_header X-Real-Ip $remote_addr;
				proxy_set_header X-Forwarded-For $remote_addr;
				proxy_set_header REMOTE-HOST $remote_addr;

				# Target daemon address and port. Support domain and HTTPS.
				proxy_pass http://127.0.0.1:23333;

				# Support WebSocket
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection "upgrade";

				# Max size for a single file being transferred. 0 for unlimited.
				client_max_body_size 0;

				# Disable cache
				proxy_request_buffering off;
				proxy_buffering off;
				  }

		# Path to HTTPS certificate and key
		ssl_certificate /etc/nginx/ssl/domain.crt;
		ssl_certificate_key /etc/nginx/ssl/domain.key;

		# Enable gzip by default
		gzip on;

		# File that will be compressed during transfer
		gzip_types text/plain text/css application/javascript application/xml application/json;

		# Enable compression with reverse proxy
		gzip_proxied any;

		# Compression level during transmission; the higher the level, the more CPU is used for compression.
		# The maximum level is 9, but usually, level 5 is sufficient
		gzip_comp_level 5;

		# Only compress when the size during transmission reaches 1k, as compressing smaller content is pointless.
		gzip_min_length 1k;

		# Supported protocols, algorithms, and timeout settings, etc. Generally, there's no need to change these.
		ssl_session_timeout 5m;
		ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
		ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
		ssl_prefer_server_ciphers on;
    }
```

## Verify Nginx Configuration

Once the configuration is ready, use `sudo nginx -t` to tset the configuration.

```
#Sample Output
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Once succeeded, use `sudo nginx -s reload` to reload Nginx.

```
#Sample Output
2024/01/27 22:57:17 [notice] 4826#4826: signal process started
```

Suppose the domain being used is **_domain.com_** , and the HTTPS port is `12333` (for daemon) and `12444` (for panel), we can then access the following URL using any browser:

```
Panel: https://domain.com:12333/
Daemon: https://domain.com:12444/
```

For the daemon, if the following content is displayed, the HTTPS reverse proxy is successfully configured!

> [MCSManager Daemon] Status: OK | reference: https://mcsmanager.com/

For the web, if the login page is displayed correctly, the HTTPS reverse proxy is successfully configured!

## Connect via HTTPS

At this point, if you acess the web panel, you'll find that you can log in without problem.

**However**

If you enter any instance console to upload or download files, etc., you will find that it **still doesn't work** properly. This is because MCSManager requires the browser to connect **directly** to remote daemon. Since you've upgraded to HTTPS, the browser **refuses** to use the Websocket+HTTP protocol to connect to remote daemon!

> [Why does the browser need to connect directly to the remote daemons?](mcsm_network)

Go to the `Daemons` tab, you might find connections to remote daemons using `localhost`, `123.x.x.x`, or other domains. A reverse proxy for each remote daemon **_must be configured separately_**, so that they all use HTTPS to connect.

Once configured, replace the original `localhost`, `123.x.x.x`, or `domain.com` with `wss://localhost`, `wss://123.x.x.x`, or `wss://domain.com` respectively.

Congratulations, you have now successfully enabled HTTPS for your panel :-)
