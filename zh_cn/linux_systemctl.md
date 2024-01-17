# 注册到 Linux 系统服务

<tip>
如果您是通过一键安装脚本安装的，这个教程对您而言是无用的，因为已经自动配置完毕。
</tip>

众所周知，通过 SSH 客户端访问 Linux 启动的任何软件，会在 SSH 连接断开时自动退出，此时如果我们希望 MCSManager 在 Linux 中长期运行，那么我们可以编写服务让其在后台长期运行。

如果您是手动安装的 MCSManager，那么建议您将 MCSManager 配置为系统服务。

## 配置

**vim /etc/systemd/system/mcsm-daemon.service**

```
[Unit]
Description=MCSManager Daemon

[Service]
WorkingDirectory=/opt/mcsmanager/daemon
ExecStart=<NodeJS安装路径>/bin/node app.js
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

[Install]
WantedBy=multi-user.target
```

**vim /etc/systemd/system/mcsm-web.service**

```
[Unit]
Description=MCSManager Web

[Service]
WorkingDirectory=/opt/mcsmanager/web
ExecStart=<NodeJS安装路径>/bin/node app.js
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

[Install]
WantedBy=multi-user.target
```

## 命令用法

重启：`systemctl restart mcsm-{daemon,web}.service`

启动：`systemctl start mcsm-{daemon,web}.service`

停止：`systemctl stop mcsm-{daemon,web}.service`

禁用：`systemctl disable mcsm-{daemon,web}.service`

启用：`systemctl enable mcsm-{daemon,web}.service`

## 修改用户权限

> 在 systemd 的服务配置内未指定用户的情况下，服务会以 root 用户运行，从而给服务器带来潜在安全隐患，推荐更改运行该服务的用户来保证安全。

1. 通过` useradd``chmod``chown `等命令来创建用户并修改相关用户权限。
2. 在 `[Service]` 栏目中添加 `User=用户`
3. 重新启动服务
