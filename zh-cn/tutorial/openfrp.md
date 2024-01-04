# 使用内网映射与朋友进行联机

## 1. 进入 OpenFrp 官网注册账号

前往 https://www.openfrp.net/ 网站注册账号并完成实名认证（国家政策）。

<br />

## 2. 进入 OpenFrp 管理面板创建隧道

前往 https://www.openfrp.net/home/dashboard 点击左侧 “创建隧道” 按钮，选择一个节点（尽可能离自己所在点近的地方），生成随机隧道名+随机远程端口，本地端口可以填写为 25565。

![图片](images/create_openfrp.png)

<br />

## 3. 保存创建好的隧道 ID 和用户密钥

复制这两个信息，后续将要使用。

![img](images/cpoy_t_id.png)
![img](images/cpoy_u_id.png)

<br />

## 4. 将隧道 ID 和用户密钥填写到 MCSManager 管理面板中

如果你使用 “快速开始” 中的一键开服，那么你应该看见这个界面：

输入从 OpenFrp 管理面板中的密钥和生成的隧道 ID，点击保存后，下次启动你的 Minecraft 服务器时，将会自动触发内网映射。

> 此界面在左侧菜单的应用实例->实例右上角三个点->编辑配置->底部联机方式。

![图片](images/openfrp.png)

启动服务器（实例）后，左上角显示这个代表成功。

![图片](images/open_ok.png)

接下来你就可以根据 OpenFrp 给你的地址+端口发送给你的朋友实现联机。

<br />

## 5. 你的 IP 地址

把这个地址发给你的朋友就可以实现联机。

![图片](images/result_frp_ip.png)

<br />

## 手动更新 Frpc  

如果你正确配置以上内容并重启后没有看到这个

![img](images/open_ok.png)

请尝试手动更新 Frpc  

前往 https://console.openfrp.net/home/download 下载新的 Frpc  

![img](images/download.png)

并手动替换守护进程目录下的 Frpc 文件  

Linux：如果您使用一键安装脚本安装，那么默认路径应该是 /opt/mcsmanager/daemon/lib  

Windows：<面板安装路径>/daemon/lib  

替换 frpc_(系统)_(架构)并重启即可  
