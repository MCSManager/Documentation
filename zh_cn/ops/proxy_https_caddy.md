# 使用Caddy配置HTTPS反向代理

:::tip
**请确保你已经充分理解「网络架构」章节。**
:::

## 获取SSL证书

Caddy内置了Let's Encrypt支持，在配置好域名的情况下，可以自动获取和续期证书。如果您想使用其他证书提供商，也可以手动配置。

> [https://ohttps.com/](https://ohttps.com/)  
> [https://www.mianfeissl.com/](https://www.mianfeissl.com/)  
> [https://zerossl.com/](https://zerossl.com/)

如果你没有域名，想直接用 IP 地址访问，可以直接使用Caddy内置的自动生成自签名证书功能。

## 定位配置文件位置

在Linux系统中，Caddy的配置文件位于`/etc/caddy/Caddyfile`中。

在Windows系统中，Caddy的配置文件需要在Caddy程序所在的目录下手动创建名为`Caddyfile`的文件（无扩展名）。

## 准备反向代理

请确保在开始前准备好以下配置。您可以根据需要调整它们。

1. Caddy 配置文件。
2. 未开启 SSL 的节点地址及端口: `127.0.0.1:24444`。
3. 未开启 SSL 的面板地址及端口: `127.0.0.1:23333`。
4. 即将开启的节点 HTTPS 端口: `12444`。
5. 即将开启的面板 HTTPS 端口: `12333`。
6. [***如使用域名***] 域名已正确解析到 IP。
7. 防火墙或端口映射已放行端口`12444`与`12333`。

## 守护进程反向代理配置

以下为示例配置，你需要把“域名或ip”处更改为你的实际域名或IP地址。你可根据实际情况更改端口或调整配置。\
配置直接写在Caddyfile中即可。\
如果你有多个节点，只需以不同的端口与地址重复添加下列配置即可。

```
# MCSManager守护进程
域名或ip:12444 {

    # 开启HSTS 开启后将强制使用HTTPS连接节点并在取消此策略后持续一年除非在浏览器手动清除策略。
	# 默认未开启，可取消注释开启.
    # header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"

    encode {
        zstd            # 启用zstd压缩
        gzip 6          # 启用gzip，级别6（1-9）
        # 仅对大于1KB的文件启用压缩
        minimum_length 1024
        # 指定要压缩的MIME类型（避免对已压缩格式重复压缩）
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

        # 请求头 一般无需更改
        header_up Host {http.request.host}
        header_up X-Real-IP {http.request.remote.host}
        header_up X-Forwarded-For {http.request.remote.host}
        header_up REMOTE-HOST {http.request.remote.host}

        # 支持反代 WebSocket
        header_up Connection {http.request.header.Connection}
        header_up Upgrade {http.request.header.Upgrade}

        # 禁用缓存
        buffer_requests   off
        buffer_responses  off
    }
}
```


## 面板反向代理配置

以下为示例配置，你需要把“域名或ip”处更改为你的实际域名或IP地址。你可根据实际情况更改端口或调整配置。\
配置直接写在Caddyfile中即可。

```
# MCSManager面板
域名或ip:12333 {

    # 开启HSTS 开启后将强制使用HTTPS连接节点并在取消此策略后持续一年除非在浏览器手动清除策略。
	# 默认未开启，可取消注释开启.
    # header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"

    encode {
        zstd            # 启用zstd压缩
        gzip 6          # 启用gzip，级别6（1-9）
        # 仅对大于1KB的文件启用压缩
        minimum_length 1024
        # 指定要压缩的MIME类型（避免对已压缩格式重复压缩）
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
        # 请求头 一般无需更改
        header_up Host {http.request.host}
        header_up X-Real-IP {http.request.remote.host}
        header_up X-Forwarded-For {http.request.remote.host}
        header_up REMOTE-HOST {http.request.remote.host}

        # 支持反代 WebSocket
        header_up Connection {http.request.header.Connection}
        header_up Upgrade {http.request.header.Upgrade}

        # 禁用缓存
        buffer_requests   off
        buffer_responses  off
    }
}
```

## 启动Caddy

```bash
caddy run
```

## 验证配置

假如域名是 **_domain.com_** ，反向代理后的端口是`12333`与`12444`，那么浏览器需要使用这个地址访问：

```txt
面板地址: https://domain.com:12333/
节点地址: https://domain.com:12444/
```

使用节点地址通过浏览器访问。如果你看到网页显示下列内容，则节点反代已正确配置。

> [MCSManager Daemon] Status: OK | reference: https://mcsmanager.com/

使用面板地址通过浏览器访问。如果你看到网页显示出 MCSManager 登陆页面，则面板反代已正确配置。

## 配置 MCSM 使用 HTTPS 连接

此时如果你访问网页，你会发现你可以登录并且使用面板。

**但是**

如果你进入实例控制台界面，上传文件，下载文件等，就会发现依然**无法正常使用**，这是因为 MCSManager 要求浏览器能够直接连接到远程节点，由于你升级到了 HTTPS，导致浏览器**拒绝**使用 Websocket+HTTP 协议连接远程节点！

> [为什么浏览器要连接远程节点？](mcsm_network)

进入`节点管理`，你会发现可能是使用 `localhost`，`123.x.x.x` 或其他域名连接到远程节点的，此时你必须要给每一个远程节点**分别配置一次反向代理**，让它们全部使用 HTTPS+Websocket 连接。

配置完成后，使用 `wss://localhost`，`wss://123.x.x.x` 或 `wss://domain.com` 替换原有的`localhost`，`123.x.x.x` 或 `domain.com`即可。
