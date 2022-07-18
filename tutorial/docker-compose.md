# 通过 Docker-Compose 启动面板

面板分为网页后端（Web）和守护进程端（Daemon），所以需要先备好两个 Dockerfile 文件。

<br />

## Web 

```dockerfile
FROM node:14-alpine
RUN sed -i -E 's/http:\/\/deb.debian.org/http:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
RUN apk --no-cache add git openssh
RUN git clone https://github.com/MCSManager/MCSManager-Web-Production /workspace
RUN cd /workspace && npm install --production --registry=https://registry.npmmirror.com/
ENV TZ=Asia/Shanghai
WORKDIR /workspace
CMD node app.js
```

<br />

## Daemon

```dockerfile
FROM node:14-bullseye-slim
RUN sed -i -E 's/http:\/\/deb.debian.org/http:\/\/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
RUN apt update
RUN apt install -y git libcurl4 openjdk-17-jre openjdk-11-jre wget
RUN wget -P /tmp https://download.java.net/java/GA/jdk16.0.2/d4a915d82b4c4fbb9bde534da945d746/7/GPL/openjdk-16.0.2_linux-x64_bin.tar.gz && tar -zxvf /tmp/openjdk-16.0.2_linux-x64_bin.tar.gz -C /usr/lib/jvm/
RUN echo "deb http://deb.debian.org/debian/ sid main" >> /etc/apt/sources.list && apt update \
    && apt install -y openjdk-8-jre && sed -i '$d' /etc/apt/sources.list \
    && apt update
RUN mkdir /java && ln -s /usr/lib/jvm/java-17-openjdk-amd64/bin/java /java/java17 \
    && ln -s /usr/lib/jvm/jdk-16.0.2/bin/java /java/java16 \
    && ln -s /usr/lib/jvm/java-11-openjdk-amd64/bin/java /java/java11 \
    && ln -s /usr/lib/jvm/java-8-openjdk-amd64/bin/java /java/java8
RUN git clone https://github.com/MCSManager/MCSManager-Daemon-Production /workspace
RUN cd /workspace && npm install --production --registry=https://registry.npmmirror.com/
ENV TZ=Asia/Shanghai
WORKDIR /workspace
CMD node app.js
```

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
            - "./web/data:/workspace/data"
            - "./web/logs:/workspace/logs"
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

<br />

## 最后

您可以通过进入到这个目录，输入 `docker-compose up` 启动面板。

作者：[zijiren233](https://github.com/zijiren233)