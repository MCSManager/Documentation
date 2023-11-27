# 修改访问端口

默认的访问端口是 23333 和守护进程的 24444 端口。

## 修改面板访问端口

修改面板端（Web）的端口请进入面板，左侧菜单的 `设置` 选项，您可以看见端口设置，修改它并重启面板即可。

## 修改面板访问端口（无需访问面板）

如果你无法访问服务器的23333端口（常见于没有独立IP的NAT主机），在新安装MCSM面板后无法通过23333端口进入面板修改面板端端口，那么请直接修改面板端的配置文件：

`/opt/mcsmanager/web/data/SystemConfig/config.json` 或 `<你的面板端位置>/data/Config/global.json`

```json
{
    "httpPort": 23333,  //修改此处
    "httpIp": null,
    "dataPort": 23334,
    "forwardType": 1,
    "crossDomain": false,
    "gzip": false,
    "maxCompress": 1,
    "maxDonwload": 10,
    "zipType": 1,
    "loginCheckIp": true,
    "loginInfo": "",
    "canFileManager": true,
    "language": "zh_cn",
    "quickInstallAddr": "https://mcsmanager.oss-cn-guangzhou.aliyuncs.com/quick_install.json",
    "redisUrl": ""
}
```

改完后请使用 systemctl 指令重启 mcsm-web.service 以使设置的新端口生效。请尽快登上面板为面板配置管理员账户。



## 修改守护进程端口

`/opt/mcsmanager/daemon/data/Config/global.json`
或
`<你的Daemon位置>/data/Config/global.json`

```json
{
    "version": 2,
    "ip": "",               // 绑定 IP，用于绑定多网卡的情况，请勿乱用 
    "port": 24444,          // 守护进程端口
    "key": "8f75626304c34e302c3f9557e694e17890b2f853cf1be65",   // 守护进程访问密钥（面板连接用）
    "maxFileTask": 2,       // 每个实例，最大同时解压缩任务数
    "maxZipFileSize": 60    // 最大文件解压缩限制，单位（GB）
}
```

改完后请使用 systemctl 指令重启 mcsm-daemon.service 以使设置的新端口生效。

重启后，请进入面板，左侧菜单的 `节点管理` 选项，找到你刚刚改完端口的节点，在下方节点地址修改处修改成新端口，点“更新”即可让面板端通过新端口连接上你的 Daemon 端。