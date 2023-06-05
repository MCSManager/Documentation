# 更新 MCSM 面板

### 更新建议

因为采用守护进程分布式部署，如果你的节点超过 5 个，那么更新将有点麻烦，建议保留观望，待累积更新到一定程度后再一并更新。

如果您的节点很少，那么可以更新到最新版本。

<br />

### 备份（可选）

如果您担心更新导致数据丢失，先将 `web/data`，`daemon/data`两个目录移动到其他**上层**目录。

更新完毕后再移动回来即可保证数据安全性。

<br />

### Windows

1. 前往官方网站 https://mcsmanager.com/，下载最新的压缩文件。

2. **覆盖**源文件即可。

<br />

### Linux

**自动更新**

如果您当初是使用的一键脚本更新，那么你只需执行以下命令即可：

我们的一键安装脚本支持自动更新，不会损害本地数据。

```bash
cd /opt
sudo su # 切换 Root 账号
wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup_cn.sh | bash
```

**手动更新**

如果你当初是手动安装的 MCSManager 面板，那么一键安装脚本将不适用于您，因为这会导致安装两份程序。

你必须前往官方发行仓库，下载最新的代码并且覆盖你的 MCSManager 所有文件。

https://github.com/MCSManager/MCSManager/releases/latest

<br />
