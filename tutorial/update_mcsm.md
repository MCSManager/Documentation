# 更新 MCSM 面板

## 8.X 升级到 9.X 版本

**这是无法做到的。** 您只能全新安装 MCSM 面板，并且一个个手动导入服务器。

<br />

## Windows

前往[官方网站](https://mcsmanager.com)下载最新 Windows 版软件，下载解压并且覆盖现有文件即可。

<br />

## Linux

**请勿执行安装脚本进行升级。**

如果您是使用的**一键安装脚本**安装的 MCSM 面板，那么此时您的面板应该位于 `/opt/mcsmanager/` 中。

分别进入 `/opt/mcsmanager/web` 和 `/opt/mcsmanager/daemon` 目录，执行下列命令：

```bash
git fetch --all
git reset --hard origin/master
git pull origin master
git pull
```

<br />

> 注意事项：更新之前请先停止面板运行。
