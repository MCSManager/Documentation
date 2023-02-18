# 更改文件解压缩大小限制

如果您解压缩文件时提示超出最大限制，可以通过修改 Daemon 配置文件来实现更改此限制。

<br />

## Linux

vim /opt/mcsmanager/daemon/data/Config/global.json

```json
{
    "version": 2,
    "ip": "",
    "port": 24444,
    "key": "8f75626304c34e302c3f9557e694e17890b2f853cf1be65",
    "maxFileTask": 2,       // 每个实例，最大同时解压缩任务数
    "maxZipFileSize": 60    // 最大文件解压缩限制，单位（GB）
}
```

<br />

## Windows

<MCSManager 安装路径>/daemon/data/Config/global.json