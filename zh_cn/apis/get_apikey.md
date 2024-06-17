# API 使用教程

## 获取 Api Key

:::tip
如果你是管理员账号，那么你的 APIKEY 将同时拥有管理员权限，请<b>不要</b>泄漏你的 APIKEY。
:::

如图所示

<img src="../../images/zh_cn/to_user_info.png" style="width:300px" />

接下来只需生成并复制这段密钥，即是享有当前账户同等权利的 API 密钥。

<img src="../../images/zh_cn/getkey.png" style="width:400px" />

## 使用示例

假设你是管理员，那么列如 API 接口 `获取节点列表`，你只需要使用任何编程语言，或者任何 HTTP 工具发送如下请求：

```bash
GET http://<你的面板地址>/api/service/remote_services_system?apikey=<APIKEY>

Content-Type: application/json; charset=utf-8
X-Requested-With: XMLHttpRequest
```

:::warning
除非额外说明，**否则所有 API 接口都必须附带以下 HTTP 请求头：**

- X-Requested-With: XMLHttpRequest
- Content-Type: application/json; charset=utf-8

:::

你将获取到所有节点数据：

```json
{
  // status 参数
  // 200：正常，并返回相应内容
  // 400：请求参数不正确
  // 403：权限不足
  // 500：程序错误
  "status": 200,
  // 响应节点列表
  "data": [
    {
      "version": "3.9.0",
      "process": {
        "cpu": 5625000,
        "memory": 132437320,
        "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon"
      },
      "instance": {
        "running": 1, //运行的应用
        "total": 6 //总共应用
      },
      "system": {
        "type": "Windows_NT", //服务器类型
        "hostname": "MyComputer", //服务器名称
        "platform": "win32", //服务器版本
        "release": "11.0.22000", //面板版本
        "uptime": 410445, //面板在线时间
        "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon", //面板运行路径
        "loadavg": [0, 0, 0],
        "freemem": 5700775936, //剩余内存
        "cpuUsage": 0.0490009222256379, //CPU占用
        "memUsage": 0.6651475749266619, //内存使用
        "totalmem": 17024741376, //总内存
        "processCpu": 0,
        "processMem": 0
      }
    }
  ],
  // 面板处理完毕的时间，可以用于统计网络延迟。
  "time": 1643879914006
}
```
