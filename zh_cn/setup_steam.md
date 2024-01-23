# 搭建 Steam 游戏服务器

## 下载 Steam 服务器程序

`SteamCMD` 程序可以帮助您快速建立 Steam 游戏服务器，MCSManager 面板也依赖它来运行 Steam 游戏服务器。

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

将这个命令复制到 `应用实例` 的更新命令处。
