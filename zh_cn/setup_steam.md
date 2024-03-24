# 搭建 Steam 游戏服务器

:::tip
如果你<b>是 Linux 服务器</b>，我们推荐你使用 Docker 镜像来部署你的 Steam 游戏服务器，请参考「使用 Docker 镜像部署」章节。
:::

## 下载 Steam 服务器程序

无论你是想架设 `Palworld`，`CSGO2`，`ARK` 还是其他 Steam 游戏，官方提供的 `SteamCMD` 命令行工具都可以帮助你快速建立 Steam 游戏服务器，MCSManager 面板也依赖它来运行 Steam 游戏服务器。

- [下载 Windows 版 SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD#Windows)

- [下载 Linux 版 SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD#Linux)

## 新建实例

- 前往 `应用实例` 功能新增一个实例。
- 选择新增类型为 Steam 游戏服务器。
- 选择 `无需额外文件`。
- 启动命令请根据 Steam 游戏的官方文档来配置。
- 创建成功

## 获取部署命令

每一款 Steam 游戏都有一个 `APP ID`，你需要获取到这个 ID，并且编写如下命令：

```bash
"<SteamCMD 路径>" +login anonymous +force_install_dir "{mcsm_workspace}" "+app_update <APP ID> validate" +quit
```

列如：

```bash
"C:/SteamCMD/steamcmd.exe" +login anonymous +force_install_dir "{mcsm_workspace}" "+app_update 380870 validate" +quit
```

## 设置到 MCSManager

将刚刚 `steamcmd...` 命令写到 MCSManager `实例设置` 的 `更新命令`，在 `控制台` 网页中找到 `更新` 按钮即可运行此命令，从而安装你的 Steam 游戏服务器。

最后，只需轻点 `开启` 按钮，即可运行你的 Steam 游戏服务器。
