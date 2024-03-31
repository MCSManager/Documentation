# 使用 Docker CLI 安装面板

## 需要安装 Docker

```bash
sudo su
curl -sSL https://get.docker.com/ | CHANNEL=stable bash -s docker --mirror Aliyun
```
## 只需执行以下命令即可部署
执行前请确保您有`/opt`目录且可管理 \
只适用于Linux系统，不包括nas系统 \
技术力限制，暂不支持自定义挂载目录，如需自定义挂载请看[Docker-compose](/zh-cn/tutorial/docker-compose.md)
## Web

```bash
docker run --name mcsmv10_web \
--network host \
-v /opt/docker-mcsm/web:/opt/docker-mcsm/web/data \
-v /opt/docker-mcsm/web/logs:/opt/docker-mcsm/web/logs \
-v /opt/docker-mcsm/daemon/data/Config:/opt/docker-mcsm/daemon/data/Config:ro \
registry.cn-guangzhou.aliyuncs.com/kabaka/kabaka:mcsmv10_web
```

## Daemon

```bash
docker run --name mcsmv10_daemon \
--network host \
-v /opt/docker-mcsm/daemon/data:/opt/docker-mcsm/daemon/data \
-v /opt/docker-mcsm/daemon/logs:/opt/docker-mcsm/daemon/logs \
-v /opt/docker-mcsm/daemon/lib:/opt/docker-mcsm/daemon/lib \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
registry.cn-guangzhou.aliyuncs.com/kabaka/kabaka:mcsmv10_daemon
```

数据存放在/opt/docker-mcsm目录中