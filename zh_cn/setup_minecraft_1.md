# 一键搭建 Minecraft Java 版服务器

## 安装 Java 环境

在开始运行 Java 服务端之前 Java 运行库是必不可少的，以下是一些 `Minecraft` 不同版本所需的对应的 Java 版本运行库列表：

| 需要的 Java 版本 |                     Minecraft 游戏版本                      |
| ---------------- | :---------------------------------------------------------: |
| Java8            | 1.7.x，1.8.x，1.9.x，1.10.x，1.12.x，1.13.x，1.15.x，1.16.x |
| Java16&Java17    |                           1.17.x                            |
| Java17           |                           1.18.x                            |
| Java17 及更高    |                    1.18.x&1.19.x&1.20.x                     |

<tip>
如果你使用 17 更高版本，请不要使用 Java 20 版本，可能存在兼容性问题。

您始终应该查看自己的插件支持哪些 Java 版本再做出抉择，如果插件没有声明，请询问插件开发者，以免引起不必要的麻烦。
</tip>

### Windows 版下载

- [(Oracle) Java JDK 8](https://repo.huaweicloud.com/java/jdk/8u202-b08/jdk-8u202-windows-x64.exe)
- [(Azul) Java JDK 11](https://cdn.azul.com/zulu/bin/zulu11.62.17-ca-jdk11.0.18-win_x64.msi)
- [(Oracle) Java JDK 17](https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe)

> Java16 以及更高版本仅可以在 64 位系统上运行。

## 使用默认预制包一键开服

<tip>
请确保你已成功安装 Java 版本，使用 java -version 命令可以确认是否安装成功。
</tip>

- 点击顶部菜单栏的 `应用实例` 并新建一个应用实例。
- 选择 Minecraft Java 版游戏服务器。
- 选择需部署的节点，选择 Minecraft 快速部署。
- 选择一个你需要的整合包，点击安装，输入实例名称。
- 等待安装完毕后进入实例控制台。
- 点击右上操作键开启服务器。

随后，启动 Minecraft 服务器，如果看见如下信息代表启动成功：

![正常开启后效果](../images/zh_cn/java_setup.png)
