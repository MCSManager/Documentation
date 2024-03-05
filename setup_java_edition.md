# Setup Java Edition Server

::: tip
This section assumes that you already have JRE installed. If you have any questions, see [Setup Packages](/setup_package.md).
:::

## Download JE server core

The server core is an important part of the server, we need server core to run server. Deploying server on phones or other remote device is the same.

We will use Paper core as an example. Here are some popular versions

- [1.18.2](https://api.papermc.io/v2/projects/paper/versions/1.18.2/builds/388/downloads/paper-1.18.2-388.jar)
- [1.19.4](https://api.papermc.io/v2/projects/paper/versions/1.19.4/builds/524/downloads/paper-1.19.4-524.jar)
- [1.20.4](https://api.papermc.io/v2/projects/paper/versions/1.20.4/builds/389/downloads/paper-1.20.4-389.jar)

> Other version：https://papermc.io/downloads

---

## Deploy

Create an Instance by clicking the `Create` button on the Instance page. When you create your instance, you can select the server(daemon) you want to deploy to and manage your instance files. Don't forget to select `Mincraft Server (Java)` when creating your instance.

- Startup Command

```bash
java -Dfile.encoding=UTF-8 -jar "paper-<version>.jar"
```

<tip>
The startup command has many different uses and args, which you can discover for yourself.
</tip>

---

## Start server

After creating the instance, navigate to the instance console and start it by clicking the 'start' button located in the top-right corner.

## ELUA

::: warning
If you do not agree to the End-User License Agreement (ELUA), you will not be able to set up your server.
:::

To start the server for the first time, you must accept the `End-User License Agreement (EULA)`. To accept ELUA, go to `configuration files`, and you will see `elua.txt`, click `edit` and select `yes`.

If you do not see this file, start your server once.
