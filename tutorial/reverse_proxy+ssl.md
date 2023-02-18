# Use a reverse proxy and add HTTPS

This tutorial uses Nginx for descriptions

**Prerequisites**: Nginx has been installed, MCSManager has been installed, reverse proxy has been configured.

> Warning: We do not recommend configuring HTTPS. The distributed architecture design of the MCSManager panel is relatively complex. If HTTPS is added, the complexity will rise sharply. HTTPS is not necessary when your network communication environment is basically secure.

<br />

## Configure reverse proxy

Reference: [Reverse proxy](/tutorial/simple_reverse_proxy.md).

<br />

## Generate HTTPS certificate

Generate your own HTTPS certificate and configure Nginx as an HTTPS reverse proxy.

<br />

## Site-wide HTTPS (important)

According to the browser access policy, once the website has HTTPS, all requests must be HTTPS requests, otherwise it will be rejected by the browser.

Therefore, you must configure https+wss on the default port 24444 where the daemon is located, and port 23333 on the panel side. Only in this way will there be no error when the browser connects to the daemon.

If you have other daemons, you need to add HTTPS+WSS to \*\*every daemon, otherwise, some functions will not be available.

<br />

## Connect daemon with new protocol

Since you have configured the daemon process with https access, the connection in the daemon process management interface should be unconnectable at this time.

In [Daemon Process Management](/configuration/Connect-other-servers.md), add the `wss://` protocol header to the original address to reconnect to solve this problem.

For example, the original address: `localhost`, after modification: `wss://localhost`.

<br />

## Done

Based on the steps above, your full board https access should work fine.

<br />
