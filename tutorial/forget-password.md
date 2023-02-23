# Forget Password

Unfortunately you forgot your password, if you are an admin, you have to move all the user data from the panel elsewhere, then reboot and access the panel to generate a new admin account, then move all the user data back.

## Stop MCSManager Web

```bash
systemctl stop mcsm-web
```

## Backup Users

```bash
mv /opt/mcsmanager/web/data/Users/ /opt/user-back/
```


## Restart MCSManager Web


```bash
systemctl start mcsm-web
```

## Recreate the administrator

Use a browser to access MCSManager

## restore original user data

```bash
mv /opt/user-back/ /opt/mcsmanager/web/data/Users/
```
