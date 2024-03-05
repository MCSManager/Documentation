# Setup Minecraft bedrock edition server

## Enviroment requirments

To help prevent errors, we recommend using the **latest popular Linux distributions**, such as `Ubuntu 22.04`.

For Windows, we suggest using `Windows Server 2016`, `Windows 10`, or the latest available version.

## Windows

### Download Core

You will find the latest official Bedrock Edition server core on [the official Minecraft Bedrock website](https://www.minecraft.net/zh-hans/download/server/bedrock).

### Use the panel to start the server

1. Log in to the panel, and open Instance page.
2. Click `Create` button, and select `Minecraft Server (Bedrock)`.
3. Select the machine (node) where you would like to deploy the server.
4. Fill in the blanks and type `bedrock_server.exe` into the startup command.
5. `bedrock_server.exe` is the name fo server core.
6. Upload the core zip file that you download from the official minecraft website.
7. Wait for upload and unzip. Then open the istance terminal.
8. Click `Start` button on the top-right of the page. (Click the `action` first!)
9. Have fun!

### `Missing .dll` or `Fail to start`?

Install Microsoft VC++ from microsoft official website.

## Linux

### Download Core

You will find the latest official Bedrock Edition server core on [the official Minecraft Bedrock website](https://www.minecraft.net/zh-hans/download/server/bedrock).

### Use the panel to start the server

1. Log in to the panel, and open Instance page.
2. Click `Create` button, and select `Minecraft Server (Bedrock)`.
3. Select the machine (node) where you would like to deploy the server.
4. Fill in the blanks and type `./bedrock_server`，`bedrock_server` into the startup command.
5. `bedrock_server` is the name fo server core.
6. Upload the core zip file that you download from the official minecraft website.
7. Wait for upload and unzip. Then open the istance terminal.
8. Click `Start` button on the top-right of the page. (Click the `action` first!)
9. Have fun!

---

### ERROR?

```
[MCSMANAGER] [ERROR] The instance appears to have exited shortly after startup, which may be due to an incorrect launch command or configuration error.
```

There are many factors that will cause this problem, here are the **three** known problem and solution.

- Incorrect startup command
- No permission
- Missing running environment

---

#### Incorrect startup command

```bash
./bedrock_server
# bedrock_server is the server core filename. Or write an sh script and run sh <yourscript>.sh
```

---

#### No Permission & Missing running environment

```bash
# ERROR
Detected instance process/container startup failure (PID is empty). Possible reasons are:
1. Incorrectly instance startup command. Please check the startup command and parameters in the instance settings.
2. Incorrect or missing system host environment, such as Java environment, etc.

......

Please report this information to the administrator, technical support, or troubleshoot yourself.
```

If you are **the panel admin or ops**, check **the folder (Server)** has 755 permission, if not grant the permission, if yes, check the server core file.

If running environment problem, try reinstalling Ubuntu or update Ubuntu, still happens? Google it!

---

#### Instance started successfully, but can't log on to the server？

In this situation, check your WAF or security group settings to allow inbound and outbound traffic to the specific port you are using. If this still does not work, contact your service provider and check for an internet problem.
