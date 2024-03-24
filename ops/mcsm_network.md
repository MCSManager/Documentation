# Panel Network Principle

<tip>

If you want to understand how to enable Reserve Proxy perfectly, you need to understand how this panel works. This page will tell you the MCSManager distributed network principle.

</tip>

First of all, MCSManager allows you to use a `web` to connect all the different `machines` or `servers/vps`, we call them `nodes`.

If a lot of users are uploading files to different `nodes` and **all files are proxied or path `web` use a lot of bandwidth, the program will crash or stop responding.**

To solve this problem, `web` is only for authorising and letting browsers connect `nodes` directly, file uploads, jornals, etc. So all requests are separated to nodes.

## Duty of Web & Daemon

MCSManager separeted into two part, `web` panel and `daemon`.

**Web: **

- User management
- Connect nodes
- Authorize controls and requests
- APIs
- etc.

**Daemons:**

- Actual instance process
- Docker container manage
- File management
- Real-time instance control
- etc.

## Disadvantage?

This will make it hard to configure reserve proxy and HTTPS. Usually only need proxy one port will be fine, but MCSManager using distributed desgin, so you need proxy atleast two ports. If you use HTTPS, browser need all requests under HTTPS, so you need to configure all the nodes.

## Graph

Without any effect of environments, browsers connect directly to daemon to control files and data transfer to use less bandwidth of web.

So you need to set proxy daemon ports to public, otherwise you will see `connecting` to nodes section.

![分布式原理图](../images/zh_cn/distributed_principle.png)
