# 数据与配置

## 配置文件

### 面板

`<Web 安装地址>/data/SystemConfig/config.json`

```json
{
  "httpPort": 23333, // Web 面板端口
  "httpIp": null, // 绑定IP，多张网卡时可使用
  "crossDomain": true, // 是否准许跨域
  "gzip": false, // 是否开启 gzip 压缩
  "loginCheckIp": false, // 同IP登录次数过多自动锁定
  "loginInfo": "foo", // 登录界面提示文字
  "canFileManager": true, // 是否准许所有用户使用文件管理功能
  "language": "zh_cn", // 面板语言
  "quickInstallAddr": "https://mcsmanager.oss-cn-guangzhou.aliyuncs.com/quick_install.json", // 快速部署说明地址

  "redisUrl": "", // Redis 数据库接入，不推荐使用
  "dataPort": 23334, // 已弃用
  "forwardType": 1, // 已弃用
  "zipType": 1, // 已弃用
  "maxCompress": 1, // 最大同时压缩任务数，已弃用
  "maxDownload": 10 // 最大同时下载任务数，已弃用
}
```

### 节点

`<Daemon 安装地址>/data/Config/global.json`

```json
{
  "version": 2,
  "ip": "", // 绑定IP，多张网卡时可使用
  "port": 24444, // 节点端口
  "key": "c043e149c9bc44d922ea3be6ff6406abc7b778981c3feb6", // 节点密钥
  "maxFileTask": 2, // 每个实例，最大同时解压缩任务数
  "maxZipFileSize": 60, // 最大文件解压缩限制，单位（GB）
  "language": "zh_cn", // 节点端语言
  "defaultInstancePath": "" // 节点实例文件储存目录，空代表自动
}
```

## 实例的文件储存在何处？

实例文件指的是 `地图`，`玩家数据` 和 `插件` 等，它们都存放在对应的节点机器上，它们储存在 `<Daemon 安装地址>/data/InstanceData/<实例ID>/` 目录中。

实例的配置文件在 `<Daemon 安装地址>/data/InstanceConfig/<实例ID>.json`，这里储存了每个实例的配置，启动命令和参数等信息。
