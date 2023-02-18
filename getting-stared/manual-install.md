# Install MCSManager

## Windows

For the Windows systems, the MCSM panel has been **compiled into a click-to-run version**.

Download it from the official site: [https://mcsmanager.com/](https://mcsmanager.com/)

## Linux

**Quick Install with one command**

```bash
wget -qO- https://raw.githubusercontent.com/mcsmanager/Script/master/setup_en.sh | bash
```

- The script is designed for Ubuntu/Centos/Debian/Archlinux of AMD64 architecture only.
- Use `systemctl start mcsm-{web,daemon}` to start service after installtion.
- Directory for panel components and runtime: `/opt/mcsmanager/`

If the installation script does not work, you can try the following steps to install manually.

```bash
# switch to the installation directory. Please create it in advance with 'mkdir /opt/' if not exist.
cd /opt/
# Download runtime environment (Node.js). Ignore this step if you have Node.js 14+ installed already.
wget https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-x64.tar.gz
# Decompress archive
tar -zxvf node-v14.17.6-linux-x64.tar.gz
# Add program to system PATH
ln -s /opt/node-v14.17.6-linux-x64/bin/node /usr/bin/node
ln -s /opt/node-v14.17.6-linux-x64/bin/npm /usr/bin/npm

# Prepare installation directory
mkdir /opt/mcsmanager/
cd /opt/mcsmanager/

# Download the web project
git clone https://github.com/MCSManager/MCSManager-Web-Production.git web
cd web
# Install dependencies
npm install --production
cd /opt/mcsmanager/

# Download the Daemon
git clone https://github.com/MCSManager/MCSManager-Daemon-Production.git daemon
cd daemon
# Install dependencies
npm install --production

# Please open two terminals or Screen
# Start the daemon first
cd /opt/mcsmanager/daemon
# Start the daemon
node app.js

# Start the web project (new screen)
cd /opt/mcsmanager/web
# start the application
node app.js

# Access http://localhost:23333/ for web interface
```

## Register system service

reference: [/getting-stared/linux-service](/getting-stared/linux-service)
