<img src="https://public-link.oss-cn-shenzhen.aliyuncs.com/mcsm_picture/logo.png" alt="MCSManager 图标.png" width="480px" />

<br />

[![Status](https://img.shields.io/badge/npm-v6.14.15-blue.svg)](https://www.npmjs.com/)
[![Status](https://img.shields.io/badge/node-v14.17.6-blue.svg)](https://nodejs.org/en/download/)
[![Status](https://img.shields.io/badge/License-GPL-red.svg)](https://github.com/Suwings/MCSManager)

[官方网站](http://mcsmanager.com/) | [使用文档](https://docs.mcsmanager.com/) | [团队主页](https://github.com/MCSManager) | [面板端项目](https://github.com/MCSManager/MCSManager) | [网页前端项目](https://github.com/MCSManager/UI) | [守护进程项目](https://github.com/MCSManager/Daemon)

<br />

## 这是什么？

**分布式，稳定可靠，开箱即用，高扩展性，支持 Minecraft 和其他少数游戏的控制面板。**

MCSManager 面板（简称：MCSM 面板）是一款全中文，轻量级，开箱即用，多实例和支持 Docker 的 Minecraft 服务端管理面板。

此软件在 Minecraft 和其他游戏社区内中已有一定的流行程度，它可以帮助你集中管理多个物理服务器，动态在任何主机上创建游戏服务端，并且提供安全可靠的多用户权限系统，可以很轻松的帮助你管理多个服务器。

![截图.png](https://public-link.oss-cn-shenzhen.aliyuncs.com/mcsm_picture/MCSM9.png)

<br />

## 安装

安装方法在官方网站首页，为确保数据实时性，请移步前往 [官方网站（mcsmanager.com）](https://mcsmanager.com/) 查看具体的安装方法。

<br />

## 启动面板（Linux）

使用一键安装脚本后，您才可以使用下列命令，如果是手动安装，请访问 [Readme.md](https://github.com/MCSManager/MCSManager/blob/master/README.md) 查看。

```
systemctl start mcsm-{daemon,web}.service // 启动面板
systemctl stop mcsm-{daemon,web}.service // 停止面板
systemctl restart mcsm-{daemon,web}.service // 重启面板

systemctl restart mcsm-web.service // 只重启面板 Web 服务
systemctl restart mcsm-daemon.service // 只重启面板守护进程服务
```

> 面板 Web 服务是提供用户管理与网页访问功能的服务，守护进程是提供进程管理和容器管理的服务，两者缺一不可。如果某个功能不正常，可以只重启这一部分的服务来热修复问题。

<br />


## 启动面板（Windows）

关闭面板：在面板两个终端控制台窗口输入 `Ctrl+C` 即可正常关闭，如果无效可以直接鼠标点击右上角关闭按钮。

启动面板：执行 `start.bat` 或 `运行.bat` 等。

<br />


## 相关链接

官方网站：[https://mcsmanager.com](https://mcsmanager.com)

Github 开发团队主页：[https://github.com/MCSManager](https://github.com/MCSManager)

Github 讨论区：[https://github.com/MCSManager/MCSManager/issues](https://github.com/MCSManager/MCSManager/issues)

QQ 群: [287215485](https://jq.qq.com/?_wv=1027&k=eou88jyb)

<br />

## 捐助

爱发电捐助平台地址：[https://afdian.net/@mcsmanager](https://afdian.net/@mcsmanager)

> 支持开发团队，这样软件才能源源不断的更新迭代下去，并且服务每个人。

<br />

## 运行环境

默认情况下，一键安装脚本应该已经包含一切所需环境。

特殊情况下，您需满足 `Node 14+` 运行时环境

Node 环境下载前往：[https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

<br />

## 版权

版权所有 [Suwings](https://github.com/Suwings) 保留所有权利，禁止删除源代码中的任何版权声明中英文字。

或前往官方网站购买私有化商业开发授权。

中华人民共和国软件著作权编号：2021SR2085061。
