# Distributed working principle

## Subproject Responsibilities

The overall project is divided into two parts, a panel side (Web) and a daemon side (Daemon).

**Functional division of the panel side:**

- User Management
- connection daemon
- Authority authentication and authorization for most operations
- API interface provided
- More...

**Functional division on the daemon side**

- Real process management (Bukkit, Spigot program running)
- Docker container management
- file management
- Terminal real-time communication
- More

## Distributed Connection Schematic

In the absence of other configurations and factors, the browser needs to have direct access to the daemon process to facilitate file upload and download and real-time data transmission, thereby reducing the traffic pressure on the panel side.

Because of this, the IP address of the connection daemon must not use the internal network segment, otherwise external users will not be able to access the daemon and will always display the words `connecting`.

![Distributed Principle](../images/distributed_principle.png)