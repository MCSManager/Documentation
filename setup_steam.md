# Setup Steam Game Server

:::tip
If you are using Linux, we recommend that you deploy the steam server using a Docker image. [More information](/setup_docker_image.md)
:::

## Install SteamCMD

No matter which Steam game server you want to run, `PalWorld`, `CS2`, `ARK`, or others, `SteamCMD` is required to download and update the server.

- [For Windows SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD#Windows)

- [For Linux SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD#Linux)

## Create an Instance

1. Go to the `Instances` page and click the `Create` button.
2. Select `Steam Game Server`.
3. Select the machine (node) where you would like to deploy the server.
4. Select `No Additional File Required`.
5. Configure the startup command following the official documentation (if any).

## Obtain the Installation Command

**_Note: This is NOT the startup command_**\
The same command is used to install and update the server. Each Steam game server has a unique `APP ID`, you will need this ID before running the following command:
:::tip
The `APP ID` for the game itself and it's dedicated server is usually different. In most cases, we want to use the one for the dedicated server. [Find the APP ID](https://steamdb.info/)
:::

```bash
"<SteamCMD Location>" +force_install_dir "{mcsm_workspace}" +login anonymous "+app_update <APP ID> validate" +quit
```

`Project Zomboid Dedicated Server` as an example：

```bash
"C:/SteamCMD/steamcmd.exe" +force_install_dir "/dir/to/your/game/" +login anonymous "+app_update 380870 validate" +quit
```

## Configure the MCSManager

Add the `steamcmd ....` command obtained in the previous step to the `Update Command` in the `Instance Settings`. Click the `Update` button to install/Update the Steam server.

Once installed/updated, click the 'Start' button to start your server.

Finally, based on the game server setup guide you chose, enter the server start command and click the "Start" button to run your Steam game server.

## FAQs

### What is the start command?

The start command varies for different Steam games. You should refer to the setup guide for this specific game server or look up articles from other users who have set up the same server. Follow the instructions there to enter the correct start command.

### The server started successfully, but commands don’t work and there’s no output in the terminal

This might happen if the Steam game server does not support standard input streams. You can use the `RCON protocol` provided by MCSManager to send commands to the server. There is an `RCON protocol` option button in the lower right corner of the terminal console.

If even the `RCON protocol` cannot successfully send commands, it’s possible that `MCSManager` does not support this type of Steam game server.

You may want to try setting up your Steam server using a `Linux + Docker` combination, which typically offers the best compatibility.
