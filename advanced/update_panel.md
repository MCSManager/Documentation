# Upgrade & Reset Panel

<tip>
you are concerned about losing data, please backup the 'web/data' and 'daemon/data' folders to another location before upgrading your panel. After upgrading your panel, you can move it back.
</tip>

## Before upgrade

If you have more than five nodes, updating all of them may be difficult as we have separated the web and daemon into two parts during deployment. We recommend that you upgrade your panel when we release major or security updates.

If you have only a few nodes, upgrading your panel should not be a problem.

## Start upgrade panel

### For Windows

1. Download the latest zip file from [the official website](https://mcsmanager.com).
2. **Overwrite** panel files.

### For Linux

**If you used the installation script to install the panel**, simply run the command. The installation script supports automatic upgrades without damaging your data.

```bash
sudo wget -qO- https://gitee.com/mcsmanager/script/raw/master/setup_cn.sh | bash
```

**If you installed the panel manually**, the installation script will not support automatic upgrades. _This is because it will install the panel instead of upgrading it_.

To upgrade to the latest release of MCSManager, visit the [official release page](https://github.com/MCSManager/MCSManager/releases/latest) and download the zip file. Afterward, replace all current MCSManager files with the updated ones.

## Reset admin account

If you have forgotten the password for your Panel admin account. You can move the `web/data/User` folder to another location. It will let Panel turn to the `installation page`, you can adjust your admin accout's username and password. After that, move all the `json `files in the user folder that you moved before to the new one.

## Reset everything

All you need to do is delete the `data` folder.
