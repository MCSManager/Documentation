# Playit Tunneling
This section explains how to tunnel MCSManager through [PlayIt](https://playit.gg), removing the need to port foward
:::tip
**Before reading this section, please fully understand the [Network Architecture](/ops/mcsm_network) chapter**
:::
:::warning
**This will expose MCSManager to the internet!** This can have unwanted consequenses, use [ZeroTier](./zerotier) if you want remotly access MCSManger without exposing it to the internet.
:::
## 1. Make an Agent
1. Login in to PlayIt account
2. Go to the agents section
3. Click "Setup a new agent" or "create a new docker based agent"
4. Follow the installation steps to connet your agent

## 2. Making The Tunnels
1. Go to tunnel page and create 2 TCP tunnels
2. Set the port to `23333` and `24444` (Web 23333 and Daemon 24444)
3. Get the ip of your *web* tunnel 
4. Login in MCSManger using the tunnel ip and go to the `Daemons` page
5. Edit your `Daemons` and set them to the PlayIt tunnels (This does include any Daemon set to `localhost`)
6. You should see that your frontend connection now says normal and works the same as using it on localhost