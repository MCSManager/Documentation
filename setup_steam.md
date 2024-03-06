# Setup Steam Game Server

:::tip
If you are using Linux, we recommend that you deploy the steam server using a Docker image. [More information](/setup_docker_image.md)
:::

## Install SteamCMD

Whatever Steam game server you want to run, `PalWorld`, `CS2`, `ARK` or others, you need SteamCMD to help you install the files and get the server up and running.

- [For Windows SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD#Windows)

- [For Linux SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD#Linux)

## Create a Instance

1. Go to the Instance page and click the `Create` button to create a new instance.
2. Select `Steam Game Server`.
3. Select the machine (node) where you would like to deploy the server.
4. Select `No Additional File Required`.
5. Use the official game server documentation to configure the startup command.

## Get startup command

Each Steam game has an `APP ID`, you will need this ID and configure the command:

```bash
"<SteamCMD Location>" +login anonymous +force_install_dir "{mcsm_workspace}" "+app_update <APP ID> validate" +quit
```

Example：

```bash
"C:/SteamCMD/steamcmd.exe" +login anonymous +force_install_dir "{mcsm_workspace}" "+app_update 380870 validate" +quit
```

## Link to MCSManager

Add the `steamcmd ....` command to the `Update Command` in the `Instance Settings` and click the `Update` button to install the Steam server.

Finally, click the 'Start' button to start your server.
