# Config Files

## Web

Linux: /opt/mcsmanager/web/data/SystemConfig/config.json

Windows: (install path)/web/data/SystemConfig/config.json

```json
{
  "httpPort": 23333, // Bind a network port for HTTP
  "httpIp": null, // Bind a network device, it is recommended to be empty
  "dataPort": 23334, // Deprecated
  "forwardType": 1, // Deprecated
  "crossDomain": false, // CSRF defense
  "gzip": false, // HTTP GZIP
  "maxCompress": 1,
  "zipType": 1,
  "loginCheckIp": true,
  "loginInfo": "",
  "canFileManager": true,
  "language": "en_us",
  "quickInstallAddr": "..."
}
```

## Daemon

Linux: /opt/mcsmanager/daemon/data/Config/global.json

Windows: (install path)/daemon/data/Config/global.json

```json
{
  "version": 2, // Deprecated
  "ip": "", // Bind a network device, it is recommended to be empty
  "port": 24444, // Bind a network port for HTTP
  "key": "...", // Password, Used to verify that the connection is trusted
  "maxFileTask": 2,
  "maxZipFileSize": 60, // Maximum upload file size (GB)
  "language": "en_us",
  "defaultInstancePath": ""
}
```

## Data Dir

Web Config & Data: `/opt/mcsmanager/web/data/`

Daemon Config & Data `/opt/mcsmanager/daemon/data/`
