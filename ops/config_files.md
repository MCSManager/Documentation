# Data & Configs

## Configurations

### Web UI

`<Web Installation Path>/data/SystemConfig/config.json`

```json
{
  "httpPort": 23333, // Web UI listening port
  "httpIp": null, // Bind IP address, can be useful with multiple NICs
  "crossDomain": true, // Allow cross origin
  "gzip": false, // enable gzip decompression
  "loginCheckIp": false, // Block IP address after too many login attemps
  "loginInfo": "foo", // Login UI hint
  "canFileManager": true, // Allow all users to use file management
  "language": "zh_cn", // UI language
  "quickInstallAddr": "https://mcsmanager.oss-cn-guangzhou.aliyuncs.com/quick_install.json", // Quick install json file path/address

  "redisUrl": "", // Redis database, NOT RECOMMAND
  "dataPort": 23334, // Abandoned
  "forwardType": 1, // Abandoned
  "zipType": 1, // Abandoned
  "maxCompress": 1, // Max number of concurrent compression tasks, Abandoned.
  "maxDownload": 10 // Max number of concurrent downloading tasks, Abandoned.
}
```

### Daemon

`<Daemon Installation Path>/data/Config/global.json`

```json
{
  "version": 2,
  "ip": "", // Bind IP address, can be useful with multiple NICs
  "port": 24444, // Daemon listening port
  "key": "c043e149c9bc44d922ea3be6ff6406abc7b778981c3feb6", // Daemon key
  "maxFileTask": 2, // Max concurrent decompression tasks per instance
  "maxZipFileSize": 60, // Max allowed file size for decompression in GB
  "language": "zh_cn", // daemon language
  "defaultInstancePath": "" // Default directory for instances, blank for auto
}
```

## Instance Data Location

Instance data files are player data, maps, plugins, etc. By default, they are stored at `<Daemon Installation Path>/data/InstanceData/<Instance ID>/`.

Instance configurations are stored in\
`<Daemon Installation Path>/data/InstanceConfig/<Instance ID>.json`, \
this file contains all configurations like `startup commands` for the selected instance.
