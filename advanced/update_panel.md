# Upgrade & Reset MCSManager

:::tip
Please backup the `web/data` and `daemon/data` directories to another location before upgrading your panel.
:::

## Before upgrade

Given MCSManager's distributed architecture, updating all daemons might be time-consuming if you have more than five. We recommend that only updating when we release a major version or security fixes.

If you have only a few daemons, upgrading your panel should not be a problem.

## Updating the Panel

### For Windows

1. Download the latest zip file from [the official website](https://mcsmanager.com).
2. **Overwrite** the existing panel directory.

### For Linux

**If you used the installation script**, simply run the command again. The installation script supports automatic upgrades without damaging your data.

```bash
sudo su -c "wget -qO- https://mcsmanager.com/install-v10.sh | bash"
```

**If you installed the panel manually**, **_DO NOT_** use the installation script. _Running the script will result in an additional MCSManager being installed_.

To upgrade to the latest release of MCSManager, download the zip file from [the official release page](https://github.com/MCSManager/MCSManager/releases/latest), and overwrite all current MCSManager files.

## Reset Admin Account

If you lost access to the admin account, you can always create a new one with the following steps:

1. **Move** the `web/data/User` directory to another location.
2. Restart MCSManager, the initial setup page will be displayed.
3. Follow the instructions and create a new admin account.
4. Move back the `web/data/User` directory.
5. Restart MCSManager

## Reset Everything

All you need to do is delete the `data` folder.
