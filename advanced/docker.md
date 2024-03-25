# Isolated Environment

## Install Docker

MCSManager requires `Docker` to isolate instances. Once isolated, any changes from instances to the host are strictly restricted, ensuring the security of the host server.

MCSManager supports Docker (***Linux only***), please install Docker first and make sure that MCSManager has sufficient permissions to access Docker.

Go to the `Daemons` page, click the `Container` button in the top right corner. You will then be able to manage containers.

## User Docker Images

Go to the `Instance Terminal` page, under `Instance Settings`, enable the `Virtualisation Container (Linux Docker)`. You can then run your instance in a Docker image and use the files in the working directory.

## FAQ

- Q: MCSManager says that Docker is not installed, but it is installed.

> A: Try restarting MCSManager panel with root privileges. If it works, then this is a permission issue. Otherwise please reinstall Docker.
