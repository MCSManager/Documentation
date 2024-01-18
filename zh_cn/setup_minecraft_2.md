# 搭建 Minecraft Java 版服务器

<tip>
本章节已默认您配置好了Java环境，如果没有请参考「一键搭建 Java 版」前半部分章节。
</tip>

## 下载服务端软件

部署服务器的本质其实和您在手机上运行 APP 的操作一致，您需要一个服务端软件（又称服务器核心）来实现 Minecraft 服务器部署。

可以前往这些地方下载：

- Paper 服务端：https://papermc.io/downloads

- MCBBS 整合包: https://www.mcbbs.net/forum-serverpack-1.html

如果您对访问阅读英语有困难，可以直接点击版本下载：

### Paper 服务器软件

- [1.18.2](https://api.papermc.io/v2/projects/paper/versions/1.18.2/builds/388/downloads/paper-1.18.2-388.jar)

- [1.19.4](https://api.papermc.io/v2/projects/paper/versions/1.19.4/builds/524/downloads/paper-1.19.4-524.jar)

- [1.20.4](https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/389/downloads/paper-1.20.4-389.jar)

<br />

## 进入面板部署

点击顶部 `应用实例` 按钮，选择 `Minecraft Java 版游戏服务器` ，选择需要部署的 `节点`，选择 `上传服务端文件压缩包` 或 `上传单个服务端软件` ，上传您下载的整合包或者 jar 文件。

填写启动命令：

```bash
java -Xmx8G -Xms8G -XX:+UseG1GC -Dfile.encoding=UTF-8 -jar "<你的jar文件名，例如：paper-1.19.4-516.jar>"
```

上传服务端核心则为:

```bash
java -Xmx8G -Xms8G -XX:+UseG1GC -Dfile.encoding=UTF-8 -jar ${ProgramName}
```

只需修改`${ProgramName}`前面的部分，`${ProgramName}` 部分面板会自动获取上传的服务端名称。

<tip>
如果需要 将 8G 修改成您想要分配的内存 -Xmx8G -Xms8G 8G 到 16G 是一个较为合适的范围。不要将一台计算机的所有可用内存分配给服务端！请最多空出 2G 可用内存。
</tip>

<br />

## 启动服务器

在创建完毕后对页面进入 `服务器控制台` 或点击顶部的 `应用实例`，再点击应用实例进入，随后进入实例，在右上点击 `操作按钮` 启动实例。

您的服务器应该会正常运行。

<br />

## 同意 EULA 协议

第一次启动很有可能会启动失败，会有类似于 `EULA` 等字样的错误，这个是您需要更改一个 `txt` 文件来代表您同意最终用户协议。

点击功能组的`服务端配置文件` 选项，将 `eula.txt` 的选项从 `否` 改为 `是`，保存文件
