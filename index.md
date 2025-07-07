# Quick start

## What's this?

MCSManager is an **open-source, distributed, out-of-the-box control panel that supports `Minecraft` and `Steam game servers`**.

MCSManager has gained a certain level of popularity within `Minecraft` and `other gaming communities`. It helps you manage multiple physical machines, configure game servers on any host, and offers a secure and reliable multi-user permission system. MCSManager is a one-stop solution for most server hosting senarios.

## Dependencies

By default, **The installation script should already include all required environments**, so you don't need to worry about environment requirements.

But if you install it manually, you need to meet the `Node 16+` runtime environment.

## Linux Installation Script

Because it needs to be registered to the system service, **The installation script must be run with root.**

```bash
sudo su -c "wget -qO- https://script.mcsmanager.com/setup.sh | bash"
```

### Startup Method

```bash
# Start the panel daemon first.
# This is a service process used for process control and terminal management.
systemctl start mcsm-daemon.service
# Start the panel web service again.
# This is used to implement services that support web page access and user management.
systemctl start mcsm-web.service

# Restart panel command
systemctl restart mcsm-daemon.service
systemctl restart mcsm-web.service

# Stop panel command
systemctl stop mcsm-web.service
systemctl stop mcsm-daemon.service

```

:::tip
If the `systemctl` command **cannot start** the panel, you can refer to the `Startup Method` in the `Manual installation` below to start MCSManager.
But this requires you to use other background running programs to take over it, otherwise when your `SSH` terminal is disconnected, the manually started MCSManager panel will also be forcibly terminated by the system.

The panel web service is a service that provides user management and web page access functions, and the daemon process is a service that provides process management and container management. Both are indispensable. If a certain function is not working properly, you can restart only this part of the service to hot-fix the problem.
:::

## Linux Manual Installation

```bash
# Switch to the installation directory, you can also change to other directories.
cd /opt/

# Download Node.js 20.11. If you already have Node.js 16+ installed, ignore this step.
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
tar -xvf node-v20.11.0-linux-x64.tar.xz

# Add NodeJS to system PATH
ln -s /opt/node-v20.11.0-linux-x64/bin/node /usr/bin/node
ln -s /opt/node-v20.11.0-linux-x64/bin/npm /usr/bin/npm

# Prepare MCSM's installation directory
mkdir /opt/mcsmanager/
cd /opt/mcsmanager/

# Download MCSManager
wget https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_release.tar.gz

# Unzip to the installation directory
tar --strip-components=1 -xzvf mcsmanager_linux_release.tar.gz

```

### Startup Method

```bash
#Install dependent libraries
./install.sh

# Please use the Screen program to open two terminal windows (or other takeover programs)

# Start the node program first
./start-daemon.sh

# Start the Web panel service in the second terminal
./start-web.sh

# Access http://localhost:23333/ for the web interface
# Generally speaking, network applications will automatically scan and connect to the local daemon.
# Default ports that need to be opened: 23333 and 24444
```

### Stop Panel

Just enter two terminals and execute `Ctrl+C`.

## Windows Installation

Just [download the ZIP file](https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_windows_release.zip) and decompress it to run without any installation dependencies and without polluting the registry.

### Startup Method

Execute `start.bat` or `run.bat`, etc. If the compressed package contains `launcher.exe`, you can use it to start the panel.

### Stop Panel

Enter `Ctrl+C` in the two terminal console windows of the panel to close normally.
