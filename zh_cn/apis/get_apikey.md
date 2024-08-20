# api教程
## API Key

:::提示
如果您使用管理员帐户，您的 API 密钥也将具有管理员权限。请不要泄露您的 API 密钥。
:::

如图所示，

<img src="../../images/zh_cn/to_user_info.png" style="width:300px" />

生成并复制此 API 密钥，它将具有与您当前帐户相同的权限。

<img src="../../images/zh_cn/getkey.png" style="width:400px" />

## 示例用法

假设您是一名管理员，并且希望使用 API 来“获取远程节点列表”。您需要使用任何编程语言或 HTTP 工具来发送以下请求：

```bash
GET http://< 你的面板安装地址 >/api/service/remote_services_system?apikey=< 你的 Api Key >
Content-Type: application/json; charset=utf-8
X-Requested-With: XMLHttpRequest
```

:::警告
如果没有另行指定，**这些 HTTP 请求头是必需的**。

- X-Requested-With: XMLHttpRequest
- Content-Type: application/json; charset=utf-8

:::

您将获得所有节点的所有数据：

```json
{
  // 状态参数
  // 200：正常，返回相应内容
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
        "running": 1,
        "total": 6
      },
      "system": {
        "type": "Windows_NT",
        "hostname": "MyComputer",
        "platform": "win32",
        "release": "11.0.22000",
        "uptime": 410445,
        "cwd": "D:\\Workspace\\MCSM\\MCSManager-Daemon",
        "loadavg": [0, 0, 0],
        "freemem": 5700775936,
        "cpuUsage": 0.0490009222256379,
        "memUsage": 0.6651475749266619,
        "totalmem": 17024741376,
        "processCpu": 0,
        "processMem": 0
      }
    }
  ],
  // 请求完成处理的时间可用于测量延迟。
  "time": 1643879914006
}
```
