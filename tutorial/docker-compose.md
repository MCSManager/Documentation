# 通过 Docker-Compose 启动面板


### 需先安装 Docker + Docker-compose

```bash
sudo su
curl -sSL https://get.daocloud.io/docker | sh
apt update && apt install docker-compose
```


<br />


### 面板分为网页前端（Web）和守护进程后端（Daemon），所以需要先备好两个 Dockerfile 文件。


## Web 


```dockerfile
FROM node:14-alpine
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN apk --no-cache add git openssh
RUN git clone https://github.com/MCSManager/MCSManager-Web-Production /workspace
RUN cd /workspace && npm i --production --registry=https://registry.npmmirror.com
ENV TZ=Asia/Shanghai
WORKDIR /workspace
CMD node app.js
```

复制并保存文件名为 `dockerfile-web` 的文件


## Daemon

```dockerfile
FROM node:14-bullseye-slim
RUN echo "deb http://deb.debian.org/debian/ sid main" >> /etc/apt/sources.list
RUN sed -i -E 's/http:\/\/deb.debian.org/http:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
RUN apt update \
    && apt install -y openjdk-8-jre && sed -i '$d' /etc/apt/sources.list
RUN apt update \
    && apt install -y git libcurl4 openjdk-17-jre wget
RUN wget -P /tmp https://download.java.net/java/GA/jdk16.0.2/d4a915d82b4c4fbb9bde534da945d746/7/GPL/openjdk-16.0.2_linux-x64_bin.tar.gz \
    && tar -zxvf /tmp/openjdk-16.0.2_linux-x64_bin.tar.gz -C /usr/lib/jvm/ \
    && rm -rf /tmp/openjdk-16.0.2_linux-x64_bin.tar.gz
RUN ln -s /usr/lib/jvm/java-17-openjdk-amd64/bin/java /usr/bin/java17 \
    && ln -s /usr/lib/jvm/jdk-16.0.2/bin/java /usr/bin/java16 \
    && ln -s /usr/lib/jvm/java-8-openjdk-amd64/bin/java /usr/bin/java8
RUN git clone https://github.com/MCSManager/MCSManager-Daemon-Production /workspace
RUN cd /workspace && npm i --production --registry=https://registry.npmmirror.com
ENV TZ=Asia/Shanghai
WORKDIR /workspace
CMD node app.js
```

复制并保存文件名为 `dockerfile-daemon` 的文件


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
            - "./web/data:/workspace/data"
            - "./web/logs:/workspace/logs"
            - "./daemon:/daemon:ro"
    mcsm-daemon:
        container_name: mcsm-daemon
        build:
            context: .
            dockerfile: dockerfile-daemon
        network_mode: "host"
        restart: always
        volumes:
            - "./daemon/data:/workspace/data"
            - "./daemon/logs:/workspace/logs"

```

复制并保存文件名为 `docker-compose.yml` 的文件

## 最后

把三个文件放到一个文件夹内，您可以通过进入到这个目录，输入 `docker-compose up -d` 来启动面板和后端。

- 后端已经内置 java8 java16 java17 三个版本的 java , 运行不同版本 java 服务器直接输入 java(版本号即可)

    - `java17 -jar server.jar`
    - `java8 -jar server.jar`

- 请勿尝试在 Docker 容器内安装 Docker, 后端可直接运行 Minecraft Bedrock Server

- 关闭服务器请进入到 docker-compose.yml 文件目录运行 `docker-compose stop`

    - 运行 `docker-compose down` 来移除容器

作者：[zijiren233](https://github.com/zijiren233/docker-mcsm)