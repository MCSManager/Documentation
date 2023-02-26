# Project Structure

## Architecture

The MCSM project has two parts, a web panel (Web) and a daemon (Daemon).

**Web panel provides:**

- User management
- Daemon connection
- Authentication for most operations
- API 
- More...

**Daemon provides:**

- Process management (Bukkit, Spigot, etc)
- Docker container management
- File management
- Real-time terminal emulation
- More...

## How does MCSManager work

In order to reduce the load on the web panel, the browser needs to have direct access to each daemon. File transmission needs to be done directly between your browser and the daemon. 

Due to the above reason, when adding daemons to the panel, you must use the public IP address of the daemon. Otherwise, nobody will be able to access the daemon from the Internet, and the daemon will always display the word `connecting`.

![Principle](../images/distributed_principle.png)