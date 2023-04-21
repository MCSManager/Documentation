# 自动搭建 Java 版 Minecraft 服务端

如果您从来没有搭建过 Minecraft（我的世界）服务器，那么这篇文章将适用于你。

参考：[点击跳转](https://www.bilibili.com/read/cv20379951)

<br />

# 手动搭建 Java 版 Minecraft 服务端

## 1. 安装 Java 环境

`Minecraft 1.17` 以下版本需要 `java 8` 运行时环境，`1.17` 以上版本则直接升级到了 `Java 16` 运行时环境，两者版本跨度极大且并不完全兼容低版本，因而导致 `1.17` 以下版本的 `Minecraft` 服务端软件是无法运行在 `Java 16` 运行时环境的，所以您在架设您自己的服务端之前，需要先检查是否拥有对应的运行环境。


不同版本的 Minecraft 要求的 Java 版本不一致，这里您需要提前了解，可以前往 [这里](https://www.oracle.com/java/technologies/downloads/#jdk18-windows) 下载安装。



> 更高版本请点击上文的“这里”文字前往官方网站下载。

<br />

## 2. 下载服务端软件


部署服务器的本质其实和您在手机上运行 APP 的操作一致，您需要一个服务端软件（又称服务器核心）来实现 Minecraft 服务器部署。

可以前往这些地方下载：

- Paper 服务端：https://papermc.io/downloads

- MCBBS 整合包: https://www.mcbbs.net/forum-serverpack-1.html

如果您对访问阅读英语有困难，可以直接点击版本下载：

- [1.18.2](https://api.papermc.io/v2/projects/paper/versions/1.18.2/builds/388/downloads/paper-1.18.2-388.jar)

- [1.19.4](https://api.papermc.io/v2/projects/paper/versions/1.19.4/builds/516/downloads/paper-1.19.4-516.jar)

<br />

## 3. 进入面板部署

点击左侧“快速开始”按钮，选择 Minecraft Java 版服务器，选择“上传压缩包”或“上传单个服务端软件”，上传您下载的整合包或者jar文件。

填写启动命令：

```
java -Xmx6G -Xms6G -XX:+UseG1GC -Dfile.encoding=UTF-8 -jar "你的jar文件名，例如：paper-1.19-62.jar"
```

> 如果需要 将`6G`修改成您想要分配的内存 `-Xmx?G -Xms?G` 6-16G是一个较为合适的范围.

> 不要将一台计算机的所有可用内存分配给服务端! 请最多空出2G可用内存.

创建！

<br />


## 4. 启动服务器

点击左侧菜单的“应用实例”，您应该能看见刚刚新建的实例。

进入实例，在终端控制台中点击“开启实例”即可。

您的服务器应该会正常运行。

<br />


## 5. 简单配置文件

第一次启动很有可能会启动失败，会有类似于 EULA 等字样的错误，这个是您需要更改一个 txt 文件来代表您同意最终用户协议。

前往“文件管理”界面编辑 `eula.txt`，将其中的 `false` 改为 `true` 即可。

