# 通过 Docker-Compose 启动面板


## 需先安装 Docker + Docker-compose

```bash
sudo su
curl -sSL https://get.daocloud.io/docker | sh
apt update && apt install docker-compose
```

- 现已支持 docker 容器内调用宿主机 docker 来启动 `应用实例`

    - 注意：如果要 `修改挂载目录` 只需要修改 `.env` 文件中的 `INSTALL_PATH`, 目录结尾不要有斜线!!！

- 若不修改任何配置 则您的所有数据将会保存在宿主机的 `/opt/docker-mcsm` 下

- 若您使用 unraid 搭建 docker-mcsm, 那么根据 unraid 的机制, 您的数据必须保存到 /mnt/user/appdata 下才能重启服务器不丢失数据。所以请修改 `.env` 文件中 `INSTALL_PATH=/mnt/user/appdata`。

    - 此时 docker-mcsm 的所有数据会保存到 `/mnt/user/appdata/docker-mcsm` 目录下

<br />


## 编写两个 Dockerfile

面板分为网页前端（Web）和守护进程后端（Daemon），所以需要先备好两个 Dockerfile 文件。

### Web 


```dockerfile
FROM node:14-alpine
ARG INSTALL_PATH=/opt/docker-mcsm
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk --no-cache add git
RUN git clone https://gitee.com/MCSManager/MCSManager-Web-Production $INSTALL_PATH/releases/web
RUN cd $INSTALL_PATH/releases/web && npm i --production --registry=https://registry.npmmirror.com
ENV TZ=Asia/Shanghai
WORKDIR $INSTALL_PATH/releases/web
CMD node app.js
```

复制并保存文件名为 `dockerfile-web` 的文件


### Daemon

```dockerfile
FROM node:14-slim
ARG INSTALL_PATH=/opt/docker-mcsm
RUN sed -i -E 's/http:\/\/deb.debian.org/http:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
RUN apt update && apt install -y git
RUN git clone https://gitee.com/MCSManager/MCSManager-Daemon-Production $INSTALL_PATH/releases/daemon
RUN cd $INSTALL_PATH/releases/daemon && npm i --production --registry=https://registry.npmmirror.com
ENV TZ=Asia/Shanghai
WORKDIR $INSTALL_PATH/releases/daemon
CMD node app.js
```

复制并保存文件名为 `dockerfile-daemon` 的文件

<br />

## Docker-compose.yml

```yml
version: "3"
services:
    mcsm-web:
        container_name: mcsm-web
        build:
            context: .
            dockerfile: dockerfile-web
            args:
                INSTALL_PATH: ${INSTALL_PATH-/opt/docker-mcsm}
        network_mode: "host"
        restart: always
        volumes:
            - ${INSTALL_PATH-/opt/docker-mcsm}/releases/web/data:${INSTALL_PATH-/opt/docker-mcsm}/releases/web/data
            - ${INSTALL_PATH-/opt/docker-mcsm}/releases/web/logs:${INSTALL_PATH-/opt/docker-mcsm}/releases/web/logs
            - ${INSTALL_PATH-/opt/docker-mcsm}/releases/daemon/data/Config:${INSTALL_PATH-/opt/docker-mcsm}/releases/daemon/data/Config:ro
    mcsm-daemon:
        container_name: mcsm-daemon
        build:
            context: .
            dockerfile: dockerfile-daemon
            args:
                INSTALL_PATH: ${INSTALL_PATH-/opt/docker-mcsm}
        network_mode: "host"
        restart: always
        volumes:
            - ${INSTALL_PATH-/opt/docker-mcsm}/releases/daemon/data:${INSTALL_PATH-/opt/docker-mcsm}/releases/daemon/data
            - ${INSTALL_PATH-/opt/docker-mcsm}/releases/daemon/logs:${INSTALL_PATH-/opt/docker-mcsm}/releases/daemon/logs
            - /var/run/docker.sock:/var/run/docker.sock:ro
```

复制并保存文件名为 `docker-compose.yml` 的文件

<br />

## .env

```.env
INSTALL_PATH=/opt/docker-mcsm
```

复制并保存文件名为 `.env` 的文件

<br />

### 最后

把四个文件放到一个文件夹内，您可以通过进入到这个目录，输入 `docker-compose up -d` 来启动面板和后端。

- 发布版中不携带 java,如需运行 java 程序请在 `面板->环境镜像->环境镜像管理->新建镜像` 中自行构建

    - 实例设置中的 `进程启动方式` 选择 `虚拟化容器`

- 关闭服务器请进入到 docker-compose.yml 文件目录运行 `docker-compose stop`

    - 运行 `docker-compose down` 来移除容器

<br />

### 更新 docker-mcsm

```shell
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

作者：[zijiren233](https://github.com/zijiren233/docker-mcsm)