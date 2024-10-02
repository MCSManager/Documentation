# 注册到 Linux OpenRC 系统服务

:::tip
本教程仅限于使用Alpine、Devuan、Artix、Slackware等基于OpenRC的发行版的用户，如果您不使用此类发行版或者不懂，请移步systemd服务设置教程
:::

众所周知，通过 SSH 客户端访问 Linux 启动的任何软件，会在 SSH 连接断开时自动退出，此时如果我们希望 MCSManager 在 Linux 中长期运行，那么我们可以编写服务让其在后台长期运行。

如果你是手动安装的 MCSManager，那么建议你将 MCSManager 配置为系统服务。

## 配置

**vim /etc/init.d/mcsm-daemon**

```
#!/sbin/openrc-run

name=$RC_SVCNAME
description="MCSManager Daemon"
supervisor="supervise-daemon"
command="<NodeJS安装路径>/bin/node"
command_args="app.js"
supervise_daemon_args=" -d /opt/mcsmanager/daemon -e "PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"\""
command_user="root"

stop() {
	ebegin "Stopping $RC_SVCNAME"
	/bin/kill -s QUIT $MAINPID
	eend $?
}

reload() {
	ebegin "Reloading $RC_SVCNAME"
	/bin/kill -s HUP $MAINPID
	eend $?
}
```

**vim /etc/init.d/mcsm-web**

```
#!/sbin/openrc-run

name=$RC_SVCNAME
description="MCSManager Web"
supervisor="supervise-daemon"
command="<NodeJS安装路径>/bin/node"
command_args="app.js"
supervise_daemon_args=" -d /opt/mcsmanager/web -e "PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"\""
command_user="root"

stop() {
	ebegin "Stopping $RC_SVCNAME"
	/bin/kill -s QUIT $MAINPID
	eend $?
}

reload() {
	ebegin "Reloading $RC_SVCNAME"
	/bin/kill -s HUP $MAINPID
	eend $?
}
```

编辑完毕后请使用`chmod +x /etc/init.d/mcsm-*`，否则无法执行服务！


## 命令用法

重启：
`service mcsm-daemon restart`
`service mcsm-web restart`

启动：
`service mcsm-daemon start`
`service mcsm-web start`

停止：
`service mcsm-daemon stop`
`service mcsm-web stop`

禁用：
`rc-update del mcsm-daemon`
`rc-update del mcsm-web`

启用：
`rc-update add mcsm-daemon`
`rc-update add mcsm-web`

## 修改用户权限

> 在默认的服务配置内未修改用户的情况下，服务会以 root 用户运行，从而给服务器带来潜在安全隐患，推荐更改运行该服务的用户（command_user）来保证安全。

1. 通过`useradd``chmod``chown`等命令来创建用户并修改相关用户权限。
2. 修改 `command_user` 属性
3. 重新启动服务