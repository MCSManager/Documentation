# 与其他服务共用端口

::: tip
阅读和使用本章节**你必须知晓 Nginx 或其他软件的反向代理和基础的 Linux 运维知识**。
:::

如果希望 MCSManager 和其它服务使用同一个端口，有以下解决方案：

- 使用不同域名 sni 区分。
- **添加 URL 路径前缀来区服服务。**

本节主要讲解第二种。

## 什么是 URL 路径前缀

列如：访问 MCSManager 面板时的 URL 是 `http://localhost:23333/`。如果将 URL 前缀配置为 `/mcsm/`，那么面板的 URL 会变为 `http://localhost:23333/mcsm/`。

假设你还有一个叫 `Jenkins` 的服务，将路径前缀设置成了 `/jenkins/`。此时你可以通过反向代理合并这两个服务。

例如，反向代理到 `https://example.com[:443]`，那么，你可以通过 `https://example.com/mcsm/` 访问到 MCSM 面板，同时通过 `https://example.com/jenkins/` 访问到 Jenkins。

## 使用Nginx反向代理

Nginx 的配置参见[配置 HTTPS](proxy_https)。

现在我们要做的是修改原先配置中的 `location` 项。例如你的路径前缀是 `/mcsm/`，那么将原先的

```nginx
location / {
    # ...
}
```

改为

```nginx
location /mcsm {
    # ...
}
```

重启 nginx 即可。

## 使用Caddy反向代理

Caddy 的配置参见[配置 HTTPS](proxy_https_caddy)。

现在我们要做的是修改原先配置中的 `reverse_proxy` 块。例如你的路径前缀是 `/mcsm/`，那么将原先的

```
reverse_proxy localhost:23333 {
    # ...
}
```

改为

```
reverse_proxy /mcsm/* localhost:23333 {
    # ...
}
```

重启 Caddy 即可。

## 更改配置

在 Daemon 和 Web 程序的[配置文件](config_files)中的 `prefix` 项即为路径前缀配置项。

将其修改为你想要的路径前缀，然后重启 MCSM。此时你再访问，会发现已经被自动重定向到对应的**添加了路径前缀**的页面。

::: warning
路径前缀应该以 `/` 开头，如 `/mcsm/`。
:::

::: tip
路径前缀末尾的 `/` 建议添加。

如果没加，例如 `/mcsm`，那么 `/mcsmapi/xxx` 也会被匹配，并且被作为 `/api/xxx` 处理。
:::

接下来，在 Daemon 添加了路径前缀配置并且重启之后，你会发现面板无法成功连接到远程节点。

此时，你需要进入面板中的 `节点` 菜单，选择对应的节点，点击 `设置` 按钮，填写对应的 `路径前缀` 项。如果填写正确，那么保存后应该可以正常连接到 Daemon 程序。
