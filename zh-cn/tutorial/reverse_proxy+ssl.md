# 使用反向代理并加入 HTTPS


此教程使用 Nginx 进行描述

**先决条件**：Nginx 已安装，MCSManager 已安装，反向代理已配置完毕。

> 警告：我们不推荐配置 HTTPS，MCSManager 面板的分布式架构设计较为复杂，若加入 HTTPS 则会导致复杂度直线上升，在您的网络通信环境基本安全的情况下 HTTPS 并不是必要的。


<br />

## 配置反向代理

参考：[反向代理](/tutorial/simple_reverse_proxy.md)。

<br />

## 生成 HTTPS 证书

生成您自己的 HTTPS 证书，并且对 Nginx 进行相关 HTTPS 反向代理配置。

<br />

## 全站 HTTPS（重要）

根据浏览器访问策略，一旦网站拥有 HTTPS 时，那么所有请求就必须全是 HTTPS 请求，否则将被浏览器拒绝。

所以，您必须将**守护进程所在的 24444 默认端口，面板端的 23333 端口也要配置 https+wss**，只有这样，浏览器连接守护进程时才不会出错。

如果您有其他守护进程，您需要给**每一个守护进程全部加入 HTTPS+WSS**，否则，将无法使用部分功能。

<br />

## 使用新协议连接守护进程

由于您将守护进程配置了 https 访问，那么此时守护进程管理界面中的连接应当是无法连接的。

在[守护进程管理](/tutorial/connect_daemon.md)里，将原有的地址添加`wss://` 协议头进行重新连接以解决此问题。

如原有的地址:`localhost`，修改后:`wss://localhost`。

![图片](images/wss_daemon.png)

<br />

## 大功告成

根据以上步骤，您的全面板 https 访问应该正常工作。

<br />
