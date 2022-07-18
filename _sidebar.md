- [快速开始](README.md)


- 使用教程

  - [Windows Java 版](tutorial/java_windows.md)
  - [Linux 基岩版服务端](tutorial/ubuntu_bds.md)
  - [使用 Docker-compose 部署](tutorial/docker-compose.md)

- 面板应用介绍

  - [如何连接守护进程](tutorial/connect_daemon.md)
  - [分布式工作原理](tutorial/system_structure.md)
  - [配置反向代理](tutorial/simple_reverse_proxy.md)
  - [配置 https](tutorial/reverse_proxy+ssl.md)
  - [更新面板](tutorial/update_mcsm.md)
  - [仿真终端](tutorial/pty.md)
  - [MCSM&MCDR](tutorial/mcdr.md)

- 常见问题
  - [终端乱码解决方案](tutorial/code.md)
  - [常见问题集合](qa/1.md)

- API 参考

  - 面板通用设置
    - [数据监控](panel/overview.md)
    - [获取面板数据简报](remote/get_remote_services_info.md)
    - [获取面板设置](panel/get_settings.md)
    - [更新面板设置](panel/update_settings.md)

  - 多用户管理

    - [创建用户](panel/user_register.md)
    - [删除用户](panel/user_delete.md)
    - [用户总览](panel/user_overview.md)
    - [查看用户信息](panel/info.md)
    - [根据条件查询用户](panel/search.md)
    - [更新自身用户信息](panel/update.md)
    - [更新任意用户信息](panel/update_admin.md)

  - 守护进程管理

    - [新增远程守护进程](remote/new_remote_services.md)
    - [删除远程守护进程](remote/del_remote_services.md)
    - [编辑远程守护进程](remote/edit_remote_services.md)
    - [获取所有守护进程列表](remote/get_daemonlist.md)
    - [获取守护进程列表](remote/get_remote_services.md)
    - [重新连接远程守护进程](remote/reconn_remote_services.md)

  - 应用实例管理

    - [获取远程实例详情信息](instance/get_instance_info.md)
    - [根据条件查询守护进程实例](instance/search_remote_services.md)
    - [创建实例](instance/create_instance.md)
    - [编辑实例](instance/edit_instance.md)
    - [删除实例](instance/delete_instance.md)
    - [开启实例](instance/start_instance.md)
    - [关闭实例](instance/stop_instance.md)
    - [终止实例](instance/kill_instance.md)
    - [重启实例](instance/restart_instance.md)
    - [向实例发送命令](instance/command_instance.md)
    - [获取实例输出内容](instance/instance_output.md)
    - [检查实例配置文件存在](instance/query_instance_configfile.md)
    - [更新指定实例配置文件内容](instance/update_instance_configfilecontent.md)

  - 实例文件管理

    - [获取文件列表](instance/view_instance_fils_list.md)
    - [编辑/查看文件](files/edit_files.md)
    - [压缩文件](files/compress.md)
    - [解压文件](files/uncompress.md)
    - [复制文件](files/copy_files.md)
    - [删除文件](files/delete_files.md)
    - [新建目录](files/mkdir.md)
    - [移动文件](files/move_files.md)
    - [上传文件](files/update_file.md)
    - [下载文件](files/download_file.md)

  - 计划任务管理

    - [创建计划任务](scedule/create_schedule.md)
    - [删除计划任务](scedule/del_scedule.md)
    - [获取计划任务列表](scedule/get_schedule_list.md)
