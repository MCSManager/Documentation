# 在 MCSM 面板中使用 MCDReforged

MCSM 支持 [MCDReforged](https://github.com/Fallen-Breath/MCDReforged) 等软件。

## 安装与配置

请查阅 [MCDReforged 文档](https://mcdreforged.readthedocs.io/zh_CN/latest/) 配置 MCDReforged。

配置完成后，如 MCDR 文档所述，在启动命令中填写 `python -m mcdreforged` 即可。

## 兼容性问题

MCDR 的部分功能会与 MCSM 产生冲突，但这里提供了一些常见问题与解决方案。

### 高级控制台

MCSM 将会重定向 MCDR 的标准输入/输出，因此您需要关闭高级控制台以避免排版错误。

需要将 MCDR 配置文件中的 `advanced_console` 改为 `false`。

### 输入输出编码

1. 在启动参数中添加 `-X utf8`，例如 `python -X utf8 -m mcdreforged`。

2. 将终端输入/输出编码调整为 `UTF-8`。
