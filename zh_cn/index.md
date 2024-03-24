# 快速开始

MCSManager 是一款开源，分布式，一键部署，支持 `Minecraft` 和 `Steam 游戏服务器` 的控制面板。

MCSManager 在 `Minecraft` 和 `其他游戏` 社区内中已有一定的流行程度，它可以帮助你集中管理多个物理服务器，动态在任何主机上创建游戏服务端，并且提供安全可靠的多用户权限系统，可以很轻松的帮助你管理多个服务器。

### 环境要求

默认情况下，一键安装脚本应该已经包含一切所需环境。如果是手动安装的情况下，你需满足 `Node 16+` 运行时环境

> Node 环境下载前往：[https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

## 安装面板

### Linux

```bash
wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup_cn.sh | bash
```

如果 Linux 下一键脚本安装失败，可以尝试[手动安装](https://github.com/MCSManager/MCSManager#linux)。

### Windows

仅需[下载 ZIP 文件](http://oss.duzuii.com/MCSManager/MCSManager-ZH)解压后即可运行，无任何安装依赖，不污染注册表。

## 启动面板

### Linux

使用一键安装脚本后，你才可以使用下列命令，如果是手动安装，请访问 [README.md](https://github.com/MCSManager/MCSManager/blob/master/README.md) 查看。

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

:::tip
面板 Web 服务是提供用户管理与网页访问功能的服务，守护进程是提供进程管理和容器管理的服务，两者缺一不可。如果某个功能不正常，可以只重启这一部分的服务来热修复问题。
:::

### Windows

**关闭面板**

在面板两个终端控制台窗口输入 `Ctrl+C` 即可正常关闭，如果无效可以直接鼠标点击右上角关闭按钮。

**启动面板**

执行 `start.bat` 或 `运行.bat` 等，如果压缩包内部含有 `启动器.exe`，则可使用它来启动面板。
