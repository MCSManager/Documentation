# Share port with other services

::: tip
To read and use this chapter** you must know reverse proxy of Nginx or other software and basic Linux operation and maintenance knowledge**.
:::

If you want MCSManager and other services to use the same port, there are the following solutions:

- Use different domain names sni to distinguish.
- **Add URL path prefix to localize the service. **

This section mainly explains the second type.

## What is URL path prefix?

For example: the URL when accessing the MCSManager panel is `http://localhost:23333/`. If you configure the URL prefix to `/mcsm/`, the panel's URL becomes `http://localhost:23333/mcsm/`.

Suppose you also have a service called `Jenkins` and set the path prefix to `/jenkins/`. At this point you can merge the two services via a reverse proxy.

For example, reverse proxy to `https://example.com[:443]`, then you can access the MCSM panel through `https://example.com/mcsm/` and also through `https://example .com/jenkins/` to access Jenkins.

## Reverse proxy

For the configuration of Nginx, see [Configuring HTTPS](proxy_https).

What we need to do now is to modify the `location` item in the original configuration. For example, if your path prefix is `/mcsm/`, then replace the original

```conf
location/{
     #...
}
```

Change to

```conf
location /mcsm {
     #...
}
```

Just restart nginx.

## Change configuration

The `prefix` item in the [Configuration File] (config_files) of Daemon and Web programs is the path prefix configuration item.

Change it to your desired path prefix and restart MCSM. When you visit again at this time, you will find that you have been automatically redirected to the corresponding page with the path prefix added.

::: warning
The path prefix should start with `/`, such as `/mcsm/`.
:::

::: tip
The `/` at the end of the path prefix is recommended.

If not added, such as `/mcsm`, then `/mcsmapi/xxx` will also be matched and processed as `/api/xxx`.
:::

Next, after the Daemon adds the path prefix configuration and restarts, you will find that the panel cannot successfully connect to the remote node.

At this time, you need to enter the `Node` menu in the panel, select the corresponding node, click the `Settings` button, and fill in the corresponding `Path Prefix` item. If filled in correctly, you should be able to connect to the Daemon program normally after saving.
