# 使用 Docker 镜像部署游戏服务器

## 选择一个镜像

你可以使用在 [https://hub.docker.com/](https://hub.docker.com/) 能搜索到的任何镜像。

列如 `mysql:8.3.0`，`cm2network/csgo:latest`，`jammsen/palworld-dedicated-server` 等比较主流的镜像。

你也可以使用 `Dockerfile` 来自己构建一个属于自己的镜像。

## 使用镜像

在 MCSManager 中选择 `新建实例`，选择 `使用 Docker 镜像`，接下来只需要按照界面上的提示，填写相关的参数即可。

创建后，可以直接启动实例，不必提前 `docker pull` 镜像，MCSManager 会自动识别镜像是否存在，并且在启动前提前拉取镜像。

<!-- Note：翻译英语时删除中国区提示 -->

:::tip
如果你的服务器在中国大陆地区，你可能需要配置中国 Docker 镜像源，否则将极大的影响你的镜像下载速度。
:::
