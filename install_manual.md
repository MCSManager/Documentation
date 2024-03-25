## Manual Installation

### Linux

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
./install-dependency.sh

# Please open two terminals or screens.

# Start the daemon first.
./start-daemon.sh

# Start the web interface at the second terminal or screen.
./start-web.sh

# For web access, go to http://localhost:23333/
# In general, the web interface will automatically scan and add the local daemon. 
```

---
