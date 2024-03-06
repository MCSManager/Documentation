# Quick start

## What's this?

This is a **distributed, stable and reliable, out-of-the-box, highly scalable, control panel that supports `Minecraft` and `Steam game servers`**.

This panel is really popular in Minecraft and other gaming communities. It lets you manage multiple physical servers from one central UI panel, create game servers dynamically on any host, and has a safe and reliable multi-user permission system that makes server management a breeze.

## Enviroment requirment

If you use the installation script, you don't need to worry about the environments. The script will do all the installation steps for you.

If you install the Panel manually, you will need to install `Node 16+` for the running environment.

> Official Node website -> [https://nodejs.org/](https://nodejs.org/)

## Install the Panel

### Linux

---

#### Installation script (Recommand)

```bash
wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup_cn.sh | bash
```

If the installation script doesn't work, you can try installing manually.

---

#### Manually installation

```bash
# switch to the installation directory. Please create it in advance with 'mkdir /opt/' if not exist.
cd /opt/
# Download runtime environment (Node.js). Ignore this step if you have Node.js 14+ installed already.
wget https://nodejs.org/dist/v14.19.1/node-v14.19.1-linux-x64.tar.gz
# Decompress archive
tar -zxvf node-v14.19.1-linux-x64.tar.gz
# Add program to system PATH
ln -s /opt/node-v14.19.1-linux-x64/bin/node /usr/bin/node
ln -s /opt/node-v14.19.1-linux-x64/bin/npm /usr/bin/npm

# Prepare installation directory
mkdir /opt/mcsmanager/
cd /opt/mcsmanager/

# Download MCSManager
wget https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_linux_release.tar.gz
tar -zxf mcsmanager_linux_release.tar.gz

./install-dependency.sh

# Please open two terminals or Screen

# Start the daemon first
./start-daemon.sh

# Start the web service (in the second terminal)
./start-web.sh

# Access http://localhost:23333/ for web interface
# In general, the web application will scan and connect to the local daemon automatically.
```

---

#### Panel bash commands

```bash
# Start the panel
systemctl start mcsm-daemon.service # Start daemon service
systemctl start mcsm-web.service # Start web service
systemctl start mcsm-{web,daemon}.service # Start web and daemon service

# Restart the panel
systemctl restart mcsm-daemon.service # Restart daemon service
systemctl restart mcsm-web.service # Restart web service
systemctl restart mcsm-{daemon,web}.service # Restart daemon and web service

# Stop the panel
systemctl stop mcsm-web.serivce # Stop web service
systemctl stop mcsm-daemon.service # Stop daemon service
systemctl stop mcsm-{web,daemon}.service # Stop daemon and web service
```

---

### Windows

To get started, [download](http://oss.duzuii.com/MCSManager/MCSManager) and unzip the ZIP file. After that, just click on `start.bat`. You don't need any extra running environment, and you don't have to make any changes to the registers.

---

#### Stop the panel

To close the console, you can either press `CTRL` + `C` or simply click the X button located on the top-right corner of the window.
