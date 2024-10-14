# 使用 Docker 安装面板

## 安装 Docker

```bash
export DOWNLOAD_URL=https://mirrors.ustc.edu.cn/docker-ce # 国内需要执行这步
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## 安装MCSManager

下列命令中，所有的`${CHANGE_ME_TO_INSTALL_PATH}`需要替换为你实际数据存储的位置，该位置需要被持久化

所有的`ghcr.io/mcsmanager`可以被替换为`githubyumao`，取决于你是否可以连接到Github Container Registry (aka. GHCR)

注意：web和daemon的安装位置可以不同

### 命令行安装

```bash
docker pull ghcr.io/mcsmanager/mcsmanager-daemon:latest
docker pull ghcr.io/mcsmanager/mcsmanager-web:latest

docker run -v /etc/localtime:/etc/localtime:ro -v ${CHANGE_ME_TO_INSTALL_PATH}/web/data:/opt/mcsmanager/web/data -v ${CHANGE_ME_TO_INSTALL_PATH}/web/logs:/opt/mcsmanager/web/logs -p 23333:23333 -d ghcr.io/mcsmanager/mcsmanager-web:latest
docker run -v /etc/localtime:/etc/localtime:ro -v ${CHANGE_ME_TO_INSTALL_PATH}/InstanceData:${CHANGE_ME_TO_INSTALL_PATH}/InstanceData -v ${CHANGE_ME_TO_INSTALL_PATH}/daemon/data:/opt/mcsmanager/daemon/data -v ${CHANGE_ME_TO_INSTALL_PATH}/daemon/logs:/opt/mcsmanager/daemon/logs -v /var/run/docker.sock:/var/run/docker.sock -e MCSM_INSTANCES_BASE_PATH=${CHANGE_ME_TO_INSTALL_PATH}/daemon/data/InstanceData -p 24444:24444 -d ghcr.io/mcsmanager/mcsmanager-daemon:latest
```

### docker-compose 安装

```yaml
# docker-compose.yml
services:
  web:
    image: ghcr.io/mcsmanager/mcsmanager-web:latest
    ports:
      - "23333:23333"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ${CHANGE_ME_TO_INSTALL_PATH}/web/data:/opt/mcsmanager/web/data
      - ${CHANGE_ME_TO_INSTALL_PATH}/web/logs:/opt/mcsmanager/web/logs

  daemon:
    image: ghcr.io/mcsmanager/mcsmanager-daemon:latest
    restart: unless-stopped
    ports:
      - "24444:24444"
    environment:
      - MCSM_INSTANCES_BASE_PATH=${CHANGE_ME_TO_INSTALL_PATH}/InstanceData
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ${CHANGE_ME_TO_INSTALL_PATH}/InstanceData:${CHANGE_ME_TO_INSTALL_PATH}/InstanceData
      - ${CHANGE_ME_TO_INSTALL_PATH}/daemon/data:/opt/mcsmanager/daemon/data
      - ${CHANGE_ME_TO_INSTALL_PATH}/daemon/logs:/opt/mcsmanager/daemon/logs
      - /var/run/docker.sock:/var/run/docker.sock
```

```bash
mkdir -p ${CHANGE_ME_TO_INSTALL_PATH}
cd ${CHANGE_ME_TO_INSTALL_PATH}
vim docker-compose.yml # 这里写入上面的docker-compose.yml的内容
docker compose pull && docker compose up -d
```

### 访问

安装完成后，你可以通过 `http://localhost:23333` 访问web界面，通过 `ws://localhost:24444` 连接到daemon
