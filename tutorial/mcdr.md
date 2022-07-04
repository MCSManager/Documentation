# 在 MCSM 面板中使用 MCDR
MCSM 支持 MCDR 和其他管理 Minecraft 软件。
## 安装与配置
请查阅 [MCDReforged 2.0 文档](https://mcdreforged.readthedocs.io/zh_CN/latest/)

启动方式与正常开启 Java 版 MC 服务器无异
## 兼容性
MCDR 的部分功能会与 MCSM 产生冲突，但这里提供了一些常见问题与解决方案。
### 高级控制台
MCSM 将会重定向 MCDR 的标准输入/输出，因此您需要关闭高级控制台以避免排版错误
#### 解决方案
需要在 MCDR 的 `config.yml` 里找到
`advanced_console: true`
并修改为
`advanced_console: false`
### 编码/解码
MCDR 自动检测编码格式的功能在部分 Windows 环境下会与 MCSM 不兼容，导致无法正确识别部分 Unicode 符号。
#### 解决方案
1. 需要在 MCDR 的 `config.yml` 里找到
`encoding` 与 `decoding`
并指定为
`utf8`
> 注意：`utf8`不能输入为`utf-8`，否则会导致 MCDR 出现错误。
2. 在 MCSM 创建实例时，请注意将
`终端输入编码` 与 `终端输出编码`
设置为 `UTF-8（通用）`
