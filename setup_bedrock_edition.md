# Setup Bedrock Edition Server

## System Requirments

To help prevent errors, we recommend using the **latest popular Linux distributions**, such as `Ubuntu 22.04 LTS`.

For Windows, we suggest using `Windows Server 2016`, `Windows 11`, or the latest stable version.

## Windows

### Downloading Server Core

You will find the latest official Bedrock Edition server core on [the official Minecraft Bedrock website](https://www.minecraft.net/en-us/download/server/bedrock).

### Starting the Server

1. Log in to the panel, and go to `Instances`.
2. Click `Create` button, and select `Minecraft Server (Bedrock)`.
3. Select the machine (node) where you would like to deploy the server.
4. Fill in the blanks and type `bedrock_server.exe` into the startup command.
5. `bedrock_server.exe` is the name of the server core.
6. Upload the core zip file that you downloaded.
7. Wait for upload and unzip. Then open the instance terminal.
8. Click `Start` button on the top-right of the page.
9. Have fun!

### `Missing xxx.dll` or `Fail to start`?

Install Microsoft VC++ from microsoft official website.

## Linux

### Downloading Server Core

You will find the latest official Bedrock Edition server core on [the official Minecraft Bedrock website](https://www.minecraft.net/en-us/download/server/bedrock).

### Starting the Server

1. Log in to the panel, and go to `Instances`.
2. Click `Create` button, and select `Minecraft Server (Bedrock)`.
3. Select the machine (node) where you would like to deploy the server.
4. Fill in the blanks and type `./bedrock_server`，`bedrock_server` into the startup command.
5. `bedrock_server` is the name of the server core.
6. Upload the core zip file that you downloaded.
7. Wait for upload and unzip. Then open the instance terminal.
8. Click `Start` button on the top-right of the page.
9. Have fun!

---

### ERROR?

```
[MCSMANAGER] [ERROR] The instance appears to exit shortly after startup, which may be due to an incorrect launch command or configuration error.
```

There are many factors that will cause this problem, here are the **three** most common problems and solution:

- Incorrect startup command
- Insufficient running permission
- Missing running environment

---

#### Incorrect Startup Command

```bash
./bedrock_server
# bedrock_server is the name of the server core binary. 
#You can also write an sh script and run with sh <yourscript>.sh
```

---

#### Insufficient Permission & Missing Running Environment

```bash
# ERROR
Instance process/container failed to start (PID is empty). Possible reasons are:
1. Incorrect startup command. Please check the startup command and parameters in the instance settings.
2. Incorrect or missing system environment, such as Java environment, etc.

......

Please report this information to the administrator, technical support, or troubleshoot yourself.


[MCSMANAGER] [ERROR] Failed to start instance, please check the startup command, host environment, or configurations.
```

If you are **the server admin**, make sure **the directory (Server)** has 755 permission. If not, change the permission using file management; If yes, check the integrity of the core.

In case of a environment problem, try reinstalling or updating the OS, still happens? Google it!

---

#### Instance started successfully, but can't log on to the server？

In this situation, check your firewall or security group settings, and make sure to allow inbound and/or outbound traffic for the port(s) you are using. If the problem still exists, check the network connectivity.
