# 更新 MCSM 面板

## 8.X 升级到 9.X 版本

**这是无法做到的。** 您只能全新安装 MCSM 面板，并且一个个手动导入服务器。

<br />

### 更新建议

因为采用守护进程分布式部署，如果你的节点超过 5 个，那么更新将有点麻烦，建议保留观望，待累积更新到一定程度后再一并更新。

如果您的节点很少，那么可以更新到此版本。

<br />

### 备份（重要）

如果您担心更新导致数据丢失，先将 `web/data`，`daemon/data`两个目录移动到其他**上层**目录。

更新完毕后再复制/移动回来即可保证数据安全性。

<br />

### Windows

前往官网下载最新发行版压缩包，覆盖您的 web 与 daemon 目录即可。

如果有多个节点，则需要覆盖所有 daemon 节点文件。

<br />

### Linux

如果您采用一键脚本更新，那么将天然支持 git 自动更新，前往 `/opt/mcsmanager/web` 和 `/opt/mcsmanager/daemon` 分别执行 git 拉取命令即可。

```bash
systemctl stop mcsm-{web,daemon}
cd /opt/mcsmanager/web
git pull
npm install
cd /opt/mcsmanager/daemon
git pull
npm install
systemctl start mcsm-{web,daemon}
```

如果您采用手动自定义安装，则需要手动进入两个目录中，执行 `git pull` 命令即可。

如果有多个节点，则需要覆盖所有 daemon 文件。

**Linux 更新注意：** 请勿使用一键安装脚本来更新，这样做的后果将会导致您的数据全部丢失。


<br />

### Linux 全新更新

如果您在进行 pull 操作时一直失败，那么你应该重新安装面板。首先使用 `systemctl stop mcsm-{web,daemon}` 停止面板，再从官方网站的安装脚本安装。

**必须备份数据！先将 `/opt/mcsmanager/web/data`，`/opt/mcsmanager/daemon/data` 两个目录移动到其他**非 mcsmanager**目录下临时存放。**

使用一键安装脚本，强制性覆盖安装，再将两个 data 目录移动回到原处即可。

<br />

