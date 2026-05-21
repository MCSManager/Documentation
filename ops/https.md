# Enable HTTPS

:::tip
**Make sure you FULLY understand the [Network Architecture](/ops/mcsm_network.md) before continue.**
:::

## Generate SSL Certificate

The following websites provide free 90-days SSL certificate for your domain. You can also choose other providers.

> [https://zerossl.com/](https://zerossl.com/)

You can also choose to get a certificate from `Let's Encrypt`, `Other CA`, or `Self-Signed Certificate`. Note, that a self-signed certificate is not trusted by OS and browser by default, it has to be added to the certificate store manually.

```
#Generate a Self-Signed Certificate using OpenSSL
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

## Preparing the Certificate Chain Files

This step can be skipped if you are using a self-signed certificate.

Please prepare the following files:
1. The signed certificate, for example, **_domain_fullchain.crt_**.
2. The private key corresponding to the signed certificate, for example, **_domain.key_**.

This article will use **_domain_fullchain.crt_** and **_domain.key_** as example.

## Final Checks Before Starting

Before starting, please ensure the following files and configurations are ready. Adjustments can be made as needed:

1. Issued certificate chain file and path: `/root/ssl/domain_fullchain.crt`.
2. Private key corresponding to the issued certificate and path: `/root/ssl/domain.key`.
3. Daemon configuration file: `/opt/mcsmanager/daemon/data/Config/global.json`.
4. Web configuration file: `/opt/mcsmanager/web/data/SystemConfig/config.json`.
5. Domain name has been correctly resolved to IP address.
6. Firewall or port forwarding has allowed port `24444` and port `23333`.
7. Stop the web and daemon processes.

## Enable SSL

Locate the **_Web_** and **_Daemon_** configuration files respectively, and modify the following content at the end. The following is an example configuration; you can change the port or adjust the configuration according to your actual situation.

```json
{
  // This will appear when updated to supported version
  "ssl": true,                                      // Enable SSL
  "sslPemPath": "/root/ssl/domain_fullchain.crt",   // Certificate Chain
  "sslKeyPath": "/root/ssl/domain.key"              // Private Key
}
```


## Confirm if HTTPS is working

Restart the **_Web_** and **_Daemon_** after saving the config files. \
If domain name is **_domain.com_** ，open the following page in your browser:

```txt
Web: https://domain.com:23333/
Daemon: https://domain.com:24444/
```

If you see the content as before displayed on the webpage, then the node's SSL is configured correctly.