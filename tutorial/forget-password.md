# Forget Password

We are sorry that you forgot your password. If you are the server owner, you need to temporarily  move all user data from the configuration directory to a safe place. Then, restart MCSM service so the panel will generate a new admin account. You can move back all the user data then. 

### Stop MCSManager Web

```bash
systemctl stop mcsm-web
```

### Backup Users

```bash
mv /opt/mcsmanager/web/data/Users/ /opt/user-back/
```


### Restart MCSManager Web


```bash
systemctl start mcsm-web
```

### Create a new admin account

Access MCSM web panel and follow the instructions.

### Restore user data

```bash
mv /opt/user-back/ /opt/mcsmanager/web/data/Users/
```
