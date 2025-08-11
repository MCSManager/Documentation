# OpenRC service (Linux)

:::tip
This page only applys for Linux distros using on OpenRC init like Alpine/Devuan/Artix/Slackware. If you don't know what it is, please view Systemd Service instead.
:::

We can always use an ssh client to connect to the Linux server and run any command. However, when we disconnect the SSH, any program that is running will be stopped too. Also it is not practical to manually start the program each time the server is rebooted.

Therefore, we can configure the OpenRC services for MCSManager to start with the system and keep running in the background.

If you installed MCSManager manually, we recommend that you configure a OpenRC service for MCSManager.

## Config

**vim /etc/init.d/mcsmd**

```
#!/sbin/openrc-run

name=$RC_SVCNAME
description="MCSManager Daemon"
supervisor="supervise-daemon"
command="<NodeJS dir>/bin/node"
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

**vim /etc/init.d/mcsmw**

```
#!/sbin/openrc-run

name=$RC_SVCNAME
description="MCSManager Web"
supervisor="supervise-daemon"
command="<NodeJS dir>/bin/node"
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

Please give execution permission with `chmod +x /etc/init.d/mcsm*` to make those services work!


## Commands

Restart：
`service mcsmd restart`
`service mcsmw restart`

Start：
`service mcsmd start`
`service mcsmw start`

Stop：
`service mcsmd stop`
`service mcsmw stop`

Disable：
`rc-update del mcsmd`
`rc-update del mcsmw`

Enable：
`rc-update add mcsmd`
`rc-update add mcsmw`

## Panel Permission

> > With the above configs, MCSManager will run as the root user by default. This is not advised as it will bring extra risks to the host. It is recommended to use a separate user when starting MCSManager.

1. Use the `useradd`, `chmod`, `chown` commands to create a user and set permissions.
2. Change the `command_user` variable.
3. Restart the service(s).
