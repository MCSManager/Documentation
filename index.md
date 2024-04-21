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

#### Installation script (Recommended)

Only supports `x86_64` architecture **Ubuntu**/**Centos**/**Debian**/**Archlinux**.

```bash
sudo su -c "wget -qO- https://mcsmanager.com/install-v10.sh | bash"
```

If the above script failed to complete correctly, feel free to [submit an Issue](https://github.com/MCSManager/MCSManager/issues) and/or try Linux manual installation.

#### Manual

If the installation script failed to execute correctly, you can try install it manually.

```bash
# Create /opt directory if not already
mkdir /opt
# Switch to /opt
cd /opt/
# Download Node.js 20.11. If you already have Node.js 16+ installed, ignore this step.
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
# Decompress Node.js source
tar -xvf node-v20.11.0-linux-x64.tar.xz
# Add Node.js to system PATH
ln -s /opt/node-v20.11.0-linux-x64/bin/node /usr/bin/node
ln -s /opt/node-v20.11.0-linux-x64/bin/npm /usr/bin/npm

# Prepare MCSM's installation directory
mkdir /opt/mcsmanager/
cd /opt/mcsmanager/

# Download MCSManager
wget https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_release.tar.gz
tar -zxf mcsmanager_linux_release.tar.gz

# Install dependencies
./install.sh

# Please open two terminals or screens.

# Start the daemon first.
./start-daemon.sh

# Start the web interface at the second terminal or screen.
./start-web.sh

# For web access, go to http://localhost:23333/
# In general, the web interface will automatically scan and add the local daemon.
```

This installation approach does not automatically set up MCSManager as a system service. Therefore, it is necessary to use `screen` for management.

### Windows

Start by downloading this [zip archive](https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_windows_release.zip) and decompress to a local directory.

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
