# 修改访问端口

默认的访问端口是 23333 和守护进程的 24444 端口。

## 修改面板访问端口

修改面板端（Web）的端口请进入面板，左侧菜单的 `设置` 选项，您可以看见端口设置，修改它并重启面板即可。


## 修改守护进程端口

/opt/mcsmanager/daemon/data/Config/global.json
或
<你的Daemon位置>/data/Config/global

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