# 手动配置 MCSM 为 Windows 服务

如果需要像 Linux 那样实现以服务形式在后台运行，则可以借助 WinSW 这个项目来实现。

## 配置
### 下载 WinSW

> 注意：下载前请确定已经安装对应 .NET Framework 版本

.NET Framework 4.0 版本：<https://github.com/winsw/winsw/releases/download/v2.12.0/WinSW.NET4.exe>

.NET Framework 4.6.1 版本：<https://github.com/winsw/winsw/releases/download/v2.12.0/WinSW.NET461.exe>

### 安装服务
#### 守护进程
1. 将下载好的exe文件放入守护进程目录并重命名为*mcsmd.exe*
2. 将配置保存到守护进程目录的*mcsmd.xml*
```
<service>
  <name>MCSManager Daemon</name>
  <description>MCSManager Daemon</description>
  <id>mcsmd</id>
  <executable>node.exe</executable>
  <arguments>app.js</arguments>
</service>
```
3. 运行`mcsmd install`
#### 面板端
1. 将下载好的exe文件放入守护进程目录并重命名为*mcsmw.exe*
2. 将配置保存到面板端目录的*mcsmw.xml*
```
<service>
  <name>MCSManager Web</name>
  <description>MCSManager Web</description>
  <id>mcsmw</id>
  <executable>node.exe</executable>
  <arguments>app.js</arguments>
</service>
```
3. 运行`mcsmw install`

### 修改用户权限（强烈建议）

> 在 Windows 的默认配置下，服务会以 SYSTEM 用户运行，从而给服务器带来安全隐患，强烈建议更改运行该服务的用户来保证安全。
> 
#### 创建用户（如需要）
1. 如果需要创建用户，打开计算机管理，找到本地用户和组
2. 在用户中创建用户，勾选密码永不过期并设置密码
3. 完成创建
4. （可选）如果不希望这个用户登录图形界面，可以将其从Users组移除

#### 修改服务属性
1. 打开`services.msc`
2. 找到面板端和守护进程的服务双击打开
3. 在用户中设置为需要的用户
4. 保存设置
5. 打开服务端及MCSM目录的属性，在安全选项卡赋予这个用户完全控制权限
6. 大功告成！
