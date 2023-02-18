# Register system service

## Config

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

## Usage

systemctl restart mcsm-{daemon,web}.service
systemctl start mcsm-{daemon,web}.service
systemctl stop mcsm-{daemon,web}.service
systemctl disable mcsm-{daemon,web}.service
systemctl enable mcsm-{daemon,web}.service
