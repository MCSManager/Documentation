# Update MCSManager

### Update Proposals

Because of the distributed deployment of daemon processes, if you have more than 5 nodes, it will be a bit troublesome to update. It is recommended to wait and see, and update them together after the cumulative update reaches a certain level.

If you have few nodes, you can update to the latest version.

<br />

### backup (optional)

If you are worried about data loss caused by the update, first move the two directories `web/data` and `daemon/data` to other **upper** directories.

Data security can be ensured by moving back after the update is complete.

<br />

### Windows

1. Go to the official website https://mcsmanager.com/ and download the latest zip file.

2. Just **overwrite** the source file.

<br />

### Linux

**Auto Update**

If you used the one-click script update at the beginning, then you only need to execute the following command:

Our one-click install script supports automatic updates without compromising local data.

```bash
cd /opt
sudo su # switch root account
wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup_cn.sh | bash
```

**Manual Update**

If you installed the MCSManager panel manually, the one-click install script will not work for you, as it will result in two copies of the program being installed.

You have to go to the official release repository, download the latest code and overwrite all your MCSManager files.

https://github.com/MCSManager/MCSManager/releases/latest

<br />
