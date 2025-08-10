# OpenBSD Service

We can always use an ssh client to connect to the OpenBSD server and run any command. However, when we disconnect the SSH, any program that is running will be stopped too. Also it is not practical to manually start the program each time the server is rebooted.

Therefore, we can configure RC services for MCSManager to start with the system and keep running in the background.

If you installed MCSManager manually, we recommend that you configure a RC service for MCSManager.

## Config

:::tip
The following is based on Node.js installed with `pkg_add node`.
:::

**vim /etc/rc.d/mcsmd**

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

**vim /etc/rc.d/mcsmw**

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

Please give execution permission with `chmod +x /etc/rc.d/mcsm*` to make those services work!


## Commands

Restart：
`rcctl restart mcsmd`
`rcctl restart mcsmw`

Start：
`rcctl start mcsmd`
`rcctl start mcsmw`

Stop：
`rcctl stop mcsmd`
`rcctl stop mcsmw`

Disable：
`rcctl disable mcsmd`
`rcctl disable mcsmw`

Enable：
`rcctl enable mcsmd`
`rcctl enable mcsmw`

## Panel Permission

> > With the above configs, MCSManager will run as the root user by default. This is not advised as it will bring extra risks to the host. It is recommended to use a separate user when starting MCSManager.

1. Use the `useradd`, `chmod`, `chown` commands to create a user and set permissions.
2. Change the `daemon_user` variable.
3. Restart the service(s).
