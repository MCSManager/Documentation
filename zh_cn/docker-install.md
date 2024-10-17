# 使用 Docker 安装面板

:::tip
使用 Docker 镜像安装面板需要额外进行一些复杂的配置，请确保您已掌握这些知识，否则请使用一键安装脚本来安装面板，
:::

## 安装 Docker

```bash
export DOWNLOAD_URL=https://mirrors.ustc.edu.cn/docker-ce # 国内需要执行这步
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## 安装 MCSManager

下列命令中，所有的 `${CHANGE_ME_TO_INSTALL_PATH}` 需要替换为你实际数据存储的位置，该位置需要被持久化

注意：web 和 daemon 的安装位置可以不同

### docker-compose 安装

```yaml
# docker-compose.yml
services:
  web:
    image: githubyumao/mcsmanager-web:latest
    ports:
      - "23333:23333"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - <CHANGE_ME_TO_INSTALL_PATH>/web/data:/opt/mcsmanager/web/data
      - <CHANGE_ME_TO_INSTALL_PATH>/web/logs:/opt/mcsmanager/web/logs

  daemon:
    image: githubyumao/mcsmanager-daemon:latest
    restart: unless-stopped
    ports:
      - "24444:24444"
    environment:
      - MCSM_DOCKER_WORKSPACE_PATH=<CHANGE_ME_TO_INSTALL_PATH>/daemon/data/InstanceData
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - <CHANGE_ME_TO_INSTALL_PATH>/daemon/data:/opt/mcsmanager/daemon/data
      - <CHANGE_ME_TO_INSTALL_PATH>/daemon/logs:/opt/mcsmanager/daemon/logs
      - /var/run/docker.sock:/var/run/docker.sock
```

```bash
mkdir -p <CHANGE_ME_TO_INSTALL_PATH>
cd <CHANGE_ME_TO_INSTALL_PATH>
vim docker-compose.yml # 这里写入上面的docker-compose.yml的内容
docker compose pull && docker compose up -d
```

### 命令行安装

```bash
# 拉取镜像，在中国的服务器需要自己配置加速镜像源
docker pull githubyumao/mcsmanager-daemon:latest
docker pull githubyumao/mcsmanager-web:latest

# 注意：下列命令中，所有的 `${CHANGE_ME_TO_INSTALL_PATH}`
# 需要替换为你实际数据存储的位置，该位置需要被持久化

# 启动 MCSManager 守护进程端
docker run -v /etc/localtime:/etc/localtime:ro  \
-v ${CHANGE_ME_TO_INSTALL_PATH}/daemon/data:/opt/mcsmanager/daemon/data \
-v ${CHANGE_ME_TO_INSTALL_PATH}/daemon/logs:/opt/mcsmanager/daemon/logs \
-v /var/run/docker.sock:/var/run/docker.sock \
-e MCSM_DOCKER_WORKSPACE_PATH=${CHANGE_ME_TO_INSTALL_PATH}/daemon/data/InstanceData \
-p 24444:24444 \
-d githubyumao/mcsmanager-daemon:latest


# 启动 MCSManager Web 端
docker run \
-v /etc/localtime:/etc/localtime:ro \
-v ${CHANGE_ME_TO_INSTALL_PATH}/web/data:/opt/mcsmanager/web/data \
-v ${CHANGE_ME_TO_INSTALL_PATH}/web/logs:/opt/mcsmanager/web/logs \
-p 23333:23333 \
-d githubyumao/mcsmanager-web:latest

```

### 配置面板

安装并启动之后，你可以通过 `http://<你的公网IP>:23333` 访问面板。

此时你进入面板，应该会出现一些错误，因为面板 Web 端没有成功连接到守护进程端，需要配置让它们联系到一起。

#### 连接节点

点击顶部导航栏 `节点`，点击右侧的 `新增节点`，填写你的服务器**公网 IP**，密钥和默认的 `24444` 端口。

执行指令 `cat <CHANGE_ME_TO_INSTALL_PATH>/daemon/data/Config/global.json` 可以查看守护进程密钥。

具体流程可以参考：[连接其他机器](./advanced/distributed.html)
