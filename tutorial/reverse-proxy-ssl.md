# Deploying HTTPS to MCSManager

This tutorial uses Nginx for demonstration.

**Prerequisites**: Ngxin, MCSManager, and configured reverse proxy.

> Warning: We do not recommend configuring HTTPS. MCSManager uses a relatively complicated connection scheme, and adding HTTPS will makes it even more complex. If you are in a trusted network environment, HTTPS is not required.
<br />

## Configure reverse proxy

Reference: [Reverse proxy](/tutorial/simple-reverse-proxy.md).

<br />

## Obtain HTTPS certificate

For HTTPS to work you need a SSL certificate. 
You can obtain a free one from provider like Let's Encrypt.
You can also use your existing certificate or generate one on your own.

<br />

## Site-wide HTTPS (important)

For security reasons, modern browsers now require a site-wide HTTPS once enabled. That is, if you use HTTPS for the web panel, you also need to deploy HTTPS for the daemon (as browsers talk directly to them.)

Therefore, you need to configure reverse proxies for both port 24444 (Daemon) and 23333 (web)

Note: All daemons configured in the web panel need to have HTTPS enabled, otherwise some functionalities may not work.

<br />

## Update Daemon Information


Refers to [adding daemon](/configuration/adding-daemon.md), add the `wss://` protocol header to the original address.

For example, if the original address is `localhost`, modify it as: `wss://localhost`.

Once finished, apply the new configuration and the Daemon should be online now. 

<br />
