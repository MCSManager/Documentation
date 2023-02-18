# Update MCSManager

## Backup

1. Move these two folders to another location.

- /opt/mcsmanager/web/data/
- /opt/mcsmanager/daemon/data/

2. Update...
3. Move back

## Update

### Linux

Go to `/opt/mcsmanager/web` and `/opt/mcsmanager/daemon` and run git pull commands.

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
