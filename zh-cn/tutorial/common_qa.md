# 常见问题

## 数据文件都存储在哪？

- 在 Windows 下,通常位于`start.bat` 或 `启动.bat`同路径下的`/web/data` 和 `/daemon/data`中。

- 在 Linux 下,如果采用[一键安装脚本](https://github.com/MCSManager/MCSManager#%E5%9C%A8-linux-%E8%BF%90%E8%A1%8C)安装 MCSManager,那么数据文件位于 `/opt/mcsmanager/web/data` 和 `/opt/mcsmanager/daemon/data`。

<br />

## 为什么提示无法与终端建立连接？

若访问实例终端，需要访问面板页面所使用的浏览器所在的网络环境，能够与守护进程**直接进行连接**。

守护进程的端口默认为 24444。

你可以尝试在浏览器中直接输入守护进程的地址。

![图片](images/check_connect.png)

若提示如图上的信息，则说明您当前的网络环境可以正常访问守护进程，否则请通排查以下可能：

#### 守护进程是否正常运行？

- 在 Windows 下，守护进程的终端窗口不要关闭，会导致守护进程退出，可以使用任务管理器查看当前的 node_app.exe 进程情况。
- 在 Linux 下，在命令行输入以下命令查看当前的进程情况。
  ``` bash
  ps -ef | grep "node app.js"
  ```
- 守护进程和控制面板应用是**两个不同的进程**，这意味着通常情况下，对应的进程会大于等于两个。请保证守护进程的正常运行。

#### 是否开启了守护进程端口（24444）的入站访问？

- 咨询你的服务器提供商开放相关的端口。
- 如果你采用的是云服务器，请确认服务器是否有默认的防火墙限制并尝试对其进行配置，例如[阿里云的安全组配置](https://help.aliyun.com/knowledge_detail/40570.html?spm=5176.2020520101securitygroup.help.dexternal.73964df5HSyMZw)。
- 如果你是 Windows 服务器，请参考[配置防火墙 Windows Defender 最佳实践](https://docs.microsoft.com/zh-cn/windows/security/threat-protection/windows-firewall/best-practices-configuring)
- 如果你是 Linux 服务器，请自行查找对应发行版本的防火墙配置方法。
- **绝对不要将防火墙关闭！！这会给你的服务器带来巨大的安全隐患。**

#### 如果你为 MCSManager 配置了反向代理(Nginx,Apache...)，请查看下一条。

<br />

## 配置反向代理后无法连上面板/终端/守护进程

反向代理配置需要配置 23333 端口（Web 程序默认端口）与 24444 端口（Daemon 程序默认端口），并且 24444 端口需要拥有 WebSocket 通信能力。

你需要同时为控制面板应用(23333)和守护进程(24444)进行反向代理，并且为其配置 WebSocket 相关的支持。

以 Nginx 为例，请查看[配置反向代理](/tutorial/simple_reverse_proxy.md)获取参考。

<br />

## 守护进程的密钥在哪？

- 在 Windows 下,通常位于`start.bat` 或 `启动.bat`同路径下的`/web/data` 和 `/daemon/data/Config/global.json`中。

- 在 Linux 下,如果采用[一键安装脚本](https://github.com/MCSManager/MCSManager#%E5%9C%A8-linux-%E8%BF%90%E8%A1%8C)安装 MCSManager,那么数据文件位于 `/opt/mcsmanager/daemon/data/Config/global.json`。
    ```bash
    # 将密钥打印到命令行终端上。
    cat /opt/mcsmanager/daemon/data/Config/global.json
    ```

<br />

## 如果忘记了管理员密码怎么办？

控制面板在运行时会检测用户是否为空，若为空会自动创建一个默认的管理员账号。

如果您忘记了管理员账号，您只能备份并删除原有的用户配置文件夹，并且重新生成一个新的管理员账号以覆盖。
`如果你使用的官方一键脚本可完全按此步骤执行，手动安装请手动进入面板目录`

``` bash
#进入面板目录
cd /opt/mcsmanager/web
#创建备份并删除原有的用户配置
mv data/User data/UserBackup
#重启面板以创建新的管理员账号
systemctl restart mcsm-{daemon,web}.service
```
还可以使用[一键脚本](https://blog.kabaka.xyz)
## Windows系统

如果为Windows系统,需要到你解压的面板目录下进行

假设解压目录为`C:\panel`

1.进入面板存放用户文件的目录下

目录为:`C:\panel\web\data`

2.将data目录下的User目录重命名为UserBackup

3.重启面板并访问面板以重设密码

<br />


## 如何获取 ApiKey？

ApiKey 是一段十六进制字符串，例如 `f81768ab920341e6b6ea4cb231fc24bc`，是调用 API 时的密钥。

可以从面板首页右上角的 个人资料 -> API 接口密钥 中生成。

Warning：请勿将 ApiKey 透露给任何人，否则可能会造成账号被意外调用。

<br />

