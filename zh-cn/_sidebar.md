- 快速开始

  - [安装面板](zh-cn/README.md)
  - [基础概念](zh-cn/tutorial/base_info.md)

- 使用教程

  - [搭建 Java 版 Minecraft 服务端](zh-cn/tutorial/java_windows.md)
  - [搭建 BDS 版 Minecraft 服务端](zh-cn/tutorial/ubuntu_bds.md)
  - [使用 Docker-Compose 部署](zh-cn/tutorial/docker-compose.md)

- 面板配置与使用

  - [连接多台物理主机](zh-cn/tutorial/connect_daemon.md)
  - [分布式工作原理](zh-cn/tutorial/system_structure.md)
  - [仿真终端](zh-cn/tutorial/pty.md)
  - [手动配置为 Linux 服务](zh-cn/tutorial/to_service.md)
  - [手动配置为 Windows 服务](zh-cn/tutorial/to_windows_service.md)
  - [修改访问端口](zh-cn/tutorial/modify_port.md)
  - [更改解压缩文件大小限制](zh-cn/tutorial/delete_file_unzip_limit.md)
  - [配置 HTTPS 反向代理](zh-cn/tutorial/reverse_proxy+ssl.md)
  - [更新面板](zh-cn/tutorial/update_mcsm.md)
  - [MCSM & MCDR](zh-cn/tutorial/mcdr.md)

- 常见问题

  - [终端乱码解决方案](zh-cn/tutorial/code.md)
  - [常见问题集合](zh-cn/tutorial/common_qa.md)
  - [使用内网映射与朋友进行联机](zh-cn/tutorial/openfrp.md)

- API 参考

  - [使用方式](zh-cn/apis/readme.md)

  - 面板通用设置

    - [数据监控](zh-cn/apis/panel/overview.md)
    - [获取面板数据简报](zh-cn/apis/remote/get_remote_services_info.md)
    - [获取面板设置](zh-cn/apis/panel/get_settings.md)
    - [更新面板设置](zh-cn/apis/panel/update_settings.md)

  - 多用户管理

    - [创建用户](zh-cn/apis/panel/user_register.md)
    - [删除用户](zh-cn/apis/panel/user_delete.md)
    - [用户总览](zh-cn/apis/panel/user_overview.md)
    - [查看用户信息](zh-cn/apis/panel/info.md)
    - [根据条件查询用户](zh-cn/apis/panel/search.md)
    - [更新自身用户信息](zh-cn/apis/panel/update.md)
    - [更新任意用户信息](zh-cn/apis/panel/update_admin.md)

  - 守护进程管理

    - [新增远程守护进程](zh-cn/apis/remote/new_remote_services.md)
    - [删除远程守护进程](zh-cn/apis/remote/del_remote_services.md)
    - [编辑远程守护进程](zh-cn/apis/remote/edit_remote_services.md)
    - [获取所有守护进程列表](zh-cn/apis/remote/get_daemonlist.md)
    - [获取守护进程列表](zh-cn/apis/remote/get_remote_services.md)
    - [重新连接远程守护进程](zh-cn/apis/remote/reconn_remote_services.md)

  - 应用实例管理

    - [获取远程实例详情信息](zh-cn/apis/instance/get_instance_info.md)
    - [根据条件查询守护进程实例](zh-cn/apis/instance/search_remote_services.md)
    - [创建实例](zh-cn/apis/instance/create_instance.md)
    - [编辑实例](zh-cn/apis/instance/edit_instance.md)
    - [删除实例](zh-cn/apis/instance/delete_instance.md)
    - [开启实例](zh-cn/apis/instance/start_instance.md)
    - [关闭实例](zh-cn/apis/instance/stop_instance.md)
    - [终止实例](zh-cn/apis/instance/kill_instance.md)
    - [重启实例](zh-cn/apis/instance/restart_instance.md)
    - [向实例发送命令](zh-cn/apis/instance/command_instance.md)
    - [获取实例输出内容](zh-cn/apis/instance/instance_output.md)
    - [检查实例配置文件存在](zh-cn/apis/instance/query_instance_configfile.md)
    - [更新指定实例配置文件内容](zh-cn/apis/instance/update_instance_configfilecontent.md)

  - 实例文件管理

    - [获取文件列表](zh-cn/apis/instance/view_instance_fils_list.md)
    - [编辑/查看文件](zh-cn/apis/files/edit_files.md)
    - [压缩文件](zh-cn/apis/files/compress.md)
    - [解压文件](zh-cn/apis/files/uncompress.md)
    - [复制文件](zh-cn/apis/files/copy_files.md)
    - [删除文件](zh-cn/apis/files/delete_files.md)
    - [新建目录](zh-cn/apis/files/mkdir.md)
    - [移动文件](zh-cn/apis/files/move_files.md)
    - [上传文件](zh-cn/apis/files/update_file.md)
    - [下载文件](zh-cn/apis/files/download_file.md)

  - 计划任务管理

    - [创建计划任务](zh-cn/apis/scedule/create_schedule.md)
    - [删除计划任务](zh-cn/apis/scedule/del_scedule.md)
    - [获取计划任务列表](zh-cn/apis/scedule/get_schedule_list.md)


- 相关链接

  - [Github](https://github.com/MCSManager)
  - [改进这个文档](https://github.com/MCSManager/Documentation)
