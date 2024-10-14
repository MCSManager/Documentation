# 使用 Docker 安装面板

## 安装 Docker

```bash
export DOWNLOAD_URL=https://mirrors.ustc.edu.cn/docker-ce # 国内需要执行这步
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## 安装MCSManager

下列命令中，所有的`${INSTALL_PATH}`需要替换为你实际安装的位置

注意：web和daemon的安装位置可以不同

### 命令行安装

```bash
docker pull ghcr.io/mcsmanager/mcsmanager-daemon:latest
docker pull ghcr.io/mcsmanager/mcsmanager-web:latest

docker run -v /etc/localtime:/etc/localtime:ro -v ${INSTALL_PATH}/data/web/data:/opt/mcsmanager/web/data -v ${INSTALL_PATH}/data/web/logs:/opt/mcsmanager/web/logs -p 23333:23333 -d ghcr.io/mcsmanager/mcsmanager-web:latest
docker run -v /etc/localtime:/etc/localtime:ro -v ${INSTALL_PATH}/data/daemon/data:/opt/mcsmanager/daemon/data -v ${INSTALL_PATH}/data/daemon/logs:/opt/mcsmanager/daemon/logs -v /var/run/docker.sock:/var/run/docker.sock -e MCSM_INSTANCES_BASE_PATH=${INSTALL_PATH}/daemon/data/InstanceData -p 24444:24444 -d ghcr.io/mcsmanager/mcsmanager-daemon:latest
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
      - ${INSTALL_PATH}/data/web/data:/opt/mcsmanager/web/data
      - ${INSTALL_PATH}/data/web/logs:/opt/mcsmanager/web/logs

  daemon:
    image: ghcr.io/mcsmanager/mcsmanager-daemon:latest
    restart: unless-stopped
    ports:
      - "24444:24444"
    environment:
      - MCSM_INSTANCES_BASE_PATH=${INSTALL_PATH}/daemon/data/InstanceData
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ${INSTALL_PATH}/data/daemon/data:/opt/mcsmanager/daemon/data
      - ${INSTALL_PATH}/data/daemon/logs:/opt/mcsmanager/daemon/logs
      - /var/run/docker.sock:/var/run/docker.sock
```

```bash
mkdir -p ${INSTALL_PATH}
cd ${INSTALL_PATH}
vim docker-compose.yml # 这里写入上面的docker-compose.yml的内容
docker compose pull && docker compose up -d
```

### 访问

安装完成后，你可以通过 `http://localhost:23333` 访问web界面，通过 `ws://localhost:24444` 连接到daemon
