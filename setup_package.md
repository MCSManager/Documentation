# Set up a Minecraft Jave Edition(JE) server from pre-built packages

## Install Java environment

Prior to running the JE server, it is necessary to install the Java Runtime Environment (JRE). Please refer to the following chart for the required Java version corresponding to the JE server version:

| JRE Version     |                         JE version                          |
| --------------- | :---------------------------------------------------------: |
| Java8           | 1.7.x，1.8.x，1.9.x，1.10.x，1.12.x，1.13.x，1.15.x，1.16.x |
| Java16 & Java17 |                           1.17.x                            |
| Java17          |                           1.18.x                            |
| Java17 or above |                  1.18.x & 1.19.x & 1.20.x                   |

<tip>
Avoid using JRE version 20 as it may cause errors.

If you are unsure, ask the developer about which JRE version your plugins support.
</tip>

### For Windows

- [(Oracle) Java JDK 8](https://repo.huaweicloud.com/java/jdk/8u202-b08/jdk-8u202-windows-x64.exe)
- [(Azul) Java JDK 11](https://cdn.azul.com/zulu/bin/zulu11.62.17-ca-jdk11.0.18-win_x64.msi)
- [(Oracle) Java JDK 17](https://download.oracle.com/java/17/latest/jdk-17_windows-x64_bin.exe)

> JRE 16 and above only support x86_64/amd64 systems.

## Setup with pre-build packages

<tip>
Please ensure that you have installed the correct version of JRE. You can check if it has been installed successfully by using the command "java -version".
</tip>

1. Go to the Instance page and click the `Create` button to create a new instance.
2. Select `Minecraft Server (Java)`.
3. Select the machine (node) where you would like to deploy the server.
4. Select one pre-build package, and click install. Then fill blanks.
5. Wait for installation, and open Instance terminal.
6. Click `start` button on the top-right.

After you have seen this, the server should have started successfully.

![Successful Startup](../images/zh_cn/java_setup.png)
