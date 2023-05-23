<img src="https://public-link.oss-cn-shenzhen.aliyuncs.com/mcsm_picture/logo.png" alt="MCSManager 图标.png" width="480px" />

<br />

[![Status](https://img.shields.io/badge/npm-v6.14.15-blue.svg)](https://www.npmjs.com/)
[![Status](https://img.shields.io/badge/node-v14.17.6-blue.svg)](https://nodejs.org/en/download/)
[![Status](https://img.shields.io/badge/License-Apache-red.svg)](https://github.com/MCSManager)

Github: [https://github.com/mcsmanager](https://github.com/mcsmanager)

<br />

## 这是什么？

**分布式，稳定可靠，开箱即用，高扩展性，支持 Minecraft 和其他少数游戏的控制面板。**

MCSManager 面板（简称：MCSM 面板）是一款全中文，开源，分布式，开箱即用，支持 Minecraft 游戏服务端和所有控制台程序的管理面板

此软件在 Minecraft 和其他游戏社区内中已有一定的流行程度，它可以帮助你集中管理多个物理服务器，动态在任何主机上创建游戏服务端，并且提供安全可靠的多用户权限系统，可以很轻松的帮助你管理多个服务器。

![截图.png](https://public-link.oss-cn-shenzhen.aliyuncs.com/mcsm_picture/MCSM9.png)

<br />

## 安装面板

### Linux

```bash
wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup_cn.sh | bash
```

如果 Linux 下一键脚本安装失败，可[前往此处](https://github.com/MCSManager/MCSManager#linux)手动安装。

> 注意：禁止重复安装，重复安装会导致原有面板的所有数据全部被删除，如果你需要更新面板，请参考“更新面板”章节。

### Windows

[http://oss.duzuii.com/MCSManager/MCSManager-ZH](http://oss.duzuii.com/MCSManager/MCSManager-ZH)


下载即可运行，无任何安装依赖，不污染注册表。

<br />

## 启动面板（Linux）

使用一键安装脚本后，您才可以使用下列命令，如果是手动安装，请访问 [Readme.md](https://github.com/MCSManager/MCSManager/blob/master/README.md) 查看。

```bash
# 先启动面板守护进程。
# 这是用于进程控制，终端管理的服务进程。
systemctl start mcsm-daemon.service
# 再启动面板 Web 服务。
# 这是用来实现支持网页访问和用户管理的服务。
systemctl start mcsm-web.service 

# 重启面板命令
systemctl restart mcsm-daemon.service
systemctl restart mcsm-web.service

# 停止面板命令
systemctl stop mcsm-web.service
systemctl stop mcsm-daemon.service

```

> 面板 Web 服务是提供用户管理与网页访问功能的服务，守护进程是提供进程管理和容器管理的服务，两者缺一不可。如果某个功能不正常，可以只重启这一部分的服务来热修复问题。

<br />

## 启动面板（Windows）

关闭面板：在面板两个终端控制台窗口输入 `Ctrl+C` 即可正常关闭，如果无效可以直接鼠标点击右上角关闭按钮。

启动面板：执行 `start.bat` 或 `运行.bat` 等，如果压缩包内部含有 `启动器.exe`，则可使用它来启动面板。

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
