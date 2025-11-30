# Upgrade & Reset MCSManager

:::tip
Please backup the `web/data` and `daemon/data` directories to another location before upgrading your panel.
:::

## Before upgrade

Given MCSManager's distributed architecture, updating all daemons might be time-consuming if you have more than five. We recommend that only updating when we release a major version or security fixes.

If you have only a few daemons, upgrading your panel should not be a problem.

## Updating the Panel

### For Windows

1. Download the latest zip file from [official website](https://mcsmanager.com).
2. **Overwrite** the existing panel directory.

### Script Update for Linux Version

If you originally installed MCSManager using the **one-click script**, you can simply run the following command. The one-click installation script supports automatic updates and will not damage your local data.

After executing the script, there's nothing else you need to do, and your MCSManager should automatically be updated to the latest version.

```bash
sudo su -c "wget -qO- https://script.mcsmanager.com/setup.sh | bash"
```

> [!IMPORTANT]
> The script will enable `mcsm-web` automatically. If you don't need the web panel, remember to run **disable it manually** by **`systemctl stop mcsm-web && systemctl disable mcsm-web`** in a terminal after updating!

### Manual Update for Linux Version

If you originally installed MCSManager **manually**, the one-click installation script will not work for you as it may result in installing two separate instances of the program.

You will need to visit the official [release page](https://github.com/MCSManager/MCSManager/releases/latest), download the latest code, and overwrite all your existing MCSManager files.

After overwriting the files, you also need to update the dependencies by navigating to both the `web` and `daemon` directories, and running `npm install --production` in each. This ensures that all required dependencies are updated, otherwise, you may not be able to start the panel!

## Reset Admin Account

If you lost access to the admin account, you can always create a new one with the following steps:

1. **Move** the `web/data/User` directory to another location.
2. Restart MCSManager, the initial setup page will be displayed.
3. Follow the instructions and create a new admin account.
4. Move back the `web/data/User` directory.
5. Restart MCSManager

## Reset Everything

If you want to reset the entire Panel, all you need to do is stop MCSManager, delete the `data` folders of the corresponding modules and start MCSManager again.

:::tip
**/mcsmanager/web/data** - User-Related data
**/mcsmanager/daemon/data** - Instance-Related data
:::

::: warning
When deleting the Instance-Related data folder you could delete your instances if you didn't manually change their working directory!
:::
