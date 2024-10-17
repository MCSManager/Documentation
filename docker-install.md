# Installing MCSManager Panel Using Docker

:::tip
Installing the panel via Docker requires some complex configurations. Make sure you have the necessary knowledge for this. Otherwise, it is recommended to use the one-click installation script.
:::

## Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Install MCSManager

In the following commands, replace all `<CHANGE_ME_TO_INSTALL_PATH>` with the **actual storage path** where your data will be stored. This path needs to be persistent. The installation paths for the web and daemon services can be different.

### Install via docker-compose

```yaml
# docker-compose.yml
services:
  web:
    image: githubyumao/mcsmanager-web:latest
    ports:
      - "23333:23333"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - <CHANGE_ME_TO_INSTALL_PATH>/web/data:/opt/mcsmanager/web/data
      - <CHANGE_ME_TO_INSTALL_PATH>/web/logs:/opt/mcsmanager/web/logs

  daemon:
    image: githubyumao/mcsmanager-daemon:latest
    restart: unless-stopped
    ports:
      - "24444:24444"
    environment:
      - MCSM_DOCKER_WORKSPACE_PATH=<CHANGE_ME_TO_INSTALL_PATH>/daemon/data/InstanceData
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - <CHANGE_ME_TO_INSTALL_PATH>/daemon/data:/opt/mcsmanager/daemon/data
      - <CHANGE_ME_TO_INSTALL_PATH>/daemon/logs:/opt/mcsmanager/daemon/logs
      - /var/run/docker.sock:/var/run/docker.sock
```

```bash
mkdir -p <CHANGE_ME_TO_INSTALL_PATH>
cd <CHANGE_ME_TO_INSTALL_PATH>
vim docker-compose.yml # Insert the docker-compose.yml content here
docker compose pull && docker compose up -d
```

### Install via Command Line

```bash
docker pull githubyumao/mcsmanager-daemon:latest
docker pull githubyumao/mcsmanager-web:latest

# Note: In the following commands, replace `${CHANGE_ME_TO_INSTALL_PATH}`
# with your actual data storage path, which needs to be persistent.

# Start the MCSManager Daemon
docker run -v /etc/localtime:/etc/localtime:ro  \
-v ${CHANGE_ME_TO_INSTALL_PATH}/daemon/data:/opt/mcsmanager/daemon/data \
-v ${CHANGE_ME_TO_INSTALL_PATH}/daemon/logs:/opt/mcsmanager/daemon/logs \
-v /var/run/docker.sock:/var/run/docker.sock \
-e MCSM_DOCKER_WORKSPACE_PATH=${CHANGE_ME_TO_INSTALL_PATH}/daemon/data/InstanceData \
-p 24444:24444 \
-d githubyumao/mcsmanager-daemon:latest


# Start the MCSManager Web Panel
docker run \
-v /etc/localtime:/etc/localtime:ro \
-v ${CHANGE_ME_TO_INSTALL_PATH}/web/data:/opt/mcsmanager/web/data \
-v ${CHANGE_ME_TO_INSTALL_PATH}/web/logs:/opt/mcsmanager/web/logs \
-p 23333:23333 \
-d githubyumao/mcsmanager-web:latest
```

### Configure the Panel

Once installed and running, you can access the panel at `http://<your public IP>:23333`.

You might encounter some errors when accessing the panel, as the Web panel may not be connected to the daemon. You will need to configure them to communicate.

#### Connect the Node

Click on `Nodes` in the top navigation bar, then click on `Add Node`. Fill in your server's **public IP**, secret key, and the default `24444` port.

Run the command `cat <CHANGE_ME_TO_INSTALL_PATH>/daemon/data/Config/global.json` to view the daemon's secret key.

For more details, you can refer to: [Connecting to Other Machines](./advanced/distributed.html).
