# 更新 MCSM 面板

## 8.X 升级到 9.X 版本

**这是无法做到的。** 您只能全新安装 MCSM 面板，并且一个个手动导入服务器。

<br />

### 更新建议

因为采用守护进程分布式部署，如果你的节点超过 5 个，那么更新将有点麻烦，建议保留观望，待累积更新到一定程度后再一并更新。

如果您的节点很少，那么可以更新到此版本。

<br />

### 备份

如果您担心更新导致暑假丢失，先将 `web/data`，`daemon/daemon`两个目录移动到其他**上层**目录。

更新完毕后再复制/移动回来即可保证数据安全性。

<br />

### Windows 更新方法

前往官网下载最新发行版压缩包，手动分离 web 与 daemon 目录，覆盖您的 web 与 daemon 目录即可。

如果有多个节点，则需要覆盖所有 daemon 节点文件。

<br />

### Linux 一键脚本安装的更新方法

如果您采用一键脚本更新，那么将天然支持 git 自动更新，前往 `/opt/mcsmanager/web` 和 `/opt/mcsmanager/daemon` 分别执行 git 拉取命令即可。

```bash
systemctl stop mcsm-{web,daemon}
cd /opt/mcsmanager/web
git pull
cd /opt/mcsmanager/daemon
git pull
systemctl start mcsm-{web,daemon}
```

**更新注意：** 请勿使用一键安装脚本来更新，这样做的后果将会导致您的数据全部丢失。

### Linux 手动安装的更新方法

分别进入 `web` 和 `daemon` 目录，执行下列命令：

```bash
git fetch --all
git reset --hard origin/master
git pull origin master
git pull
```

