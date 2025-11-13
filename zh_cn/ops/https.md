# 使用 HTTPS

:::tip
**请确保你已经充分理解「网络架构」章节。**
:::

## 生成 SSL 证书

可以在免费 SSL 的网站上，为自己的域名生成 90 天免费且可无限续签的证书：

> <a href="https://ohttps.com/" target="_blank">https://ohttps.com/</a>  
> <a href="https://www.mianfeissl.com/" target="_blank">https://www.mianfeissl.com/</a>

如果你没有域名，想直接用 IP 地址访问，可以在此生成证书：

> <a href="https://zerossl.com/" target="_blank">https://zerossl.com/</a>

你也可以选择使用`Let's Encrypt`、`其他CA`或`自签名SSL证书`。注意自签名证书默认不被操作系统及浏览器信任，需要手动加入信任链。

```使用OpenSSL生成自签名证书
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```

## 准备证书链文件

如果你使用自签名证书可忽略此步骤。

请准备以下文件:
1. 已签发的证书，例如 **_domain_fullchain.crt_**。
2. 已签发证书对应的私钥，例如 **_domain.key_**。

后续示例均将使用 **_domain_fullchain.crt_**,  **_domain.key_** 作为示例名。

## 开始前的最后检查

在开始前请确保以下文件及配置准备完毕，可根据实际情况调整:

1. 已签发证书链文件及路径: `/root/ssl/domain_fullchain.crt`。
2. 已签发证书对应的私钥及路径: `/root/ssl/domain.key`。
3. 面板配置文件：`/opt/mcsmanager/daemon/data/Config/global.json`
4. 节点配置文件：`/opt/mcsmanager/web/data/SystemConfig/config.json`
5. 域名已正确解析到 IP。
6. 防火墙或端口映射已放行节点端口`24444`与面板端口`23333`。
7. 关闭面板和节点进程。

## 开启 SSL

分别找到 **_面板_** 和 **_节点_** 配置文件，在末尾处修改以下内容。 \
以下为示例配置，你可根据实际情况更改端口或调整配置。

```json
{
  // 如果没有以下字段，就手动填写
  "ssl": true,                                      // 开启 SSL
  "sslPemPath": "/root/ssl/domain_fullchain.crt",   // 证书链路径
  "sslKeyPath": "/root/ssl/domain.key"              // 私钥路径
}
```


## 确认 HTTPS 生效

当你完成上述配置添加后，请**重新启动**面板和节点。\
假如域名是 **_domain.com_** ，那么浏览器需要使用这个地址访问：

```txt
面板地址: https://domain.com:23333/
节点地址: https://domain.com:24444/
```

使用节点地址通过浏览器访问。如果你看到网页显示下列内容，则节点 SSL 已正确配置。

> [MCSManager Daemon] Status: OK | reference: https://mcsmanager.com/

使用面板地址通过浏览器访问。如果你看到网页显示出 MCSManager 登录页面，则面板 SSL 已正确配置。