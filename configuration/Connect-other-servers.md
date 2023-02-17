# Connect Other Server

## Install Daemon on other servers

Use the "installation script" to install MCSManager on other machines, and turn off the Web service, leaving only the Daemon service.

```bash
wget -qO- https://raw.githubusercontent.com/mcsmanager/Script/master/setup_en.sh | bash
systemctl start mcsm-daemon

# STOP web service!
systemctl stop mcsm-web
systemctl disable mcsm-web 
```

## Connect Daemon

cat /opt/mcsmanager/daemon/data/Config/global.json
```json
{
    "version": 2,       
    "ip": "",           
    "port": 24444,      
    "key": "9aad9b81f8794a7720b28f....d4bb489c495cf29a88e7b",   // Copy this   
    "maxFileTask": 2,       
    "maxZipFileSize": 60, 
    "language": "en_us",
    "defaultInstancePath": ""
}
```

### Paste password and connect

![paste-password-for-daemon](../images/paste-password-for-daemon.png)