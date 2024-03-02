# Systemd service (Linux)

<tip>
If you used the installation script to install, the information on this page is not relevant to you. This is because the installation script has already done this for you.
</tip>

As we all know, we can use ssh client to visit Linux server and start programs, but when ssh is stopped, program will stop too. If we want to let MCSManager run for a long time on Linux server, then we can write into a service and let it run in background.

If you have installed the Panel manually, we recommend that you register a systemd service for MCSManager.

## Config

**vim /etc/systemd/system/mcsm-daemon.service**

```
[Unit]
Description=MCSManager Daemon

[Service]
WorkingDirectory=/opt/mcsmanager/daemon
ExecStart=<NodeJS installation path>/bin/node app.js
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
ExecStart=<NodeJS installation path>/bin/node app.js
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
Environment="PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

[Install]
WantedBy=multi-user.target
```

## Commands

Restart：`systemctl restart mcsm-{daemon,web}.service`

Start：`systemctl start mcsm-{daemon,web}.service`

Stop：`systemctl stop mcsm-{daemon,web}.service`

Disable：`systemctl disable mcsm-{daemon,web}.service`

Able：`systemctl enable mcsm-{daemon,web}.service`

## Adjust user permission

> If it is not set for specific user when running this service, it will be run by root. This will bring potential security issue, it is recommand to set a specific user for running the service and ensure the security

1. Use the `useradd`, `chmod`, `chown` commands to create a user and set permissions.
2. Add `User=<user>` to the `[Service]` column.
3. Restart the service(s).
