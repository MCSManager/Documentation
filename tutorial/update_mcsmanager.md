# Update MCSManager

## Backup

1. Backup the configuration folders. You can simply move them to another location other than where MCSM was installed.

- /opt/mcsmanager/web/data/
- /opt/mcsmanager/daemon/data/

2. Update...
3. Move the backuped configurations back to its original location. (We recommend copying it and then removing the backup once the updated version works.)

## Update

### Linux

Go to `/opt/mcsmanager/web` and `/opt/mcsmanager/daemon` and run git pull commands.

Note: The following commands will destroy all local changes. Be sure to backup the data folder in advance.
```
git fetch --all
git reset --hard origin/master
git pull
```

If you see this output in both folders, the update was successful.

```
Already up to date.
```

### Windows

1. Go to https://mcsmanager.com/ to download the latest zip file.

2. **Overwrite** the original file.
