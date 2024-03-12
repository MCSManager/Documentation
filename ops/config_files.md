# Data & Config

## Config

### Web UI

`<Web Installation Path>/data/SystemConfig/config.json`

```json
{
  "httpPort": 23333, // Web UI listening port
  "httpIp": null, // Bind IP address, available for multiple netcard
  "crossDomain": true, // Allow cross origin
  "gzip": false, // allow gzip decompression
  "loginCheckIp": false, // Block IP address after too many login attemps
  "loginInfo": "foo", // Login UI hint
  "canFileManager": true, // Allow all users to use file management
  "language": "zh_cn", // UI language
  "quickInstallAddr": "https://mcsmanager.oss-cn-guangzhou.aliyuncs.com/quick_install.json", // Quick install json file path/address

  "redisUrl": "", // Redis database, NOT RECOMMAND
  "dataPort": 23334, // Abandoned
  "forwardType": 1, // Abandoned
  "zipType": 1, // Abandoned
  "maxCompress": 1, // Abandoned
  "maxDownload": 10 // Abandoned
}
```

### Node

`<Daemon Installation Path>/data/Config/global.json`

```json
{
  "version": 2,
  "ip": "", // Bind IP address, available for multiple netcard
  "port": 24444, // Daemon listening port
  "key": "c043e149c9bc44d922ea3be6ff6406abc7b778981c3feb6", // Daemon key
  "maxFileTask": 2, // Maximum decompression task per instance
  "maxZipFileSize": 60, // Maximum decompression file size, unit GB
  "language": "zh_cn", // daemon language
  "defaultInstancePath": "" // Daemon storage path, blank refer auto
}
```

## Where is the Instance data files?

Instance data files refer to the player data, maps, plugins, etc. They are stored at `<Daemon Installation Path>/data/InstanceData/<Instance ID>/`.

Instance config files are stored at `<Daemon Installation Path>/data/InstanceConfig/<Instance ID>.json`, this json file stores the startup commands and other instance configs.
