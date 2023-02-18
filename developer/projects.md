# Projects

This software requires all three projects to run. The code you use for installation is the result of compilation and integration.

[**Web Backend**](https://github.com/MCSManager/MCSManager)

- Role: Control Center
- Responsible for: Backend APIs, user data management, and communication & authentication with daemons.

[**Frontend/UI**](https://github.com/MCSManager/UI)

- Role: The user interfaces for the backend.
- Responsible for: Displaying statistics via the web interface, sending requests, and communicating with daemons. The final product of this project is pure static files.

[**Daemon**](https://github.com/MCSManager/Daemon)

- Role: Slave/controlled remote node
- Responsible for: Controlling all instances on localhost and managing the actual instance process. It is capable to communicate with all objects.
