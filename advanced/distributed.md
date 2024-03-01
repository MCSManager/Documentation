# Distributed

## What is distributed

If you have multiple physical servers in use, MCSManager Panel can let you control and distribute instance to different servers from web UI.

## How to connect

Firstly, you need to install MCSManager Panel on all the servers you want to control via the web UI. You can use the installation script and just start the `daemon` service.

```bash
# After installing from the installation script

# Stop web service (required)
# If you don't stop the web service, anyone can access the initialisation page from the web and break into your server.
systemctl stop mcsm-web

# Disable the web services from startup (required)
systemctl disable mcsm-web

# Only start daemon services to access the server.
systemctl start mcsm-daemon
```

Next, return to the web interface. On the `Daemons` page you can see all connected daemons. If the `connection address` is localhost, this means that the daemon service is deployed on your local server with web ui. You can connect to any server that has a public IP address and deployed daemons using the web panel.

To add a daemon to your Web Panel, click the New Daemon button, fill in all the fields, and click Confirm.

## Daemon Key

Normally the daemon key will be printed out after the first installation, please save it, or you can find the daemon key at this location.

### Linux

If you used the installation script to install, the default file path is:

`/opt/mcsmanager/daemon/data/Config/global.json`

### Windows

`<Panel Installation Path>/daemon/data/Config/global.json`

## Connection protocol

You can customise the connection protocol when filling in the `connection address' using `ws://x.x.x.x' or `wss://x.x.x.x'. Or just type the IP address or domain in the blank.

`ws` 对于 `http`，`wss` 对应 `https`。

`ws` refer to `http`, `wss` refer to `https`.

> If you don't know what it is, just type the IP address or domain without any decorations.
