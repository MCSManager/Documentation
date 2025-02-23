# FreeBSD 服务配置

众所周知，通过 SSH 客户端访问 BSD Kornshell 启动的任何软件，会在 SSH 连接断开时自动退出，此时如果我们希望 MCSManager 在 FreeBSD 中长期运行，那么我们可以编写服务让其在后台长期运行。

如果你是手动安装的 MCSManager，那么建议你将 MCSManager 配置为系统服务。

## 配置

:::tip
以下配置是基于通过`pkg install node`安装的 Node.js 编写的
:::

:::tip
切勿将服务配置文件保存到`/etc/rc.d`，以免更新补丁或安装软件包时丢失服务配置
:::

**vim /usr/local/etc/rc.d/mcsmd**

```
#!/bin/sh

# PROVIDE: mcsmd
# REQUIRE: DAEMON
# KEYWORD: shutdown

. /etc/rc.subr

name="mcsmd"
rcvar="mcsmd_enable"

workdir="/usr/local/mcsmanager/daemon"
user="root"
pidfile="/var/run/mcsmd.pid"

start_cmd="${name}_start"
stop_cmd="${name}_stop"
reload_cmd="${name}_reload"

mcsmd_start()
{
    cd ${workdir}
    /usr/sbin/daemon -p ${pidfile} -u ${user} /usr/local/bin/node app.js > /dev/null
}

mcsmd_stop()
{
    if [ -f $pidfile ]; then
        kill -QUIT $(cat $pidfile)
        rm $pidfile
    fi
}

mcsmd_reload()
{
    if [ -f $pidfile ]; then
        kill -HUP $(cat $pidfile)
    fi
}

load_rc_config $name
run_rc_command "$1"
```

**echo 'mcsmd_enable="YES"' >> /etc/rc.conf**

**vim /usr/local/etc/rc.d/mcsmw**

```
#!/bin/sh

# PROVIDE: mcsmw
# REQUIRE: DAEMON
# KEYWORD: shutdown

. /etc/rc.subr

name="mcsmw"
rcvar="mcsmw_enable"

workdir="/usr/local/mcsmanager/web"
user="root"
pidfile="/var/run/mcsmw.pid"

start_cmd="${name}_start"
stop_cmd="${name}_stop"
reload_cmd="${name}_reload"

mcsmw_start()
{
    cd ${workdir}
    /usr/sbin/daemon -p ${pidfile} -u ${user} /usr/local/bin/node app.js > /dev/null
}

mcsmw_stop()
{
    if [ -f $pidfile ]; then
        kill -QUIT $(cat $pidfile)
        rm $pidfile
    fi
}

mcsmw_reload()
{
    if [ -f $pidfile ]; then
        kill -HUP $(cat $pidfile)
    fi
}

load_rc_config $name
run_rc_command "$1"
```

**echo 'mcsmw_enable="YES"' >> /etc/rc.conf**

编辑完毕后请使用`chmod +x /usr/local/etc/rc.d/mcsm*`，否则无法执行服务！


## 命令用法

重启：
`service mcsmd onerestart`
`service mcsmw onerestart`

启动：
`service mcsmd onestart`
`service mcsmw onestart`

停止：
`service mcsmd onestop`
`service mcsmw onestop`

禁用：
编辑`/etc/rc.conf`，在`mcsmd_enable="YES"`和/或`mcsmw_enable="YES"`前添加`#`

启用：
编辑`/etc/rc.conf`，去除在`#mcsmd_enable="YES"`和/或`#mcsmw_enable="YES"`前的`#`

## 修改用户权限

> 在默认的服务配置内未修改用户的情况下，服务会以 root 用户运行，从而给服务器带来潜在安全隐患，推荐更改运行该服务的用户（daemon_user）来保证安全。

1. 通过`useradd` `chmod` `chown`等命令来创建用户并修改相关用户权限。
2. 修改 `user` 属性
3. 重新启动服务
