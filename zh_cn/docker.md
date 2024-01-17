# 环境隔离

## 安装 Docker

MCSManager 需要依赖 Docker 来实现实例的环境隔离；隔离后，实例对系统的任何操作都将只是在有限的范围内进行，可以确保宿主机的安全性。

面板支持 Docker 容器软件（仅 Linux），请先[安装 Docker](https://docs.docker.com/desktop/install/linux-install/) 并且确保 MCSManager 有足够的权限访问 Docker。

前往节点管理，在节点的右上角处有一个`容器`的按钮，进入后可以你将可以根据 Dockerfile 创建容器，删除容器等操作。

## 使用镜像

前往实例控制台，在实例详细设置对话框中可以启用 Docker 模式，接下来你将可以让当前实例运行在某个镜像中，并且可以直接使用工作目录里面的文件。

## 常见问题

- Q: 面板提示 Docker 未安装，但实际上已经安装

> A: 请使用 root 账号重启 MCSManager 面板，如果成功则代表是权限分配出现问题，否则的话请重新安装 Docker。
