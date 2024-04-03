# Quick start

## What's this?

MCSManager is an **open-source, distributed, out-of-the-box control panel that supports `Minecraft` and `Steam game servers`**.

MCSManager has gained a certain level of popularity within `Minecraft` and `other gaming communities`. It helps you manage multiple physical machines, configure game servers on any host, and offers a secure and reliable multi-user permission system. MCSManager is a one-stop solution for most server hosting senarios.

## Dependencies

By default, the installation script will take care of the dependencies. If you are installing manually, only `Node.js 16+` is required.

> To download Node.js -> [https://nodejs.org/](https://nodejs.org/)

## Installation

### Linux

---

#### Installation script (Recommand)

Only supports `x86_64` architecture **Ubuntu**/**Centos**/**Debian**/**Archlinux**.

```bash
sudo su -c "wget -qO- https://mcsmanager.com/install-v10.sh | bash"
```

If the above script failed to complete correctly, feel free to [submit an Issue](https://github.com/MCSManager/MCSManager/issues) and/or try Linux manual installation.

### Windows

Start by downloading this [zip archive](https://mcsmanager.com/) and decompress to a local directory.

## Starting MCSManager

### Linux

```bash
# Start the daemon first.
# This is the service process that controls instances and terminals
systemctl start mcsm-daemon.service
# Then start the web interface.
# The web interface provides an easy way to access all panel's functionalities
systemctl start mcsm-web.service

# Restart the panel
systemctl restart mcsm-daemon.service
systemctl restart mcsm-web.service

# Stop the panel
systemctl stop mcsm-web.service
systemctl stop mcsm-daemon.service
```

:::tip
`mcsm-web` is the service that provides user management and web access functionalities, while the `mcsm-daemon` is the service that manages processes and containers. Both services are essential for the panel to work. However, if an issue arises with a certain function, you don't always need to restart both of them.
:::

### Windows

#### Stop the Panel

To stop the panel, you can either press `CTRL` + `C` or simply click the `X` button located on the top-right corner of the terminal(s).

#### Start the Panel

Simply click on `start.bat`. There is no need for any extra libraries (including Node.js), all dependencies were included in the package.
