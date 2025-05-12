# Install panel

## Linux

```bash
wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup.sh | bash
```

If the Linux next-key script installation fails, you can [go here](https://github.com/MCSManager/MCSManager#linux) to install it manually.

> Note: Repeated installation is prohibited. Repeated installation will cause all data in the original panel to be deleted. If you need to update the panel, please refer to the "Update Panel" chapter.

## Windows

[Download Zip](https://github.com/MCSManager/MCSManager/releases/latest/download/mcsmanager_windows_release.zip)

Just download and run, without any installation dependencies and without polluting the registry.

# launch panel

## Linux

You can use the following commands only after using the one-click installation script. If you install manually, please visit [Readme.md](https://github.com/MCSManager/MCSManager/blob/master/README.md) to view.

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

> The panel web service is a service that provides user management and web page access functions, and the daemon process is a service that provides process management and container management. Both are indispensable. If a certain function is not working properly, you can restart only this part of the service to hot-fix the problem.

## Windows

Close the panel: Enter `Ctrl+C` in the two terminal console windows of the panel to close it normally. If it doesn't work, you can directly click the close button in the upper right corner.

Start the panel: Execute `start.bat` or `run.bat`, etc. If the compressed package contains `launcher.exe`, you can use it to start the panel.

## Related Links

Official website: [https://mcsmanager.com](https://mcsmanager.com)

Github development team homepage: [https://github.com/MCSManager](https://github.com/MCSManager)

Github discussion area: [https://github.com/MCSManager/MCSManager/issues](https://github.com/MCSManager/MCSManager/issues)

QQ group: [198646856](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=NjZnbz2w1oEhjHbcL8nyxoxtrbtmFlp5&authKey=ktl9iperzg%2BdAjJeyZJ6hDSd1aZksO8uTpEbWeqY6XU1K6 lg005nqPGlZ2SQp6Sx&noverify=0&group_code=198646856)

## Donate

Aida Donation Platform Address: [https://afdian.net/@mcsmanager](https://afdian.net/@mcsmanager)

> Support the development team so that the software can be continuously updated and iterated and serve everyone.

## Running environment

By default, the one-click installation script should already contain all required environments.

In special cases, you need to meet the `Node 14+` runtime environment

To download the Node environment, go to: [https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)
