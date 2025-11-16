# Reverse Proxy for HTTPS with Caddy

:::tip
**Make sure you FULLY understand the [Network Architecture](/ops/mcsm_network.md) before continue.**
:::

## Generate SSL Certificate

Caddy has built-in support for Let's Encrypt, which can automatically obtain and renew certificates when domain names are properly configured. If you prefer to use other certificate providers, manual configuration is also possible.

> [https://ohttps.com/](https://ohttps.com/)  
> [https://www.mianfeissl.com/](https://www.mianfeissl.com/)  
> [https://zerossl.com/](https://zerossl.com/)

If you don't have a domain name and want to access directly via IP address, you can use Caddy's built-in feature to automatically generate self-signed certificates.

## Locate the Config File

On Linux systems, Caddy's configuration file is located at `/etc/caddy/Caddyfile`.

On Windows systems, you need to manually create a file named `Caddyfile` (without extension) in the directory where the Caddy executable is located.

## Prepare the Reverse Proxy

Please ensure the following configurations are ready before starting. You may adjust them according to your needs.

1. Caddy configuration file.
2. Non-SSL node address and port: `127.0.0.1:24444`.
3. Non-SSL panel address and port: `127.0.0.1:23333`.
4. HTTPS port to be used for the node: `12444`.
5. HTTPS port to be used for the panel: `12333`.
6. [***If using domain***] Domain name correctly resolved to IP.
7. Firewall or port forwarding has allowed ports `12444` and `12333`.

## Daemon Reverse Proxy Configuration

Below is a sample configuration. You need to replace "domain_or_ip" with your actual domain name or IP address. You may change the ports or adjust the configuration according to your situation.
Configuration can be written directly in the Caddyfile.
If you have multiple nodes, simply repeat the following configuration with different ports and addresses.

```
# MCSManager Daemon
domain_or_ip:12444 {

    # Enable HSTS. Once enabled, it will enforce the use of HTTPS to connect to daemons and will continue for a year after this policy is cancelled, unless manually cleared in the browser.
	# Disabled by default, uncomment to enable.
    # header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"

    encode {
        zstd            # Enable zstd compression
        gzip 6          # Enable gzip, level 6 (1-9)
        # Only enable compression for files larger than 1KB
        minimum_length 1024
        # Specify MIME types to compress (avoid re-compressing already compressed formats)
        match {
            header Content-Type text/*
            header Content-Type application/javascript*
            header Content-Type application/xml*
            header Content-Type application/json*
            header Content-Type application/xhtml+xml*
            header Content-Type image/svg+xml*
            header Content-Type font/*
        }
    }

    reverse_proxy localhost:24444 {

        # Request headers. Generally no need to change
        header_up Host {http.request.host}
        header_up X-Real-IP {http.request.remote.host}
        header_up X-Forwarded-For {http.request.remote.host}
        header_up REMOTE-HOST {http.request.remote.host}

        # Support reverse proxying WebSocket
        header_up Connection {http.request.header.Connection}
        header_up Upgrade {http.request.header.Upgrade}

        # Disable cache
        buffer_requests   off
        buffer_responses  off
    }
}
```


## Panel Reverse Proxy Configuration

Below is a sample configuration. You need to replace "domain_or_ip" with your actual domain name or IP address. You may change the ports or adjust the configuration according to your situation.
Configuration can be written directly in the Caddyfile.

```
# MCSManager Panel
domain_or_ip:12333 {

    # Enable HSTS. Once enabled, it will enforce the use of HTTPS to connect to the panel and will continue for a year after this policy is cancelled, unless manually cleared in the browser.
	# Disabled by default, uncomment to enable.
    # header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"

    encode {
        zstd            # Enable zstd compression
        gzip 6          # Enable gzip, level 6 (1-9)
        # Only enable compression for files larger than 1KB
        minimum_length 1024
        # Specify MIME types to compress (avoid re-compressing already compressed formats)
        match {
            header Content-Type text/*
            header Content-Type application/javascript*
            header Content-Type application/xml*
            header Content-Type application/json*
            header Content-Type application/xhtml+xml*
            header Content-Type image/svg+xml*
            header Content-Type font/*
        }
    }

    reverse_proxy localhost:23333 {
        # Request headers. Generally no need to change
        header_up Host {http.request.host}
        header_up X-Real-IP {http.request.remote.host}
        header_up X-Forwarded-For {http.request.remote.host}
        header_up REMOTE-HOST {http.request.remote.host}

        # Support reverse proxying WebSocket
        header_up Connection {http.request.header.Connection}
        header_up Upgrade {http.request.header.Upgrade}

        # Disable cache
        buffer_requests   off
        buffer_responses  off
    }
}
```

## Start Caddy

```bash
caddy run
```

## Verify Configuration

Suppose the domain is **_domain.com_** and the reverse proxy ports are `12333` and `12444`, then the browser needs to use these addresses to access:

```txt
Panel: https://domain.com:12333/
Daemon: https://domain.com:12444/
```

Access the daemon address via browser. If you see the following content, the daemon reverse proxy has been correctly configured.

> [MCSManager Daemon] Status: OK | reference: https://mcsmanager.com/

Access the panel address via browser. If you see the MCSManager login page, the panel reverse proxy has been correctly configured.

## Configure MCSM to Use HTTPS Connection

At this point, if you access the web interface, you'll find you can log in and use the panel.

**However**

If you enter an instance console, upload files, download files, etc., you'll find it still **cannot be used normally**, because MCSManager requires the browser to directly connect to remote nodes. Since you've upgraded to HTTPS, the browser **refuses** to use Websocket+HTTP protocol to connect to remote nodes!

> [Why does the browser need to connect to remote nodes?](/ops/mcsm_network.md)

Go to `Node Management`, you might find connections to remote nodes using `localhost`, `123.x.x.x`, or other domains. At this point, you must configure a reverse proxy for each remote node **separately**, so they all use HTTPS+WebSocket connection.

After configuration, use `wss://localhost`, `wss://123.x.x.x`, or `wss://domain.com` to replace the original `localhost`, `123.x.x.x`, or `domain.com` respectively.