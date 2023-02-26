# Build Development Environment

This is intended for developers. If you are not a developer, you can safely ignore this document.

You are welcomed to develop this project further. This document shows how to build a basic development encironment for MCSManager. Please make sure to be in compliance with the license.

## Web Project

```bash
git clone https://github.com/MCSManager/MCSManager.git
cd MCSManager
npm install
npm run start
# By default, use ts-node to run Typescript code directly
# By default, run on port 23333.

```

## UI Project

```bash
git clone https://github.com/MCSManager/UI.git
cd UI
npm install
npm run serve
# Preview the interface at http://localhost:8080/
# All the requests will be redirected to port 23333.
```

## Daemon Project

```bash
git clone https://github.com/MCSManager/Daemon.git
cd Daemon
npm install
npm run start
# After running, please connect the daemon to the control panel via the web interface.
# By default, run on port 24444
```
