# Setup Java Edition Server

<tip>
This section assumes that you already have JRE installed. If you have any questions, see Setup packages.
</tip>

## Download JE server core

The server core is an important part of the server, we need server core to run server. Deploying server on phones or other remote device is the same.

We will use Paper core as an example. Here are some popular versions

- [1.18.2](https://api.papermc.io/v2/projects/paper/versions/1.18.2/builds/388/downloads/paper-1.18.2-388.jar)
- [1.19.4](https://api.papermc.io/v2/projects/paper/versions/1.19.4/builds/524/downloads/paper-1.19.4-524.jar)
- [1.20.4](https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/389/downloads/paper-1.20.4-389.jar)

> Other version：https://papermc.io/downloads

---

## Deploy

点击顶部 `应用实例` 按钮，选择 `Minecraft Java 版游戏服务器` ，选择需要部署的 `节点`，选择 `上传单个服务端软件` ，上传你下载的 `jar` 格式文件。

在实例 `启动命令` 处填写：

```bash
java -Dfile.encoding=UTF-8 -jar "刚刚下载的jar文件名，例如：paper-1.19.4-516.jar"
```

<tip>
启动命令还有更多有趣的玩法，后续你可以自己探索。
</tip>

<br />

## 启动服务器

在创建完毕后对页面进入 `实例控制台` 或点击顶部的 `应用实例`，再点击应用实例进入并启动它。

最后，你的服务器应该会正常运行。

<br />

## 同意 EULA 协议

第一次启动很有可能会启动失败，会有类似于 `EULA` 等字样的错误，这个是你需要更改一个 `txt` 文件来代表你同意最终用户协议。

点击功能组的 `服务端配置文件` 选项，将 `eula.txt` 的选项从 `否` 改为 `是`，保存文件
