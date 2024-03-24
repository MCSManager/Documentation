# Using Cloudflare CDN

:::tip
**Before reading this section, please fully understand the [「Network Principle」](./mcsm_network) and [「HTTPS Reverse Proxy」](./reverse_proxy.md) chapters**. \
This section is intended for users of Cloudflare CDN.
:::

This section explains how to access the daemon from the panel while using Cloudflare as a proxy. 

Note that Cloudflare only serves as a CDN and does **NOT** provide port conversion services. That is, the port Cloudflare uses to access the **source server** is the **SAME** as the port users use to access Cloudflare. 

If you want multiple daemons to share one public port, consider using different subdomains and configure Nginx to forward differently based on the domain.

:::warning
Cloudflare only support the following HTTPS ports:
- 443
- 2053
- 2083
- 2087
- 2096
- 8443

Please choose one of the above ports as the external HTTPS port.
:::

## 1. Configure DNS
1. Log in to the Cloudflare console and open the sub-panel for your domain.
2. In the `DNS` submenu in the sidebar, find `Records`, and add a new `A` or `CNAME` record pointing to your host.
3. Ensure `Proxy Status` is set to `DNS only` at this moment and save.

## 2. Configure HTTPS Reverse Proxy
Before configuring Cloudflare CDN, (if not already) follow the [「HTTPS Reverse Proxy」](./reverse_proxy.md) section and enable HTTPS for your panel and daemon(s) using **one of the ports mentioned above**. You can use a `self-signed` or `Cloudflare's` SSL certificate.

Please make sure you can connect via a browser using the domain configured before continue.

### Using Cloudflare's Certificate:

1. Open the Cloudflare panel and the sub-panel for your domain.
2. In the `SSL/TLS` submenu, find the `Origin Server` option and open it.
3. Click `create certificate`, and choose private key type, domain, and validity period (recommended: `ECC` private key type, keep domain `default`, and select `15 years` validity).
4. Copy and save the certificate and key.

### Using a Self-Signed Certificate:

```
#Generate a Self-Signed Certificate using OpenSSL
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

## 3. Configure Cloudflare

Open the Cloudflare panel and the sub-panel for your domain, and open the `SSL/TLS` menu.

1. If you're using a `self-signed certificate`, change the SSL/TLS **`encryption mode`** to **`Full`**.
2. If you're using a Cloudflare certificate, you can choose between **`Strict`** or **`Full`**. In general, **`Full`** is sufficient for **`most`** users.

In the `DNS` submenu, find `Records`.
1. Edit the `A` or `CNAME` record you just added.
2. Change `Proxy Status` to `Proxied` and save.

## 4. Test Access
Using the domain configured in **step two**, test access **again** with your browser.

If it displays correctly, congratulations! You have successfully enabled Cloudflare for your panel and/or node!\
Now, you can add nodes to your panel following the steps in the [「HTTPS Reverse Proxy」](./reverse_proxy.md) section.


If the test fails, you may need to manually clear the DNS cache and retry.
