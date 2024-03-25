# Distributed Deployment

## About

If you have multiple physical/virtual servers, MCSManager allows you to manage them all together with a sinlge web interface.

## How to Connect

Before adding daemons to the panel, you need to install MCSManager Panel (daemon) on all the servers you want to manage. You can use the installation script and start **only** the `daemon` service.

```bash
# After the installation script finished...

# [REQUIRED] Stop web service
# If you don't stop the web service, anyone can access the initial setup page and take over your server.
systemctl stop mcsm-web

# [REQUIRED] Disable the web services from startup
systemctl disable mcsm-web

# Start only the daemon service.
systemctl start mcsm-daemon
```

Return to the web interface. On the `Daemons` page you can see all connected daemons. If the `connection address` is localhost, this means that the daemon service is deployed on your local server with web ui. You can connect to any server that has a public IP address and installed daemon.

To add a new daemon, click the `New Daemon` button, fill in all the blanks, and click `Confirm`.

## Daemon Key

The daemon key will be printed out during the startup phase. Althernatively, it can also be found at the following location(s):

### Linux

If you used the installation script to install, the default file path is:

`/opt/mcsmanager/daemon/data/Config/global.json`

### Windows or Linux Manual Installation

`<Panel Installation Path>/daemon/data/Config/global.json`

## Connection Protocol

You can use either `IP` or `domain` for the `Connection Address` field. For advanced users with reverse proxy, `ws://x.x.x.x` or `wss://x.x.x.x` is also supported. 

`ws` refer to `http`, `wss` refer to `https`.

> If you don't know what it is, just type the IP address or domain without any prefix.
