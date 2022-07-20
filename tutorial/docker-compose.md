# 通过 Docker-Compose 启动面板


## 需先安装 Docker + Docker-compose

```bash
sudo su
curl -sSL https://get.daocloud.io/docker | sh
apt update && apt install docker-compose
```

- 现已支持 docker 容器内调用宿主机 docker 来启动 `应用实例`

    - 注意：如果要 `修改挂载目录` 请一定要保证 `宿主机挂载目录` 和 `挂载到容器内的目录` 要一模一样！即 docker-compose 里面的挂载目录和 dockerfile 内程序的安装目录都要同时修改！

- 如果完全按照教程安装不修改任何配置 则您的所有数据将会保存在宿主机的 `/opt/docker-mcsm/` 下

<br />


## 编写两个 Dockerfile

面板分为网页前端（Web）和守护进程后端（Daemon），所以需要先备好两个 Dockerfile 文件。

### Web 


```dockerfile
FROM node:14-alpine
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk --no-cache add git openssh
RUN git clone https://github.com/MCSManager/MCSManager-Web-Production /opt/docker-mcsm/releases/web
RUN cd /opt/docker-mcsm/releases/web && npm i --production --registry=https://registry.npmmirror.com
ENV TZ=Asia/Shanghai
WORKDIR /opt/docker-mcsm/releases/web
CMD node app.js
```

复制并保存文件名为 `dockerfile-web` 的文件


### Daemon

```dockerfile
FROM node:14-slim
RUN sed -i -E 's/http:\/\/deb.debian.org/http:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
RUN apt update && apt install -y git
RUN git clone https://github.com/MCSManager/MCSManager-Daemon-Production /opt/docker-mcsm/releases/daemon
RUN cd /opt/docker-mcsm/releases/daemon && npm i --production --registry=https://registry.npmmirror.com
ENV TZ=Asia/Shanghai
WORKDIR /opt/docker-mcsm/releases/daemon
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
        network_mode: "host"
        restart: always
        volumes:
            - "/opt/docker-mcsm/releases/web/data:/opt/docker-mcsm/releases/web/data"
            - "/opt/docker-mcsm/releases/web/logs:/opt/docker-mcsm/releases/web/logs"
            - "/opt/docker-mcsm/releases/daemon/data/Config:/opt/docker-mcsm/releases/daemon/data/Config:ro"
    mcsm-daemon:
        container_name: mcsm-daemon
        build:
            context: .
            dockerfile: dockerfile-daemon
        network_mode: "host"
        restart: always
        volumes:
            - "/opt/docker-mcsm/releases/daemon/data:/opt/docker-mcsm/releases/daemon/data"
            - "/opt/docker-mcsm/releases/daemon/logs:/opt/docker-mcsm/releases/daemon/logs"
            - "/var/run/docker.sock:/var/run/docker.sock:ro"
```

复制并保存文件名为 `docker-compose.yml` 的文件

<br />

### 最后

把三个文件放到一个文件夹内，您可以通过进入到这个目录，输入 `docker-compose up -d` 来启动面板和后端。

- 发布版中不携带 java,如需运行 java 程序请在 `面板->环境镜像->环境镜像管理->新建镜像` 中自行构建

    - 实例设置中的 `进程启动方式` 选择 `虚拟化容器`

- 关闭服务器请进入到 docker-compose.yml 文件目录运行 `docker-compose stop`

    - 运行 `docker-compose down` 来移除容器

作者：[zijiren233](https://github.com/zijiren233/docker-mcsm)