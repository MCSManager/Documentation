# Register MCSM as a system service

## systemd Config

```sh
vim /etc/systemd/system/mcsm-daemon.service
```

```systemd
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

```sh
vim /etc/systemd/system/mcsm-web.service
```

```systemd
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

&nbsp;

## systemd Usage

```sh
#Restart web or daemon service
systemctl restart mcsm-{daemon,web}.service

#Start web or daemon service
systemctl start mcsm-{daemon,web}.service

#Stop web or daemon service
systemctl stop mcsm-{daemon,web}.service

#Configure web or daemon service to run on system startup.
systemctl enable mcsm-{daemon,web}.service

#Stop web or daemon service from run on system startup.
systemctl disable mcsm-{daemon,web}.service
```

&nbsp;

## OpenRC Config

```sh
vim /etc/init.d/mcsm-daemon

```

```sh
#!/sbin/openrc-run

name="MCSManager Daemon"
command="${node_install_path}/bin/node /opt/mcsmanager/daemon/app.js"
command_background="yes"
directory="/opt/mcsmanager/daemon"
pidfile="/var/run/mcsm-daemon.pid"
output_log="/var/log/mcsm/daemon.log"
error_log="/var/log/mcsm/daemon.err"
supervisor="supervise-daemon"

depend() {
  need net localmount
  use logger
  after firewall
}
```

```sh
vim /etc/init.d/mcsm-web
```

```sh
#!/sbin/openrc-run

name="MCSManager Web"
command="${node_install_path}/bin/node /opt/mcsmanager/web/app.js"
command_background="yes"
directory="/opt/mcsmanager/web"
pidfile="/var/run/mcsm-web.pid"
output_log="/var/log/mcsm/web.log"
error_log="/var/log/mcsm/web.err"
supervisor="supervise-daemon"

depend() {
  need net localmount
  use logger
  after firewall
}
```

&nbsp;

## OpenRC Usage

Setup:

```sh
# make OpenRC scripts executable so they can be run
chmod +x /etc/init.d/mcsm-daemon
chmod +x /etc/init.d/mcsm-web

# add mcsm-daemon and mcsm-web to default runlevel
# to enable them to run on startup
rc-update add mcsm-daemon default
rc-update add mcsm-web default

# start mcsm-daemon and mcsm-web services
rc-service mcsm-daemon start
rc-service mcsm-web start
```

Management:

```sh
# restart mcsm-daemon or mcsm-web services
rc-service mcsm-daemon restart
rc-service mcsm-web restart

# start mcsm-daemon or mcsm-web services
rc-service mcsm-daemon start
rc-service mcsm-web start

# stop mcsm-daemon or mcsm-web services
rc-service mcsm-daemon stop
rc-service mcsm-web stop

# remove mcsm-daemon or mcsm-web from default runlevel
# to disable them from running on startup
rc-update delete mcsm-daemon default
rc-update delete mcsm-web default
```
