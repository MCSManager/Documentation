# 路径前缀

::: info
这里的路径前缀指的是 http 和 websocket 服务的路径前缀。
:::

如果希望 MCSM 服务和其它服务使用同一个端口，有以下解决方案：

- 使用不同域名 sni 区分。
- 各自添加路径前缀合并。

本节主要讲解第二种。

## 什么是路径前缀

举个例子，访问 MCSM 面板时，访问的 URL 是 `http://localhost:23333/`。如果将前缀配置为 `/mcsm/`，那么面板的 URL 会变为 `http://localhost:23333/mcsm/`。

假设你还有一个叫 Jenkins 的服务，将路径前缀设置成了 `/jenkins/`。此时你可以通过反向代理合并这两个服务。

例如，反向代理到 `https://example.com[:443]`，那么，你可以通过 `https://example.com/mcsm/` 访问到 MCSM 面板，同时通过 `https://example.com/jenkins/` 访问到 Jenkins。

## 设置路径前缀

[配置文件](config_files)中的 `prefix` 项即为路径前缀。将其修改为你想要的路径前缀，然后重启 MCSM。此时你再访问，会发现已经被自动重定向到对应的**添加了路径前缀**的页面。

::: warning
路径前缀应该以 `/` 开头，如 `/mcsm/`。
:::

::: tip
路径前缀末尾的 `/` 建议添加。

如果没加，例如 `/mcsm`，那么 `/mcsmapi/xxx` 也会被匹配，并且被作为 `/api/xxx` 处理。
:::

Daemon 在添加了路径前缀并且重启后，你会发现无法连接到了。此时，你需要在面板上对应节点的节点设置中填写对应的 `路径前缀` 项。如果填写正确，那么保存后就可以正常连接到 daemon 后端了。

## 反向代理

Nginx 的配置参见[配置 HTTPS](proxy_https)。

现在我们要做的是修改原先配置中的 `location` 项。例如你的路径前缀是 `/mcsm/`，那么将原先的

```conf
location / {
    # ...
}
```

改为

```conf
location /mcsm {
    # ...
}
```

重启 nginx 即可。
