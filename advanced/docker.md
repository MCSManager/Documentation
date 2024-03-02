# Enviromental isolation

## Install Docker

MCSManager requires Docker to isolate instances; once isolated, any changes from instances to the host are restricted, ensuring the security of the host server.

Panel supports Docker (Linux only), please install Docker first and make sure that MCSManager has enough permissions to control Docker.

Go to the `daemons` page, in the top right corner there is a `container` button. Click on it, then you can follow the docker file to create, remove etc.

## Use images

Go to the `Instance Terminal` page, under `Instance Settings` you can enable the `Virtualisation Container (Linux Docker)`. You can run your instance in a Docker image and use the files in the working directory.

## FAQ

- Q: The Panel says that Docker is being uninstalled, but it is installed.

> A: Try restarting the MCSManager panel with root privileges, it works, means permissions problem. Otherwise reinstall Docker.
