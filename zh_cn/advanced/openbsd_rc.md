# OpenBSD 服务配置

:::tip
由于 Go 语言编译相关问题，守护进程（Daemon）暂时不能直接在 OpenBSD 运行
:::

众所周知，通过 SSH 客户端访问 BSD Kshell 启动的任何软件，会在 SSH 连接断开时自动退出，此时如果我们希望 MCSManager 在 OpenBSD 中长期运行，那么我们可以编写服务让其在后台长期运行。

如果你是手动安装的 MCSManager，那么建议你将 MCSManager 配置为系统服务。

## 配置

:::tip
以下配置是基于通过`pkg_add node`安装的 Node.js 编写的
:::

**vim /etc/rc.d/mcsm-daemon**

```
#!/bin/ksh

daemon_execdir="/usr/local/mcsmanager/daemon"
daemon="/usr/local/bin/node"
daemon_flags="app.js"
daemon_user="root"

. /etc/rc.d/rc.subr

rc_bg=YES
rc_reload=NO

rc_start() {
        rc_exec ". ~/.profile; ${daemon} ${daemon_flags}"
}

rc_cmd $1
```

**vim /etc/rc.d/mcsm-web**

```
#!/bin/ksh

daemon_execdir="/usr/local/mcsmanager/web"
daemon="/usr/local/bin/node"
daemon_flags="app.js"
daemon_user="root"

. /etc/rc.d/rc.subr

rc_bg=YES
rc_reload=NO

rc_start() {
        rc_exec ". ~/.profile; ${daemon} ${daemon_flags}"
}

rc_cmd $1
```

编辑完毕后请使用`chmod +x /etc/rc.d/mcsm-*`，否则无法执行服务！


## 命令用法

重启：
`rcctl restart mcsm-daemon`
`rcctl restart mcsm-web`

启动：
`rcctl start mcsm-daemon`
`rcctl start mcsm-web`

停止：
`rcctl stop mcsm-daemon`
`rcctl stop mcsm-web`

禁用：
`rcctl disable mcsm-daemon`
`rcctl disable mcsm-web`

启用：
`rcctl enable mcsm-daemon`
`rcctl enable mcsm-web`

## 修改用户权限

> 在默认的服务配置内未修改用户的情况下，服务会以 root 用户运行，从而给服务器带来潜在安全隐患，推荐更改运行该服务的用户（daemon_user）来保证安全。

1. 通过`useradd``chmod``chown`等命令来创建用户并修改相关用户权限。
2. 修改 `daemon_user` 属性
3. 重新启动服务