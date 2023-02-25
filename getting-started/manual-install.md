# Install MCSManager

## Windows

Download the **click-to-run version** from the official site: [https://mcsmanager.com/](https://mcsmanager.com/)

## Linux

**Installation with one command**

```bash
wget -qO- https://raw.githubusercontent.com/mcsmanager/Script/master/setup_en.sh | bash
```

- The script is designed for x86 Ubuntu/CentOS/Debian/Archlinux only.
- Use `systemctl start mcsm-{web,daemon}` to start services after installtion.
- Installation directory: `/opt/mcsmanager/`

You can also install MCSM manually.

```bash
# Switch to the installation directory. If not existed, create with 'mkdir /opt/'
cd /opt/

# If not done already, install Node.js runtime (14+ required).
# Download node-v14.17.6, you can also use another version. The minimum requirement is v14.
wget https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-x64.tar.gz

# Extract required files.
tar -zxvf node-v14.17.6-linux-x64.tar.gz

# Add Node.js to system PATH
ln -s /opt/node-v14.17.6-linux-x64/bin/node /usr/bin/node
ln -s /opt/node-v14.17.6-linux-x64/bin/npm /usr/bin/npm

# Create and switch to installation directory
mkdir /opt/mcsmanager/
cd /opt/mcsmanager/

# Download the web project. (Skip this if you do not plan to run web panel on this machine)
git clone https://github.com/MCSManager/MCSManager-Web-Production.git web
cd web
# Install dependencies
npm install --production
cd /opt/mcsmanager/

# Download the Daemon (Skip this if you do not plan to run daemon service on this machine.)
git clone https://github.com/MCSManager/MCSManager-Daemon-Production.git daemon
cd daemon
# Install dependencies
npm install --production

# You need two terinals or Screens for the following step.
# Run the daemon first (Skip this if you do not plan to run daemon service on this machine.)
cd /opt/mcsmanager/daemon
# Start the daemon
node app.js

# Run the web project (in another screen) (Skip this if you do not plan to run web panel on this machine)
cd /opt/mcsmanager/web
# start the application
node app.js

# Access http://localhost:23333/ for web interface
```

## Register MCSM as a system service (autostart)

reference: [/getting-started/linux-service](/getting-started/linux-service.md)
