# 手动配置 MCSM 到 Linux 服务


> 注意：如果您是通过一键安装脚本安装的，这个教程对您而言是无用的，因为已经自动配置完毕。

众所周知，通过 SSH 客户端访问 Linux 启动的任何软件，会在 SSH 连接断开时自动退出，此时如果我们希望 MCSManager 在 Linux 中长期运行，那么我们可以编写服务让其在后台长期运行。

如果您是手动安装的 MCSManager，那么建议您将 MCSManager 配置为系统服务。

<br />

## 配置

**vim /etc/systemd/system/mcsm-daemon.service**

```
[Unit]
Description=MCSManager Daemon

[Service]
WorkingDirectory=/opt/mcsmanager/daemon
ExecStart=${node_install_path}/bin/node app.js
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
ExecStart=${node_install_path}/bin/node app.js
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

[Install]
WantedBy=multi-user.target
```

<br />

## 使用

重启：systemctl restart mcsm-{daemon,web}.service

启动：systemctl start mcsm-{daemon,web}.service

停止：systemctl stop mcsm-{daemon,web}.service

禁用：systemctl disable mcsm-{daemon,web}.service

启用：systemctl enable mcsm-{daemon,web}.service