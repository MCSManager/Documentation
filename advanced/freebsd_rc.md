# FreeBSD Service

We can always use an ssh client to connect to the FreeBSD server and run any command. However, when we disconnect the SSH, any program that is running will be stopped too. Also it is not practical to manually start the program each time the server is rebooted.

Therefore, we can configure RC services for MCSManager to start with the system and keep running in the background.

If you installed MCSManager manually, we recommend that you configure a RC service for MCSManager.

## Config

:::tip
The following is based on Node.js installed with `pkg install node`.
:::

:::tip
DO NOT save service files to `/etc/rc.d`, or it may be ruined by system patch or upgrade! 
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

Please give execution permission with `chmod +x /usr/local/etc/rc.d/mcsm*` to make those services work!


## Commands

Restart：
`service mcsmd onerestart`
`service mcsmw onerestart`

Start：
`service mcsmd onestart`
`service mcsmw onestart`

Stop：
`service mcsmd onestop`
`service mcsmw onestop`

Disable：
Add `#` before `mcsmd_enable="YES"` and/or `mcsmw_enable="YES"` in `/etc/rc.conf`.

Enable：
Remove `#` before `mcsmd_enable="YES"` and/or `mcsmw_enable="YES"` in `/etc/rc.conf`.

## Panel Permission

> > With the above configs, MCSManager will run as the root user by default. This is not advised as it will bring extra risks to the host. It is recommended to use a separate user when starting MCSManager.

1. Use the `useradd`, `chmod`, `chown` commands to create a user and set permissions.
2. Change the `user` variable.
3. Restart the service(s).
