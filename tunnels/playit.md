# Playit Tunneling
This section explains how to tunnel MCSManager through [PlayIt](https://playit.gg), removing the need to port forward
:::tip
**Before reading this section, please fully understand the [Network Architecture](/ops/mcsm_network) chapter**
:::
:::warning
**This will expose MCSManager to the internet!** This can have unwanted consequences, use [TailScale](https://tailscale.com/) or [ZeroTier](https://zerotier.com/) if you want to remotely access MCSManger without exposing it to the internet.
:::
## 1. Make an Agent
1. Login into [PlayIt](https://playit.gg) account
2. Go to the `Agents` section
3. Click `Setup a new agent` or `Create a new docker-based agent`
4. Follow the installation steps to connect your agent

## 2. Making The Tunnels
1. Go to the `Tunnel` page and create 2 TCP tunnels
2. Set the port to `23333` and `24444` (Web: 23333 and Daemon: 24444)
3. Get the ip of your *web* tunnel 
4. Login in MCSManger using the tunnel ip and go to the `Daemons` page
5. Edit your `Daemon` and set it to the PlayIt tunnel (This does include any Daemon set to `localhost`)
6. Double check your `Frontend Connection` it should say `Normal`