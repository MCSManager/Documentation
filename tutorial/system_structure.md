# Distributed working principle

## Subproject responsibilities

The whole project is divided into two parts, a panel side (Web) and a Daemon side (Daemon).

** Panel end function division: **

- User Management
- Connect to daemons
- Authentication and authorization for most operations
- Provided by the API
- More...

** Function division of daemon side **

- Real process management (Bukkit, Spigot program running)
- Docker container management
- File Management
- Real-time terminal communication
- More

## Distributed connection schematic

If there is no other configuration or factor, the browser must directly access the daemon process to facilitate file uploading and downloading and real-time data transmission, reducing the traffic pressure on the panel.

Because of this, the IP address connected to the daemon must not use the Intranet segment, otherwise external users will not be able to access the daemon and will always be displayed as' connected '.

![Distributed schematic diagram](images/distributed_princip.png)